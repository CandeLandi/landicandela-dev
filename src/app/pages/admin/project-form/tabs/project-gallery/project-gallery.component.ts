import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

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
  @Input() images: string[] = [];
  @Output() imagesChange = new EventEmitter<string[]>();

  currentImageIndex = signal(0);
  uploading = signal(false);

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
    this.uploading.set(true);

    // Simulate upload process
    setTimeout(() => {
      const newImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith('image/')) {
          console.warn(`File ${file.name} is not an image`);
          continue;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          console.warn(`File ${file.name} is too large (max 5MB)`);
          continue;
        }

        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          newImages.push(result);

          // Update images array when all files are processed
          if (newImages.length === files.length) {
            this.imagesChange.emit([...this.images, ...newImages]);
            this.uploading.set(false);
          }
        };
        reader.readAsDataURL(file);
      }
    }, 1000);
  }

  removeImage(index: number) {
    const newImages = [...this.images];
    newImages.splice(index, 1);
    this.imagesChange.emit(newImages);

    // Adjust current index if necessary
    if (this.currentImageIndex() >= newImages.length) {
      this.currentImageIndex.set(Math.max(0, newImages.length - 1));
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
}
