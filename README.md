# 🧑‍💻 One Page CV

Un portfolio personal minimalista y profesional que funciona como CV online de una sola página. Construido con HTML, CSS y JavaScript vanilla — sin frameworks, sin dependencias.

---

## ✨ Características

- 🌐 **Multi-idioma** — toda la información se gestiona desde archivos `.json`, sin tocar el HTML
- 🎨 **Personalización visual** — modo dark/light y 3 paletas de color
- ♿ **Accesible** — estructura semántica, `aria-*`, `role`, `focus-visible` y respeto por `prefers-reduced-motion`
- 🔍 **SEO** — Open Graph, Twitter Cards, `canonical`, `robots`, `lang` sincronizado
- ⚡ **Liviano y rápido** — sin frameworks, lazy-load de imágenes, scroll-spy pasivo

---

## 📁 Estructura del proyecto

```
📦 one-page-cv/
├── index.html
├── assets/
│   ├── css/
│   │   ├── OnePage.css      ← Variables, reset, utilidades
│   │   └── style.css        ← Componentes y estilos específicos
│   ├── images/
│   ├── js/
│   │   ├── OnePage.js       ← Punto de entrada
│   │   ├── Observer.js      ← IntersectionObserver (lazy load + reveal)
│   │   ├── SendMessage.js   ← Lógica del formulario
│   │   ├── utils.js         ← loader, attributes, newElement, scrollSpy, params
│   │   ├── components/
│   │   │   ├── badge.js
│   │   │   ├── nav-item.js
│   │   │   ├── project.js
│   │   │   └── tech.js
│   │   └── sections/
│   │       ├── AboutMe.js
│   │       ├── Projects.js
│   │       ├── Technologies.js
│   │       └── Traits.js
│   └── json/
│       ├── es/
│       │   ├── bio.json
│       │   ├── projects.json
│       │   └── technologies.json
│       └── en/
│           ├── bio.json
│           ├── projects.json
│           └── technologies.json
└── README.md
```

---

## 📩 Formulario de contacto

Registrate en [Formspree](https://formspree.io/) (gratuito) y reemplazá el `action` del formulario:

```html
<form action="https://formspree.io/f/TU_ID" ...>
```

---

## 🗂️ Archivos JSON

### `{lang}.json` (ej. `es.json`) — configuración base del idioma

```json
{
  "Title": "One Page CV — Tu Nombre",
  "NavbarItems": {
    "sobre_mi": "Sobre mí",
    "tecnologias": "Tecnologías",
    "proyectos": "Proyectos",
    "contacto": "Contacto"
  },
  "Categories": {
    "frontend": "Frontend",
    "backend": "Backend"
  },
  "Contact": {
    "heading": "Contacto",
    "description": "¿Querés hablar?",
    "fields": {
      "nombre": "Nombre:",
      "correo": "Correo:",
      "mensaje": "Mensaje:",
      "enviar": "Enviar"
    },
    "status": {
      "empty":   "El campo _key_ es obligatorio.",
      "email":   "El correo no es válido.",
      "message": "El mensaje debe tener al menos 10 caracteres.",
      "success": "¡Mensaje enviado!",
      "error":   "Ocurrió un error. Intentá de nuevo.",
      "fail":    "Error de red."
    }
  }
}
```

### `{lang}/bio.json`

```json
{
  "Name": "Jhon Doe",
  "Picture": ["./assets/images/user_profile.png", "./assets/images/user_profile.webp"],
  "Traits": ["Desarrollador", "Creativo", "Freelancer"],
  "AboutMe": {
    "heading": "Sobre mí",
    "content": "<p>Tu descripción aquí.</p>"
  }
}
```

### `{lang}/projects.json`

```json
{
  "heading": "Proyectos",
  "items": [
    {
      "title": "Nombre del proyecto",
      "description": "Descripción breve.",
      "image": "./assets/images/proyecto.png",
      "link": "https://github.com/tu-usuario/proyecto"
    }
  ]
}
```

### `{lang}/technologies.json`

```json
{
  "heading": "Tecnologías",
  "items": [
    { "text": "HTML",       "icon": "./assets/images/html.svg",       "category": "frontend" },
    { "text": "JavaScript", "icon": "./assets/images/javascript.svg", "category": "frontend" }
  ]
}
```

---

## 🚀 Uso rápido

```bash
git clone https://github.com/proyectos-random-x/OnePageCV.git
cd OnePageCV
```

Abrí `index.html` en tu navegador (o servilo con cualquier servidor estático).

Personalizá los archivos en `/assets/json/` con tu información.

---

## ⚙️ Configuración SEO

En `index.html`, reemplazá los valores marcados con tu información real:

```html
<!-- Canonical -->
<link rel="canonical" href="https://tu-dominio.com/">

<!-- Open Graph -->
<meta property="og:url"   content="https://tu-dominio.com/">
<meta property="og:image" content="https://tu-dominio.com/assets/images/user_profile.png">
```

---

## 🌍 Publicación

Compatible con:

- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://netlify.com/)
- [Vercel](https://vercel.com/)

---

## 🤝 Créditos

Hecho con cariño por Joel.

## 📃 Licencia

MIT — Usalo, modificalo y compartilo como quieras.
