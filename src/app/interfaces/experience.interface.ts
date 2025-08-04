export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  isCurrent?: boolean;
  current?: boolean;
  startDate?: string;
  endDate?: string;
}
