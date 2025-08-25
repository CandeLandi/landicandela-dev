import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { UploadService } from '../../../../../services/upload.service';
import { GalleryService } from '../../../../../services/gallery.service';
import { GalleryImage } from '../../../../../models/project.interface';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    DragDropModule
  ],
  templateUrl: './project-gallery.component.html',
  styleUrls: ['./project-gallery.component.css']
})
export class ProjectGalleryComponent {
  @Input() projectId: string | null = null;
  @Input() images: (string | GalleryImage)[] = [];
  @Output() imagesChange = new EventEmitter<(string | GalleryImage)[]>();
  @Output() refreshRequested = new EventEmitter<void>();

  currentImageIndex = signal(0);
  uploading = signal(false);
  uploadError = signal<string | null>(null);
  dragIndex = signal<number | null>(null);
  dragOverIndex = signal<number | null>(null);

  constructor(
    private uploadService: UploadService,
    private galleryService: GalleryService
  ) {}

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.uploadImages(files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.uploadImages(files);
    }
  }

  private uploadImages(files: FileList) {
    if (!this.projectId) {
      this.uploadError.set('Creating draft...');
      return;
    }

    this.uploading.set(true);
    this.uploadError.set(null);

    const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'));

    // Convert to WebP (client-side) to reduce size before upload
    Promise.all(
      fileArray.map((file) => this.convertToWebP(file).catch(() => file))
    ).then((preparedFiles) => {
      const uploads = preparedFiles.map((file) =>
        this.uploadService.uploadToProjectGallery(this.projectId!, file).pipe(
          catchError((err) => {
            console.error('Upload error', err);
            this.uploadError.set('Error uploading one or more images');
            return of(null);
          })
        )
      );

      forkJoin(uploads).subscribe(() => {
        this.uploading.set(false);
        // Pide al padre refrescar la galería desde el backend
        this.refreshRequested.emit();
      });
    }).catch((err) => {
      console.error('Preparation error', err);
      this.uploading.set(false);
    });
  }

  removeImage(index: number) {
    const image = this.images[index];
    if (!image) return;

    // If local string, remove locally
    if (typeof image === 'string' || !(image as GalleryImage).id) {
      const newImages = [...this.images];
      newImages.splice(index, 1);
      this.imagesChange.emit(newImages);
      if (this.currentImageIndex() >= newImages.length) {
        this.currentImageIndex.set(Math.max(0, newImages.length - 1));
      }
      return;
    }

    if (!this.projectId) return;

    this.galleryService.removeImage(this.projectId, (image as GalleryImage).id).subscribe({
      next: () => {
        // Delega refresco al padre para evitar estados inconsistentes
        this.refreshRequested.emit();
      },
      error: (err: any) => console.error('Error deleting image', err)
    });
  }

  // Angular CDK: drop handler
  onCdkDrop(event: CdkDragDrop<any[]>) {
    const prev = event.previousIndex;
    const curr = event.currentIndex;
    if (prev === curr) return;
    const local = [...this.images];
    moveItemInArray(local, prev, curr);
    this.images = local;
    this.imagesChange.emit(local);

    if (this.projectId) {
      const ids = local
        .map((it) => (typeof it === 'string' ? null : (it as GalleryImage).id))
        .filter((id): id is string => !!id);
      if (ids.length > 0) {
        this.galleryService.reorderGallery(this.projectId, ids).subscribe({
          next: () => this.refreshRequested.emit(),
          error: (err: any) => console.error('Reorder error', err)
        });
      }
    }
  }

  setCurrentImage(index: number) {
    this.currentImageIndex.set(index);
  }

  previousImage() {
    const newIndex = this.currentImageIndex() === 0
      ? this.images.length - 1
      : this.currentImageIndex() - 1;
    this.currentImageIndex.set(newIndex);
  }

  nextImage() {
    const newIndex = this.currentImageIndex() === this.images.length - 1
      ? 0
      : this.currentImageIndex() + 1;
    this.currentImageIndex.set(newIndex);
  }

  getImageUrl(image: string | GalleryImage): string {
    return typeof image === 'string' ? image : image.url;
  }

  // Converts images to WebP with optional downscale to a max side to save bandwidth
  private async convertToWebP(file: File, maxSide = 1920, quality = 0.82): Promise<File> {
    if (file.type === 'image/webp') return file;
    if (!file.type.startsWith('image/')) return file;

    const image = await this.loadImageFromFile(file);
    const { width, height } = image;
    const scale = Math.min(1, maxSide / Math.max(width, height));
    const targetW = Math.max(1, Math.round(width * scale));
    const targetH = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(image, 0, 0, targetW, targetH);

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/webp', quality)
    );
    if (!blob) return file;

    const newName = file.name.replace(/\.[^.]+$/, '.webp');
    return new File([blob], newName, { type: 'image/webp' });
  }

  private loadImageFromFile(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = (e) => {
        URL.revokeObjectURL(url);
        reject(e);
      };
      img.src = url;
    });
  }
}
