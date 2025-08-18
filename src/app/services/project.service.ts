import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Project } from '../models/project.interface';
import { AuthService } from './auth.service';

export interface ProjectStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalViews: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // Signals
  private _projects = signal<Project[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  // Computed signals
  public projects = this._projects;
  public loading = this._loading;
  public error = this._error;

  public stats = computed(() => {
    const projects = this._projects();
    return {
      totalProjects: projects.length,
      publishedProjects: projects.filter(p => p.status === 'PUBLISHED').length,
      draftProjects: projects.filter(p => p.status === 'DRAFT').length,
      totalViews: projects.reduce((sum, p) => sum + (p.views || 0), 0)
    };
  });

  public featuredProjects = computed(() =>
    this._projects().filter(p => p.featured)
  );

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  loadProjects(): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<Project[]>(`${environment.apiUrl}/projects`).pipe(
      map(projects => {
        this._projects.set(projects);
        this._loading.set(false);
      }),
      catchError(error => {
        this._loading.set(false);
        this._error.set(error.message || 'Error loading projects');
        console.error('Error loading projects:', error);
        return throwError(() => error);
      })
    );
  }

  createProject(projectData: Partial<Project>): Observable<Project> {
    const project = {
      ...projectData,
      status: 'DRAFT',
      featured: false,
      visible: true,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Project;

    return this.http.post<Project>(`${environment.apiUrl}/projects`, project).pipe(
      map(newProject => {
        this._projects.update(projects => [...projects, newProject]);
        return newProject;
      })
    );
  }

  updateProject(id: string, updates: Partial<Project>): Observable<Project> {
    return this.http.patch<Project>(`${environment.apiUrl}/projects/${id}`, updates).pipe(
      map(updatedProject => {
        this._projects.update(projects =>
          projects.map(p => p.id === id ? updatedProject : p)
        );
        return updatedProject;
      })
    );
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/projects/${id}`).pipe(
      map(() => {
        this._projects.update(projects =>
          projects.filter(p => p.id !== id)
        );
      })
    );
  }

  toggleFeatured(id: string): void {
    const project = this._projects().find(p => p.id === id);
    if (project) {
      const updatedProject = { ...project, featured: !project.featured };
      this.updateProject(id, { featured: updatedProject.featured }).subscribe();
    }
  }

  toggleStatus(id: string): void {
    const project = this._projects().find(p => p.id === id);
    if (project) {
      const newStatus = project.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
      this.updateProject(id, { status: newStatus }).subscribe();
    }
  }
}
