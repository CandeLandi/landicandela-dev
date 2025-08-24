import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Gallery, CreateGalleryDto, UpdateGalleryDto } from '../interfaces/gallery.interface';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getGallery(projectId: string): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.baseUrl}/projects/${projectId}/gallery`);
  }

  addImage(projectId: string, dto: CreateGalleryDto): Observable<Gallery> {
    return this.http.post<Gallery>(`${this.baseUrl}/projects/${projectId}/gallery`, dto);
  }

  removeImage(projectId: string, imageId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/projects/${projectId}/gallery/${imageId}`);
  }

  updateImage(projectId: string, imageId: string, dto: UpdateGalleryDto): Observable<Gallery> {
    return this.http.patch<Gallery>(`${this.baseUrl}/projects/${projectId}/gallery/${imageId}`, dto);
  }

  reorderGallery(projectId: string, galleryIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/projects/${projectId}/gallery/reorder`, { imageIds: galleryIds });
  }
}

