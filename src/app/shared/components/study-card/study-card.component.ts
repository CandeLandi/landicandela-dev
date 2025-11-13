import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StudyCardItem {
  label: string;
  description?: string;
  note?: string;
}

export interface StudyCardDefinition {
  title: string;
  items?: StudyCardItem[];
  groups?: StudyCardItem[][];
  variant?: 'list' | 'qa';
  spanCols?: boolean;
}

@Component({
  selector: 'app-study-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './study-card.component.html'
})
export class StudyCardComponent {
  readonly title = input.required<string>();
  readonly items = input<StudyCardItem[]>([]);
  readonly groups = input<StudyCardItem[][]>([]);
  readonly variant = input<'list' | 'qa'>('list');
  readonly accent = input('#8b5cf6');
  readonly spanCols = input(false);

  hasGroups(): boolean {
    return this.groups().length > 0;
  }
}

