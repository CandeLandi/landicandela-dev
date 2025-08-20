import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { UploadService } from '../../../../../services/upload.service';
import { GalleryService } from '../../../../../services/gallery.service';
import { GalleryImage } from '../../../../../models/project.interface';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
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
      this.uploadError.set('Create the project first to upload images');
      return;
    }

    this.uploading.set(true);
    this.uploadError.set(null);

    const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'));
    const uploads = fileArray.map(file =>
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
}
