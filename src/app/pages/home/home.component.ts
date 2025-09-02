import { Component } from '@angular/core';
import { listStagger } from '../../shared/motion';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from '../../shared/components/sidemenu/sidemenu.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { EducationComponent } from '../../components/education/education.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BackToTopComponent } from '../../shared/components/back-to-top/back-to-top.component';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SidemenuComponent,
    HeroComponent,
    ProjectsComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
    BackToTopComponent
  ],
  templateUrl: './home.component.html',
  animations: [listStagger]
})
export class HomeComponent {
  constructor(private seo: SeoService) {
    const baseUrl = 'https://candelandi.dev/';
    this.seoDefaults(baseUrl);
  }

  private seoDefaults(url: string): void {
    this.seo.setTitle('Candela Landi — Angular Frontend Developer');
    this.seo.setDescription('Portfolio showcasing Angular projects, experience, and contact.');
    this.seo.setCanonical(url);
    this.seo.setImage('/assets/og/cover.png');

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Candela Landi',
      'jobTitle': 'Frontend Developer',
      'url': url,
      'sameAs': [
        'https://github.com/candelandi',
        'https://www.linkedin.com/in/candela-landi-5651002ab'
      ]
    });
  }
}
