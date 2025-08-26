import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-slider.component.html',
  styleUrls: ['./gallery-slider.component.css']
  ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GallerySliderComponent implements OnChanges {
  @Input() images: { url: string }[] = [];
  @Input() alt = '';
  @Input() heightClass = 'h-[300px]';
  @Output() indexChange = new EventEmitter<number>();

  current = 0;
  private mouseDown = false;
  private startX = 0;
  private startY = 0;
  isLoaded: boolean[] = [];
  allLoaded = false;
  constructor(){
    register();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('images' in changes) {
      const len = this.images?.length || 0;
      this.current = 0;
      this.isLoaded = new Array(len).fill(false);
      this.allLoaded = len === 0;
      this.prefetchImages();
    }
  }

  private prefetchImages(): void {
    if (!this.images || this.images.length === 0) return;
    this.images.forEach((imgData, index) => {
      const img = new Image();
      img.onload = () => {
        this.isLoaded[index] = true;
        this.allLoaded = this.isLoaded.every(Boolean);
      };
      img.onerror = () => {
        // Consider errored as loaded to avoid blocking the slider
        this.isLoaded[index] = true;
        this.allLoaded = this.isLoaded.every(Boolean);
      };
      img.src = imgData.url;
      // Hint the browser to decode sooner
      (img as any).decoding = 'async';
      (img as any).loading = 'eager';
    });
  }

  next(): void {
    if (!this.images?.length || !this.allLoaded) return;
    this.current = (this.current + 1) % this.images.length;
    this.indexChange.emit(this.current);
  }

  prev(): void {
    if (!this.images?.length || !this.allLoaded) return;
    this.current = this.current === 0 ? this.images.length - 1 : this.current - 1;
    this.indexChange.emit(this.current);
  }

  set(index: number): void {
    if (!this.allLoaded) return;
    this.current = index;
    this.indexChange.emit(this.current);
  }

  onTouchStart(e: TouchEvent): void {
    if (!this.allLoaded) return;
    const t = e.changedTouches[0];
    this.startX = t.clientX; this.startY = t.clientY;
  }
  onTouchEnd(e: TouchEvent): void {
    if (!this.allLoaded) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - this.startX; const dy = t.clientY - this.startY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? this.next() : this.prev();
    }
  }

  onMouseDown(e: MouseEvent): void { if (!this.allLoaded) return; this.mouseDown = true; this.startX = e.clientX; this.startY = e.clientY; }
  onMouseUp(e: MouseEvent): void {
    if (!this.allLoaded) { this.mouseDown = false; return; }
    if (!this.mouseDown) return; this.mouseDown = false;
    const dx = e.clientX - this.startX; const dy = e.clientY - this.startY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? this.next() : this.prev(); }
  }
  onMouseLeave(e: MouseEvent): void { if (this.mouseDown) this.onMouseUp(e); this.mouseDown = false; }

  onMatIndexChange(index: number): void {
    if (!this.allLoaded) return;
    this.current = index;
    this.indexChange.emit(this.current);
  }

}

