import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import {
  LucideAngularModule,
  Home,
  User,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  Menu,
  X,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  Search,
  Star,
  Clock,
  CheckCircle,
  Trash2,
  Image,
  FolderOpen,
  ArrowLeft,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Upload
} from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([AuthInterceptor, ErrorInterceptor])
    ),
    importProvidersFrom(LucideAngularModule.pick({
      // Iconos de navegación
      Home,
      User,
      Briefcase,
      GraduationCap,
      Mail,

      // Iconos de redes sociales
      Github,
      Linkedin,

      // Iconos de menú móvil
      Menu,
      X,

      // Iconos de login
      Lock,
      Eye,
      EyeOff,
      RefreshCw,

      // Iconos del dashboard
      Search,
      Star,
      Clock,
      CheckCircle,
      Trash2,
      Image,
      FolderOpen,
      ArrowLeft,
      FileText,
      Settings,
      LogOut,
      ExternalLink,
      Upload
    }))
  ]
};
