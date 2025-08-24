import { Gallery } from "./gallery.interface";
import { ProjectType, ProjectStatus } from "./project.types";

export interface Project {
  id: string;
  name: string;
  description?: string;
  longDescription?: string;
  type?: ProjectType;
  status: ProjectStatus;
  url?: string;
  demoUrl?: string;
  githubUrl?: string;
  gallery: Gallery[];
  technologies?: string[];
  clientId: string;
  createdAt: string;
  updatedAt: string;
}
