# 🧑‍💻 One Page CV

Un portfolio personal minimalista y profesional que funciona como CV online de una sola página. Creado con tecnologías web fundamentales: HTML, CSS y JavaScript vanilla.


## ✨ Características principales

🌐 **Multiidioma**: Cambia entre idiomas fácilmente - toda la información se gestiona a través de archivos .json independientes, sin necesidad de tocar el código HTML.

🎨 **Personalización visual**:
- Modo **dark/light** para adaptarse a las preferencias del usuario
- **3 esquemas de colores** diferentes para darle tu toque personal
- Diseño completamente **responsivo** que se ve perfecto en cualquier dispositivo.

⚡ **Fácil de usar**:
- **Configuración sin código**: Solo editá los archivos JSON con tu información personal
- **Plug & play**: Descargá, personalizá y publicá
- **Liviano y rápido**: Sin frameworks pesados, solo tecnologías web puras

### 🎯 Perfecto para
Desarrolladores, diseñadores, freelancers o cualquier profesional que necesite una presencia web rápida y profesional sin complicaciones técnicas. Ideal como primer proyecto o como alternativa minimalista a portfolios más complejos.

---

### 📁 Estructura del proyecto

```plaintext
📦 one-page-cv/
├── index.html
├── assets/
│ ├── css/
│ ├── images/
│ ├── js/
│ └── json/
│ ├── es.json
│ └── en.json
└── README.md
```

## 📩 Formulario de contacto

Para activar el formulario, debés registrarte en [Formspree](https://formspree.io/) (gratuito) y obtener tu endpoint. Luego reemplazá el valor del `action` en el formulario por tu URL personalizada, por ejemplo:

```html
<form action="https://formspree.io/f/xxxxxxxx" method="POST">
```

---

## 🗂️ Archivos JSON

El contenido de la página se gestiona desde archivos `.json` ubicados en:  
`/assets/json/`

Cada archivo representa un idioma:
- `es.json` – Español
- `en.json` – Inglés

### 📌 Ejemplo de contenido en `es.json`:
```json
{ 
  "title": "One Page CV — Jhon Doe",
  "name": "Jhon Doe",
  "menu": {
    "item1": "Sobre mí",
    "item2": "Tecnologías",
    "item3": "Proyectos",
    "item4": "Contacto"
  },
  "tags": [
    "",
    ""
  ],
  "aboutme": {
    "title": "Sobre mi",
    "content": ""
  },
  "technologie": {
    "title": "Tecnologías",
    "list": [
      { 
        "icon": "",
        "text": ""
      }
    ]
  },
  "projects": {
    "title": "Proyectos",
    "items": [
      {
        "title": "",
        "description": "",
        "cover": "",
        "link": ""
      }
    ]
  },
  "contact": {
    "title": "Contacto",
    "description": "¿Querés hablar sobre un proyecto, mejorar tu web o simplemente decir hola?",
    "fields": {
      "nombre": "Nombre",
      "correo": "Correo",
      "mensaje": "Mensaje",
      "enviar": "Enviar"
    }
  }
}
```

### 🚀 Cómo usar
Cloná el repositorio:
```bash
git clone https://github.com/tu-usuario/one-page-cv.git
cd one-page-cv
```
Abrí index.html en tu navegador.

Para cambiar el contenido, editá los archivos en /assets/json/.

Para cambiar de idioma, modificá la línea en app.js:
```javascript
const LanguageDefault = "es"; // Cambiar por "en", "pt", etc.
```

### 🌍 Publicación
Podés subir este proyecto directamente a:
- GitHub Pages
- Netlify
- Vercel

### 🤝 Créditos
Hecho con cariño por Joel.
Inspirado en buenas prácticas, accesibilidad y ganas de dejar el código más prolijo que una libreta nueva 🧼📘.

### 📃 Licencia
MIT – Usalo, modificalo y compartilo como quieras.