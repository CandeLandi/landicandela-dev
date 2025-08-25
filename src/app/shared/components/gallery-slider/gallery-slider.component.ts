import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-slider.component.html'
})
export class GallerySliderComponent {
  @Input() images: { url: string }[] = [];
  @Input() alt = '';
  @Input() heightClass = 'h-[300px]';
  @Output() indexChange = new EventEmitter<number>();

  current = 0;
  private mouseDown = false;
  private startX = 0;
  private startY = 0;

  next(): void {
    if (!this.images?.length) return;
    this.current = (this.current + 1) % this.images.length;
    this.indexChange.emit(this.current);
  }

  prev(): void {
    if (!this.images?.length) return;
    this.current = this.current === 0 ? this.images.length - 1 : this.current - 1;
    this.indexChange.emit(this.current);
  }

  set(index: number): void {
    this.current = index;
    this.indexChange.emit(this.current);
  }

  onTouchStart(e: TouchEvent): void {
    const t = e.changedTouches[0];
    this.startX = t.clientX; this.startY = t.clientY;
  }
  onTouchEnd(e: TouchEvent): void {
    const t = e.changedTouches[0];
    const dx = t.clientX - this.startX; const dy = t.clientY - this.startY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? this.next() : this.prev();
    }
  }

  onMouseDown(e: MouseEvent): void { this.mouseDown = true; this.startX = e.clientX; this.startY = e.clientY; }
  onMouseUp(e: MouseEvent): void {
    if (!this.mouseDown) return; this.mouseDown = false;
    const dx = e.clientX - this.startX; const dy = e.clientY - this.startY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? this.next() : this.prev(); }
  }
  onMouseLeave(e: MouseEvent): void { if (this.mouseDown) this.onMouseUp(e); this.mouseDown = false; }
}

