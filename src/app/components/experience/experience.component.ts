import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Experience } from '../../core/models/experience.interface';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent implements OnInit {
  experience: Experience[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.loadExperience();
  }

  loadExperience(): void {
    this.portfolioService.getExperience().subscribe((experience: Experience[]) => {
      this.experience = experience;
    });
  }
}
