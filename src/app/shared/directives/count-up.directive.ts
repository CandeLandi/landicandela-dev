import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({ selector: '[countUp]' })
export class CountUpDirective implements OnDestroy {
  @Input('countUp') endValue: number = 0;
  @Input() durationMs: number = 1200;
  @Input() startValue: number = 0;

  private io: IntersectionObserver | null = null;
  private rafId: number | null = null;

  constructor(private el: ElementRef<HTMLElement>) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      this.setText(this.endValue);
      return;
    }

    this.io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.start();
        this.io?.disconnect();
        this.io = null;
      }
    }, { threshold: 0.2 });

    this.io.observe(this.el.nativeElement);
  }

  private start(): void {
    const startTime = performance.now();
    const from = Number(this.startValue) || 0;
    const to = Number(this.endValue) || 0;
    const duration = Math.max(200, Number(this.durationMs) || 1200);

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const value = Math.round(from + (to - from) * eased);
      this.setText(value);

      if (t < 1) {
        this.rafId = requestAnimationFrame(tick);
      } else {
        this.rafId = null;
      }
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private setText(value: number): void {
    this.el.nativeElement.textContent = String(value);
  }

  ngOnDestroy(): void {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

