import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './sidemenu.component.html'
})
export class SidemenuComponent {
  isMobileMenuOpen = false;
  activeSection = 'hero';

  menuItems = [
    { id: 'hero', label: 'Inicio', icon: 'home' },
    { id: 'projects', label: 'Proyectos', icon: 'briefcase' },
    { id: 'experience', label: 'Experiencia', icon: 'user' },
    { id: 'education', label: 'Educación', icon: 'graduation-cap' },
    { id: 'contact', label: 'Contacto', icon: 'mail' }
  ];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.updateActiveSection();
  }

  updateActiveSection(): void {
    const sections = this.menuItems.map(item => item.id);
    const scrollPosition = window.scrollY + 100;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeSection = sectionId;
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
