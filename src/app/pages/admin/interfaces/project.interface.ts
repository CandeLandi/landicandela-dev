import { Project as ModelsProject } from '../../../models/project.interface';
import { ProjectStatus, ProjectType } from '../../../interfaces/project.types';

export type Project = ModelsProject;

export interface CreateProjectDto {
  name: string;
  clientId: string;
  status?: ProjectStatus;
  description?: string;
  longDescription?: string;
  type?: ProjectType;
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string[]; // array
}

export interface UpdateProjectDto {
  name?: string;
  status?: ProjectStatus;
  description?: string;
  longDescription?: string;
  type?: ProjectType;
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string[]; // array
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

