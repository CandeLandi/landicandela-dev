import { Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({ selector: '[reveal]' })
export class RevealDirective implements OnDestroy {
  private io: IntersectionObserver;

  constructor(el: ElementRef) {
    this.io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.nativeElement.classList.add('reveal-in');
        this.io.disconnect();
      }
    }, { threshold: 0.15 });

    this.io.observe(el.nativeElement);
  }

  ngOnDestroy(): void { this.io?.disconnect(); }
}

