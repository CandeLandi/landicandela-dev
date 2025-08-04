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

  getFeaturedProjects(): Observable<Project[]> {
    const projects: Project[] = [
      {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform built with Angular and Node.js. Features include user authentication, product management, shopping cart, and payment integration.',
        imageUrl: 'https://via.placeholder.com/500x300/8B5CF6/FFFFFF?text=E-Commerce+Platform',
        images: [
          'https://via.placeholder.com/500x300/8B5CF6/FFFFFF?text=E-Commerce+1',
          'https://via.placeholder.com/500x300/7C3AED/FFFFFF?text=E-Commerce+2',
          'https://via.placeholder.com/500x300/6D28D9/FFFFFF?text=E-Commerce+3'
        ],
        technologies: ['Angular', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe'],
        liveUrl: 'https://ecommerce-demo.com',
        githubUrl: 'https://github.com/candelandi/ecommerce-platform',
        featured: true
      },
      {
        id: '2',
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        imageUrl: 'https://via.placeholder.com/500x300/8B5CF6/FFFFFF?text=Task+App',
        images: [
          'https://via.placeholder.com/500x300/8B5CF6/FFFFFF?text=Task+App+1',
          'https://via.placeholder.com/500x300/7C3AED/FFFFFF?text=Task+App+2'
        ],
        technologies: ['Angular', 'Firebase', 'TypeScript', 'Tailwind CSS'],
        liveUrl: 'https://taskapp-demo.com',
        githubUrl: 'https://github.com/candelandi/task-management',
        featured: true
      },
      {
        id: '3',
        title: 'Portfolio Website',
        description: 'A modern, responsive portfolio website showcasing my skills and projects with smooth animations and interactive elements.',
        imageUrl: 'https://via.placeholder.com/500x300/8B5CF6/FFFFFF?text=Portfolio',
        images: [
          'https://via.placeholder.com/500x300/8B5CF6/FFFFFF?text=Portfolio+1',
          'https://via.placeholder.com/500x300/7C3AED/FFFFFF?text=Portfolio+2',
          'https://via.placeholder.com/500x300/6D28D9/FFFFFF?text=Portfolio+3'
        ],
        technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        liveUrl: 'https://candela-landi.dev',
        githubUrl: 'https://github.com/candelandi/portfolio',
        featured: true
      }
    ];
    return of(projects);
  }

  getExperience(): Observable<Experience[]> {
    const experience: Experience[] = [
      {
        id: '1',
        title: 'Frontend Developer',
        company: 'TechCorp',
        startDate: '2023',
        endDate: 'Present',
        period: '2023 - Presente',
        current: true,
        description: 'Developing modern web applications using Angular, TypeScript, and Tailwind CSS. Collaborating with design and backend teams to deliver high-quality user experiences.',
        technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'Git', 'Agile']
      },
      {
        id: '2',
        title: 'Junior Developer',
        company: 'StartupXYZ',
        startDate: '2022',
        endDate: '2023',
        period: '2022 - 2023',
        current: false,
        description: 'Built responsive web applications and maintained existing codebase. Worked with React and Node.js to create user-friendly interfaces.',
        technologies: ['React', 'JavaScript', 'Node.js', 'CSS3', 'HTML5']
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
            name: 'Advanced Authentication System',
            technologies: ['Angular', 'JWT', 'Signals'],
            demo: 'https://auth-demo.com',
            github: 'https://github.com/candelandi/auth-system',
            icon: 'code'
          },
          {
            name: 'Internationalization App',
            technologies: ['Angular', 'i18n', 'TypeScript'],
            demo: 'https://i18n-demo.com',
            github: 'https://github.com/candelandi/i18n-app',
            icon: 'globe'
          },
          {
            name: 'Custom Package Manager',
            technologies: ['Node.js', 'Angular', 'CLI'],
            demo: 'https://package-demo.com',
            github: 'https://github.com/candelandi/custom-package',
            icon: 'package'
          }
        ]
      },
      {
        id: '2',
        title: 'Angular avanzado: MEAN Stack',
        institution: 'Udemy',
        date: '17/8/2024 - 17/10/2024',
        duration: '32.5 horas',
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
        ]
      },
      {
        id: '3',
        title: 'REDUX en Angular con NGRX',
        institution: 'Udemy',
        date: 'Finalizado - 1/8/2024',
        duration: '12.5 horas',
        certificate: 'https://udemy.com/certificate/redux-angular',
        type: 'certification',
        projects: [
          {
            name: 'Ingresos Egresos App',
            technologies: ['Angular', 'Redux', 'Firebase'],
            demo: 'https://income-exit-adf5b.web.app/login',
            github: 'https://github.com/CandeLandi/income-outcome-app',
            icon: 'dollar-sign'
          },
          {
            name: 'Effects con Ngrx',
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
        ]
      },
      {
        id: '4',
        title: 'Angular: De cero a experto',
        institution: 'Udemy',
        date: '2/3/2024 - 22/5/2024',
        duration: '45 horas',
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
          }
        ]
      },
      {
        id: '5',
        title: 'Angular',
        institution: 'CoderHouse',
        date: '11/12/2023 - 21/2/2024',
        duration: '36 horas en 9 semanas',
        certificate: 'https://coderhouse.com/certificate/angular',
        type: 'certification',
        projects: [
          {
            name: 'Search Gifs App',
            technologies: ['Angular', 'GIPHY API'],
            demo: 'https://angular-search-gifs-app.netlify.app',
            github: 'https://github.com/CandeLandi/gifs-app',
            icon: 'search'
          },
          {
            name: 'Formularios en Angular',
            technologies: ['Angular', 'Reactive Forms'],
            demo: 'https://angular-forms-r.netlify.app',
            github: 'https://github.com/CandeLandi/forms-app',
            icon: 'edit'
          },
          {
            name: 'Pipes en Angular',
            technologies: ['Angular', 'Custom Pipes'],
            demo: 'https://pipes-in-angular.netlify.app',
            github: 'https://github.com/CandeLandi/pipes-app',
            icon: 'filter'
          }
        ]
      },
      {
        id: '6',
        title: 'Javascript: El Curso Completo',
        institution: 'Udemy',
        date: '5/11/2023 - 20/1/2024',
        duration: '34.5 horas',
        certificate: 'https://udemy.com/certificate/javascript-complete',
        type: 'certification',
        projects: [
          {
            name: 'Gif App',
            technologies: ['React', 'Jest', 'GIPHY API'],
            demo: 'https://gifs-expert-react-app.netlify.app',
            github: 'https://github.com/CandeLandi/gif-expert-app-react',
            icon: 'image'
          },
          {
            name: 'Películas',
            technologies: ['JavaScript', 'DOM', 'API'],
            demo: 'https://candelandi.github.io/Peliculas',
            github: 'https://github.com/CandeLandi/Peliculas',
            icon: 'film'
          },
          {
            name: 'Galería',
            technologies: ['JavaScript', 'DOM'],
            demo: 'https://candelandi.github.io/Galeria',
            github: '',
            icon: 'image'
          }
        ]
      },
      {
        id: '7',
        title: 'JavaScript',
        institution: 'CoderHouse',
        date: '5/9/2023 - 2/11/2023',
        duration: '38 horas en 10 semanas',
        certificate: 'https://coderhouse.com/certificate/javascript',
        type: 'certification',
        projects: [
          {
            name: 'Formulario por pasos',
            technologies: ['JavaScript', 'DOM', 'Validation'],
            demo: 'https://candelandi.github.io/Formulario',
            github: 'https://github.com/CandeLandi/Formulario',
            icon: 'file-text'
          },
          {
            name: 'Card Component',
            technologies: ['JavaScript', 'CSS', 'DOM'],
            demo: 'https://candelandi.github.io/card-component',
            github: 'https://github.com/CandeLandi/card-component',
            icon: 'credit-card'
          }
        ]
      },
      {
        id: '8',
        title: 'Desarrollo web',
        institution: 'CoderHouse',
        date: '22/6/2023 - 24/8/2023',
        duration: '38 horas',
        certificate: 'https://coderhouse.com/certificate/web-development',
        type: 'certification',
        projects: [
          {
            name: 'Estilo Pet',
            technologies: ['HTML', 'CSS', 'Responsive'],
            demo: 'https://candelandi.github.io/entrega-coder/index.html',
            github: 'https://github.com/CandeLandi/entrega-coder',
            icon: 'heart'
          },
          {
            name: 'Card Component',
            technologies: ['HTML', 'CSS'],
            demo: 'https://candelandi.github.io/card-component',
            github: 'https://github.com/CandeLandi/card-component',
            icon: 'credit-card'
          }
        ]
      },
      {
        id: '9',
        title: 'Técnico en Comunicación Multimedial',
        institution: 'Escuela de Educación Técnica N°3',
        date: '2012 - 2018',
        duration: '6 años',
        type: 'degree',
        projects: [
          {
            name: 'Video Production',
            technologies: ['Video Editing', 'Animation', 'Storytelling'],
            demo: 'https://video-demo.com',
            github: 'https://github.com/candelandi/video-production',
            icon: 'video'
          },
          {
            name: 'Graphic Design Portfolio',
            technologies: ['Design', 'Illustration', 'Branding'],
            demo: 'https://design-demo.com',
            github: 'https://github.com/candelandi/design-portfolio',
            icon: 'image'
          },
          {
            name: 'Web Development',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            demo: 'https://web-demo.com',
            github: 'https://github.com/candelandi/web-development',
            icon: 'code'
          }
        ]
      }
    ];
    return of(education);
  }
}
