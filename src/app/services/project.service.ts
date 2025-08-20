import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Project } from '../models/project.interface';
import { PaginatedResponse, PaginationDto } from '../pages/admin/interfaces/project.interface';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProjectsByClientId(clientId: string, pagination: PaginationDto): Observable<PaginatedResponse<Project>> {
    let params = new HttpParams();
    if (pagination.page) params = params.set('page', String(pagination.page));
    if (pagination.limit) params = params.set('limit', String(pagination.limit));
    if (pagination.search) params = params.set('search', pagination.search);
    if (pagination.category && pagination.category !== 'todos') params = params.set('category', pagination.category);
    return this.http.get<PaginatedResponse<Project>>(`${this.baseUrl}/projects/client/${clientId}`, { params });
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projects/${id}`);
  }

  createProject(project: any): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/projects`, project);
  }

  updateProject(id: string, project: any): Observable<Project> {
    return this.http.patch<Project>(`${this.baseUrl}/projects/${id}`, project);
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/projects/${id}`);
  }
}
