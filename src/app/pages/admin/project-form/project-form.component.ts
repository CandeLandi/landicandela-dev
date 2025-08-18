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
    category: '',
    technologies: '',
    demo: '',
    github: '',
    images: [] as string[],
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
    // TODO: Implement load project from service
    this.loading.set(false);
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
        description: this.formData().description,
        status: 'DRAFT' as const,
        featured: this.formData().featured,
        visible: this.formData().visible,
        technologies: this.formData().technologies.split(',').map(t => t.trim()).filter(Boolean),
        images: this.formData().images,
        url: this.formData().demo,
        github: this.formData().github
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
    }
  }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}
