import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  currentImageIndex: { [key: string]: number } = {};

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.portfolioService.getFeaturedProjects().subscribe(projects => {
      this.projects = projects;
      // Initialize image index for each project
      projects.forEach(project => {
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
