import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  currentImageIndex: { [key: string]: number } = {};

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    const CLIENT_ID = '88b59ed0-4d52-45db-bd21-ef72a8338fbc'; // clientId del portfolio
    this.projectService.getPublicProjects(CLIENT_ID, 1, 6).subscribe(response => {
      const raw = Array.isArray(response) ? response : (response?.data ?? []);
      const mapped: Project[] = (raw || []).map((p: any) => {
        const galleryRaw = (p.gallery ?? p.images ?? []) as any[];
        const gallerySorted = [...galleryRaw].sort((a: any, b: any) => {
          const ao = typeof a?.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
          const bo = typeof b?.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
          if (ao !== bo) return ao - bo;
          const ac = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bc = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
          return ac - bc;
        });
        return {
          ...p,
          name: p.name ?? p.title,
          features: Array.isArray(p.technologies) ? p.technologies : typeof p.technologies === 'string' ? p.technologies.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
          demoUrl: p.demoUrl ?? p.url ?? undefined,
          githubUrl: p.githubUrl ?? p.github ?? undefined,
          gallery: gallerySorted
        } as any;
      });
      this.projects = mapped as any;
      mapped.forEach(project => {
        this.currentImageIndex[project.id] = 0;
      });
    });
  }

  nextImage(projectId: string, totalImages: number): void {
    this.currentImageIndex[projectId] = (this.currentImageIndex[projectId] + 1) % totalImages;
  }

  prevImage(projectId: string, totalImages: number): void {
    this.currentImageIndex[projectId] = this.currentImageIndex[projectId] === 0
      ? totalImages - 1
      : this.currentImageIndex[projectId] - 1;
  }

  setCurrentImageIndex(projectId: string, index: number): void {
    this.currentImageIndex[projectId] = index;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
