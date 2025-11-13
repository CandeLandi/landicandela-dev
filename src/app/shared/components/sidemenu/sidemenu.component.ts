import { Component, OnDestroy, OnInit, signal } from '@angular/core';
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
  private pendingSection: string | null = null;
  private sectionObserver?: IntersectionObserver;
  private intersectionState = new Map<string, number>();

  isMobileMenuOpen = signal(false);
  activeSection = signal('hero');

  menuItems: MenuItem[] = [
    { id: 'hero', label: 'Inicio', icon: 'home', kind: 'section' },
    { id: 'projects', label: 'Proyectos', icon: 'briefcase', kind: 'section' },
    // { id: 'experience', label: 'Experiencia', icon: 'user', kind: 'section' },
    { id: 'education', label: 'Educación', icon: 'graduation-cap', kind: 'section' },
    { id: 'contact', label: 'Contacto', icon: 'mail', kind: 'section' },
    { id: 'study-guide', label: 'Guía de estudio', icon: 'book-open', kind: 'route', route: '/study-guide' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.handleRouteChange(this.router.url);
    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.handleRouteChange(event.urlAfterRedirects));
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
      this.pendingSection = sectionId;
      this.router.navigateByUrl('/');
      this.closeMobileMenu();
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
    this.teardownObserver();
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
      requestAnimationFrame(() => {
        this.setupObserver();
        this.flushPendingScroll();
      });
    } else if (cleanUrl.startsWith('/study-guide')) {
      this.isHomeRoute.set(false);
      this.activeSection.set('study-guide');
      this.teardownObserver();
    } else {
      this.isHomeRoute.set(false);
      this.activeSection.set('');
      this.teardownObserver();
    }
  }

  private flushPendingScroll(): void {
    if (!this.pendingSection) return;
    const target = this.pendingSection;
    this.pendingSection = null;
    requestAnimationFrame(() => this.scrollToSection(target));
  }

  private setupObserver(): void {
    this.teardownObserver();
    if (!this.isHomeRoute()) return;

    const sections = this.menuItems
      .filter(item => item.kind === 'section')
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    this.intersectionState.clear();
    sections.forEach(section => this.intersectionState.set(section.id, 0));

    this.sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = (entry.target as HTMLElement).id;
        this.intersectionState.set(id, entry.intersectionRatio);
      });

      const [bestId, bestRatio] = Array.from(this.intersectionState.entries()).reduce<[string, number]>(
        (best, current) => (current[1] > best[1] ? current : best),
        [this.activeSection(), -1]
      );

      if (bestRatio > 0) {
        if (this.activeSection() !== bestId) {
          this.activeSection.set(bestId);
        }
        return;
      }

      const offset = window.scrollY + (window.innerHeight || document.documentElement.clientHeight) * 0.4;
      let fallbackId = sections[0].id;
      for (const section of sections) {
        if (offset >= section.offsetTop) {
          fallbackId = section.id;
        } else {
          break;
        }
      }

      if (this.activeSection() !== fallbackId) {
        this.activeSection.set(fallbackId);
      }
    }, {
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    sections.forEach(section => this.sectionObserver?.observe(section));
  }

  private teardownObserver(): void {
    this.sectionObserver?.disconnect();
    this.sectionObserver = undefined;
    this.intersectionState.clear();
  }
}

type MenuItem =
  | { id: string; label: string; icon: string; kind: 'section' }
  | { id: string; label: string; icon: string; kind: 'route'; route: string };
