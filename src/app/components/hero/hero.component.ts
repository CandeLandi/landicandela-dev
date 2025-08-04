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
    'React Developer',
    'Frontend Developer',
    'UI/UX Designer'
  ];
  currentTechIndex: number = 0;

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
