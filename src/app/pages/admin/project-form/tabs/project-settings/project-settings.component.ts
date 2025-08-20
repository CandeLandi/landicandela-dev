import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Project } from '../../../../../models/project.interface';

interface FormData {
  title: string;
  description: string;
  type: string;
  features: string;
  demoUrl: string;
  githubUrl: string;
  gallery: any[];
  visible: boolean;
  featured: boolean;
}

@Component({
  selector: 'app-project-settings',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css']
})
export class ProjectSettingsComponent {
  @Input() formData!: FormData;
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() project: Project | null = null;
  @Output() formDataChange = new EventEmitter<Partial<FormData>>();

  // Computed values
  projectId = computed(() => this.project?.id || '—');
  createdAt = computed(() => {
    if (!this.project?.createdAt) return '—';
    return new Date(this.project.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });
  totalViews = computed(() => this.project?.views || 0);

  onToggleChange(field: keyof FormData, value: boolean) {
    this.formDataChange.emit({ [field]: value });
  }

  duplicateProject() {
    // TODO: Implement duplicate functionality
    console.log('Duplicate project');
  }

  deleteProject() {
    // TODO: Implement delete functionality
    console.log('Delete project');
  }
}
