# ✦ Astra Dev

### Ideas que construyen futuro.

**Astra Dev** es un estudio de desarrollo de software enfocado en la creación de soluciones digitales modernas, escalables y orientadas a las necesidades de cada proyecto.

El sitio web presenta los servicios, capacidades en **desarrollo de software e inteligencia artificial aplicada**, proyectos realizados y un canal de contacto para solicitudes y cotizaciones.

---

## 🚀 Sobre el proyecto

Este repositorio contiene el sitio web oficial de **Astra Dev**, desarrollado como una landing page moderna y modular.

El proyecto está pensado para:

* Presentar la identidad y propuesta de Astra Dev.
* Mostrar los servicios de desarrollo de software.
* Presentar soluciones basadas en inteligencia artificial.
* Exhibir proyectos y casos desarrollados.
* Facilitar el contacto con potenciales clientes.
* Mantener una arquitectura frontend organizada y escalable.

---

## 🛠️ Tecnologías utilizadas

| Tecnología             | Uso                                 |
| ---------------------- | ----------------------------------- |
| **Angular 21**         | Framework principal                 |
| **TypeScript**         | Lenguaje de desarrollo              |
| **Tailwind CSS v4**    | Estilos y diseño responsive         |
| **Vitest**             | Pruebas unitarias                   |
| **Angular Standalone** | Arquitectura modular                |
| **Lazy Loading**       | Carga optimizada de funcionalidades |
| **Git / GitHub**       | Control de versiones                |

---

## 🧩 Arquitectura

El proyecto utiliza una estructura modular basada en funcionalidades para mantener el código organizado y facilitar su crecimiento.

```text
src/
└── app/
    ├── core/
    │   └── layout/
    │       ├── header/
    │       ├── footer/
    │       └── stars-background/
    │
    ├── shared/
    │   ├── models/
    │   ├── navigation/
    │   └── logo/
    │
    └── features/
        └── inicio/
            ├── sections/
            │   ├── hero/
            │   ├── servicios/
            │   ├── inteligencia-artificial/
            │   ├── nosotros/
            │   ├── proyectos/
            │   └── contacto/
            │
            └── data/
                └── contenido/
```

### Principios utilizados

* **Standalone Components**
* Separación por funcionalidades
* Componentes reutilizables
* Lazy Loading
* Separación entre contenido y presentación
* Diseño responsive
* Código tipado con TypeScript
* Estructura preparada para crecimiento

---

## ✨ Secciones del sitio

### 🏠 Inicio

Presentación principal de Astra Dev, propuesta de valor y llamada a la acción.

### ⚙️ Servicios

Presentación de los principales servicios de desarrollo de software.

Entre ellos:

* Desarrollo web
* Aplicaciones empresariales
* APIs y backend
* Integración de sistemas
* Automatización de procesos
* Soluciones personalizadas

### 🤖 Inteligencia Artificial

Sección dedicada a las capacidades de **IA aplicada**, mostrando cómo puede utilizarse para automatización, análisis de información y construcción de soluciones inteligentes.

### 👨‍💻 Nosotros

Presentación del enfoque, filosofía y forma de trabajo de Astra Dev.

### 🚀 Proyectos

Espacio destinado a mostrar proyectos y soluciones desarrolladas.

### 📩 Contacto

Canal para que clientes potenciales puedan solicitar información, asesoría o una cotización.

---

## 🎨 Diseño

El sitio utiliza una estética tecnológica inspirada en el concepto de **Astra**, combinando una interfaz moderna con elementos visuales relacionados con el espacio y la tecnología.

Características principales:

* Diseño responsive.
* Interfaz moderna y minimalista.
* Fondo visual con temática espacial.
* Animaciones y transiciones sutiles.
* Componentes reutilizables.
* Adaptación para dispositivos móviles, tablets y escritorio.
* Enfoque en experiencia de usuario.

---

## 📋 Requisitos

Antes de ejecutar el proyecto necesitas tener instalado:

* **Node.js**
* **npm**
* **Git**

Se recomienda utilizar una versión reciente de Node.js compatible con Angular 21.

Puedes comprobar las versiones instaladas con:

```bash
node --version
npm --version
```

---

## ⚡ Instalación

Clona el repositorio:

```bash
git clone https://github.com/AlejaMejia29/AstraDev.git
```

Ingresa al proyecto:

```bash
cd AstraDev
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm start
```

Luego abre:

```text
http://localhost:4200
```

> `npm start` sirve solo Angular: el asistente del chat responde **404** ahí,
> porque su backend es una función de Netlify. Para probar el chat usa `npm run dev`.

### Desarrollo con el chat (Netlify Functions)

1. Copia `.env.example` a `.env` y pon tu clave de la IA (`.env` no se sube a git):

   ```bash
   cp .env.example .env
   ```

2. Levanta Angular y la función juntos:

   ```bash
   npm run dev
   ```

3. Abre `http://localhost:8888`. El chat llama a `/.netlify/functions/chat` como en producción.

En producción (Netlify) las mismas variables, `LLM_API_KEY` y `LLM_BASE_URL`, se configuran en
**Site configuration → Environment variables**. Para reproducir el build de Netlify en local:
`npx netlify build --offline`.

---

## 📦 Scripts disponibles

| Comando                  | Descripción                                          |
| ------------------------ | ---------------------------------------------------- |
| `npm start`              | Servidor de desarrollo de Angular (sin chat)         |
| `npm run dev`            | Angular + función del chat en `localhost:8888`       |
| `npm run build`          | Genera el build de producción                        |
| `npm test`               | Pruebas unitarias de la app                          |
| `npm run test:functions` | Pruebas de la función del chat (filtro, prompt, API) |

---

## 🧪 Testing

El proyecto utiliza **Vitest** para las pruebas unitarias.

Para ejecutar los tests:

```bash
npm test
```

---

## 🏗️ Build de producción

Para generar una versión optimizada para producción:

```bash
npm run build
```

Los archivos generados estarán disponibles en la carpeta de distribución configurada por Angular.

---

## 📱 Responsive Design

La interfaz está diseñada para adaptarse a diferentes tamaños de pantalla:

```text
Desktop
   ↓
Tablet
   ↓
Mobile
```

Los componentes y layouts utilizan **Tailwind CSS** para mantener una experiencia consistente en diferentes dispositivos.

---

## 🔮 Próximas mejoras

Algunas funcionalidades que pueden incorporarse posteriormente:

* [ ] Blog tecnológico.
* [ ] Panel administrativo para proyectos.
* [ ] Formulario de contacto conectado a backend.
* [ ] Integración con WhatsApp.
* [ ] Sistema de cotizaciones.
* [ ] Animaciones adicionales.
* [ ] Métricas y analítica.
* [ ] Integración de asistentes de IA.
* [ ] CMS para administrar el contenido.
* [ ] Internacionalización español / inglés.

---

## 🌐 Repositorio

El código fuente del proyecto se encuentra disponible en GitHub:

**Astra Dev**
https://github.com/AlejaMejia29/AstraDev

---

## 👨‍💻 Desarrollo

Proyecto desarrollado para **Astra Dev**, con enfoque en desarrollo de software, experiencias digitales e inteligencia artificial aplicada.

> **Astra Dev — Ideas que construyen futuro.**

---

## 📄 Licencia

Este proyecto es de **uso privado**.

Todos los derechos reservados © **Astra Dev**.
