import { Component, HostListener, OnDestroy } from '@angular/core';
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
export class SidemenuComponent implements OnDestroy {
  isMobileMenuOpen = false;
  activeSection = 'hero';

  menuItems = [
    { id: 'hero', label: 'Home', icon: 'home' },
    { id: 'projects', label: 'Projects', icon: 'briefcase' },
    { id: 'experience', label: 'Experience', icon: 'user' },
    { id: 'education', label: 'Education', icon: 'graduation-cap' },
    { id: 'contact', label: 'Contact', icon: 'mail' }
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
      this.setBodyScrollLocked(false);
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.setBodyScrollLocked(this.isMobileMenuOpen);
  }

  ngOnDestroy(): void {
    this.setBodyScrollLocked(false);
  }

  private setBodyScrollLocked(locked: boolean): void {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = locked ? 'hidden' : '';
    document.body.style.touchAction = locked ? 'none' : '';
  }
}
