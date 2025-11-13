import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'study-guide',
    loadComponent: () => import('./pages/study-guide/study-guide.component').then(m => m.StudyGuideComponent)
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
