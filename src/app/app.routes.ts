import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin/login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'admin/dashboard/new',
    loadComponent: () => import('./pages/admin/project-form/project-form.component').then(m => m.ProjectFormComponent)
  },
  {
    path: 'admin/dashboard/edit/:id',
    loadComponent: () => import('./pages/admin/project-form/project-form.component').then(m => m.ProjectFormComponent)
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
