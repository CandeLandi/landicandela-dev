import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { Experience } from '../interfaces/experience.interface';
import { Education } from '../interfaces/education.interface';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  constructor() { }


  getExperience(): Observable<Experience[]> {
    const experience: Experience[] = [
      {
        id: '1',
        title: 'Frontend Developer',
        company: 'Rakium',
        startDate: 'Nov 2024',
        endDate: 'Present',
        period: 'Nov 2024 - Present',
        current: true,
        description:
          'Freelance developer under the name Rakium, building real client websites and APIs using Angular and Tailwind CSS on the frontend, and NestJS with Prisma and PostgreSQL on the backend.',
        technologies: ['Angular', 'Tailwind CSS', 'NestJS', 'Prisma', 'PostgreSQL']
      },
      {
        id: '2',
        title: 'Frontend Developer',
        company: 'Aiko',
        startDate: 'Feb 2025',
        endDate: 'Mar 2025',
        period: 'Feb 2025 - Mar 2025',
        current: false,
        description:
          'Frontend developer working independently on a mobile application using Angular, Tailwind CSS, PrimeNG and Ionic. Contributed to features for trainers, students and clubs to manage routines, diets and training calendars.',
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
        certificate: 'https://udemy.com/certificate/angular-pro',
        type: 'certification',
        projects: [
          {
            name: 'Zoneless Calculator',
            technologies: ['Angular', 'Signals', 'Zoneless'],
            github: 'https://github.com/CandeLandi/zoneless-calculator',
            icon: 'calculator'
          }
        ],
        skills: [
          'Zoneless patterns and Signals for state management',
          'Advanced bindings and template structure corrections',
          'SSR and SSG for performance and SEO',
          'SEO practices and i18n internationalization',
          'Testing strategy: unit and e2e (Jasmine/Karma, etc.)',
          'TanStack data management integrations',
          'Monorepos and custom packages',
          'NPM dependency strategies and custom DI tokens'
        ]
      },
      {
        id: '2',
        title: 'Advanced Angular: MEAN Stack',
        institution: 'Udemy',
        date: '17/8/2024 - 17/10/2024',
        duration: '32.5 hours',
        certificate: 'https://udemy.com/certificate/mean-stack',
        type: 'certification',
        projects: [
          {
            name: 'Admin Pro - Frontend & Backend',
            technologies: ['Angular', 'ExpressJS', 'Google Cloud'],
            demo: 'https://adminpro-backend1-993bf28005ef.herokuapp.com',
            github: 'https://github.com/CandeLandi/admin-pro',
            icon: 'database'
          },
          {
            name: 'Hospital App',
            technologies: ['Angular', 'ExpressJS', 'MongoDB', 'JWT', 'Google Sign-In'],
            github: 'https://github.com/CandeLandi/admin-pro',
            icon: 'activity'
          },
          {
            name: 'Game of the year - Frontend & Backend',
            technologies: ['Angular', 'Firebase', 'ExpressJS'],
            demo: 'https://firestore-chart-67176.web.app',
            github: 'https://github.com/CandeLandi/goty',
            icon: 'gamepad'
          },
          {
            name: 'CRUD Heroes App',
            technologies: ['Angular', 'NestJS', 'MongoDB'],
            demo: 'https://angular-heroes-crud-app.netlify.app',
            github: 'https://github.com/CandeLandi/heroes-app',
            icon: 'shield'
          }
        ],
        skills: [
          'MEAN Stack: Mongo, Express, Angular, Node',
          'Large-scale Angular architecture: modules & lazy loading',
          'JWT authentication and role-based admin panel',
          'Google Sign-In integration',
          'Express REST API: uploads, CORS, pagination',
          'Unit and integration testing',
          'Versioning, releases and deployments (Node/Apache)'
        ]
      },
      {
        id: '3',
        title: 'Redux in Angular with NgRx',
        institution: 'Udemy',
        date: 'Completed - 1/8/2024',
        duration: '12.5 hours',
        certificate: 'https://udemy.com/certificate/redux-angular',
        type: 'certification',
        projects: [
          {
            name: 'Income & Expense App',
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
            name: 'Todo App',
            technologies: ['Angular', 'Redux'],
            demo: 'https://redux-angular-todo-app.netlify.app',
            github: 'https://github.com/CandeLandi/todo-app',
            icon: 'check-square'
          }
        ],
        skills: [
          'Redux fundamentals: actions, reducers, selectors',
          'NgRx Store for centralized state management',
          'NgRx Effects for side effects and async flows',
          'NgRx DevTools for debugging and time-travel',
          'State control patterns and best practices',
          'REST API consumption (ReqRes) and integration',
          'Firebase, AngularFire, Hosting and deploys'
        ]
      },
      {
        id: '4',
        title: 'Angular: From Zero to Expert',
        institution: 'Udemy',
        date: '2/3/2024 - 22/5/2024',
        duration: '45 hours',
        certificate: 'https://udemy.com/certificate/angular-expert',
        type: 'certification',
        projects: [
          {
            name: 'Map App 1',
            technologies: ['Angular', 'Mapbox'],
            demo: 'https://angular-mapas-app-mapbox.netlify.app',
            github: 'https://github.com/candelandi/mapas-app',
            icon: 'map-pin'
          },
          {
            name: 'Map App 2',
            technologies: ['Angular', 'Maps'],
            demo: 'https://angular-mapp-app.netlify.app',
            github: 'https://github.com/CandeLandi/map-app-2',
            icon: 'map'
          },
          {
            name: 'Login/Register',
            technologies: ['Angular', 'NestJS', 'MongoDB'],
            demo: 'https://login-cl.netlify.app/#/auth/login',
            github: 'https://github.com/CandeLandi/auth-app',
            icon: 'user-check'
          },
          {
            name: 'Search Gifs App',
            technologies: ['Angular', 'GIPHY API'],
            demo: 'https://angular-search-gifs-app.netlify.app',
            github: 'https://github.com/CandeLandi/gifs-app',
            icon: 'search'
          },
          {
            name: 'Country App',
            technologies: ['Angular', 'REST Countries API'],
            github: 'https://github.com/CandeLandi/country-app',
            icon: 'globe'
          },
          {
            name: 'Pipes App',
            technologies: ['Angular', 'Custom Pipes'],
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
          'Standalone components, Signals (writable/computed/input/output)',
          'Routing: child routes, lazy loading, guards',
          'HTTP, interceptors, DI and services',
          'Auth with JWT and route protection',
          'Integrations: Mapbox, third‑party and non-Angular libs',
          'APIs, CRUD, file uploads, deploys',
          'Tailwind, component reuse, RxJS resources/effects'
        ]
      },
      {
        id: '5',
        title: 'Angular',
        institution: 'CoderHouse',
        date: '11/12/2023 - 21/2/2024',
        duration: '36 hours across 9 weeks',
        certificate: 'https://coderhouse.com/certificate/angular',
        type: 'certification',
        projects: [
          {
            name: 'Reactive Forms – Final Project',
            technologies: ['Angular', 'Reactive Forms'],
            github: 'https://github.com/CandeLandi/proyecto-final-landi',
            icon: 'edit'
          },
          {
            name: 'Search Gifs App',
            technologies: ['Angular', 'GIPHY API'],
            demo: 'https://angular-search-gifs-app.netlify.app',
            github: 'https://github.com/CandeLandi/gifs-app',
            icon: 'search'
          }
        ],
        skills: [
          'TypeScript basics and typing in Angular',
          'Component communication (Inputs, Outputs, services)',
          'Reactive Forms: FormGroup, FormControl, Validators',
          'Services & RxJS: Observables, Subjects, operators',
          'Router: routes, params, guards',
          'Modules: feature modules & lazy loading',
          'State management intro with NgRx (Redux pattern)'
        ]
      },
      {
        id: '6',
        title: 'JavaScript: The Complete Course',
        institution: 'Udemy',
        date: '5/11/2023 - 20/1/2024',
        duration: '34.5 hours',
        certificate: 'https://udemy.com/certificate/javascript-complete',
        type: 'certification',
        projects: [
          {
            name: 'Image Gallery',
            technologies: ['JavaScript', 'DOM'],
            demo: 'https://candelandi.github.io/Galeria',
            github: 'https://github.com/CandeLandi/Galeria',
            icon: 'image'
          },
          {
            name: 'Store Product Page + Cart',
            technologies: ['JavaScript', 'DOM'],
            github: 'https://github.com/CandeLandi/Formulario',
            icon: 'shopping-cart'
          },
          {
            name: 'Step Form with Validations',
            technologies: ['JavaScript', 'DOM', 'Validation'],
            github: 'https://github.com/CandeLandi/Formulario',
            icon: 'file-text'
          },
          {
            name: 'Movies & Series Explorer',
            technologies: ['JavaScript', 'API', 'Fetch'],
            demo: 'https://candelandi.github.io/Peliculas',
            github: 'https://github.com/CandeLandi/Peliculas',
            icon: 'film'
          },
          {
            name: 'Monthly Expenses Tracker',
            technologies: ['JavaScript', 'LocalStorage'],
            github: 'https://github.com/CandeLandi/app_gastos',
            icon: 'wallet'
          }
        ],
        skills: [
          'Programming fundamentals: variables, types, operators, conditionals, functions, loops',
          'BOM & DOM manipulation to build interactive UIs',
          'Forms: handling, processing and real‑time validation',
          'APIs: fetch, consume and send data to external services',
          'Modern JavaScript (ES6+): let/const, arrow functions, classes, modules, promises, spread/rest',
          'Hands‑on practice with 6 real projects'
        ]
      },
      {
        id: '7',
        title: 'JavaScript',
        institution: 'CoderHouse',
        date: '5/9/2023 - 2/11/2023',
        duration: '38 hours across 10 weeks',
        certificate: 'https://coderhouse.com/certificate/javascript',
        type: 'certification',
        projects: [
          {
            name: 'TrustTicket - Ticket sales simulator',
            technologies: ['JavaScript', 'DOM'],
            github: 'https://github.com/CandeLandi/TrustTicket',
            icon: 'ticket'
          }
        ],
        skills: [
          'Functions, arrays and objects',
          'DOM manipulation',
          'Storage & JSON (localStorage/sessionStorage)',
          'Libraries usage',
          'Asynchrony & Promises',
          'Intro to Frameworks & Node.js'
        ]
      },
      {
        id: '8',
        title: 'Web Development',
        institution: 'CoderHouse',
        date: '22/6/2023 - 24/8/2023',
        duration: '38 hours',
        certificate: 'https://coderhouse.com/certificate/web-development',
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
          'HTML semantics & best practices',
          'CSS: Flexbox, Grid, Box Model',
          'Responsive design & media queries',
          'BEM & CSS architecture',
          'Prototyping workflow',
          'CSS animations & transitions',
          'SEO basics',
          'Git & GitHub',
          'Deployment to static hosting'
        ]
      },
      {
        id: '9',
        title: 'Multimedia Communication Technician',
        institution: 'Escuela de Educación Técnica N°3',
        date: '2012 - 2018',
        duration: '6 years',
        type: 'degree',
        summary: 'Technical high school with a multimedia orientation focused on graphic design, audiovisual production and communication.',
        skills: [
          'Graphic Design (Photoshop, Illustrator)',
          'Audiovisual Production (Premiere, Audition)',
          'Scriptwriting & Communication Principles'
        ]
      }
    ];
    return of(education);
  }
}
