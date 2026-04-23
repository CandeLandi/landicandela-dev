import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PortfolioService } from '../../core/services/portfolio.service';
import { WorkExperience } from '../../core/models/work-experience.interface';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './work-experience.component.html',
})
export class WorkExperienceComponent implements OnInit {
  private readonly portfolio = inject(PortfolioService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly workExperience = signal<WorkExperience | null>(null);

  ngOnInit(): void {
    this.portfolio.getWorkExperience().subscribe((list) => {
      const current = list.find((e) => e.current) ?? list[0];
      if (current?.visible !== false) {
        this.workExperience.set(current);
      }
    });
  }

  getHighlightedDescription(text: string | undefined, terms: string[] | undefined): SafeHtml | null {
    if (!text) return null;
    const withBreaks = text.replace(/\n/g, '<br>');
    if (!terms?.length) return this.sanitizer.bypassSecurityTrustHtml(escapeHtml(withBreaks).replace(/&lt;br&gt;/g, '<br>'));
    const escaped = escapeHtml(withBreaks);
    const sorted = [...terms].sort((a, b) => b.length - a.length);
    let result = escaped.replace(/&lt;br&gt;/g, '<br>');
    for (const term of sorted) {
      const span = `<span class="text-purple-300 font-medium">${escapeHtml(term)}</span>`;
      result = result.split(term).join(span);
    }
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
