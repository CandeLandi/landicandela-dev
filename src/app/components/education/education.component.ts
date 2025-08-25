import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Education } from '../../interfaces/education.interface';
import { CertificationCardComponent } from '../../shared/components/certification-card/certification-card.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, StatCardComponent, CertificationCardComponent],
  templateUrl: './education.component.html'
})
export class EducationComponent implements OnInit {
  education: Education[] = [];
  // All per-card logic lives in CertificationCardComponent

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.loadEducation();
  }

  loadEducation(): void {
    this.portfolioService.getEducation().subscribe(education => {
      this.education = education;
    });
  }


  getTotalProjects(): number {
    return this.education.reduce((acc, cert) => acc + (cert.projects?.length || 0), 0);
  }

  getTotalHours(): number {
    return this.education.reduce((acc, cert) => {
      const hours = parseFloat(cert.duration.replace(' hours', '').replace('h', ''));
      return acc + (isNaN(hours) ? 0 : hours);
    }, 0);
  }
}
