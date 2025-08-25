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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SidemenuComponent,
    HeroComponent,
    ProjectsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
    BackToTopComponent
  ],
  templateUrl: './home.component.html',
  animations: [listStagger]
})
export class HomeComponent {}
