import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { fadeSlideIn, listStagger } from '../../shared/motion';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero.component.html'
  ,
  animations: [fadeSlideIn(), listStagger]
})
export class HeroComponent implements OnInit, OnDestroy {
  techRoles: string[] = [
    'Angular Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'Web Designer',
    'Web Developer',
  ];
  currentTechIndex: number = 0;
  private rotateIntervalId: ReturnType<typeof setInterval> | null = null;
  skills: string[] = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'RxJS',
    'Angular Material',
    'REST APIs',
    'WebSockets',
    'PrimeNG',
    'NestJS',
    'Tailwind CSS',
    'Node.js',
    'Express.js',
    'Firebase',
    'MongoDB',
  ];

  softSkills: string[] = [
    'Aprendizaje continuo',
    'Proactiva',
    'Fuertes habilidades interpersonales',
    'Comunicación efectiva',
    'Agilidad de aprendizaje y adaptabilidad entre equipos y flujos de trabajo'
  ];

  ngOnInit(): void {
    this.rotateIntervalId = setInterval(() => {
      this.currentTechIndex = (this.currentTechIndex + 1) % this.techRoles.length;
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.rotateIntervalId) {
      clearInterval(this.rotateIntervalId);
      this.rotateIntervalId = null;
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
