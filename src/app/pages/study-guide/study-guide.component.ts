import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from '../../shared/components/sidemenu/sidemenu.component';
import { StudyCardComponent, StudyCardDefinition } from '../../shared/components/study-card/study-card.component';

interface StudyGuideSection {
  id: string;
  number: string;
  title: string;
  cards: StudyCardDefinition[];
}

interface StudyGuideIntro {
  title: string;
  subtitle: string;
  note: string;
}

@Component({
  selector: 'app-study-guide',
  standalone: true,
  imports: [
    CommonModule,
    SidemenuComponent,
    StudyCardComponent
  ],
  templateUrl: './study-guide.component.html'
})
export class StudyGuideComponent {
  readonly accent = '#8b5cf6';
  readonly accentSoft = 'rgba(139, 92, 246, 0.2)';

  readonly intro: StudyGuideIntro = {
    title: 'Frontend Developer Study Guide',
    subtitle: 'Guía ordenada cronológicamente para aprender desarrollo frontend según mi experiencia',
    note: 'Orden recomendado: Fundamentos → Diseño → Patrones → JavaScript → TypeScript → HTTP → Angular → State Management → Testing'
  };

  readonly sections = signal<StudyGuideSection[]>([
    {
      id: 'fundamentals',
      number: '01',
      title: 'Fundamentos del Desarrollo Web',
      cards: [
        {
          title: 'HTML & CSS',
          items: [
            { label: 'Semantic HTML', description: 'Usar elementos significativos como <article>, <form>, <table> para mejor accesibilidad y SEO.' },
            { label: 'Box Model', description: 'Contenido, padding, borde y margen definen el tamaño y espacio de los elementos.' },
            { label: 'Selectores CSS', description: 'Clases, IDs, elementos, pseudo-clases y especificidad.' },
            { label: 'Accesibilidad', description: 'ARIA labels, alt text, navegación por teclado, contraste de colores.' },
            { label: 'SEO', description: 'Meta tags, estructura semántica, títulos jerárquicos para mejor posicionamiento.' }
          ]
        },
        {
          title: 'Git & Control de Versiones',
          items: [
            { label: 'Comandos Básicos', description: 'git init, add, commit, push para publicar cambios al repositorio remoto.' },
            { label: 'git pull', description: 'Trae y actualiza los cambios del repositorio remoto a tu repositorio local.' },
            { label: 'Branching', description: 'Crear ramas para trabajar en features sin afectar main.' },
            { label: 'Merge & Conflicts', description: 'Integrar cambios y resolver conflictos entre ramas.' },
            { label: 'Pull Requests', description: 'Revisión de código antes de integrar cambios.' },
            { label: 'GitHub/GitLab', description: 'Plataformas para colaboración y hosting de repositorios.' }
          ]
        }
      ]
    },
    {
      id: 'design',
      number: '02',
      title: 'Diseño y Maquetación',
      cards: [
        {
          title: 'Metodologías CSS',
          items: [
            { label: 'BEM', description: 'Block Element Modifier para nomenclatura clara y escalable de clases CSS.' },
            { label: 'Mobile First', description: 'Diseñar primero para móviles y escalar hacia pantallas más grandes.' },
            { label: 'Utility Classes', description: 'Clases pequeñas reutilizables como margin, padding, colores.' },
            { label: 'CSS Variables', description: 'Variables nativas para temas y valores reutilizables.' },
            { label: 'Preprocessors', description: 'SASS/SCSS para variables, nesting y mixins.' }
          ]
        },
        {
          title: 'Sistemas de Layout',
          items: [
            { label: 'Flexbox', description: 'Layout unidimensional con alineación flexible.' },
            { label: 'CSS Grid', description: 'Layout bidimensional para diseños complejos.' },
            { label: 'Responsive Design', description: 'Media queries para adaptar diseño a diferentes tamaños.' },
            { label: 'Viewport Units', description: 'vw, vh, vmin, vmax para tamaños relativos a la pantalla.' },
            { label: 'Figma/Mockups', description: 'Herramientas para diseñar interfaces antes de codificar.' }
          ]
        }
      ]
    },
    {
      id: 'patterns',
      number: '03',
      title: 'Patrones y Principios de Diseño',
      cards: [
        {
          title: 'Principios SOLID',
          items: [
            { label: 'S - Single Responsibility', description: 'Una clase debe tener solo una razón para cambiar.' },
            { label: 'O - Open/Closed', description: 'Abierto para extensión, cerrado para modificación.' },
            { label: 'L - Liskov Substitution', description: 'Las subclases deben ser intercambiables con sus clases base.' },
            { label: 'I - Interface Segregation', description: 'No forzar interfaces que no se usan.' },
            { label: 'D - Dependency Inversion', description: 'Depender de abstracciones, no de implementaciones.' }
          ]
        },
        {
          title: 'Singleton Pattern',
          items: [
            { label: 'Definición', description: 'Garantiza una única instancia de una clase y proporciona un punto de acceso global.' },
            { label: 'Ejemplo conceptual', description: 'Un servicio de autenticación compartido por todos los componentes de la app.' },
            { label: 'Casos de uso', description: 'Servicios de autenticación, configuración global, logger compartido, conexión a base de datos.' }
          ]
        },
        {
          title: 'Factory Pattern',
          items: [
            { label: 'Definición', description: 'Crea objetos sin especificar la clase exacta; delega la decisión de instanciación.' },
            { label: 'Ejemplo conceptual', description: 'Sistema de notificaciones que decide entre email, SMS o push desde una misma fábrica.' },
            { label: 'Casos de uso', description: 'Crear diferentes tipos de notificaciones, reportes o componentes según configuración.' }
          ]
        },
        {
          title: 'Observer Pattern',
          items: [
            { label: 'Definición', description: 'Un subject mantiene observadores y los notifica cuando su estado cambia.' },
            { label: 'Ejemplo conceptual', description: 'Un carrito de compras que notifica al header, sidebar y badges cuando se agrega un producto.' },
            { label: 'Casos de uso', description: 'Carrito de compras, notificaciones en tiempo real, sincronización de datos, RxJS Observables.' }
          ]
        },
        {
          title: 'Decorator Pattern',
          items: [
            { label: 'Definición', description: 'Agrega funcionalidad a un objeto sin modificar su estructura original.' },
            { label: 'Ejemplo conceptual', description: 'Envolver una función para medir su tiempo de ejecución sin alterar la función original.' },
            { label: 'Casos de uso', description: 'Logging automático, medición de performance, caché, decoradores de Angular.' }
          ]
        },
        {
          title: 'POO — Programación Orientada a Objetos',
          items: [
            { label: 'Abstracción', description: 'Modelar entidades del dominio resaltando solo los detalles relevantes para la lógica de negocio.' },
            { label: 'Encapsulamiento', description: 'Proteger el estado interno exponiendo solo métodos controlados para interactuar con el objeto.' },
            { label: 'Herencia', description: 'Compartir comportamiento creando jerarquías que reutilizan y extienden clases base.' },
            { label: 'Polimorfismo', description: 'Permitir que múltiples clases respondan de forma distinta a la misma interfaz o mensaje.' },
            { label: 'Interfaces', description: 'Contratos que definen capacidades comunes sin forzar una implementación concreta.' }
          ]
        },
        {
          title: 'MVVM & Strategy',
          items: [
            { label: 'MVVM', description: 'Separa View, ViewModel y Model para aislar la lógica de presentación.' },
            { label: 'MVVM - Ejemplo', description: 'En una lista de tareas, el Model maneja datos, el ViewModel la lógica y la View muestra resultados.' },
            { label: 'Strategy', description: 'Define algoritmos intercambiables según la situación.' },
            { label: 'Strategy - Ejemplo', description: 'Aplicar distintos descuentos (estudiante, premium) según el tipo de usuario.' }
          ]
        }
      ]
    },
    {
      id: 'javascript',
      number: '04',
      title: 'JavaScript Core',
      cards: [
        {
          title: 'Conceptos Fundamentales',
          items: [
            { label: 'Closures', description: 'Funciones que recuerdan su ámbito léxico incluso al ejecutarse fuera de él.' },
            { label: 'Hoisting', description: 'Variables y funciones se elevan al inicio del scope.' },
            { label: 'Event Loop', description: 'Gestiona operaciones asíncronas con call stack, task queue y microtask queue.' },
            { label: 'Promises & Async/Await', description: 'Manejo de operaciones asíncronas de forma más legible.' },
            { label: 'Coerción de Tipos', description: 'Conversión automática o explícita de un tipo de dato a otro.' }
          ]
        },
        {
          title: 'Operadores de JavaScript',
          items: [
            { label: 'Aritméticos', description: '+, -, *, /, %, ++, --.' },
            { label: 'Comparación', description: '==, ===, !=, !==, >, <, >=, <=.' },
            { label: 'Lógicos', description: '&&, ||, !.' },
            { label: 'Asignación', description: '=, +=, -=, *=, /=, %=.' },
            { label: 'Ternario', description: 'condición ? valorSiTrue : valorSiFalse.' },
            { label: 'Spread/Rest', description: '... para expandir o agrupar elementos.' }
          ]
        },
        {
          title: 'Promesas en JavaScript',
          items: [
            { label: 'Estados', description: 'pending, fulfilled y rejected describen el ciclo de vida de una promesa.' },
            { label: 'then()', description: 'Encadena operaciones cuando la promesa se resuelve de forma satisfactoria.' },
            { label: 'catch()', description: 'Captura errores cuando la promesa es rechazada y evita romper el flujo.' },
            { label: 'finally()', description: 'Ejecuta lógica de limpieza sin importar el resultado de la promesa.' },
            { label: 'Promise.all/any', description: 'Coordina múltiples operaciones asíncronas y gestiona sus resultados en conjunto.' }
          ]
        },
        {
          title: 'Métodos de Arrays - Funciones Esenciales',
          groups: [
            [
              { label: 'map()', description: 'Transforma cada elemento y devuelve un nuevo array sin mutar el original.' },
              { label: 'filter()', description: 'Crea un nuevo array con elementos que cumplen una condición.' },
              { label: 'reduce()', description: 'Reduce el array a un valor único aplicando una función acumuladora.' },
              { label: 'forEach()', description: 'Ejecuta una función por cada elemento para efectos secundarios.' },
              { label: 'find()', description: 'Devuelve el primer elemento que cumple una condición o undefined.' }
            ],
            [
              { label: 'findIndex()', description: 'Devuelve el índice del primer elemento que cumple la condición o -1.' },
              { label: 'some()', description: 'Verifica si al menos un elemento cumple la condición.' },
              { label: 'every()', description: 'Verifica si todos los elementos cumplen la condición.' },
              { label: 'sort()', description: 'Ordena los elementos in-place; acepta función comparadora.' },
              { label: 'includes()', description: 'Verifica si el array contiene un elemento específico.' }
            ]
          ],
          spanCols: true
        }
      ]
    },
    {
      id: 'typescript',
      number: '05',
      title: 'TypeScript',
      cards: [
        {
          title: 'Características Clave',
          items: [
            { label: 'Interfaces', description: 'Definen la estructura de objetos y contratos entre componentes.' },
            { label: 'Generics', description: 'Permiten crear componentes reutilizables para múltiples tipos.' },
            { label: 'Type Inference', description: 'TypeScript detecta automáticamente el tipo de variables.' },
            { label: 'Decorators', description: 'Agregan metadata a clases, propiedades y métodos.' },
            { label: 'Herencia', description: 'Extender clases para reutilizar y especializar comportamiento.' }
          ]
        },
        {
          title: 'Conceptos Avanzados',
          items: [
            { label: 'Union Types', description: 'Variables que pueden ser de múltiples tipos (string | number).' },
            { label: 'Type Guards', description: 'Técnicas para verificar tipos en runtime.' },
            { label: 'Utility Types', description: 'Partial, Pick, Omit, Required para transformar tipos.' },
            { label: 'Enums', description: 'Conjuntos de constantes con nombres significativos.' },
            { label: 'Strict Mode', description: 'Configuración estricta para mayor seguridad de tipos.' }
          ]
        }
      ]
    },
    {
      id: 'json',
      number: '06',
      title: 'JSON - Intercambio de Datos',
      cards: [
        {
          title: '¿Qué es JSON?',
          items: [
            { label: 'Definición', description: 'JavaScript Object Notation, formato ligero de intercambio de datos.' },
            { label: 'JSON.parse()', description: 'Convierte un string JSON en un objeto JavaScript.' },
            { label: 'JSON.stringify()', description: 'Convierte un objeto JavaScript en un string JSON.' },
            { label: 'Estructura', description: 'Usa pares clave-valor { }, arrays [ ] y tipos de datos simples.' },
            { label: 'Tipos soportados', description: 'string, number, boolean, null, object, array.' }
          ]
        },
        {
          title: 'Uso en Desarrollo',
          items: [
            { label: 'APIs REST', description: 'Formato estándar para enviar y recibir datos en APIs web.' },
            { label: 'Configuración', description: 'Archivos como package.json o tsconfig.json.' },
            { label: 'LocalStorage', description: 'Almacenar datos en el navegador en formato JSON.' },
            { label: 'Validación', description: 'JSON Schema para validar estructura de datos.' },
            { label: 'Legibilidad', description: 'Fácil de leer tanto para humanos como máquinas.' }
          ]
        }
      ]
    },
    {
      id: 'http',
      number: '07',
      title: 'HTTP & APIs',
      cards: [
        {
          title: 'Métodos HTTP',
          items: [
            { label: 'GET', description: 'Obtener datos del servidor sin modificarlo.' },
            { label: 'POST', description: 'Enviar datos al servidor para crear nuevos recursos.' },
            { label: 'PUT', description: 'Actualizar un recurso existente completo.' },
            { label: 'PATCH', description: 'Actualizar parcialmente un recurso existente.' },
            { label: 'DELETE', description: 'Eliminar un recurso del servidor.' }
          ]
        },
        {
          title: 'REST vs SOAP',
          items: [
            { label: 'REST', description: 'Estilo arquitectónico basado en HTTP; ligero, flexible y común con JSON.' },
            { label: 'SOAP', description: 'Protocolo basado en XML con estándares estrictos y seguridad integrada.' },
            { label: 'Casos de uso', description: 'REST para web/mobile apps; SOAP para sistemas empresariales críticos.' }
          ]
        },
        {
          title: 'APIs RESTful',
          items: [
            { label: '¿Qué es RESTful?', description: 'API que sigue principios REST: stateless, cacheable, recursos con URIs únicas.' },
            { label: 'Endpoints', description: 'URLs específicas para acceder a recursos del servidor.' },
            { label: 'Status Codes', description: '200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error.' },
            { label: 'CRUD Operations', description: 'Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE).' },
            { label: 'Autenticación', description: 'JWT tokens, OAuth, API keys para verificar identidad.' },
            { label: 'Rate Limiting', description: 'Limitar requests por tiempo para proteger el servidor.' }
          ]
        }
      ]
    },
    {
      id: 'security',
      number: '08',
      title: 'Seguridad Web',
      cards: [
        {
          title: 'Amenazas Comunes',
          items: [
            { label: 'XSS', description: 'Cross-Site Scripting; sanitizar inputs para evitar scripts maliciosos.' },
            { label: 'CSRF', description: 'Cross-Site Request Forgery; usar tokens anti-CSRF.' },
            { label: 'SQL Injection', description: 'Inyección de código SQL malicioso; usar prepared statements.' },
            { label: 'CORS', description: 'Control de acceso a recursos desde otros dominios.' },
            { label: 'HTTPS', description: 'Protocolo seguro con SSL/TLS para proteger datos.' }
          ]
        },
        {
          title: 'Buenas Prácticas',
          items: [
            { label: 'Validación de Inputs', description: 'Validar y sanitizar todos los datos del usuario.' },
            { label: 'Encriptación', description: 'Hashear passwords con bcrypt y proteger datos sensibles.' },
            { label: 'Autenticación JWT', description: 'Tokens seguros con expiración para sesiones.' },
            { label: 'Headers de Seguridad', description: 'CSP, X-Frame-Options, X-XSS-Protection.' },
            { label: 'Actualizaciones', description: 'Mantener dependencias y frameworks al día.' }
          ]
        }
      ]
    },
    {
      id: 'angular-core',
      number: '09',
      title: 'Angular',
      cards: [
        {
          title: 'Conceptos Core',
          items: [
            { label: 'SPA', description: 'Single Page Application que carga una vez y actualiza contenido dinámicamente.' },
            { label: 'Components', description: 'Bloques reutilizables con template, estilos y lógica.' },
            { label: 'Dependency Injection', description: 'Sistema para proporcionar servicios a componentes.' },
            { label: 'Directives', description: 'Instrucciones en el DOM como @if, @for y directivas personalizadas.' },
            { label: 'Content Projection', description: 'ng-content para insertar contenido externo en componentes.' }
          ]
        },
        {
          title: 'Lifecycle Hooks',
          items: [
            { label: 'constructor', description: 'Para inyección de dependencias y tareas ligeras.' },
            { label: 'ngOnInit', description: 'Inicialización del componente y llamadas a APIs.' },
            { label: 'ngOnChanges', description: 'Se ejecuta cuando cambian las propiedades de @Input().' },
            { label: 'ngAfterViewInit', description: 'Después de inicializar la vista y componentes hijos.' },
            { label: 'ngOnDestroy', description: 'Limpieza antes de destruir el componente (unsubscribe, timers).' }
          ]
        },
        {
          title: 'Características Clave',
          items: [
            { label: 'Routing', description: 'Navegación entre vistas con RouterModule.' },
            { label: 'Forms', description: 'Reactive Forms y Template-driven forms.' },
            { label: 'HttpClient', description: 'Servicio para realizar peticiones HTTP.' },
            { label: 'Pipes', description: 'Transformar datos en templates (date, currency, uppercase, personalizadas).' },
            { label: 'NgZone', description: 'Control de detección de cambios y operaciones fuera de Angular.' }
          ]
        },
        {
          title: 'Data Binding y Comunicación',
          items: [
            { label: 'Interpolación', description: '{{ }} para mostrar valores de la clase en el template.' },
            { label: 'Property Binding', description: '[prop]="valor"' },
            { label: 'Event Binding', description: '(evento)="handler($event)"' },
            { label: 'Two-way Binding', description: '[(ngModel)] combina property y event binding para inputs.' },
            { label: 'Inputs y Outputs', description: '@Input() para recibir datos del padre y @Output() EventEmitter para notificar al padre.' },
            { label: 'Servicios Compartidos', description: 'Inyectar servicios con signals u observables para sincronizar estados entre componentes no relacionados.' }
          ]
        }
      ]
    },
    {
      id: 'angular-modern',
      number: '10',
      title: 'Novedades Angular 17-20',
      cards: [
        {
          title: 'Angular 17',
          items: [
            {
              label: 'Signals (estado reactivo)',
              description: 'Contenedores de estado que exponen un getter reactivo. Al mutar su valor notifican a quien los lee sin necesidad de Zone.js, logrando una reactividad predecible y de alto rendimiento.'
            },
            {
              label: 'computed()',
              description: 'Deriva un valor a partir de una o más signals. A diferencia de una signal, no almacena estado propio sino que recalcula en memoria cada vez que sus dependencias cambian y memoiza el resultado.'
            },
            {
              label: 'effect()',
              description: 'Escucha cambios en signals y ejecuta efectos secundarios controlados (peticiones, logs, sincronización). No devuelve valor; su objetivo es reaccionar a la reactividad sin acoplarla al template.'
            },
            { label: 'Control Flow', description: '@if, @for, @switch reemplazan *ngIf y *ngFor.' },
            { label: 'Deferrable Views', description: '@defer para lazy loading y mejor tiempo de carga.' },
            { label: 'Vite + esbuild', description: 'Sistema de build más rápido que webpack.' },
            { label: 'Nueva Sintaxis', description: 'Templates más declarativos y legibles.' }
          ]
        },
        {
          title: 'Angular 18',
          items: [
            { label: 'Zoneless', description: 'Opción experimental para eliminar Zone.js.' },
            { label: 'Signal Inputs', description: 'Inputs basados en signals para mayor reactividad.' },
            { label: 'Signal Queries', description: 'ViewChild y ContentChild con signals.' },
            { label: 'Material 3', description: 'Actualización completa a Material Design 3.' },
            { label: 'SSR Mejorado', description: 'Server-Side Rendering con mejor hidratación.' }
          ]
        },
        {
          title: 'Angular 19',
          items: [
            { label: 'Standalone por Defecto', description: 'Los componentes standalone son el estándar.' },
            { label: 'Linked Signals', description: 'computed() y effect() mejorados para signals derivados.' },
            { label: 'Resource API', description: 'Manejo eficiente de recursos asíncronos.' },
            { label: 'Incremental Hydration', description: 'Hidratación progresiva para SSR.' },
            { label: 'HMR Mejorado', description: 'Hot Module Replacement más rápido en desarrollo.' }
          ]
        },
        {
          title: 'Angular 20 (Preview)',
          items: [
            { label: 'Signal-based Forms', description: 'Formularios completamente reactivos con signals.' },
            { label: 'Zoneless Stable', description: 'Change detection zoneless disponible de forma estable.' },
            { label: 'Partial Hydration', description: 'Hidratación selectiva de componentes en SSR.' },
            { label: 'Enhanced DI', description: 'Inyección de dependencias mejorada con signals.' },
            { label: 'TypeScript 5.x', description: 'Integración optimizada con las últimas versiones de TypeScript.' }
          ]
        }
      ]
    },
    {
      id: 'state-management',
      number: '11',
      title: 'RxJS, NgRx & Redux - State Management',
      cards: [
        {
          title: 'RxJS',
          items: [
            { label: 'Observables', description: 'Streams de datos que emiten múltiples valores en el tiempo.' },
            { label: 'Operadores', description: 'map(), filter(), switchMap(), debounceTime(), takeUntil().' },
            { label: 'Subjects', description: 'Observables multicast que emiten a múltiples suscriptores.' },
            { label: 'Subscription', description: 'Suscribirse y desuscribirse para evitar memory leaks.' }
          ]
        },
        {
          title: 'Observables',
          items: [
            { label: 'Subject', description: 'Multicast sin valor inicial; emite solo valores nuevos.' },
            { label: 'BehaviorSubject', description: 'Incluye valor inicial y emite el último valor a nuevos suscriptores.' },
            { label: 'ReplaySubject', description: 'Almacena y reproduce N valores anteriores.' },
            { label: 'AsyncSubject', description: 'Emite el último valor solamente al completarse.' },
            { label: 'Cold vs Hot', description: 'Cold crea stream por suscriptor; Hot comparte el mismo stream.' }
          ]
        },
        {
          title: 'NgRx',
          items: [
            { label: 'Store', description: 'Estado centralizado e inmutable de la aplicación.' },
            { label: 'Actions', description: 'Eventos que describen cambios; única forma de modificar el estado.' },
            { label: 'Reducers', description: 'Funciones puras que generan nuevo estado.' },
            { label: 'Effects', description: 'Manejan efectos secundarios como llamadas a APIs.' },
            { label: 'Selectors', description: 'Extraen datos específicos del store.' }
          ]
        },
        {
          title: 'Redux',
          items: [
            { label: '3 Principios', description: 'Única fuente de verdad, estado de solo lectura, cambios con funciones puras.' },
            { label: 'Redux Toolkit', description: 'Forma moderna y simplificada de escribir lógica Redux.' },
            { label: 'Middleware', description: 'Redux Thunk para async, Redux Saga para efectos complejos.' },
            { label: 'DevTools', description: 'Time-travel debugging para inspeccionar estado.' },
            { label: 'Uso', description: 'Aplicaciones grandes con estado complejo compartido.' }
          ]
        }
      ]
    },
    {
      id: 'testing',
      number: '12',
      title: 'Testing y Herramientas de Desarrollo',
      cards: [
        {
          title: 'Testing',
          items: [
            { label: 'Unit Tests', description: 'Pruebas de componentes y funciones individuales.' },
            { label: 'E2E Tests', description: 'Pruebas de flujos completos de usuario.' },
            { label: 'Jasmine/Karma', description: 'Framework de testing y runner por defecto en Angular.' },
            { label: 'Jest', description: 'Framework alternativo más rápido y moderno.' },
            { label: 'Coverage', description: 'Medir qué porcentaje del código está cubierto por tests.' }
          ]
        },
        {
          title: 'Herramientas de Desarrollo',
          items: [
            { label: 'Angular CLI', description: 'Generar y gestionar proyectos desde la terminal.' },
            { label: 'VSCode/Cursor', description: 'Editores con extensiones para Angular y TypeScript.' },
            { label: 'Postman', description: 'Probar y documentar APIs REST.' },
            { label: 'DevTools', description: 'Chrome/Firefox DevTools para debugging y profiling.' },
            { label: 'Linters', description: 'ESLint y Prettier para mantener código limpio.' }
          ]
        }
      ]
    }
  ]);
}

