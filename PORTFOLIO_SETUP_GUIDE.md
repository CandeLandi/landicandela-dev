# 🚀 Guía de Configuración para Portafolio con Angular

## 📋 Índice
1. [Configuración de Lucide Angular](#lucide-angular)
2. [Sistema de Login con JWT](#jwt-login)
3. [Configuración de Environments](#environments)
4. [Estructura de Backend](#backend-structure)

---

## 🎨 Lucide Angular - Configuración Correcta

### 1. Instalación
```bash
npm install lucide-angular
```

### 2. Configuración en `app.config.ts`
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient()
  ]
};
```

### 3. Importación en Componentes
```typescript
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <i-lucide name="star" class="w-6 h-6 text-blue-500"></i-lucide>
    <i-lucide name="heart" class="w-4 h-4 text-red-500"></i-lucide>
    <i-lucide name="user" class="w-8 h-8 text-gray-700"></i-lucide>
  `
})
export class MyComponent {}
```

### 4. Uso Correcto en Templates
```html
<!-- ✅ CORRECTO -->
<i-lucide name="star" class="w-6 h-6 text-blue-500"></i-lucide>
<i-lucide name="heart" class="w-4 h-4 text-red-500"></i-lucide>
<i-lucide name="user" class="w-8 h-8 text-gray-700"></i-lucide>

<!-- ❌ INCORRECTO - No usar así -->
<lucide-icon name="star"></lucide-icon>
<lucide-star></lucide-star>
```

### 5. Iconos Comunes para Portafolio
```html
<!-- Navegación -->
<i-lucide name="home" class="w-5 h-5"></i-lucide>
<i-lucide name="user" class="w-5 h-5"></i-lucide>
<i-lucide name="briefcase" class="w-5 h-5"></i-lucide>
<i-lucide name="mail" class="w-5 h-5"></i-lucide>

<!-- Proyectos -->
<i-lucide name="folder" class="w-5 h-5"></i-lucide>
<i-lucide name="github" class="w-5 h-5"></i-lucide>
<i-lucide name="external-link" class="w-5 h-5"></i-lucide>
<i-lucide name="eye" class="w-5 h-5"></i-lucide>

<!-- Acciones -->
<i-lucide name="plus" class="w-5 h-5"></i-lucide>
<i-lucide name="edit" class="w-5 h-5"></i-lucide>
<i-lucide name="trash" class="w-5 h-5"></i-lucide>
<i-lucide name="save" class="w-5 h-5"></i-lucide>

<!-- Estados -->
<i-lucide name="check" class="w-5 h-5 text-green-500"></i-lucide>
<i-lucide name="x" class="w-5 h-5 text-red-500"></i-lucide>
<i-lucide name="loader" class="w-5 h-5 animate-spin"></i-lucide>
```

---

## 🔐 Sistema de Login con JWT

### 1. Interceptor de Autenticación
```typescript
// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(request);
  }
}
```

### 2. Servicio de Autenticación
```typescript
// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        map(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private loadStoredUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
}
```

### 3. Guard de Autenticación
```typescript
// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}
```

### 4. Componente de Login
```typescript
// src/app/pages/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-900">
      <div class="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-white">Iniciar Sesión</h2>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label class="text-white text-sm font-medium">Email</label>
            <input 
              type="email" 
              formControlName="email"
              class="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              placeholder="tu@email.com"
            />
          </div>
          
          <div>
            <label class="text-white text-sm font-medium">Contraseña</label>
            <input 
              type="password" 
              formControlName="password"
              class="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            [disabled]="loginForm.invalid || loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <i-lucide name="loader" class="w-4 h-4 animate-spin mr-2" *ngIf="loading"></i-lucide>
            {{ loading ? 'Iniciando...' : 'Iniciar Sesión' }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error de login:', error);
          this.loading = false;
        }
      });
    }
  }
}
```

---

## 🌍 Configuración de Environments

### 1. Environment Development
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  // Otras configuraciones de desarrollo
  debug: true,
  logLevel: 'debug'
};
```

### 2. Environment Production
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend.com/api',
  // Otras configuraciones de producción
  debug: false,
  logLevel: 'error'
};
```

### 3. Configuración en angular.json
```json
{
  "projects": {
    "tu-portfolio": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

---

## 🏗️ Estructura de Backend (Node.js/Express)

### 1. Estructura de Carpetas
```
backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── projects.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── upload.middleware.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   └── project.model.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── projects.routes.ts
│   ├── config/
│   │   └── database.ts
│   └── app.ts
├── package.json
└── .env
```

### 2. Configuración Principal
```typescript
// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import projectsRoutes from './routes/projects.routes';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3. Autenticación JWT
```typescript
// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};
```

### 4. Middleware de Autenticación
```typescript
// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};
```

### 5. Variables de Entorno (.env)
```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT
JWT_SECRET=tu-super-secreto-jwt-aqui

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# CORS
ALLOWED_ORIGINS=http://localhost:4200,https://tu-portfolio.com
```

---

## 🚀 Comandos de Inicio Rápido

### Frontend (Angular)
```bash
# Crear proyecto
ng new mi-portfolio --standalone --routing --style=scss

# Instalar dependencias
npm install lucide-angular @angular/material

# Ejecutar en desarrollo
ng serve

# Build para producción
ng build --configuration=production
```

### Backend (Node.js)
```bash
# Crear proyecto
mkdir backend && cd backend
npm init -y

# Instalar dependencias
npm install express cors helmet morgan dotenv jsonwebtoken bcryptjs multer

# Instalar dependencias de desarrollo
npm install -D @types/express @types/cors @types/jsonwebtoken @types/bcryptjs

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

---

## ⚠️ Problemas Comunes y Soluciones

### Lucide Angular
```bash
# ❌ Error: No se encuentra el módulo
# Solución: Asegúrate de importar LucideAngularModule en cada componente

# ❌ Error: Iconos no se muestran
# Solución: Verifica que uses <i-lucide name="icon-name"> no <lucide-icon>
```

### JWT
```bash
# ❌ Error: Token expirado
# Solución: Implementa refresh tokens o maneja la expiración en el frontend

# ❌ Error: CORS
# Solución: Configura correctamente los origins en el backend
```

### Environments
```bash
# ❌ Error: Environment no encontrado
# Solución: Verifica la configuración en angular.json y los imports
```

---

## 📝 Notas Importantes

1. **Lucide Angular**: Siempre usa `<i-lucide name="icon-name">` no `<lucide-icon>`
2. **JWT**: Guarda el token en localStorage y úsalo en el interceptor
3. **Environments**: Configura diferentes URLs para dev y prod
4. **Seguridad**: Nunca expongas el JWT_SECRET en el frontend
5. **CORS**: Configura correctamente los origins permitidos

¡Con esta configuración tendrás un portafolio robusto y funcional! 🎉 
