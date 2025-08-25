# Motion Guide – Angular 19 Portfolio (Tailwind + Material)

Guía práctica y pegable para implementar animaciones **sutiles, profesionales y performantes** en una landing de portfolio con **side menu**.

> Stack: **Angular 19** (standalone + signals), **Tailwind CSS**, **Angular Material**.  
> Objetivo: micro‑interacciones consistentes, sin sobrecargar.

---

## 0) Setup base (Angular Animations)

```ts
// app.config.ts
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig = {
  providers: [provideAnimations()],
};
```

---

## 1) Sistema de Motion (recomendado)
- **Duraciones**: `120ms` (hover) · `200ms` (UI) · `260–300ms` (entradas)
- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out suave)
- **Distancias**: 8–16px máx
- **Stagger**: 40–80ms
- **Props animables**: `opacity`, `transform` (GPU-friendly)
- **A11y**: respetar `prefers-reduced-motion`

```css
/* global.css */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

---

## 2) Preset reutilizable (Angular Animations)

Crear un archivo `src/app/shared/motion.ts` con presets:

```ts
// motion.ts
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const fadeSlideIn = (name = 'fadeSlideIn') =>
  trigger(name, [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(8px)' }),
      animate('260ms cubic-bezier(0.22,1,0.36,1)',
        style({ opacity: 1, transform: 'translateY(0)' }))
    ])
  ]);

export const listStagger = trigger('listStagger', [
  transition(':enter', [
    query(':scope > *', [
      style({ opacity: 0, transform: 'translateY(8px)' }),
      stagger(60, animate('260ms cubic-bezier(0.22,1,0.36,1)',
        style({ opacity: 1, transform: 'translateY(0)' })))
    ], { optional: true })
  ])
]);

export const routeAnim = trigger('routeAnim', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
    query(':leave', [
      animate('180ms cubic-bezier(0.22,1,0.36,1)',
        style({ opacity: 0, transform: 'translateY(-8px)' }))
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(8px)' }),
      animate('220ms 60ms cubic-bezier(0.22,1,0.36,1)',
        style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true })
  ])
]);
```

Uso rápido en un componente:

```ts
// hero.component.ts
import { Component } from '@angular/core';
import { fadeSlideIn, listStagger } from '../shared/motion';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  animations: [fadeSlideIn(), listStagger],
})
export class HeroComponent {}
```

```html
<!-- hero.component.html -->
<section [@listStagger] class="space-y-4">
  <h1 class="hero-item text-4xl font-bold">Hi, I’m Candela</h1>
  <p class="hero-item text-muted-foreground">Frontend Developer</p>
  <div class="hero-item flex gap-3">
    <a class="btn-primary transition-transform duration-200 hover:-translate-y-0.5 active:scale-95">View CV</a>
    <a class="btn-outline transition-transform duration-200 hover:-translate-y-0.5 active:scale-95">Contact</a>
  </div>
</section>
```

---

## 3) Side Menu (hover + indicador activo deslizante)

- **Hover** íconos: `scale(1.05)` + glow sutil.
- **Indicador activo**: una pill/marker que se mueve con `translateY` entre ítems.
- **Tooltips**: fade + slide (`120ms`).

```html
<!-- botón de side menu -->
<button
  class="group relative grid place-items-center h-10 w-10 rounded-xl transition-transform duration-150
         hover:scale-105 focus:scale-105">
  <svg><!-- icon --></svg>
  <!-- tooltip -->
  <span
    class="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 opacity-0 translate-x-1
           rounded-md px-2 py-1 text-sm bg-black/70 text-white shadow
           transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0">
    Projects
  </span>
</button>
```

Indicador activo (ejemplo simple):

```html
<div class="relative">
  <nav class="flex flex-col gap-2">
    <button class="h-10 w-10 ..."></button>
    <button class="h-10 w-10 ..."></button>
    <button class="h-10 w-10 ..."></button>
  </nav>
  <span
    class="absolute left-0 h-10 w-1 rounded-full bg-violet-400 transition-transform duration-200"
    [style.transform]="'translateY(' + activeIndex * 48 + 'px)'"></span>
</div>
```

> Ajustar `48px` a la altura real de cada item.

---

## 4) Reveal on Scroll (directiva ligera)

```ts
// reveal.directive.ts
import { Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({ selector: '[reveal]' })
export class RevealDirective implements OnDestroy {
  private io: IntersectionObserver;
  constructor(el: ElementRef) {
    this.io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.nativeElement.classList.add('reveal-in');
        this.io.disconnect();
      }
    }, { threshold: 0.15 });
    this.io.observe(el.nativeElement);
  }
  ngOnDestroy() { this.io?.disconnect(); }
}
```

```html
<article reveal class="opacity-0 translate-y-3 transition-all duration-300"> ... </article>
```

```css
/* global.css */
.reveal-in { opacity: 1 !important; transform: translateY(0) !important; }
```

---

## 5) Cards (Projects/Education)

- **Entrada**: `reveal` (fade + slide-up)
- **Hover**: lift sutil (shadow + `-translate-y-1`)

```html
<div class="rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl/20">
  <!-- contenido card -->
</div>
```

---

## 6) Timeline (Work Experience)

- **Bullet activo**: pulso leve.
- **Expand/collapse**: animación de altura con Angular Animations.

```js
// tailwind.config.js (añadir)
export default {
  theme: {
    extend: {
      keyframes: {
        pulseSoft: { '0%,100%': { opacity: .6 }, '50%': { opacity: 1 } }
      },
      animation: {
        pulseSoft: 'pulseSoft 2.5s ease-in-out infinite'
      }
    }
  }
}
```

```html
<span class="h-2.5 w-2.5 rounded-full bg-violet-400 animate-pulseSoft"></span>
```

Expand/collapse con Angular:

```ts
import { trigger, state, style, transition, animate } from '@angular/animations';

export const expandY = trigger('expandY', [
  state('collapsed', style({ height: '0px', overflow: 'hidden', opacity: 0 })),
  state('expanded',  style({ height: '*',   overflow: 'hidden', opacity: 1 })),
  transition('collapsed <=> expanded', animate('200ms cubic-bezier(0.22,1,0.36,1)')),
]);
```

---

## 7) Hero (stagger + scale-in del avatar)

```ts
// hero.anim.ts
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const heroIn = trigger('heroIn', [
  transition(':enter', [
    query('.hero-item', [
      style({ opacity: 0, transform: 'translateY(10px)' }),
      stagger(70, animate('300ms cubic-bezier(0.22,1,0.36,1)',
        style({ opacity: 1, transform: 'translateY(0)' })))
    ])
  ])
]);
```

```html
<section [@heroIn] class="space-y-4">
  <h1 class="hero-item text-4xl font-bold">Hi, I’m Candela</h1>
  <p class="hero-item">Full Stack Developer</p>
  <img class="hero-item rounded-full will-change-transform" />
</section>
```

---

## 8) CTA & Botones (feedback táctil)

```html
<a class="inline-flex items-center rounded-xl px-4 py-2 transition-transform duration-150
          hover:-translate-y-0.5 active:scale-95 shadow-sm">
  Let’s work together
</a>
```

---

## 9) Lottie (opcional, hero/branding)

Usar **ngx-lottie** (ligero) sólo si aporta valor visual.

```bash
npm i lottie-web ngx-lottie
```

```ts
import { LottieModule } from 'ngx-lottie';
export function playerFactory() { return import('lottie-web'); }

// En el standalone import correspondiente
LottieModule.forRoot({ player: playerFactory })
```

```html
<ng-lottie [options]="{ path: '/assets/hero.json', loop: true, autoplay: true }"></ng-lottie>
```

---

## 10) Scroll/Parallax (solo si hace falta)

- **Ligero**: Motion One (Web Animations API) para micro-parallax de fondos.
- **Potente**: GSAP + ScrollTrigger en secciones puntuales (lazy-load). Evitarlo si no es necesario por peso.

> Consejo: si usás SSR/hydration, gatear cualquier acceso a `window` con `isPlatformBrowser`.

---

## 11) Utilidades Tailwind recomendadas

### Transiciones rápidas
```html
<!-- hover/focus genérico -->
<div class="transition-transform transition-opacity duration-200"></div>
```

### Keyframes de glow sutil (opcional)
```js
// tailwind.config.js
extend: {
  keyframes: {
    glow: {
      '0%,100%': { boxShadow: '0 0 0 0 rgba(168,85,247,0.0)' },
      '50%': { boxShadow: '0 0 40px 6px rgba(168,85,247,0.35)' }
    }
  },
  animation: { glow: 'glow 2.2s ease-in-out infinite' }
}
```

```html
<div class="animate-glow rounded-2xl"></div>
```

---

## 12) Transiciones de Ruta (crossfade breve)

```ts
// app.component.ts (ejemplo)
import { Component } from '@angular/core';
import { routeAnim } from './shared/motion';

@Component({
  selector: 'app-root',
  template: `<main [@routeAnim]><router-outlet /></main>`,
  animations: [routeAnim]
})
export class AppComponent {}
```

---

## 13) Performance
- Animar **solo** `transform` y `opacity`.
- Evitar animar layout (`width/height/left/top`) salvo en expand/collapse con anim.
- Usar `will-change: transform, opacity` en elementos animados.
- Lazy-load de librerías pesadas (GSAP) y assets.
- Reducir frecuencia/duración de animaciones en móviles.

---

## 14) Orden de implementación sugerido
1. Preset `motion.ts` + `provideAnimations` ✅
2. Hero con `listStagger` ✅
3. Side menu (hover + indicador activo) ✅
4. Cards con `reveal` + hover lift ✅
5. Timeline (pulse + expand/collapse) ✅
6. CTA (feedback táctil) ✅
7. Lottie/parallax (si aporta) ✅

---

## 15) Checklist final
- [ ] Consistencia de duraciones/easings
- [ ] A11y: `prefers-reduced-motion`
- [ ] Scroll reveal solo cuando aporta
- [ ] Side menu con indicador activo suave
- [ ] Hero/CTA con microinteracciones
- [ ] Lighthouse OK (no jank, CLS≤0.05)

---

**Listo para pegar en Cursor.** Ajustar nombres de archivos/rutas según tu estructura. Si se requiere, puedo generar un PR con estos archivos creados y wireados.

