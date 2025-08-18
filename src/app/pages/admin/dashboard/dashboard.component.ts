import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AdminSidemenuComponent } from '../../../shared/components/admin-sidemenu/admin-sidemenu.component';
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
    AdminSidemenuComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  // Signals para reactive data
  searchTerm = signal('');
  filterStatus = signal('all');
  sortBy = signal('newest'); // kept for internal ordering but hidden in UI
  filteredProjects = signal<Project[]>([]);

  constructor(
    private router: Router,
    public projectService: ProjectService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.loadProjects().subscribe({
      next: () => {
        this.updateFilteredProjects();
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  updateFilteredProjects() {
    let filtered = [...this.projectService.projects()];
    const searchTerm = this.searchTerm();
    const filterStatus = this.filterStatus();
    const sortBy = this.sortBy();

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        (project.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.technologies || []).some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      const statusMap: { [key: string]: string } = {
        'published': 'PUBLISHED',
        'draft': 'DRAFT'
      };
      filtered = filtered.filter(project => project.status === statusMap[filterStatus]);
    }

    // Sort projects
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

    this.filteredProjects.set(filtered);
  }

  onSearchChange(event: any) {
    this.searchTerm.set(event.target.value);
    this.updateFilteredProjects();
  }

  onFilterChange(event: any) {
    this.filterStatus.set(event.target.value);
    this.updateFilteredProjects();
  }

  onSortChange(event: any) {
    this.sortBy.set(event.target.value);
    this.updateFilteredProjects();
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
    this.projectService.toggleFeatured(projectId);
    this.updateFilteredProjects();
  }

  toggleStatus(projectId: string) {
    this.projectService.toggleStatus(projectId);
    this.updateFilteredProjects();
  }

  deleteProject(projectId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => {
          console.log('Project deleted successfully');
          this.updateFilteredProjects();
        },
        error: (error) => {
          console.error('Error deleting project:', error);
        }
      });
    }
  }
}
