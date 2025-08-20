### Galería y subida de imágenes: flujo, endpoints y WebP

### Modelos e interfaces

```typescript
// src/app/pages/admin/interfaces/project.interface.ts (extracto)
export interface Gallery {
  id: string;
  url: string;
  title?: string;
  description?: string;
}

export interface Project {
  id: string;
  imageBefore?: string;
  imageAfter?: string;
  gallery?: Gallery[];
}
```

```typescript
// src/app/pages/admin/interfaces/gallery.interface.ts
export interface Gallery {
  id: string;
  url: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGalleryDto {
  url: string;
  order?: number;
}

export interface UpdateGalleryDto {
  url?: string;
  order?: number;
}
```

### Servicios

- UploadService (`src/app/core/services/file-upload.service.ts`)
  - uploadImage(file, folder?) → POST `${API_URL}/upload/image` (FormData: file, folder?)
  - uploadToProjectGallery(projectId, file, title?, description?) → POST `${API_URL}/projects/{projectId}/gallery/upload`

- ProjectsService (`src/app/core/services/projects.service.ts`)
  - getProjectById(id) → GET `${API_URL}/projects/{id}`
  - updateProject(id, dto) → PATCH `${API_URL}/projects/{id}`
  - deleteGalleryImage(projectId, imageId) → DELETE `${API_URL}/projects/{projectId}/gallery/{imageId}`

- GalleryService opcional (`src/app/core/services/gallery.service.ts`)
  - GET `/projects/{projectId}/gallery`
  - POST `/projects/{projectId}/gallery`
  - PATCH `/projects/{projectId}/gallery/{imageId}`
  - DELETE `/projects/{projectId}/gallery/{imageId}`
  - POST `/projects/{projectId}/gallery/reorder` `{ galleryIds: string[] }`

### Flujo funcional

- Subir a galería:
  - En `ProjectImagesComponent`, por cada archivo seleccionado se llama a `uploadToProjectGallery`.
  - Al finalizar, se refresca el proyecto con `getProjectById` y se actualiza `project.gallery`.

- Eliminar de galería:
  - Se llama a `deleteGalleryImage(projectId, imageId)` y se remueve del estado local.

- Before/After del proyecto:
  - `uploadImage(file, folder)` a `/upload/image` devuelve URLs por tamaño (ej. `large`).
  - Luego `updateProject(projectId, { imageBefore | imageAfter })` guarda la URL en el proyecto.

### Endpoints

- GET `${API_URL}/projects/{projectId}`
- PATCH `${API_URL}/projects/{projectId}`
- POST `${API_URL}/projects/{projectId}/gallery/upload` (FormData: file, title?, description?)
- DELETE `${API_URL}/projects/{projectId}/gallery/{imageId}`
- (Opcional) GET `${API_URL}/projects/{projectId}/gallery`
- (Opcional) POST `${API_URL}/projects/{projectId}/gallery`
- (Opcional) PATCH `${API_URL}/projects/{projectId}/gallery/{imageId}`
- (Opcional) POST `${API_URL}/projects/{projectId}/gallery/reorder`
- POST `${API_URL}/upload/image`

### Conversión a WebP (utilidad)

- Script: `scripts/optimize-images.js`
- Convierte imágenes de `src/assets/images` a WebP/JPG optimizados en `src/assets/images-optimized`.
- Genera tamaños: small (400x300), medium (800x600), large (1200x900) y versión max con calidad 80.
- Ejecutar: `node scripts/optimize-images.js`
- Nota: utilidad para assets locales; independiente de la subida vía API.
