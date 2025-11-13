import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AdminSidemenuComponent } from '../../../shared/components/admin-sidemenu/admin-sidemenu.component';
import { StatsCardsComponent } from '../../../shared/components/stats-cards/stats-cards.component';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { ProjectService } from '../../../core/services/project.service';
import { AuthService } from '../../../core/services/auth.service';
import { Project } from '../../../core/models/project.interface';


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
  providers: [],
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
    public authService: AuthService,

  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    const clientId = this.authService.getClientId() || '';
    this.projectService.getProjectsByClientId(clientId, { page: 1, limit: 100 }).subscribe({
      next: (response: unknown) => {
        const payload = response as any;
        const raw: any[] = Array.isArray(payload) ? payload : (payload?.data ?? payload?.items ?? []);
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
          });
        this.projects.set(mapped);
      },
      error: (error: unknown) => console.error('Error loading projects:', error)
    });
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.searchTerm.set(value);
  }

  onFilterChange(event: Event) {
    const value = (event.target as HTMLSelectElement | null)?.value ?? 'all';
    this.filterStatus.set(value);
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement | null)?.value ?? 'newest';
    this.sortBy.set(value);
  }

  navigateToNewProject() {
    this.router.navigate(['/admin/dashboard/new']).catch(error => {
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
      next: (updated: Project) => {
        this.projects.set(this.projects().map(p => p.id === projectId ? { ...p, featured: updated.featured } : p));
      }
    });
  }

  toggleStatus(projectId: string) {
    const project = this.projects().find(p => p.id === projectId);
    if (!project) return;
    const newStatus = project.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    this.projectService.updateProject(projectId, { status: newStatus }).subscribe({
      next: (updated: Project) => {
        this.projects.set(this.projects().map(p => p.id === projectId ? { ...p, status: updated.status } : p));
      }
    });
  }

  deleteProject(projectId: string) {
    const confirmed = window.confirm('Delete this project? This action cannot be undone.');
    if (!confirmed) return;
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        this.projects.set(this.projects().filter(p => p.id !== projectId));
      }
    });
  }
}
