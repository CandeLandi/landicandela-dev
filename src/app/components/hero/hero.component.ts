import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent implements OnInit {
  techRoles: string[] = [
    'Angular Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'Web Designer',
    'Web Developer',

  ];
  currentTechIndex: number = 0;
  skills: string[] = [
    'Angular', 'TypeScript', 'JavaScript',
    'Node.js', 'NestJS', 'Express.js',
    'Firebase', 'MongoDB', 'Tailwind Css', 'Angular Material', 'Prime NG'
  ];

  softSkills: string[] = [
    'Continuous learning',
    'Proactive',
    'Strong interpersonal skills',
    'Effective communication',
    'Learning agility & adaptability across teams and workflows'
  ];

  ngOnInit(): void {
    setInterval(() => {
      this.currentTechIndex = (this.currentTechIndex + 1) % this.techRoles.length;
    }, 3000);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
