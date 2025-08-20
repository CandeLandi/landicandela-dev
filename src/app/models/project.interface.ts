export interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
  order?: number;
  projectId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'PENDING';
  featured: boolean;
  visible: boolean;
  features?: string[];
  gallery?: GalleryImage[];
  views: number;
  createdAt: string;
  updatedAt: string;
  demoUrl?: string;
  githubUrl?: string;
  clientId: string;
  challenge?: string;
  solution?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
}
