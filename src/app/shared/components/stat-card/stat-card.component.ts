import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { CountUpDirective } from '../../../shared/directives/count-up.directive';

type Variant = 'purple' | 'blue' | 'green' | 'orange';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, RevealDirective, CountUpDirective],
  templateUrl: './stat-card.component.html'
})
export class StatCardComponent {
  @Input() label = '';
  @Input() value = 0;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() variant: Variant = 'purple';

  get containerClasses(): string {
    const m: Record<Variant, string> = {
      purple: 'from-purple-600/10 to-purple-800/10 border-purple-400/20 text-purple-400',
      blue:   'from-blue-600/10 to-blue-800/10 border-blue-400/20 text-blue-400',
      green:  'from-green-600/10 to-green-800/10 border-green-400/20 text-green-400',
      orange: 'from-orange-600/10 to-orange-800/10 border-orange-400/20 text-orange-400'
    };
    return m[this.variant];
  }
}

