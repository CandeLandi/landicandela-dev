import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule
  ],
  templateUrl: './sidemenu.component.html'
})
export class SidemenuComponent implements OnInit, OnDestroy {
  private routerSub?: Subscription;
  private isHomeRoute = signal(true);

  isMobileMenuOpen = signal(false);
  activeSection = signal('hero');

  menuItems: MenuItem[] = [
    { id: 'hero', label: 'Inicio', icon: 'home', kind: 'section' },
    { id: 'projects', label: 'Proyectos', icon: 'briefcase', kind: 'section' },
    // { id: 'experience', label: 'Experiencia', icon: 'user', kind: 'section' },
    { id: 'education', label: 'Educación', icon: 'graduation-cap', kind: 'section' },
    { id: 'contact', label: 'Contacto', icon: 'mail', kind: 'section' },
    { id: 'study-guide', label: 'Study Guide', icon: 'book-open', kind: 'route', route: '/study-guide' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.handleRouteChange(this.router.url);
    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.handleRouteChange(event.urlAfterRedirects));
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.isHomeRoute()) {
      this.updateActiveSection();
    }
  }

  updateActiveSection(): void {
    if (!this.isHomeRoute()) return;

    const sections = this.menuItems
      .filter(item => item.kind === 'section')
      .map(item => item.id);
    const scrollPosition = window.scrollY + 100;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection.set(sectionId);
          break;
        }
      }
    }
  }

  handleItemClick(item: MenuItem): void {
    if (item.kind === 'route' && item.route) {
      if (this.router.url !== item.route) {
        this.router.navigateByUrl(item.route);
      }
      this.closeMobileMenu();
      return;
    }

    this.scrollToSection(item.id);
  }

  private scrollToSection(sectionId: string): void {
    if (!this.isHomeRoute()) {
      this.router.navigateByUrl('/');
      requestAnimationFrame(() => this.scrollToSection(sectionId));
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeSection.set(sectionId);
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu(): void {
    const nextValue = !this.isMobileMenuOpen();
    this.isMobileMenuOpen.set(nextValue);
    this.setBodyScrollLocked(nextValue);
  }

  ngOnDestroy(): void {
    this.setBodyScrollLocked(false);
    this.routerSub?.unsubscribe();
  }

  isItemActive(item: MenuItem): boolean {
    return this.activeSection() === item.id;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    this.setBodyScrollLocked(false);
  }

  private setBodyScrollLocked(locked: boolean): void {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = locked ? 'hidden' : '';
    document.body.style.touchAction = locked ? 'none' : '';
  }

  private handleRouteChange(url: string): void {
    const cleanUrl = url.split('?')[0];
    if (cleanUrl === '/' || cleanUrl === '') {
      this.isHomeRoute.set(true);
      this.activeSection.set('hero');
      requestAnimationFrame(() => this.updateActiveSection());
    } else if (cleanUrl.startsWith('/study-guide')) {
      this.isHomeRoute.set(false);
      this.activeSection.set('study-guide');
    } else {
      this.isHomeRoute.set(false);
      this.activeSection.set('');
    }
  }
}

type MenuItem =
  | { id: string; label: string; icon: string; kind: 'section' }
  | { id: string; label: string; icon: string; kind: 'route'; route: string };
