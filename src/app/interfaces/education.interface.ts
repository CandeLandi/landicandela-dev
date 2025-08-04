export interface EducationProject {
  name: string;
  technologies: string[];
  demo?: string;
  github?: string;
  icon: string;
}

export interface Education {
  id: string;
  title: string;
  institution: string;
  date: string;
  duration: string;
  certificate?: string;
  type: 'certification' | 'degree';
  projects?: EducationProject[];
}
