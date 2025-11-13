import { Gallery } from "./gallery.interface";
import { ProjectType, ProjectStatus } from "./project.types";

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  longDescription?: string | null;
  type?: ProjectType;
  status: ProjectStatus;
  url?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  gallery?: Gallery[];
  technologies?: string[];
  features?: string[];
  clientId: string;
  createdAt: string;
  updatedAt: string;
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
