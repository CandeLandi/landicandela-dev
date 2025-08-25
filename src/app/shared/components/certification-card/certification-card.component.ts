import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Education, EducationProject } from '../../../interfaces/education.interface';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-certification-card',
  standalone: true,
  imports: [CommonModule, RevealDirective, LucideAngularModule],
  templateUrl: './certification-card.component.html'
})
export class CertificationCardComponent {
  @Input() cert!: Education;

  expanded = false;
  expandedProjects = false;

  toggleExpanded(): void { this.expanded = !this.expanded; }
  toggleProjectsExpanded(): void { this.expandedProjects = !this.expandedProjects; }

  getVisibleSkills(): string[] {
    const skills = this.cert.skills || [];
    return this.expanded ? skills : skills.slice(0, 4);
  }

  getVisibleProjects(): EducationProject[] {
    const projects = this.cert.projects || [];
    return this.expandedProjects ? projects : projects.slice(0, 2);
  }

  parseSkillTitle(skill: string): string {
    const match = /^(.*?)\s*\((.*)\)\s*$/.exec(skill);
    return match ? match[1].trim() : skill;
  }

  parseSkillSubtitle(skill: string): string {
    const match = /^(.*?)\s*\((.*)\)\s*$/.exec(skill);
    return match ? match[2].trim() : '';
  }

  get isBrand(): boolean {
    const name = this.cert?.institution;
    return name === 'Udemy' || name === 'CoderHouse';
  }
}

