import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Education, EducationProject } from '../../interfaces/education.interface';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html'
})
export class EducationComponent implements OnInit {
  education: Education[] = [];
  expanded: Record<string, boolean> = {};
  expandedProjects: Record<string, boolean> = {};

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.loadEducation();
  }

  loadEducation(): void {
    this.portfolioService.getEducation().subscribe(education => {
      this.education = education;
    });
  }

  toggleExpanded(id: string): void {
    this.expanded[id] = !this.expanded[id];
  }

  getVisibleSkills(cert: Education): string[] {
    const skills = cert.skills || [];
    const isExpanded = this.expanded[cert.id];
    return isExpanded ? skills : skills.slice(0, 4);
  }

  toggleProjectsExpanded(id: string): void {
    this.expandedProjects[id] = !this.expandedProjects[id];
  }

  getVisibleProjects(cert: Education): EducationProject[] {
    const projects = cert.projects || [];
    const isExpanded = this.expandedProjects[cert.id];
    return isExpanded ? projects : projects.slice(0, 2);
  }

  parseSkillTitle(skill: string): string {
    const match = /^(.*?)\s*\((.*)\)\s*$/.exec(skill);
    return match ? match[1].trim() : skill;
  }

  parseSkillSubtitle(skill: string): string {
    const match = /^(.*?)\s*\((.*)\)\s*$/.exec(skill);
    return match ? match[2].trim() : '';
  }

  getTotalProjects(): number {
    return this.education.reduce((acc, cert) => acc + (cert.projects?.length || 0), 0);
  }

  getTotalHours(): number {
    return this.education.reduce((acc, cert) => {
      const hours = parseFloat(cert.duration.replace(' hours', '').replace('h', ''));
      return acc + (isNaN(hours) ? 0 : hours);
    }, 0);
  }
}
