import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LucideAngularModule } from 'lucide-angular';
import { Project } from '../../../../../models/project.interface';

interface FormData {
  name: string;
  description: string;
  type: string;
  features: string; // comma-separated
  demoUrl: string;
  githubUrl: string;
  gallery: any[];
  visible: boolean;
  featured: boolean;
}

@Component({
  selector: 'app-project-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    LucideAngularModule
  ],
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent {
  @Input() formData!: FormData;
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() project: Project | null = null;
  @Output() formDataChange = new EventEmitter<Partial<FormData>>();

  // Computed values
  characterCount = computed(() => this.formData.description.length);
  wordCount = computed(() =>
    (this.formData.description || '').split(' ').filter(word => word.length > 0).length
  );

  technologyTags() {
    const value = this.formData?.features || '';
    const tokens = value
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);
    return Array.from(new Set(tokens));
  }

  types = [
    { value: '', label: 'Seleccionar tipo' },
    { value: 'LANDING', label: 'Página de Inicio' },
    { value: 'ECOMMERCE', label: 'E-commerce' },
    { value: 'INMOBILIARIA', label: 'Inmobiliaria' },
    { value: 'CUSTOM', label: 'Personalizado' }
  ];

  onInputChange(field: keyof FormData, value: any) {
    this.formDataChange.emit({ [field]: value });
  }

  onInputEvent(event: Event, field: keyof FormData) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.onInputChange(field, target.value);
  }

  removeTechnology(index: number) {
    const tags = this.technologyTags();
    tags.splice(index, 1);
    this.onInputChange('features', tags.join(', '));
  }

  // Add technology on Enter or comma and normalize string
  onTechKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const key = event.key;
    if (key !== 'Enter' && key !== ',') return;

    event.preventDefault();

    const rawValue = target.value || '';
    const tokens = rawValue
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    // ensure uniqueness
    const unique = Array.from(new Set(tokens));
    const normalized = unique.join(', ') + ', ';
    this.onInputChange('features', normalized);
    target.value = normalized;
  }

  // On blur, remove trailing comma/space
  onTechBlur(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    const value = (target.value || '').trim();
    const tokens = value
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    this.onInputChange('features', Array.from(new Set(tokens)).join(', '));
  }
}
