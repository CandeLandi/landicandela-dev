import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Project } from '../../../models/project.interface';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() edit = new EventEmitter<string>();
  @Output() toggleFeatured = new EventEmitter<string>();
  @Output() toggleStatus = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onEdit() {
    this.edit.emit(this.project.id);
  }

  onToggleFeatured(event: Event) {
    event.stopPropagation();
    this.toggleFeatured.emit(this.project.id);
  }

  onToggleStatus(event: Event) {
    event.stopPropagation();
    this.toggleStatus.emit(this.project.id);
  }

  onDelete(event: Event) {
    event.stopPropagation();
    this.delete.emit(this.project.id);
  }

  getCoverUrl(): string {
    const first = (this.project.gallery || [])[0] as any;
    if (!first) return '';
    return typeof first === 'string' ? first : first.url;
  }
}

