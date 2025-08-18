export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'DRAFT' | 'PUBLISHED' | 'PENDING';
  featured: boolean;
  visible: boolean;
  technologies: string[];
  images: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
  url?: string;
  github?: string;
  clientId: string;
  challenge?: string;
  solution?: string;
  type?: string;
  category?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  area?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
}
