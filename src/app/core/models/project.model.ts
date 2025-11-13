import { ProjectType, ProjectStatus } from './project.types';

export interface GalleryImage {
  id: string;
  url: string;
  title?: string | null;
  description?: string | null;
  order?: number;
  projectId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  longDescription?: string | null;
  type?: ProjectType;
  status: ProjectStatus;
  demoUrl?: string | null;
  githubUrl?: string | null;
  technologies?: string[];
  // Campo auxiliar de UI para filtros/etiquetas; mapeado desde technologies
  features?: string[];
  gallery?: GalleryImage[];
  clientId: string;
  createdAt: string;
  updatedAt: string;
  // Campos opcionales usados en UI o que puede devolver el backend
  featured?: boolean;
  visible?: boolean;
  views?: number;
  order?: number;
  client?: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}
