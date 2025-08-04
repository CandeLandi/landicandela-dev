# Shared Components & Styles

## 📁 Estructura de Carpetas

```
src/app/shared/
├── components/          # Componentes reutilizables
│   └── sidemenu/       # Navegación lateral
├── styles/             # Estilos globales
│   └── colors.css      # Paleta de colores
└── README.md           # Esta documentación
```

## 🎨 Paleta de Colores

### Colores Base
- **Background**: `#000000` (Negro puro)
- **Foreground**: `#FFFFFF` (Blanco puro)

### Colores Primarios
- **Primary**: `#8B5CF6` (Violeta vibrante)
- **Primary Foreground**: `#FFFFFF`

### Colores de Tarjetas
- **Card Background**: `#0D0D0D` (Negro muy oscuro)
- **Card Foreground**: `#FFFFFF`

### Colores Neutros
- **Muted**: `#1A1A1A` (Gris oscuro)
- **Muted Foreground**: `#999999` (Gris medio)

## 🛠️ Uso de Colores

### En Tailwind CSS
```html
<!-- Usando clases personalizadas -->
<div class="bg-primary text-primary-foreground">
<div class="bg-card text-card-fg">
<div class="bg-muted text-muted-foreground">
```

### En CSS Personalizado
```css
/* Usando variables CSS */
.my-component {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `< 1024px` - Header móvil
- **Desktop**: `≥ 1024px` - Sidemenu fijo

### Sidemenu
- **Desktop**: `w-20` (80px) en lg, `w-24` (96px) en xl
- **Mobile**: Header sticky con menú desplegable

## 🔧 Componentes

### SidemenuComponent
- **Ubicación**: `shared/components/sidemenu/`
- **Funcionalidad**: Navegación lateral con scroll automático
- **Características**:
  - Detección automática de sección activa
  - Tooltips en hover
  - Enlaces sociales
  - Menú móvil responsive

## 📋 Mejores Prácticas

1. **Reutilización**: Todos los componentes en `shared/` son reutilizables
2. **Colores**: Usar siempre la paleta definida en `colors.css`
3. **Responsive**: Implementar siempre mobile-first
4. **Accesibilidad**: Incluir `title` y `aria-label` en elementos interactivos
5. **Performance**: Usar `OnPush` change detection cuando sea posible

## 🎯 Próximos Pasos

- [ ] Crear más componentes compartidos
- [ ] Implementar tema oscuro/claro
- [ ] Agregar animaciones globales
- [ ] Optimizar para SEO 
