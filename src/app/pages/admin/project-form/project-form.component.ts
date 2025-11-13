import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LucideAngularModule } from 'lucide-angular';
import { ProjectInfoComponent } from './tabs/project-info/project-info.component';
import { ProjectGalleryComponent } from './tabs/project-gallery/project-gallery.component';
import { ProjectSettingsComponent } from './tabs/project-settings/project-settings.component';
import { ProjectService } from '../../../core/services/project.service';
import { AuthService } from '../../../core/services/auth.service';
import { Project } from '../../../core/models/project.interface';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    LucideAngularModule,
    ProjectInfoComponent,
    ProjectGalleryComponent,
    ProjectSettingsComponent
  ],
  providers: [],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  mode = signal<'create' | 'edit'>('create');
  project = signal<Project | null>(null);
  loading = signal(false);
  activeTab = signal(0);
  private autosaveTimer: any = null;
  private creating = signal(false);

  // Form data shared between components
  formData = signal({
    name: '',
    description: '',
    type: '',
    features: '', // comma-separated for UI; will map to string[]
    demoUrl: '',
    githubUrl: '',
    gallery: [] as any[],
    visible: true,
    featured: false
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      if (projectId) {
        this.mode.set('edit');
        this.loadProject(projectId);
      } else {
        this.mode.set('create');
      }
    });
  }

  loadProject(projectId: string) {
    this.loading.set(true);
    this.projectService.getProjectById(projectId).subscribe({
      next: (p: any) => {
        const normalized = this.normalizeProjectFromBackend(p);
        this.project.set(normalized);
        this.formData.set(this.mapProjectToForm(normalized));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onTabChange(index: number) {
    // guarda cambios antes de cambiar de tab
    this.saveImmediately();
    this.activeTab.set(index);
  }

  onFormDataChange(data: any) {
    this.formData.update(current => ({ ...current, ...data }));
    this.scheduleAutosave();
  }

  createProject() {
    // Evitar doble creación si ya hay draft/creación en curso
    if (this.mode() === 'create' && !this.project() && !this.creating()) {
      this.loading.set(true);
      this.creating.set(true);
      // Cancelar cualquier autosave pendiente
      if (this.autosaveTimer) clearTimeout(this.autosaveTimer);
      const clientId = this.authService.getClientId();
      const projectData = this.buildCreateDto(clientId || undefined);

      this.projectService
        .createProject(projectData)
        .pipe(
          finalize(() => {
            this.loading.set(false);
            this.creating.set(false);
          })
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/dashboard']);
          },
          error: (error: unknown) => {
            console.error('Error creating project:', error);
          }
        });
    } else if (this.mode() === 'edit' || this.project()) {
      // Edit mode: Save Changes
      const id = this.project()?.id;
      if (!id) return;
      this.loading.set(true);
      const updates = this.buildUpdateDto();

      this.projectService
        .updateProject(id, updates)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/dashboard']);
          },
          error: (error: unknown) => {
            console.error('Error saving changes:', error);
          }
        });
    }
  }

  // Autosave helpers
  private scheduleAutosave() {
    if (this.autosaveTimer) clearTimeout(this.autosaveTimer);
    this.autosaveTimer = setTimeout(() => this.autosave(), 700);
  }

  private saveImmediately() {
    if (this.autosaveTimer) clearTimeout(this.autosaveTimer);
    this.autosave();
  }

  private autosave() {
    // Si hay creación/guardado en curso, evitar disparar autosave
    if (this.loading() || this.creating()) return;
    // Si no hay cambios mínimos, no hacer nada
    const name = (this.formData().name || '').trim();

    // Si aún no existe proyecto, crear borrador al tener título
    if (this.mode() === 'create' && !this.project() && name.length > 0) {
      const clientId = this.authService.getClientId();
      const draft = this.buildCreateDto(clientId || undefined, name);
      this.creating.set(true);

      this.projectService
        .createProject(draft)
        .pipe(finalize(() => this.creating.set(false)))
        .subscribe({
          next: (created: Project) => {
            this.project.set(created);
            this.mode.set('edit');
          },
          error: (e: unknown) => console.error('Autosave create error:', e)
        });
      return;
    }

    // Si existe proyecto, hacer update parcial
    const id = this.project()?.id;
    if (!id) return;
    const updates = this.buildUpdateDto(name);

    this.projectService.updateProject(id, updates).subscribe({
      next: () => {},
      error: (e: unknown) => console.error('Autosave update error:', e)
    });
  }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }

  // Helpers
  private parseTechnologies(value: string): string[] {
    return (value || '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
  }

  private normalizeProjectFromBackend(p: any): Project {
    const technologiesRaw = (p.features ?? p.technologies) as unknown;
    const features = Array.isArray(technologiesRaw)
      ? technologiesRaw
      : typeof technologiesRaw === 'string'
        ? technologiesRaw.split(',').map((t: string) => t.trim()).filter(Boolean)
        : [];
    const galleryRaw = (p.gallery ?? p.images ?? []) as any[];
    const gallerySorted = [...galleryRaw].sort((a: any, b: any) => {
      const ao = typeof a?.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
      const bo = typeof b?.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
      if (ao !== bo) return ao - bo;
      const ac = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bc = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return ac - bc;
    });
    return {
      ...p,
      gallery: gallerySorted,
      features,
      demoUrl: p.demoUrl ?? p.url ?? undefined,
      githubUrl: p.githubUrl ?? p.github ?? undefined
    } as Project;
  }

  private mapProjectToForm(project: Project) {
    return {
      name: project.name || '',
      description: project.description || '',
      type: project.type || '',
      features: (project.features || []).join(', '),
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      gallery: project.gallery || [],
      visible: !!(project as any).visible,
      featured: !!(project as any).featured
    };
  }

  private buildCreateDto(clientId?: string, forcedName?: string) {
    return {
      name: forcedName ?? this.formData().name,
      description: this.formData().description || undefined,
      type: this.formData().type || undefined,
      status: 'DRAFT' as const,
      clientId,
      technologies: this.parseTechnologies(this.formData().features),
      demoUrl: this.formData().demoUrl || undefined,
      githubUrl: this.formData().githubUrl || undefined
    } as any;
  }

  private buildUpdateDto(forcedName?: string) {
    return {
      name: (forcedName ?? this.formData().name) || undefined,
      description: this.formData().description || undefined,
      type: this.formData().type || undefined,
      demoUrl: this.formData().demoUrl || undefined,
      githubUrl: this.formData().githubUrl || undefined,
      technologies: this.parseTechnologies(this.formData().features)
    } as any;
  }
}
