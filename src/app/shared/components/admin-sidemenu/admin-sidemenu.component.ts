import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-sidemenu',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './admin-sidemenu.component.html',
  styleUrls: ['./admin-sidemenu.component.css']
})
export class AdminSidemenuComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
