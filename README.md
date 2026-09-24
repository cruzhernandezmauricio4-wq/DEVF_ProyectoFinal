# MAU · Moda for All and U

> Tablero interactivo de noticias de moda, construido con React y desplegado en Vercel.

Proyecto Final del Módulo 6 (React avanzado) de **DEV.F**.
Es la evolución de mi primer proyecto web, [Proyecto-DEFV](https://github.com/cruzhernandezmauricio4-wq/Proyecto-DEFV) ([ver sitio](https://cruzhernandezmauricio4-wq.github.io/Proyecto-DEFV/)), con un **rebranding completo**.

---

## 📌 Descripción del proyecto

MAU nació como un sitio de moda de seis secciones (nosotros, contenido, tutoriales, tienda, comunidad y contacto). En esta nueva versión el proyecto se concentra en **una sola experiencia**: un **tablero de noticias de moda curadas**, presentado como un *moodboard* editorial.

Cada tarjeta del tablero es una noticia, que puede venir de cualquier formato:

| Formato | Ejemplos |
|---|---|
| 📰 Revista / artículo | Vogue, Hypebeast, blogs de moda |
| ▶️ Video | YouTube |
| 🎵 Video corto | TikTok |
| 📸 Post | Instagram |

### Relación con las opciones del curso

El proyecto se basa en la opción **🛒 Catálogo Interactivo de Productos**, adaptada: en lugar de productos, el catálogo muestra **noticias de moda**, con filtros por etiqueta y un sistema de recomendaciones.

---

## ✨ Funcionalidades principales

1. **Tablero disperso (tipo moodboard)**
   Las noticias no siguen una cuadrícula rígida. Se acomodan de forma orgánica, con tarjetas de distintos tamaños, como recortes pegados en una pared.

2. **Efecto *pop* elástico al pasar el mouse**
   Al hacer *hover*, la tarjeta crece y se **deforma de manera elástica** (como una burbuja o gelatina) y luego vuelve a su forma original.

3. **Un clic → Recomendaciones**
   Abre una vista de **noticias similares**, al estilo de "más como esto" de Pinterest. La similitud se calcula por las **etiquetas** en común (marca, diseñador, tendencia, tema).

4. **Doble clic → Noticia original**
   Lleva directo a la **URL de la fuente** (artículo, video o post) en una pestaña nueva.

> ⚙️ **Nota técnica:** el doble clic también dispara el evento de clic. Para distinguirlos, la acción de un clic espera unos ~250 ms. Si en ese tiempo llega un segundo clic, se cancela y se abre la URL.

---

## 🛠️ Tecnologías

- [React 19](https://react.dev/): interfaz basada en componentes
- [Vite](https://vite.dev/): entorno de desarrollo y *build*
- CSS moderno: animaciones y transformaciones para el efecto elástico
- JSON local como fuente de datos inicial (`src/data/news.json`)
- [Vercel](https://vercel.com/): despliegue continuo a producción
- Git y GitHub: control de versiones

---

## 📁 Estructura del proyecto

```
mau/
├── docs/
│   ├── ACUERDOS.md       # Dinámica y acuerdos de trabajo
│   └── BACKLOG.md        # Historias de usuario y plan de sprints
├── public/               # Archivos estáticos (favicon, etc.)
├── src/
│   ├── assets/           # Imágenes e íconos de la marca
│   ├── components/       # Componentes reutilizables (NewsCard, Board…)
│   ├── data/
│   │   └── news.json     # Noticias curadas con sus etiquetas
│   ├── hooks/            # Hooks personalizados (useClickOrDoubleClick…)
│   ├── pages/            # Vistas (Tablero, Recomendaciones)
│   ├── styles/           # Estilos globales y variables de marca
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

### Modelo de una noticia

```json
{
  "id": 1,
  "title": "Rick Owens y la estética de lo oscuro",
  "source": "podcast",
  "platform": "youtube",
  "url": "https://www.youtube.com/...",
  "image": "",
  "tags": ["rick-owens", "vanguardia", "entrevista"]
}
```

---

## 🚀 Cómo correr el proyecto

```bash
git clone https://github.com/cruzhernandezmauricio4-wq/<nombre-del-repo>.git
cd <nombre-del-repo>
npm install
npm run dev
```

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión de producción |
| `npm run lint` | Revisa el código con oxlint |

---

## 🤝 Forma de trabajo

La dinámica de trabajo, los acuerdos y el uso de SCRUM están en **[docs/ACUERDOS.md](docs/ACUERDOS.md)**.
El backlog y el plan por entregas están en **[docs/BACKLOG.md](docs/BACKLOG.md)**.

---

## 🗺️ Estado

- [x] **Parte 1:** definición del proyecto, acuerdos de trabajo y repositorio base
- [ ] **Parte 2:** tablero disperso con datos del JSON
- [ ] **Parte 3:** efecto *pop* elástico e interacciones de clic y doble clic
- [ ] **Parte 4:** vista de recomendaciones
- [ ] **Parte 5:** rebranding visual final y despliegue en Vercel

---

## 👤 Autor

**Mauricio Cruz Hernández** · Proyecto Final M6 · DEV.F
