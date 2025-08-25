import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidemenuComponent } from '../../../shared/components/admin-sidemenu/admin-sidemenu.component';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, AdminSidemenuComponent],
  templateUrl: './certifications.component.html'
})
export class CertificationsComponent {}

