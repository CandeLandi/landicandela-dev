# Guía de API de Rakium para Frontend

## 📋 Índice

1. [Autenticación y ClientId](#autenticación-y-clientid)
2. [Gestión de Proyectos](#gestión-de-proyectos)
3. [Sistema de Galería](#sistema-de-galería)
4. [Servicio de Upload](#servicio-de-upload)
5. [Gestión de Videos](#gestión-de-videos)
6. [Ejemplos de Implementación](#ejemplos-de-implementación)

---

## 🔐 Autenticación y ClientId

### Configuración de Autenticación

**Base URL:** `https://rakium-be-production.up.railway.app`

### Login y Token JWT

```typescript
// Endpoint de login
POST /auth/login

// Ejemplo de petición
{
  "email": "landicandela01@gmail.com",
  "password": "tu_password"
}

// Respuesta exitosa
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "75c3b32b-c221-45d4-977b-8af91dd3836b",
    "email": "landicandela01@gmail.com",
    "role": "CLIENT",
    "clientId": "88b59ed0-4d52-45db-bd21-ef72a8338fbc"
  }
}
```

### ⚠️ Manejo del ClientId

**IMPORTANTE:** Tu `clientId` es: `88b59ed0-4d52-45db-bd21-ef72a8338fbc`

**Opciones de implementación:**

#### Opción 1: Obtener del Token (Recomendado)
```typescript
export class AuthService {
  getClientId(): string {
    const user = this.getCurrentUser();
    return user?.clientId;
  }

  getCurrentUser(): any {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        clientId: payload.clientId
      };
    } catch {
      return null;
    }
  }
}
```

#### Opción 2: Constante Fija (Más Rápido)
```typescript
// constants/auth.constants.ts
export const CLIENT_ID = '88b59ed0-4d52-45db-bd21-ef72a8338fbc';
```

### Headers Requeridos para Endpoints Protegidos

```typescript
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

---

## 🏗️ Gestión de Proyectos

### Estructura del Proyecto

```typescript
interface Project {
  id: string;
  name: string;
  type?: 'LANDING' | 'ECOMMERCE' | 'INMOBILIARIA' | 'CUSTOM';
  status: 'DRAFT' | 'PUBLISHED' | 'PENDING';
  category?: 'ESTACIONES' | 'TIENDAS' | 'COMERCIALES';
  description?: string;
  longDescription?: string;
  imageBefore?: string;
  imageAfter?: string;
  latitude?: number;
  longitude?: number;
  address?: {
    address: string;
    lat: number;
    lng: number;
  };
  country?: string;
  state?: string;
  city?: string;
  area?: string;
  duration?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  url?: string;
  clientId: string;
  challenge?: string;
  solution?: string;
  createdAt: string;
  updatedAt: string;
}
```

### 1. Crear Proyecto

```typescript
// Endpoint
POST /projects

// Headers requeridos
Authorization: Bearer {token}

// Datos mínimos requeridos
{
  "name": "Nombre del Proyecto",
  "clientId": "88b59ed0-4d52-45db-bd21-ef72a8338fbc"
}

// Ejemplo completo
{
  "name": "Remodelación Estación Norte",
  "category": "ESTACIONES",
  "type": "LANDING",
  "status": "DRAFT",
  "description": "Remodelación completa de la estación",
  "longDescription": "Descripción detallada del proyecto...",
  "address": {
    "address": "Lobería, Buenos Aires Province, Argentina",
    "lat": -38.1634422,
    "lng": -58.7816955
  },
  "country": "Argentina",
  "state": "Buenos Aires",
  "city": "Lobería",
  "area": "500m²",
  "duration": "3 meses",
  "startDate": "2024-01-01T00:00:00.000Z",
  "endDate": "2024-03-31T23:59:59.999Z",
  "challenge": "Mantener operaciones durante la remodelación",
  "solution": "Trabajo por fases y horarios especiales",
  "clientId": "88b59ed0-4d52-45db-bd21-ef72a8338fbc"
}
```

### 2. Obtener Proyectos

```typescript
// Todos los proyectos (con paginación)
GET /projects?page=1&limit=10

// Proyecto específico
GET /projects/{projectId}

// Proyecto público (sin autenticación)
GET /projects/{projectId}/public
```

### 3. Actualizar Proyecto

```typescript
// Endpoint
PATCH /projects/{projectId}

// Headers requeridos
Authorization: Bearer {token}

// Solo envía los campos que quieres actualizar
{
  "name": "Nuevo nombre",
  "status": "PUBLISHED",
  "description": "Nueva descripción"
}
```

### 4. Eliminar Proyecto

```typescript
// Endpoint
DELETE /projects/{projectId}

// Headers requeridos
Authorization: Bearer {token}
```

---

## 🖼️ Sistema de Galería

### Estructura de Imagen de Galería

```typescript
interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
  order: number;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}
```

### 1. Subir Imagen a Galería

```typescript
// Endpoint
POST /projects/{projectId}/gallery/upload

// Headers requeridos
Authorization: Bearer {token}
Content-Type: multipart/form-data

// Usando FormData
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('title', 'Título de la imagen');
formData.append('description', 'Descripción de la imagen');

// Ejemplo con HttpClient
uploadToGallery(projectId: string, file: File, title?: string, description?: string): Observable<GalleryImage> {
  const formData = new FormData();
  formData.append('file', file);
  if (title) formData.append('title', title);
  if (description) formData.append('description', description);

  return this.http.post<GalleryImage>(
    `${this.baseUrl}/projects/${projectId}/gallery/upload`,
    formData,
    { headers: this.getAuthHeaders() }
  );
}
```

### 2. Obtener Imágenes de Galería

```typescript
// Con autenticación
GET /projects/{projectId}/gallery?page=1&limit=10

// Público (sin autenticación)
GET /projects/{projectId}/gallery/public?page=1&limit=10

// Respuesta
{
  "data": [
    {
      "id": "uuid",
      "url": "https://bucket.s3.us-east-005.backblazeb2.com/projects/...",
      "title": "Vista frontal",
      "description": "Vista frontal del proyecto",
      "order": 0,
      "projectId": "project-uuid",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

### 3. Agregar Imagen por URL

```typescript
// Endpoint
POST /projects/{projectId}/gallery

// Headers requeridos
Authorization: Bearer {token}

// Datos
{
  "url": "https://ejemplo.com/imagen.jpg",
  "title": "Título opcional",
  "description": "Descripción opcional"
}
```

### 4. Actualizar Imagen

```typescript
// Endpoint
PATCH /projects/{projectId}/gallery/{imageId}

// Datos
{
  "title": "Nuevo título",
  "description": "Nueva descripción"
}
```

### 5. Eliminar Imagen

```typescript
// Endpoint
DELETE /projects/{projectId}/gallery/{imageId}
```

### 6. Reordenar Imágenes

```typescript
// Endpoint
POST /projects/{projectId}/gallery/reorder

// Datos
{
  "imageIds": ["id1", "id2", "id3"]
}
```

**⚠️ Límites:** Máximo 10 imágenes por proyecto

---

## 📤 Servicio de Upload

### 1. Upload General de Archivos

```typescript
// Endpoint
POST /upload/file

// Headers requeridos
Authorization: Bearer {token}
Content-Type: multipart/form-data

// Usando FormData
const formData = new FormData();
formData.append('file', file);
formData.append('folder', 'projects/gallery'); // Opcional
formData.append('optimize', 'true'); // Opcional, default: true

// Respuesta
"https://bucket.s3.us-east-005.backblazeb2.com/folder/timestamp-random.jpg"
```

### 2. Upload con Variantes de Imagen

```typescript
// Endpoint
POST /upload/image/variants

// Crea múltiples tamaños automáticamente
// Respuesta
{
  "original": "url_original",
  "thumbnail": "url_thumbnail", // 150x150
  "medium": "url_medium",       // 800x600
  "large": "url_large"          // 1920x1080
}
```

### 3. Upload Directo a Galería de Proyecto

```typescript
// Endpoint
POST /upload/project/{projectId}/gallery

// Sube y añade automáticamente a la galería
// Respuesta
{
  "url": "https://...",
  "title": "título",
  "description": "descripción",
  "filename": "archivo.jpg",
  "size": 1024000,
  "mimetype": "image/jpeg",
  "projectId": "project-uuid"
}
```

### Configuración del Servicio

```typescript
@Injectable({ providedIn: 'root' })
export class UploadService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadFile(file: File, folder: string = 'images', optimize: boolean = true): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('optimize', optimize.toString());

    return this.http.post<string>(
      `${this.baseUrl}/upload/file`,
      formData,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  uploadToProjectGallery(
    projectId: string, 
    file: File, 
    title?: string, 
    description?: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);

    return this.http.post(
      `${this.baseUrl}/upload/project/${projectId}/gallery`,
      formData,
      { headers: this.authService.getAuthHeaders() }
    );
  }
}
```

**⚠️ Límites y Validaciones:**
- Tipos permitidos: JPEG, PNG, GIF, WebP
- Tamaño máximo: 10MB
- Optimización automática habilitada por defecto

---

## 🎥 Gestión de Videos

### Estructura de Video

```typescript
interface ProjectVideo {
  id: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  order: number;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}
```

### 1. Añadir Video

```typescript
// Endpoint
POST /projects/{projectId}/videos

// Headers requeridos
Authorization: Bearer {token}

// Datos
{
  "title": "Video promocional",
  "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "description": "Descripción del video (opcional)",
  "order": 1 // Opcional, se asigna automáticamente
}
```

### 2. Obtener Videos

```typescript
// Con autenticación
GET /projects/{projectId}/videos?page=1&limit=10

// Público (sin autenticación)
GET /projects/{projectId}/videos/public?page=1&limit=10
```

### 3. Actualizar Video

```typescript
// Endpoint
PATCH /projects/{projectId}/videos/{videoId}

// Datos
{
  "title": "Nuevo título",
  "youtubeUrl": "https://youtube.com/watch?v=nuevovideo",
  "description": "Nueva descripción"
}
```

### 4. Eliminar Video

```typescript
// Endpoint
DELETE /projects/{projectId}/videos/{videoId}
```

### 5. Reordenar Videos

```typescript
// Endpoint
POST /projects/{projectId}/videos/reorder

// Datos
{
  "ids": ["video1", "video2", "video3"]
}
```

**⚠️ Límites:** Máximo 10 videos por proyecto

---

## 🔧 Ejemplos de Implementación

### 1. Servicio Completo para Proyectos

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface CreateProjectRequest {
  name: string;
  clientId: string;
  category?: 'ESTACIONES' | 'TIENDAS' | 'COMERCIALES';
  type?: 'LANDING' | 'ECOMMERCE' | 'INMOBILIARIA' | 'CUSTOM';
  status?: 'DRAFT' | 'PUBLISHED' | 'PENDING';
  description?: string;
  longDescription?: string;
  address?: {
    address: string;
    lat: number;
    lng: number;
  };
  country?: string;
  state?: string;
  city?: string;
  area?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  challenge?: string;
  solution?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly baseUrl = environment.apiUrl;
  private readonly clientId = '88b59ed0-4d52-45db-bd21-ef72a8338fbc';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createProject(projectData: Omit<CreateProjectRequest, 'clientId'>): Observable<Project> {
    const payload = {
      ...projectData,
      clientId: this.clientId
    };

    return this.http.post<Project>(
      `${this.baseUrl}/projects`,
      payload,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  getProjects(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Project>> {
    return this.http.get<PaginatedResponse<Project>>(
      `${this.baseUrl}/projects?page=${page}&limit=${limit}`,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(
      `${this.baseUrl}/projects/${id}`,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  updateProject(id: string, updates: Partial<Project>): Observable<Project> {
    return this.http.patch<Project>(
      `${this.baseUrl}/projects/${id}`,
      updates,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/projects/${id}`,
      { headers: this.authService.getAuthHeaders() }
    );
  }
}
```

### 2. Componente de Creación de Proyecto

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-create-project',
  template: `
    <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
      <!-- Campos requeridos -->
      <mat-form-field>
        <mat-label>Nombre del Proyecto</mat-label>
        <input matInput formControlName="name" required>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Categoría</mat-label>
        <mat-select formControlName="category">
          <mat-option value="ESTACIONES">Estaciones</mat-option>
          <mat-option value="TIENDAS">Tiendas</mat-option>
          <mat-option value="COMERCIALES">Comerciales</mat-option>
        </mat-select>
      </mat-form-field>

      <!-- Campos opcionales -->
      <mat-form-field>
        <mat-label>Descripción</mat-label>
        <textarea matInput formControlName="description"></textarea>
      </mat-form-field>

      <!-- Ubicación -->
      <div formGroupName="address">
        <mat-form-field>
          <mat-label>Dirección</mat-label>
          <input matInput formControlName="address">
        </mat-form-field>
        
        <mat-form-field>
          <mat-label>Latitud</mat-label>
          <input matInput type="number" formControlName="lat">
        </mat-form-field>
        
        <mat-form-field>
          <mat-label>Longitud</mat-label>
          <input matInput type="number" formControlName="lng">
        </mat-form-field>
      </div>

      <button mat-raised-button color="primary" type="submit" [disabled]="!projectForm.valid">
        Crear Proyecto
      </button>
    </form>
  `
})
export class CreateProjectComponent {
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      category: [''],
      type: ['LANDING'],
      status: ['DRAFT'],
      description: [''],
      longDescription: [''],
      address: this.fb.group({
        address: [''],
        lat: [null],
        lng: [null]
      }),
      country: [''],
      state: [''],
      city: [''],
      area: [''],
      duration: [''],
      startDate: [''],
      endDate: [''],
      challenge: [''],
      solution: ['']
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;
      
      // Limpiar campos vacíos
      const cleanedData = Object.fromEntries(
        Object.entries(formValue).filter(([_, value]) => 
          value !== '' && value !== null && value !== undefined
        )
      );

      this.projectsService.createProject(cleanedData).subscribe({
        next: (project) => {
          console.log('Proyecto creado:', project);
          // Manejar éxito
        },
        error: (error) => {
          console.error('Error al crear proyecto:', error);
          // Manejar error
        }
      });
    }
  }
}
```

### 3. Manejo de Errores y Estados

```typescript
export class ProjectDashboardComponent {
  projects: Project[] = [];
  loading = false;
  error: string | null = null;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.error = null;

    this.projectsService.getProjects().subscribe({
      next: (response) => {
        this.projects = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = this.getErrorMessage(error);
        this.loading = false;
        console.error('Error al cargar proyectos:', error);
      }
    });
  }

  private getErrorMessage(error: any): string {
    if (error.status === 401) {
      return 'Sesión expirada. Por favor, inicia sesión nuevamente.';
    } else if (error.status === 403) {
      return 'No tienes permisos para acceder a esta información.';
    } else if (error.status === 500) {
      return 'Error del servidor. Por favor, intenta nuevamente.';
    } else {
      return error.error?.message || 'Ocurrió un error inesperado.';
    }
  }
}
```

---

## ⚡ Consejos de Implementación

### 1. Interceptor HTTP para Autenticación

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token && this.authService.isTokenValid()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          // Redirigir al login
        }
        return throwError(() => error);
      })
    );
  }
}
```

### 2. Guard para Rutas Protegidas

```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
```

### 3. Manejo de Estados de Carga

```typescript
export interface LoadingState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export class BaseComponent {
  state: LoadingState = {
    loading: false,
    error: null,
    success: false
  };

  protected executeWithLoading<T>(
    operation: Observable<T>,
    successCallback?: (result: T) => void,
    errorCallback?: (error: any) => void
  ) {
    this.state = { loading: true, error: null, success: false };

    operation.subscribe({
      next: (result) => {
        this.state = { loading: false, error: null, success: true };
        successCallback?.(result);
      },
      error: (error) => {
        this.state = { loading: false, error: error.message, success: false };
        errorCallback?.(error);
      }
    });
  }
}
```

---

## 🚀 Checklist de Implementación

### Configuración Inicial
- [ ] Configurar baseURL del API
- [ ] Implementar AuthService con manejo de tokens
- [ ] Configurar ClientId (constante o desde token)
- [ ] Crear interceptor HTTP para autenticación automática

### Gestión de Proyectos
- [ ] Servicio para CRUD de proyectos
- [ ] Formulario de creación con validaciones
- [ ] Lista de proyectos con paginación
- [ ] Formulario de edición
- [ ] Confirmación de eliminación

### Galería y Upload
- [ ] Componente de upload con drag & drop
- [ ] Previsualización de imágenes
- [ ] Galería con reordenamiento
- [ ] Límite de 10 imágenes por proyecto
- [ ] Optimización automática de imágenes

### Videos
- [ ] Formulario de añadir video YouTube
- [ ] Lista de videos con previsualizaciones
- [ ] Reordenamiento de videos
- [ ] Límite de 10 videos por proyecto

### Manejo de Errores
- [ ] Interceptor para errores HTTP
- [ ] Mensajes de error amigables
- [ ] Manejo de sesión expirada
- [ ] Estados de carga en toda la aplicación

Con esta guía tienes toda la información necesaria para implementar la gestión completa de proyectos en tu frontend de Rakium. ¡Éxito con tu implementación! 🚀