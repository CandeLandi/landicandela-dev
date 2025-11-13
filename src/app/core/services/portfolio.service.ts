import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project.interface';
import { Experience } from '../models/experience.interface';
import { Education } from '../models/education.interface';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  constructor() { }


  getExperience(): Observable<Experience[]> {
    const experience: Experience[] = [
      {
        id: '1',
        title: 'Desarrolladora Frontend',
        company: 'Rakium',
        startDate: 'Nov 2024',
        endDate: 'Presente',
        period: 'Nov 2024 - Presente',
        current: true,
        description:
          'Desarrolladora freelance bajo el nombre Rakium, construyendo sitios web y APIs para clientes reales usando Angular y Tailwind CSS en el frontend, y NestJS con Prisma y PostgreSQL en el backend.',
        technologies: ['Angular', 'Tailwind CSS', 'NestJS', 'Prisma', 'PostgreSQL']
      },
      {
        id: '2',
        title: 'Desarrolladora Frontend',
        company: 'Aiko',
        startDate: 'Feb 2025',
        endDate: 'Mar 2025',
        period: 'Feb 2025 - Mar 2025',
        current: false,
        description:
          'Desarrolladora frontend trabajando independientemente en una aplicación móvil usando Angular, Tailwind CSS, PrimeNG e Ionic. Contribuí a funcionalidades para entrenadores, estudiantes y clubes para gestionar rutinas, dietas y calendarios de entrenamiento.',
        technologies: ['Angular', 'Tailwind CSS', 'PrimeNG', 'Ionic']
      }
    ];
    return of(experience);
  }

  getEducation(): Observable<Education[]> {
    const education: Education[] = [
      {
        id: '1',
        title: 'Angular PRO',
        institution: 'Udemy',
        date: '22/3/2025',
        duration: '16.5 horas',
        certificate: 'https://www.udemy.com/certificate/UC-0ce85d1e-503c-4c2c-8b62-451b8cf36c38/',
        type: 'certification',
        projects: [
          {
            name: 'Calculadora Zoneless',
            technologies: ['Angular', 'Signals', 'Zoneless'],
            github: 'https://github.com/CandeLandi/zoneless-calculator',
            icon: 'calculator'
          }
        ],
        skills: [
          'Patrones Zoneless y Signals para gestión de estado',
          'Vinculaciones avanzadas y correcciones de estructura de plantillas',
          'SSR y SSG para rendimiento y SEO',
          'Prácticas de SEO e internacionalización i18n',
          'Estrategia de testing: unitario y e2e (Jasmine/Karma, etc.)',
          'Integraciones de gestión de datos TanStack',
          'Monorepos y paquetes personalizados',
          'Estrategias de dependencias NPM y tokens DI personalizados'
        ]
      },
      {
        id: '2',
        title: 'Angular: De Cero a Experto — Edición 2025',
        institution: 'Udemy',
        date: '17/8/2024 - 17/10/2024',
        duration: '32.5 horas',
        certificate: 'https://www.udemy.com/certificate/UC-8c303227-e433-4543-b491-fdaea9a16b37/',
        type: 'certification',
        projects: [
          {
            name: 'Admin Pro - Frontend y Backend',
            technologies: ['Angular', 'ExpressJS', 'Google Cloud'],
            demo: 'https://adminpro-backend1-993bf28005ef.herokuapp.com',
            github: 'https://github.com/CandeLandi/admin-pro',
            icon: 'database'
          },
          {
            name: 'Aplicación Hospital',
            technologies: ['Angular', 'ExpressJS', 'MongoDB', 'JWT', 'Google Sign-In'],
            github: 'https://github.com/CandeLandi/admin-pro',
            icon: 'activity'
          },
          {
            name: 'Juego del año - Frontend y Backend',
            technologies: ['Angular', 'Firebase', 'ExpressJS'],
            demo: 'https://firestore-chart-67176.web.app',
            github: 'https://github.com/CandeLandi/goty',
            icon: 'gamepad'
          },
          {
            name: 'Aplicación CRUD Héroes',
            technologies: ['Angular', 'NestJS', 'MongoDB'],
            demo: 'https://angular-heroes-crud-app.netlify.app',
            github: 'https://github.com/CandeLandi/heroes-app',
            icon: 'shield'
          }
        ],
        skills: [
          'Stack MEAN: Mongo, Express, Angular, Node',
          'Arquitectura Angular a gran escala: módulos y lazy loading',
          'Autenticación JWT y panel de administración basado en roles',
          'Integración de Google Sign-In',
          'API REST Express: subidas, CORS, paginación',
          'Testing unitario e integración',
          'Versionado, releases y despliegues (Node/Apache)'
        ]
      },
      {
        id: '3',
        title: 'Redux en Angular con NgRx',
        institution: 'Udemy',
        date: 'Completado - 1/8/2024',
        duration: '12.5 horas',
        certificate: 'https://www.udemy.com/certificate/UC-3504fe62-7ab2-428b-8d73-931ebb48d776/',
        type: 'certification',
        projects: [
          {
            name: 'Aplicación de Ingresos y Gastos',
            technologies: ['Angular', 'Redux', 'Firebase'],
            demo: 'https://income-exit-adf5b.web.app/login',
            github: 'https://github.com/CandeLandi/income-outcome-app',
            icon: 'dollar-sign'
          },
          {
            name: 'NgRx Effects',
            technologies: ['Angular', 'Redux', 'Firebase'],
            demo: 'https://effects-redux-ngrx.netlify.app',
            github: 'https://github.com/CandeLandi/http-effects',
            icon: 'zap'
          },
          {
            name: 'Aplicación Todo',
            technologies: ['Angular', 'Redux'],
            demo: 'https://redux-angular-todo-app.netlify.app',
            github: 'https://github.com/CandeLandi/todo-app',
            icon: 'check-square'
          }
        ],
        skills: [
          'Fundamentos de Redux: acciones, reductores, selectores',
          'NgRx Store para gestión centralizada de estado',
          'NgRx Effects para efectos secundarios y flujos asíncronos',
          'NgRx DevTools para debugging y time-travel',
          'Patrones de control de estado y mejores prácticas',
          'Consumo de API REST (ReqRes) e integración',
          'Firebase, AngularFire, Hosting y despliegues'
        ]
      },
      {
        id: '4',
        title: 'Angular: De Cero a Experto',
        institution: 'Udemy',
        date: '2/3/2024 - 22/5/2024',
        duration: '45 horas',
        certificate: 'https://udemy.com/certificate/angular-expert',
        type: 'certification',
        projects: [
          {
            name: 'Aplicación de Mapas 1',
            technologies: ['Angular', 'Mapbox'],
            demo: 'https://angular-mapas-app-mapbox.netlify.app',
            github: 'https://github.com/candelandi/mapas-app',
            icon: 'map-pin'
          },
          {
            name: 'Aplicación de Mapas 2',
            technologies: ['Angular', 'Maps'],
            demo: 'https://angular-mapp-app.netlify.app',
            github: 'https://github.com/CandeLandi/map-app-2',
            icon: 'map'
          },
          {
            name: 'Login/Registro',
            technologies: ['Angular', 'NestJS', 'MongoDB'],
            demo: 'https://login-cl.netlify.app/#/auth/login',
            github: 'https://github.com/CandeLandi/auth-app',
            icon: 'user-check'
          },
          {
            name: 'Aplicación de Búsqueda de Gifs',
            technologies: ['Angular', 'GIPHY API'],
            demo: 'https://angular-search-gifs-app.netlify.app',
            github: 'https://github.com/CandeLandi/gifs-app',
            icon: 'search'
          },
          {
            name: 'Aplicación de Países',
            technologies: ['Angular', 'REST Countries API'],
            github: 'https://github.com/CandeLandi/country-app',
            icon: 'globe'
          },
          {
            name: 'Aplicación de Pipes',
            technologies: ['Angular', 'Pipes Personalizados'],
            github: 'https://github.com/CandeLandi/pipes-app',
            icon: 'filter'
          },
          {
            name: 'Dashboard (Tailwind, Angular 17)',
            technologies: ['Angular', 'Tailwind CSS'],
            github: 'https://github.com/CandeLandi/my-dashboard',
            icon: 'layout'
          }
        ],
        skills: [
          'Componentes standalone, Signals (writable/computed/input/output)',
          'Routing: rutas hijas, lazy loading, guards',
          'HTTP, interceptores, DI y servicios',
          'Autenticación con JWT y protección de rutas',
          'Integraciones: Mapbox, librerías de terceros y no-Angular',
          'APIs, CRUD, subida de archivos, despliegues',
          'Tailwind, reutilización de componentes, recursos/efectos RxJS'
        ]
      },
      {
        id: '5',
        title: 'Angular',
        institution: 'CoderHouse',
        date: '11/12/2023 - 21/2/2024',
        duration: '36 horas durante 9 semanas',
        certificate: 'https://pub.coderhouse.com/legacy-certificates/660093a4d757fa2b16d7573c?lang=es',
        type: 'certification',
        projects: [
          {
            name: 'Formularios Reactivos – Proyecto Final',
            technologies: ['Angular', 'Formularios Reactivos'],
            github: 'https://github.com/CandeLandi/proyecto-final-landi',
            icon: 'edit'
          },
          {
            name: 'Aplicación de Búsqueda de Gifs',
            technologies: ['Angular', 'GIPHY API'],
            demo: 'https://angular-search-gifs-app.netlify.app',
            github: 'https://github.com/CandeLandi/gifs-app',
            icon: 'search'
          }
        ],
        skills: [
          'Conceptos básicos de TypeScript y tipado en Angular',
          'Comunicación entre componentes (Inputs, Outputs, servicios)',
          'Formularios Reactivos: FormGroup, FormControl, Validators',
          'Servicios y RxJS: Observables, Subjects, operadores',
          'Router: rutas, parámetros, guards',
          'Módulos: módulos de características y lazy loading',
          'Introducción a gestión de estado con NgRx (patrón Redux)'
        ]
      },
      {
        id: '6',
        title: 'JavaScript: El Curso Completo, Práctico y desde Cero',
        institution: 'Udemy',
        date: '5/11/2023 - 20/1/2024',
        duration: '34.5 horas',
        certificate: 'https://www.udemy.com/certificate/UC-d8010c94-6952-43b8-998e-0ebc001fb86d/',
        type: 'certification',
        projects: [
          {
            name: 'Galería de Imágenes',
            technologies: ['JavaScript', 'DOM'],
            demo: 'https://candelandi.github.io/Galeria',
            github: 'https://github.com/CandeLandi/Galeria',
            icon: 'image'
          },
          {
            name: 'Página de Producto de Tienda + Carrito',
            technologies: ['JavaScript', 'DOM'],
            github: 'https://github.com/CandeLandi/Formulario',
            icon: 'shopping-cart'
          },
          {
            name: 'Formulario por Pasos con Validaciones',
            technologies: ['JavaScript', 'DOM', 'Validación'],
            github: 'https://github.com/CandeLandi/Formulario',
            icon: 'file-text'
          },
          {
            name: 'Explorador de Películas y Series',
            technologies: ['JavaScript', 'API', 'Fetch'],
            demo: 'https://candelandi.github.io/Peliculas',
            github: 'https://github.com/CandeLandi/Peliculas',
            icon: 'film'
          },
          {
            name: 'Rastreador de Gastos Mensuales',
            technologies: ['JavaScript', 'LocalStorage'],
            github: 'https://github.com/CandeLandi/app_gastos',
            icon: 'wallet'
          }
        ],
        skills: [
          'Fundamentos de programación: variables, tipos, operadores, condicionales, funciones, bucles',
          'Manipulación de BOM y DOM para construir UIs interactivas',
          'Formularios: manejo, procesamiento y validación en tiempo real',
          'APIs: fetch, consumir y enviar datos a servicios externos',
          'JavaScript moderno (ES6+): let/const, arrow functions, clases, módulos, promesas, spread/rest',
          'Práctica práctica con 6 proyectos reales'
        ]
      },
      {
        id: '7',
        title: 'JavaScript',
        institution: 'CoderHouse',
        date: '5/9/2023 - 2/11/2023',
        duration: '38 horas durante 10 semanas',
        certificate: 'https://pub.coderhouse.com/legacy-certificates/65561e91936e8e6407add91b?lang=es',
        type: 'certification',
        projects: [
          {
            name: 'TrustTicket - Simulador de venta de entradas',
            technologies: ['JavaScript', 'DOM'],
            github: 'https://github.com/CandeLandi/TrustTicket',
            icon: 'ticket'
          }
        ],
        skills: [
          'Funciones, arrays y objetos',
          'Manipulación del DOM',
          'Almacenamiento y JSON (localStorage/sessionStorage)',
          'Uso de librerías',
          'Asincronía y Promesas',
          'Introducción a Frameworks y Node.js'
        ]
      },
      {
        id: '8',
        title: 'Desarrollo Web',
        institution: 'CoderHouse',
        date: '22/6/2023 - 24/8/2023',
        duration: '38 horas',
        certificate: 'https://pub.coderhouse.com/legacy-certificates/6502049b73048e0e4da3da0b?lang=es',
        type: 'certification',
        projects: [
          {
            name: 'Estilo Pet',
            technologies: ['HTML', 'CSS'],
            demo: 'https://candelandi.github.io/entrega-coder/index.html',
            github: 'https://github.com/CandeLandi/entrega-coder',
            icon: 'heart'
          }
        ],
        skills: [
          'Semántica HTML y mejores prácticas',
          'CSS: Flexbox, Grid, Box Model',
          'Diseño responsivo y media queries',
          'BEM y arquitectura CSS',
          'Flujo de trabajo de prototipado',
          'Animaciones y transiciones CSS',
          'Conceptos básicos de SEO',
          'Git y GitHub',
          'Despliegue a hosting estático'
        ]
      },
      {
        id: '9',
        title: 'Técnico en Comunicación Multimedial',
        institution: 'Escuela de Educación Técnica N°3',
        date: '2012 - 2018',
        duration: '6 años',
        type: 'degree',
        summary: 'Escuela técnica secundaria con orientación multimedial enfocada en diseño gráfico, producción audiovisual y comunicación.',
        skills: [
          'Diseño Gráfico (Photoshop, Illustrator)',
          'Producción Audiovisual (Premiere, Audition)',
          'Guionismo y Principios de Comunicación'
        ]
      }
    ];
    return of(education);
  }
}
