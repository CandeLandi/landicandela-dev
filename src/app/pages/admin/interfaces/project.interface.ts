import { Project as ModelsProject } from '../../../models/project.interface';

export type Project = ModelsProject;

export interface CreateProjectDto {
  name: string;
  clientId: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'PENDING';
  description?: string;
  longDescription?: string;
  type?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string; // CSV
}

export interface UpdateProjectDto {
  name?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'PENDING';
  description?: string;
  longDescription?: string;
  type?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string; // CSV
  featured?: boolean;
  visible?: boolean;
}

export interface ProjectVideo {
  id: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  order: number;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationDto {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

