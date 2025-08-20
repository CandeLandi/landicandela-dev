import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // No agregar token a endpoints públicos
  if (req.url.includes('/public')) {
    return next(req);
  }

  // Si no hay token, simplemente deja pasar la petición sin modificarla.
  if (!token) {
    return next(req);
  }

  // Clona la petición y añade el header de autorización.
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  // Manejar errores 401/403 para forzar logout y redirección
  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
