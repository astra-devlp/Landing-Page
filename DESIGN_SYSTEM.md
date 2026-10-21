# Sistema de diseño de ASTRA DEV

Este documento describe el diseño que **ya está implementado** en el rediseño de la home (`/`) y en las páginas de servicio (`/pos`, `/bot-whatsapp`, `/ia`). No propone cambios: documenta lo que existe para que cualquier modificación futura se integre con el resto de la web.

Stack: Angular 21 (componentes standalone, plantillas `.html` por componente) + Tailwind CSS 4 con configuración en CSS (no existe `tailwind.config.js`).

---

## 0. Dónde vive cada cosa

| Qué | Archivo |
| --- | --- |
| Tokens (colores, fuentes, tamaños, espaciados, radios) y utilidades propias | `src/tailwind.css` |
| Tema claro (sobrescribe tokens bajo `html.light`) | `src/tailwind.css` (bloque `html.light`) |
| Reset base, scroll suave, `scroll-padding-top`, zoom en pantallas grandes, scrollbar oculta | `src/styles.scss` |
| Carga de fuentes (Google Fonts) y `<body>` base | `src/index.html` |
| Cambio de tema (clase `dark`/`light` en `<html>`, clave `astra-theme` en localStorage) | `src/app/core/theme/theme.service.ts` |
| Textos de la UI en es / en / pt | `src/app/core/i18n/translations.ts` y tipos en `src/app/core/i18n/i18n.models.ts` |
| Enlaces de WhatsApp (`whatsappUrl`, número `573148281480`) | `src/app/shared/utils/whatsapp.ts` |
| Cascarón de la app (header, main, footer, chat, barra móvil) | `src/app/app.html` |
| Orden de secciones de la home | `src/app/features/inicio/inicio.html` y `inicio.ts` |
| Header | `src/app/core/layout/header/` |
| Footer | `src/app/core/layout/footer/` |
| Chat del asistente (botón, panel, globo) | `src/app/core/layout/chat-widget/chat-widget.ts` |
| Barra inferior móvil | `src/app/core/layout/mobile-cta-bar/mobile-cta-bar.ts` |
| Secciones de la home | `src/app/features/inicio/sections/{hero,proyectos,servicios,cotizador,ia,calculadora,proceso,preguntas,contacto}/` |
| Páginas de servicio | `src/app/features/servicio/` y datos en `src/app/shared/data/service-pages.ts` |
| Piezas UI compartidas | `src/app/shared/ui/{brand-logo,flag,reveal,whatsapp-icon}/` |
| Logos e imágenes | `public/brand/`, `public/projects/`, `public/services/` |

Estructura de la home (`inicio.html`): `Hero → Proyectos → Servicios (incluye Cotizador) → IA (incluye Calculadora) → Proceso → Preguntas → Contacto`. El cierre comercial y el formulario son la misma sección (`contacto`).

---

## 1. Identidad visual

- **Personalidad:** técnica, sobria y directa. Una empresa que construye software y lo demuestra, no una agencia que lo adorna.
- **Composición:** editorial. Títulos grandes alineados a la izquierda, filas separadas por líneas finas, mucho aire. No son cuadrículas de tarjetas.
- **Un solo momento memorable:** el hero (conversación de WhatsApp → asistente IA → sistema). El resto es contenido y calma.
- **Demostrar, no prometer:** se muestran proyectos reales con capturas y demostraciones que no muestran resultados de clientes. Nada de métricas, clientes ni testimonios inventados.
- **Tono del texto:** español natural en segunda persona, verbos claros ("Hablemos de tu proyecto", "Quiero algo así", "Pedir una demo"). Sin tecnicismos. El mismo criterio en en/pt.
- **Color con función:** un azul sólido para la acción principal, el celeste para detalles/estados activos, y tres colores de grupo (verde, azul, violeta) solo para clasificar servicios.
- **Distinción real vs. oferta:** los proyectos entregados (cliente real, producto propio) van grandes; las soluciones que ofrecemos van más pequeñas y rotuladas "Solución".

---

## 2. Tokens de diseño

Todos se declaran en `@theme` de `src/tailwind.css` y Tailwind genera las utilidades (`bg-surface`, `text-accent`, `px-margin-mobile`…).

### 2.1 Colores (tema oscuro, por defecto)

| Token | Valor | Uso |
| --- | --- | --- |
| `background` / `surface` / `surface-dim` | `#090a10` | Fondo de la página (`<body>` usa `bg-background`) |
| `surface-container-lowest` | `#07080c` | Fondos hundidos |
| `surface-container-low` | `#11131b` | Paneles, tarjetas de demo, sección de contacto, formularios |
| `surface-container` | `#171a24` | Hover de botones secundarios, cabeceras de panel |
| `surface-container-high` | `#1f2330` | Burbuja del cliente, pista del slider, hover de ítems |
| `surface-container-highest` | `#292e3d` | Superficie más elevada |
| `outline-variant` | `#2b3040` | **Todas** las líneas divisorias y bordes por defecto |
| `outline` | `#8a91a3` | Números de proceso, pies de imagen, placeholders |
| `on-surface-variant` | `#aab1c2` | Texto secundario (párrafos, descripciones) |
| `on-surface` | `#e8eaf0` | Texto estándar y enlaces |
| `primary` | `#ffffff` | Títulos y texto de máxima jerarquía |
| `accent` | `#7bd0ff` | Iconos, checks, pestañas activas, borde activo, barra de scroll |
| `brand-solid` | `#2457d6` | Botón principal, burbuja del asistente, panel de resultado de la calculadora |
| `group-manage` | `#34d399` | Grupo "Organiza tu negocio" |
| `group-sell` | `#38bdf8` | Grupo "Vende más" |
| `group-automate` | `#a78bfa` | Grupo "Automatiza con IA" |
| `error-container` | `#93000a` | Mensajes de error (chat) |

Hover del botón principal: `#1c47bd` (valor fijo dentro de `btn-brand`).

### 2.2 Colores (tema claro)

`html.light` sobrescribe los **mismos tokens**: fondo `#eef1f7`, superficies blancas (`surface-container-low` `#ffffff`), `outline-variant` `#d0d7e3`, `on-surface` / `primary` `#0b0e1c`, `on-surface-variant` `#3d4456`, `accent` `#1d4ed8`, grupos `#047857` / `#0369a1` / `#6d28d9`. `brand-solid` no cambia. Por eso **nunca se usan colores fijos para texto o fondos**: los tokens cambian solos de tema.

Hay un variante `light:` (`@custom-variant light`) disponible para casos puntuales; hoy no se usa en las plantillas.

### 2.3 Colores fuera de los tokens (excepciones existentes)

- WhatsApp: `#25d366` (avatar del hero, barra móvil, texto del chat) y `#0b0b0d` como texto sobre él.
- Maqueta de móvil WhatsApp de la sección IA: `#1b1e29` (marco), `#0f5d52` (cabecera), `#efeae2` (fondo), `#d9fdd3` (burbuja propia), `#111b21` (texto). Imitan WhatsApp a propósito.
- Fondo de captura del sitio del Dr. Valencia: `#e9edf2` (rellena el `object-contain`).
- Botón blanco sobre el panel azul de la calculadora: texto `#1c3fa8`.
- Botón de tema: `yellow-400` (sol) y `blue-600` (luna) de la paleta de Tailwind, solo en hover/focus.

### 2.4 Tipografía

Cargadas en `src/index.html` desde Google Fonts: **Space Grotesk** (500, 600, 700), **Geist** (400, 500, 600) y **JetBrains Mono** (400, 500). Iconos: **Material Symbols Outlined** (clase `material-symbols-outlined`).

| Rol | Familia | Utilidad |
| --- | --- | --- |
| Titulares y números grandes | Space Grotesk | `font-display` (y alias `font-headline-*`, `font-display-xl`) |
| Cuerpo y UI | Geist | `font-body-md` / `font-body-sm` / `font-body-lg` (todas Geist) |
| Datos mono | JetBrains Mono | `font-mono` / `font-label-*`. Uso mínimo: solo el código de idioma "ES" del header |

Escala de texto de cuerpo (tokens): `text-body-sm` 13/20, `text-body-md` 15/24, `text-body-lg` 18/28.

Escala de titulares realmente usada:

| Nivel | Clases |
| --- | --- |
| H1 del hero | `font-display text-[2.6rem] sm:text-[3.5rem] xl:text-[4.25rem] leading-[1.02] font-semibold tracking-[-0.04em] text-primary`, `max-w-[16ch]` |
| H2 de sección | utilidad `section-title`: Space Grotesk 600, `clamp(2rem, 1.2rem + 3.4vw, 3.75rem)`, interlineado 1.04, tracking `-0.035em`, `text-primary` |
| H2 reducido (FAQ) | `section-title text-[clamp(2rem,1.4rem+2.4vw,3rem)]` |
| H3 de grupo/subbloque | `font-display text-[1.75rem] lg:text-[2.25rem] leading-tight font-semibold tracking-tight text-primary` |
| H3 de proyecto | `text-[1.75rem] lg:text-[2.25rem]` (destacados) / `text-[1.5rem]` (soluciones) |
| H4 de ítem | `font-display text-[1.25rem]`–`[1.375rem] font-semibold` |
| Número grande (demo, calculadora) | `font-display font-semibold tabular-nums` (2.5rem y 4rem) |
| Lede de sección | utilidad `section-lede`: Geist 1.0625rem, interlineado 1.65, `on-surface-variant`, `max-width: 34rem` |
| Párrafo | `font-body-md text-body-md text-on-surface-variant` |
| Texto pequeño / ayuda | `font-body-sm text-body-sm text-on-surface-variant`; pies `text-outline` |

`h1`, `h2`, `h3` usan `text-wrap: balance` y `p` usa `text-wrap: pretty` (base en `tailwind.css`).

### 2.3 Espaciado

Tokens: `margin-mobile` 1.25rem, `margin-tablet` 2rem, `margin` 4rem (márgenes laterales); `space-xs` .25rem, `space-sm` .5rem, `space-md` 1rem, `space-lg` 1.5rem, `space-xl` 2.5rem; `gutter-mobile` 1rem, `gutter` 1.5rem. Se usan como `px-margin-mobile`, `gap-space-md`, etc.

Valores recurrentes en las secciones nuevas (Tailwind estándar, base 4 px):

- **Contenedor de sección:** `mx-auto max-w-[1440px] px-margin-mobile md:px-margin-tablet lg:px-margin`.
- **Padding vertical de sección:** `py-20 lg:py-28` (hero: `pt-10 pb-16 xl:pt-14 xl:pb-24`).
- **Cabecera de sección:** `mb-14 lg:mb-20`.
- **Separación título–párrafo:** `mb-6`; párrafo–CTA: `mb-8`; entre filas de listas: `py-6` o `py-12 lg:py-16` (proyectos).
- **Gaps de rejilla:** `gap-6` (cabeceras), `gap-8`–`gap-16` (composición 7/5), `gap-x-10 gap-y-8` (listas de capacidades).
- **Altura mínima táctil:** botones y enlaces `min-h-11` (44 px) o `min-h-12` (48 px).

Las secciones que usan este patrón son Hero, Proyectos, Servicios, IA, Proceso, Preguntas y Contacto.

### 2.4 Radios

Tokens: `radius` (`rounded`) 0.5rem, `lg` 0.75rem, `xl` 1rem, `full`.

| Radio | Uso |
| --- | --- |
| `rounded-lg` | Botones, inputs, opciones del buscador, selector de solución |
| `rounded-2xl` | Paneles del hero, imágenes de proyecto, formulario, panel de chat |
| `rounded-[2rem]` | Marco del móvil de la sección IA |
| `rounded-full` | Avatares, pastilla "Más pedido", botón flotante del chat, puntos |
| `rounded-xl` / `.card` / `.card-static` | Tarjetas de las páginas de servicio (`0.75rem`) |

### 2.5 Bordes, líneas y sombras

- **Línea estándar:** `border-outline-variant` (1 px; 2 px en la línea superior de cada paso del proceso y en el subrayado de enlaces). Las secciones se separan con `border-t border-outline-variant`.
- **Sombras: no se usan** en la home. La profundidad sale de la diferencia de superficies y de las líneas. Excepciones: el panel y el globo del chat (`shadow-2xl`, `shadow-xl`).
- **No hay degradados, resplandores ni desenfoques decorativos.** El único `backdrop-blur` es el del header y la barra móvil.

---

## 3. Jerarquía visual

1. **Título de sección** (`section-title`, blanco) a la izquierda y **lede** (`section-lede`, gris) a la derecha en escritorio (`lg:col-span-7` + `lg:col-span-5 lg:justify-self-end`); apilados en móvil.
2. **Subtítulo de bloque** (H3 grande) a la izquierda de una lista (grupos de servicio) o en una columna de 5/12 junto a un panel (buscador, calculadora).
3. **Título de ítem** (H4, `font-display` 600) + descripción gris + línea pequeña de contexto ("Ideal para: …").
4. **Texto secundario**: `on-surface-variant`; **terciario**: `outline`.
5. **Un acento por vista:** el botón azul sólido es el elemento más saturado. Los enlaces secundarios no compiten (subrayado fino).

Reglas: títulos siempre `text-primary`; cuerpo siempre `on-surface-variant`; énfasis dentro de una línea con `font-semibold text-on-surface`. Una segunda frase de titular (hero, cierre) va en `text-on-surface-variant`, no en color de acento ni en degradado.

---

## 4. Componentes

### 4.1 Botón principal — `btn-brand`
Definido en `tailwind.css`. Fondo `brand-solid`, texto blanco, hover `#1c47bd`, `:active` baja 1 px. Se compone siempre así:
```html
<a class="btn-brand inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 font-body-md text-body-md font-semibold">
  <app-whatsapp-icon [size]="22" /> Hablemos de tu proyecto
</a>
```
Ejemplos reales: `hero.html`, `contacto.html`, `proceso.html`. En móvil el CTA del hero ocupa todo el ancho (`w-full sm:w-auto` en su contenedor flex).

### 4.2 Enlace secundario — `link-quiet`
Texto en `on-surface` 600 con una línea de 2 px debajo (`outline-variant`) que pasa a `accent` en hover. La línea es un pseudo-elemento, así que queda alineada aunque haya un icono. Usar con `min-h-11` y `inline-flex`. Ejemplos: "Ver proyectos" (hero), "Cotizar" (servicios), "Ver sitio en vivo".

### 4.3 Botón contorno — `btn-quiet`
Borde `outline-variant`, texto `primary`, hover con borde `outline` y fondo `surface-container`. Disponible; hoy no se usa en la home (las acciones secundarias son `link-quiet`).

### 4.4 Etiqueta de estado
Pastilla `rounded-full border border-accent/40 px-2.5 py-0.5 text-[12px] font-semibold text-accent`. Ejemplo: "Más pedido" (`servicios.html`). Distintivos de proyecto: icono + texto en `text-accent font-semibold` seguido de `· sector` en gris (`proyectos.html`).

### 4.5 Listas con icono
Icono Material Symbols en `text-accent` (24–28 px) + título 600 + descripción gris. Ver capacidades de IA (`ia.html`) y checks de proyectos (`check`, 16 px, `text-accent`). Los iconos de servicios toman el color de su grupo (`text-group-*`) mediante el mapa `GROUP_STYLES` en `servicios.ts`.

### 4.6 Filas de contenido (en lugar de tarjetas)
- **Proyectos destacados:** rejilla 12 columnas, imagen 7 + texto 5, alternando lados (`lg:order-*`), separadas por `border-t border-outline-variant`, `py-12 lg:py-16`.
- **Soluciones (no entregas):** dos columnas, imagen `aspect-[16/10]`, rótulo "Solución · sector".
- **Servicios:** por grupo, H3 a la izquierda (`lg:col-span-4`) con una barra de 1×10 del color del grupo encima, y lista `lg:col-span-8` con filas separadas por `border-t`.
- **Proceso:** `ol` de 4 columnas con línea superior de 2 px; sobre ella una línea `accent` cuyo ancho crece con el paso (25/50/75/100 %). Numeral grande `text-outline` (esta es la única secuencia real que usa números).
- **Preguntas:** `details` con `border-t` (el último con `border-b`), icono `add` que gira 45° al abrir.

### 4.7 Paneles (único caso con borde + fondo)
Paneles de demostración y herramientas: `rounded-2xl border border-outline-variant bg-surface-container-low`. Se usan en el hero (chat y sistema), el formulario (`bg-surface`), el buscador y la calculadora (`card-static`). No se anidan paneles dentro de paneles.

### 4.8 Tarjetas `card` / `card-static`
Utilidades de `tailwind.css` (`0.75rem`, borde `outline-variant`, fondo `surface-container-low`; `card` cambia el borde a acento en hover, sin elevación ni sombra). Hoy las usa sobre todo `features/servicio/servicio.html` y el buscador/calculadora. No usarlas para listas en la home.

### 4.9 Formularios (`contacto.html`)
- Etiqueta: `font-body-sm font-semibold text-on-surface` encima del campo; "(opcional)" en gris normal.
- Campo: `min-h-12 w-full rounded-lg border border-outline-variant bg-surface-container-low px-4 py-2.5 text-primary placeholder:text-outline`; foco: `border-accent` + `outline-2 outline-accent`.
- Selector de solución: radios ocultos (`sr-only peer`) con etiqueta `rounded-lg border`; marcado → `border-accent bg-accent/10 text-primary`; foco visible con `peer-focus-visible:outline-accent`. Rejilla `1 → 2 (≥420px) → 3 (≥sm)` columnas.
- Envío: `btn-brand` a todo el ancho; abre WhatsApp con el mensaje armado (`buildQuoteMessage`) y muestra confirmación en un bloque `role="status"`.

### 4.10 Slider — `range-brand`
Pista de 6 px, pulgar circular `brand-solid` con borde del color de superficie (`calculadora.html`).

### 4.11 Buscador de soluciones (`cotizador`)
Barra de progreso de 4 px (`bg-brand-solid`), opciones `min-h-14 rounded-lg border`, resultado como lista con filas `border-t` y recomendación marcada con texto `accent`.

### 4.12 Header (`core/layout/header/`)
Fijo, `h-20`, `border-b border-outline-variant bg-surface/90 backdrop-blur-xl`, `z-50`. Logo (marca sola en móvil, horizontal desde `sm`), navegación visible desde `xl`, selector de idioma (menú desplegable), botón de tema, botón "Cotizar" (`btn-brand`, desde `sm`) y hamburguesa bajo `xl`. Enlace activo: subrayado de 2 px `accent` (`ScrollService.activeSection`). Línea de progreso de lectura de 2 px (`bg-accent`) en el borde inferior. `main` lleva `pt-20` y `html` tiene `scroll-padding-top: 5rem`.

Botón de tema: icono sol (en oscuro) o luna (en claro); en hover/foco el sol pasa a `yellow-400` y la luna a `blue-600`.

### 4.13 Footer (`core/layout/footer/`)
Compacto: `border-t border-outline-variant bg-surface`; tres bloques (logo + frase, navegación en 2 columnas, WhatsApp y correo) y una línea de copyright. No repite los servicios ni añade botones de contacto adicionales.

### 4.14 Chat y barra móvil
- Botón del asistente: `btn-brand` circular de 56 px, abajo a la derecha (`sm:right-6 sm:bottom-6`); en móvil sube a `bottom-20` para dejar sitio a la barra.
- Panel y globo: `rounded-2xl`, borde `outline-variant`, sombra (`shadow-2xl` / `shadow-xl`).
- Barra inferior móvil: aparece tras 500 px de scroll o con el chat abierto; botón WhatsApp verde `#25d366` + botón del asistente `btn-brand`.

### 4.15 Demostración del hero (`hero.html` + `hero.ts`)
Tres piezas en fila (columna en móvil): panel de chat de 300 px, conector con la etiqueta "Asistente con IA" y panel de sistema de 240 px. La conversación se reproduce en bucle; el stock pasa de 3 a 2 al terminar. No lleva rótulo visible; el `aria-label` de la `figure` usa `hero.chat.demo.label`. Si se crea otra demostración, no debe mostrar cifras de resultados reales.

---

## 5. Composición de páginas

Patrón estándar de sección (copiar de `proyectos.html` o `servicios.html`):

```html
<section id="…" class="w-full border-t border-outline-variant py-20 lg:py-28">
  <div class="mx-auto max-w-[1440px] px-margin-mobile md:px-margin-tablet lg:px-margin">
    <div class="mb-14 grid grid-cols-1 items-end gap-6 lg:mb-20 lg:grid-cols-12">
      <h2 class="section-title lg:col-span-7">…</h2>
      <p class="section-lede lg:col-span-5 lg:justify-self-end">…</p>
    </div>
    <!-- contenido en filas, no en tarjetas -->
  </div>
</section>
```

Reglas de composición:

1. Cada sección debe tener una función en el recorrido: qué hacemos → prueba → qué se puede contratar → IA → cómo trabajamos → dudas → contacto.
2. Rejillas de 12 columnas con proporciones 7/5, 5/7, 4/8 y 6/6. Alternar el lado de la imagen entre filas consecutivas.
3. Sub-bloques dentro de una sección (buscador dentro de Servicios, calculadora dentro de IA) usan `mt-20 lg:mt-28 border-t border-outline-variant pt-16 lg:pt-20` con un H3 de 5 columnas y el panel de 7.
4. Separar secciones con `border-t`, no con fondos distintos. La única sección con fondo propio es Contacto (`bg-surface-container-low`), para marcar el cierre.
5. Alineación: contenido a la izquierda. Nada centrado salvo botones apilados en móvil.
6. Cada sección tiene como máximo una acción principal y enlaces secundarios discretos.
7. Un CTA principal de WhatsApp por pantalla; no duplicar botones de contacto.

Las páginas de servicio (`servicio.html`) comparten tokens y utilidades pero conservan su estructura propia (hero con imagen, lista de capacidades, `app-proceso`, `app-contacto`).

---

## 6. Responsive

Breakpoints de Tailwind por defecto: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536. Además hay dos umbrales arbitrarios: `min-[400px]` (iconos de las pestañas de IA) y `min-[420px]` (rejilla del selector de solución).

| Ancho | Comportamiento |
| --- | --- |
| < 640 (móvil) | Una columna. Margen lateral 1.25rem. Hero: H1 2.6rem, CTA a ancho completo, lista de confianza oculta, demo debajo (chat, flecha vertical, panel de sistema). Menú hamburguesa. Barra inferior con WhatsApp + asistente tras 500 px de scroll. |
| 640–767 (`sm`) | Botón "Cotizar" en el header; H1 3.5rem; la demo pasa a fila. |
| 768–1023 (`md`) | Margen 2rem. Rejillas de 2 columnas puntuales. |
| 1024–1279 (`lg`) | Margen 4rem; rejillas de 12 columnas (cabeceras, proyectos, servicios, IA). El hero sigue apilado. |
| ≥ 1280 (`xl`) | Navegación visible en el header; hero en dos columnas (texto + demo de 640 px) con H1 4.25rem. |
| ≥ 2200 | `html { zoom }` 1.25 (≥2200), 1.5 (≥2800), 2 (≥3400) en `styles.scss`, porque el contenedor se limita a 1440 px. |

Criterios: diseñar primero el apilado móvil; en móvil se reorganiza (no solo se reduce): la demo cambia de eje, los enlaces secundarios se centran (`self-center sm:self-auto`), las acciones de servicios pasan debajo del texto. Áreas táctiles ≥ 44 px. Sin desbordamiento horizontal (verificado a 390 px).

---

## 7. Interacciones

- **Hover de enlaces:** `link-quiet` → línea a `accent`. Enlaces de footer/nav: `text-on-surface-variant` → `text-primary`.
- **Hover de botón principal:** `#1c47bd`; `:active` baja 1 px.
- **Hover de botones de icono / opciones:** fondo `surface-container` y borde a `accent` (opciones del buscador); radios del formulario: borde `outline`.
- **Foco:** regla global `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px }` en `tailwind.css`. Campos de formulario añaden `border-accent`; los radios usan `peer-focus-visible`.
- **Active/seleccionado:** pestaña de IA con borde inferior `accent`; opción del buscador y solución marcada con `border-accent`; enlace de navegación de la sección visible.
- **Disabled:** botón de envío del chat `disabled:opacity-50`.
- **Transiciones:** color/borde 200 ms; barra del buscador `width` 500 ms; icono `add` de las preguntas gira 45° en 200 ms; icono de tema `transition-colors 200ms`.
- **Animaciones (definidas en `@theme`):** `rise` 0.7 s (solo la directiva `appReveal`, hoy usada únicamente en `servicio.html`), `pop` 0.4 s (burbujas, resultado del buscador, estado "Apartado"), `flow` 1.6 s lineal (línea punteada del conector, solo mientras la conversación del hero no ha terminado) y `animate-bounce` de Tailwind en los puntos de "escribiendo". No hay animaciones decorativas permanentes ni parallax.
- **Scroll:** `scroll-behavior: smooth` y navegación por anclas con compensación del header.

---

## 8. Accesibilidad y rendimiento

- **Contraste:** el texto blanco sobre `#2457d6` ronda 6:1; el texto principal y secundario sobre `#090a10` es alto. Mantener `on-surface-variant` como el gris más claro permitido para cuerpo y no usar `outline` para texto importante (solo pies y numerales decorativos).
- **Teclado:** foco visible global; menú de idioma con `aria-haspopup`, `aria-expanded`, `role="menuitemradio"` y cierre con Esc; pestañas de IA con `role="tab"` y `aria-selected`; botón de tema y menú con `aria-label` traducido; `details/summary` nativos en preguntas.
- **Semántica:** un solo H1 (hero); iconos decorativos con `aria-hidden="true"`; enlaces repetidos ("Cotizar") llevan `<span class="sr-only">` con el nombre del servicio; la demo del hero es `aria-hidden` dentro de una `figure` con `aria-label`.
- **Movimiento reducido:** `Reveal` omite la animación si `prefers-reduced-motion`; el hero muestra la conversación completa sin reproducirla; la rotación automática de demos de IA no arranca; las animaciones de `tailwind.css` se usan con `motion-safe:`.
- **Rendimiento:** sin dependencias nuevas; imágenes de proyecto con `loading="lazy"`; iconos y fuentes por Google Fonts con `preconnect`; no hay canvas ni bucles de animación de fondo (se eliminó el campo de estrellas). `styles.css` de producción pesa ≈ 48 kB (≈ 8 kB transferidos).
- **Imágenes:** siempre con `alt` descriptivo (los textos viven en `translations.ts` → `projects.items[].imageAlt`). Mantener las proporciones definidas (`aspect-[5/4]`, `aspect-[16/10]`).

---

## 9. Anti-patrones (no hacer)

- Tarjetas idénticas para todo, tarjetas dentro de tarjetas o rejillas de 3–4 tarjetas para listar servicios/proyectos.
- Degradados, resplandores/`blur` decorativos, partículas, brillos al hover, sombras de color o elevaciones al pasar el cursor.
- Pastillas "eyebrow" o etiquetas en MAYÚSCULAS encima de cada título; numeración 01/02/03 donde el contenido no sea una secuencia.
- Resaltar una sola palabra del titular con color o degradado (la segunda frase completa va en gris).
- Barras de anuncio, botones flotantes adicionales o varios botones de contacto en la misma vista.
- Colores nuevos, fuentes nuevas, radios o sombras nuevas sin justificación. Usar tokens; si hace falta un color, definirlo primero en `@theme` (y su par claro en `html.light`).
- Colores fijos (`#hex`, `text-white`) para fondos o textos que deban cambiar con el tema.
- Inventar clientes, testimonios, cifras o logos; presentar una demostración como producto real; mezclar "cliente real" con "solución ofrecida".
- Textos fijos en español dentro de plantillas: todo texto visible va a `translations.ts` en es, en y pt.
- Animar cada sección al entrar en pantalla o añadir movimiento continuo sin función.
- Crear un componente nuevo para algo que ya resuelven `btn-brand`, `link-quiet`, las filas de contenido o los paneles.

---

## 10. Reglas obligatorias para futuras modificaciones

Toda nueva sección, componente o funcionalidad visual debe:

1. **Reutilizar** los tokens (`src/tailwind.css`) y los componentes/utilidades existentes (`btn-brand`, `link-quiet`, `section-title`, `section-lede`, `range-brand`, paneles y filas descritos arriba) siempre que sea posible.
2. **Mantener la paleta real** (sección 2.1/2.2) y la identidad visual: sobria, editorial, con un único azul de acción.
3. **Respetar la jerarquía tipográfica**, el espaciado (`py-20 lg:py-28`, `mb-14 lg:mb-20`, contenedor de 1440 px) y los patrones de composición de la sección 5.
4. **Funcionar en móvil primero** y adaptarse a `sm/md/lg/xl`; sin desbordamiento horizontal; áreas táctiles de al menos 44 px.
5. **Funcionar en tema oscuro y claro**, usando solo tokens para fondos, textos y bordes.
6. **Evitar estilos aislados** que parezcan de otra web (clases arbitrarias con colores, sombras o radios propios).
7. **No introducir** colores, tipografías, sombras, radios o efectos nuevos sin una necesidad justificada y documentada aquí.
8. **No duplicar componentes** si ya existe uno equivalente; ampliar el existente.
9. **Mantener la coherencia** con las secciones vecinas: mismo ritmo de separación, mismas líneas `outline-variant`, mismo tratamiento de CTA.
10. **Traducir** los textos (es, en, pt) y mantener los enlaces de WhatsApp en `whatsappUrl`.
11. **Cuidar accesibilidad**: foco visible, `aria-*` en controles propios, `prefers-reduced-motion` respetado.
12. **Verificar en el navegador** (escritorio ≈ 1440 px y móvil ≈ 390 px, ambos temas) antes de dar el trabajo por terminado; ejecutar `npm test` y `npm run build`.

**Si falta un patrón:** diseñarlo con los mismos tokens y la misma lógica (líneas finas, sin sombras, un acento), implementarlo como utilidad o componente reutilizable y **añadirlo a este documento** en el mismo cambio.

---

## 11. Ejemplos de implementación (referencias)

| Necesitas… | Mira |
| --- | --- |
| Cabecera de sección con título + lede | `features/inicio/sections/proyectos/proyectos.html` (inicio) |
| Fila 7/5 con imagen alternada | `proyectos.html` (`featured()`) |
| Lista agrupada con acciones a la derecha | `servicios.html` |
| Panel interactivo con progreso | `cotizador/cotizador.html` |
| Panel con controles y resultado destacado | `calculadora/calculadora.html` |
| Pestañas + maqueta de móvil | `ia/ia.html` |
| Secuencia numerada | `proceso/proceso.html` |
| Acordeón | `preguntas/preguntas.html` |
| Formulario completo con validación y envío a WhatsApp | `contacto/contacto.html` + `contacto.ts` |
| Demo animada con estados | `hero/hero.html` + `hero.ts` |
| Navegación, menú móvil, idioma, tema | `core/layout/header/header.html` |
| Footer compacto | `core/layout/footer/footer.html` |
| Mapa de colores por grupo | `servicios.ts` (`GROUP_STYLES`) |
| Páginas de servicio | `features/servicio/servicio.html` |

---

## 12. Inconsistencias existentes (posibles mejoras futuras, no corregidas)

- **Barra móvil verde:** `mobile-cta-bar.ts` usa el verde de WhatsApp (`#25d366`) como botón, mientras que el resto de CTA de WhatsApp son `btn-brand` azul con icono. El asistente del chat también usa texto verde.
- **Dos sistemas de espaciado:** el header, el chat y las páginas de servicio usan los tokens `space-*`/`margin-*` (`px-space-lg`), mientras que las secciones nuevas usan valores de Tailwind (`px-6`, `gap-8`). Conviven sin problema pero conviene unificar.
- **Escala de texto mixta:** hay tokens `text-body-*` y también tamaños arbitrarios (`text-[14px]` en burbujas, `text-[12px]` en etiquetas, `text-[1.375rem]` en H4).
- **Páginas de servicio con estructura previa:** `servicio.html` conserva `appReveal` (el contenido aparece al hacer scroll), el H1 con tokens `display-xl` y el `eyebrow`; visualmente coherentes, pero no idénticos al patrón de sección de la home.
- **Utilidades sin uso en la home:** `btn-quiet`, `card`, `card-static` (solo servicio y paneles), `eyebrow` y `text-brand-gradient` (que ahora es un color plano) existen por compatibilidad con las páginas de servicio. `--hairline` está declarada y no se usa. `brand-from/to` y `brand-text-*` siguen definidos como tokens pero ya no se emplean en degradados.
- **Fuentes cargadas de más:** JetBrains Mono y Space Grotesk 700 se descargan, pero apenas se usan (solo el código de idioma "ES" y ningún titular en 700).
- **Textos traducidos sin uso:** claves de `translations.ts` que ya no se muestran: `sectors`, `about.{eyebrow,title,body,stack}`, `announcement`, `floating`, `projects.{eyebrow,includes}` y el campo `code` de cada proyecto.
- **Carpetas vacías:** quedaron `core/layout/announcement-bar/`, `starfield/` y `whatsapp-fab/` sin archivos tras eliminar esos componentes.
- **Formato:** `prettier --check` reporta archivos sin formato (incluidos algunos previos al rediseño; los `.ts`/`.html` usan finales de línea CRLF).
- **`btn-brand:active`** no tiene variante de movimiento reducido (el desplazamiento es de solo 1 px).
