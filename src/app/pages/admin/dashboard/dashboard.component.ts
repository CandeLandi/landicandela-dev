import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AdminSidemenuComponent } from '../../../shared/components/admin-sidemenu/admin-sidemenu.component';
import { StatsCardsComponent } from '../../../shared/components/stats-cards/stats-cards.component';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { Project } from '../../../models/project.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AdminSidemenuComponent,
    StatsCardsComponent,
    ProjectCardComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  // Signals para reactive data
  searchTerm = signal('');
  filterStatus = signal('all');
  sortBy = signal('newest'); // kept for internal ordering but hidden in UI
  projects = signal<Project[]>([]);

  stats = computed(() => {
    const list = this.projects();
    return {
      totalProjects: list.length,
      publishedProjects: list.filter(p => p.status === 'PUBLISHED').length,
      draftProjects: list.filter(p => p.status === 'DRAFT').length,
      totalViews: list.reduce((sum, p) => sum + (p.views || 0), 0)
    };
  });

  filteredProjects = computed(() => {
    let filtered = [...this.projects()];
    const searchTerm = this.searchTerm();
    const filterStatus = this.filterStatus();
    const sortBy = this.sortBy();

    if (searchTerm) {
      filtered = filtered.filter(project =>
        (project.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.features || []).some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterStatus !== 'all') {
      const statusMap: { [key: string]: string } = {
        'published': 'PUBLISHED',
        'draft': 'DRAFT'
      };
      filtered = filtered.filter(project => project.status === statusMap[filterStatus]);
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'views':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'title':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
    }

    return filtered;
  });

  constructor(
    private router: Router,
    public projectService: ProjectService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    const clientId = this.authService.getClientId() || '';
    this.projectService.getProjectsByClientId(clientId, { page: 1, limit: 100 }).subscribe({
      next: (response: any) => {
        const raw: any[] = Array.isArray(response) ? response : (response?.data ?? response?.items ?? []);
        const clientId = this.authService.getClientId();
        const mapped: Project[] = (raw || [])
          .filter((p: any) => {
            if (!clientId) return true;
            const ownerId = p.clientId ?? p.client?.id;
            return ownerId === clientId;
          })
          .map((p: any) => {
            const technologiesRaw = (p.features ?? p.technologies) as unknown;
            const features = Array.isArray(technologiesRaw)
              ? technologiesRaw
              : typeof technologiesRaw === 'string'
                ? technologiesRaw.split(',').map((t: string) => t.trim()).filter(Boolean)
                : [];
            return {
              ...p,
              gallery: p.gallery ?? p.images ?? [],
              features,
              demoUrl: p.demoUrl ?? p.url ?? undefined,
              githubUrl: p.githubUrl ?? p.github ?? undefined
            } as Project;
          });
        this.projects.set(mapped);
      },
      error: (error: any) => console.error('Error loading projects:', error)
    });
  }

  onSearchChange(event: any) {
    this.searchTerm.set(event.target.value);
  }

  onFilterChange(event: any) {
    this.filterStatus.set(event.target.value);
  }

  onSortChange(event: any) {
    this.sortBy.set(event.target.value);
  }

  navigateToNewProject() {
    console.log('Navigating to new project form...');
    this.router.navigate(['/admin/dashboard/new']).then(() => {
      console.log('Navigation completed successfully');
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }

  editProject(projectId: string) {
    this.router.navigate(['/admin/dashboard/edit', projectId]);
  }

  toggleFeatured(projectId: string) {
    const project = this.projects().find(p => p.id === projectId);
    if (!project) return;
    this.projectService.updateProject(projectId, { featured: !project.featured }).subscribe({
      next: (updated) => {
        this.projects.set(this.projects().map(p => p.id === projectId ? { ...p, featured: updated.featured } : p));
      }
    });
  }

  toggleStatus(projectId: string) {
    const project = this.projects().find(p => p.id === projectId);
    if (!project) return;
    const newStatus = project.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    this.projectService.updateProject(projectId, { status: newStatus }).subscribe({
      next: (updated) => {
        this.projects.set(this.projects().map(p => p.id === projectId ? { ...p, status: updated.status } : p));
      }
    });
  }

  deleteProject(projectId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => {
          console.log('Project deleted successfully');
          this.projects.set(this.projects().filter(p => p.id !== projectId));
        },
        error: (error) => {
          console.error('Error deleting project:', error);
        }
      });
    }
  }
}
