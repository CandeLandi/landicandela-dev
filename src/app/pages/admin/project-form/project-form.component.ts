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
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { Project } from '../../../models/project.interface';

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
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  mode = signal<'create' | 'edit'>('create');
  project = signal<Project | null>(null);
  loading = signal(false);
  activeTab = signal(0);

  // Form data shared between components
  formData = signal({
    title: '',
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
        const technologiesRaw = (p.features ?? p.technologies) as unknown;
        const features = Array.isArray(technologiesRaw)
          ? technologiesRaw
          : typeof technologiesRaw === 'string'
            ? technologiesRaw.split(',').map((t: string) => t.trim()).filter(Boolean)
            : [];
        const project: Project = {
          ...p,
          gallery: p.gallery ?? p.images ?? [],
          features,
          demoUrl: p.demoUrl ?? p.url ?? undefined,
          githubUrl: p.githubUrl ?? p.github ?? undefined
        };
        this.project.set(project);
        this.formData.set({
          title: project.name || '',
          description: project.description || '',
          type: project.type || '',
          features: (project.features || []).join(', '),
          demoUrl: project.demoUrl || '',
          githubUrl: project.githubUrl || '',
          gallery: project.gallery || [],
          visible: project.visible,
          featured: project.featured
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onTabChange(index: number) {
    this.activeTab.set(index);
  }

  onFormDataChange(data: any) {
    this.formData.update(current => ({ ...current, ...data }));
  }

  createProject() {
    if (this.mode() === 'create') {
      this.loading.set(true);
      const projectData = {
        name: this.formData().title,
        description: this.formData().description || undefined,
        type: this.formData().type || undefined,
        status: 'DRAFT' as const,
        featured: this.formData().featured,
        visible: this.formData().visible,
        features: (this.formData().features || '')
          .split(',')
          .map(t => t.trim())
          .filter(Boolean),
        demoUrl: this.formData().demoUrl || undefined,
        githubUrl: this.formData().githubUrl || undefined
      };

      this.projectService.createProject(projectData).subscribe({
        next: (newProject) => {
          console.log('Project created successfully:', newProject);
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Error creating project:', error);
        },
        complete: () => {
          this.loading.set(false);
        }
      });
    } else {
      // Edit mode: Save Changes
      const id = this.project()?.id;
      if (!id) return;
      this.loading.set(true);
      const updates: any = {
        name: this.formData().title || undefined,
        description: this.formData().description || undefined,
        type: this.formData().type || undefined,
        featured: this.formData().featured,
        visible: this.formData().visible,
        demoUrl: this.formData().demoUrl || undefined,
        githubUrl: this.formData().githubUrl || undefined,
        technologies: (this.formData().features || '')
          .split(',')
          .map(t => t.trim())
          .filter(Boolean)
          .join(', ')
      };

      this.projectService.updateProject(id, updates).subscribe({
        next: () => {
          // TODO: reemplazar con toast bonito (Angular Material Snackbar / custom)
          console.log('Changes saved');
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Error saving changes:', error);
        },
        complete: () => this.loading.set(false)
      });
    }
  }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}
