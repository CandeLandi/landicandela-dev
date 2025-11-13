import { Component, OnInit } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.interface';
import { GallerySliderComponent } from '../../shared/components/gallery-slider/gallery-slider.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealDirective, GallerySliderComponent],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  currentImageIndex: { [key: string]: number } = {};
  private swipeStartX: number | null = null;
  private swipeStartY: number | null = null;
  private swipeStartTimeMs: number | null = null;
  private mouseStartX: number | null = null;
  private mouseStartY: number | null = null;
  private isMouseDown: boolean = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    const CLIENT_ID = '88b59ed0-4d52-45db-bd21-ef72a8338fbc'; // clientId del portfolio
    this.projectService.getPublicProjects(CLIENT_ID, 1, 6).subscribe((response: unknown) => {
      const payload = response as any;
      const raw = Array.isArray(payload) ? payload : (payload?.data ?? []);
      const mapped: Project[] = (raw || []).map((p: any) => {
        const galleryRaw = (p.gallery ?? p.images ?? []) as any[];
        const gallerySorted = [...galleryRaw].sort((a: any, b: any) => {
          const ao = typeof a?.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
          const bo = typeof b?.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
          if (ao !== bo) return ao - bo;
          const ac = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bc = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
          return ac - bc;
        });
        return {
          ...p,
          name: p.name ?? p.title,
          features: Array.isArray(p.technologies) ? p.technologies : typeof p.technologies === 'string' ? p.technologies.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
          demoUrl: p.demoUrl ?? p.url ?? undefined,
          githubUrl: p.githubUrl ?? p.github ?? undefined,
          gallery: gallerySorted
        } as any;
      });
      this.projects = mapped as any;
      mapped.forEach(project => {
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

  onTouchStart(event: TouchEvent): void {
    if (event.changedTouches && event.changedTouches.length > 0) {
      const touch = event.changedTouches[0];
      this.swipeStartX = touch.clientX;
      this.swipeStartY = touch.clientY;
      this.swipeStartTimeMs = Date.now();
    }
  }

  onTouchEnd(projectId: string, totalImages: number, event: TouchEvent): void {
    if (this.swipeStartX === null || this.swipeStartY === null) {
      return;
    }
    if (event.changedTouches && event.changedTouches.length > 0) {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - this.swipeStartX;
      const deltaY = touch.clientY - this.swipeStartY;
      const elapsedMs = (this.swipeStartTimeMs ?? Date.now()) - (this.swipeStartTimeMs ?? Date.now());

      // Determine horizontal swipe with a minimum distance threshold
      const horizontalDistance = Math.abs(deltaX);
      const verticalDistance = Math.abs(deltaY);
      const minSwipeDistancePx = 40; // Adjust sensitivity if needed

      if (horizontalDistance > minSwipeDistancePx && horizontalDistance > verticalDistance) {
        if (deltaX < 0) {
          this.nextImage(projectId, totalImages);
        } else {
          this.prevImage(projectId, totalImages);
        }
      }
    }

    this.swipeStartX = null;
    this.swipeStartY = null;
    this.swipeStartTimeMs = null;
  }

  onMouseDown(event: MouseEvent): void {
    this.isMouseDown = true;
    this.mouseStartX = event.clientX;
    this.mouseStartY = event.clientY;
  }

  onMouseUp(projectId: string, totalImages: number, event: MouseEvent): void {
    if (!this.isMouseDown || this.mouseStartX === null || this.mouseStartY === null) {
      this.resetMouse();
      return;
    }

    const deltaX = event.clientX - this.mouseStartX;
    const deltaY = event.clientY - this.mouseStartY;
    const horizontalDistance = Math.abs(deltaX);
    const verticalDistance = Math.abs(deltaY);
    const minSwipeDistancePx = 60; // desktop a bit less sensitive

    if (horizontalDistance > minSwipeDistancePx && horizontalDistance > verticalDistance) {
      if (deltaX < 0) {
        this.nextImage(projectId, totalImages);
      } else {
        this.prevImage(projectId, totalImages);
      }
    }

    this.resetMouse();
  }

  onMouseLeave(projectId: string, totalImages: number, event: MouseEvent): void {
    // Treat as mouse up if the user releases outside
    if (this.isMouseDown) {
      this.onMouseUp(projectId, totalImages, event);
    }
    this.resetMouse();
  }

  private resetMouse(): void {
    this.isMouseDown = false;
    this.mouseStartX = null;
    this.mouseStartY = null;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
