export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}
