# MAU · Moda for All and U

> Tablero interactivo de noticias de moda, construido con React y desplegado en Vercel.

Proyecto Final del Módulo 6 (React avanzado) de **DEV.F**.
Es la evolución de mi primer proyecto web, [Proyecto-DEFV](https://github.com/cruzhernandezmauricio4-wq/Proyecto-DEFV) ([ver sitio](https://cruzhernandezmauricio4-wq.github.io/Proyecto-DEFV/)), con un **rebranding completo**.

![Vista actual de MAU](docs/capturas/parte-3.png)

---

## 📌 Descripción del proyecto

MAU nació como un sitio de moda de seis secciones (nosotros, contenido, tutoriales, tienda, comunidad y contacto). En esta nueva versión el proyecto se concentra en **una sola experiencia**: un **tablero de noticias de moda curadas**, presentado como un *moodboard* editorial.

Cada tarjeta del tablero es una noticia, que puede venir de cualquier formato:

| Formato | Ejemplos |
|---|---|
| 📰 Revista / artículo | Vogue, Dazed, Hypebeast, Harper's Bazaar, Fashionista |
| ▶️ Video | YouTube (canal de Vogue) |
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

### Frontend
- [React 19](https://react.dev/): interfaz basada en componentes
- [Vite](https://vite.dev/): entorno de desarrollo y *build*
- [React Router](https://reactrouter.com/): navegación entre páginas y rutas protegidas
- Context API: sesión del usuario y avisos compartidos en toda la app
- [Zod](https://zod.dev/): validación de formularios y de las respuestas de las APIs
- CSS moderno: animaciones y transformaciones para el efecto elástico
- [Vercel](https://vercel.com/): despliegue continuo a producción
- Git y GitHub: control de versiones

### Backend (fuentes de datos)
- **[rss2json](https://rss2json.com/):** API REST gratuita que convierte los feeds RSS de revistas y canales de YouTube en JSON. No requiere clave y permite peticiones desde el navegador (CORS).
- **JSON local** (`src/data/news.json`): posts curados de TikTok e Instagram, que no ofrecen una API pública gratuita.
- **[DummyJSON Auth](https://dummyjson.com/docs/auth):** autenticación con tokens JWT, roles de usuario y endpoints protegidos.

Toda la comunicación entre frontend y backend está documentada en **[docs/API.md](docs/API.md)**.

---

## 🔐 Rutas

| Ruta | Página | Acceso |
|---|---|---|
| `/` | Tablero de noticias | 🌍 Pública |
| `/login` | Iniciar sesión | 🌍 Pública |
| `/perfil` | Perfil del usuario | 🔒 Con sesión |
| `/curaduria` | Panel de curaduría | 🛡️ Rol `admin` o `moderator` |

**Cuentas de prueba:** `emilys` / `emilyspass` (admin) · `oliviaw` / `oliviawpass` (moderator) · `averyp` / `averyppass` (user)

La protección en React, la validación en el backend y las pruebas realizadas están en **[docs/RUTAS.md](docs/RUTAS.md)**.

---

## 🧯 Validaciones y manejo de errores

- **Formularios validados con Zod:** login y "Agregar un post" en Curaduría, con mensajes claros bajo cada campo.
- **Respuestas de las APIs validadas con Zod:** si un dato llega mal formado, se descarta o se informa en lugar de romper la app.
- **Cliente HTTP central:** detecta si falta conexión, si se agotó el tiempo, el código de error del servidor o si los datos no son válidos, y lo traduce a un mensaje en español.
- **Avisos al usuario:** mensajes en formularios, avisos emergentes, estados de error con botón **Reintentar** y un `ErrorBoundary` para errores inesperados.

El detalle, los esquemas y las 17 pruebas realizadas están en **[docs/ERRORES.md](docs/ERRORES.md)**.

---

## 📁 Estructura del proyecto

```
DEVF_ProyectoFinal/
├── docs/
│   ├── capturas/             # Capturas de pantalla de cada entrega
│   ├── ACUERDOS.md           # Dinámica y acuerdos de trabajo
│   ├── API.md                # Backend y comunicación con el frontend
│   ├── BACKLOG.md            # Historias de usuario y plan de sprints
│   ├── ERRORES.md            # Validaciones con Zod y manejo de errores
│   ├── GIT.md                # Guía del flujo de Git del proyecto
│   └── RUTAS.md              # Rutas protegidas y seguridad
├── public/                   # Archivos estáticos (favicon, etc.)
├── scripts/
│   └── check-api.js          # Solicitud de muestra para probar las fuentes
├── src/
│   ├── assets/               # Imágenes e íconos de la marca
│   ├── components/           # Componentes visuales reutilizables
│   │   ├── Board.jsx         # Tablero que acomoda las noticias
│   │   ├── CuratedPostForm.jsx # Formulario para agregar posts (Zod)
│   │   ├── ErrorBoundary.jsx # Atrapa errores inesperados al renderizar
│   │   ├── ErrorState.jsx    # Bloque de error con botón Reintentar
│   │   ├── FormField.jsx     # Campo de formulario con mensaje de error
│   │   ├── Header.jsx        # Logo, navegación y usuario conectado
│   │   ├── Layout.jsx        # Estructura común de todas las páginas
│   │   ├── NewsCard.jsx      # Tarjeta de una noticia
│   │   ├── PlatformBadge.jsx # Etiqueta de la plataforma (YouTube, TikTok…)
│   │   ├── StatusMessage.jsx # Mensajes de carga
│   │   └── Toaster.jsx       # Avisos emergentes
│   ├── config/
│   │   ├── auth.js           # Backend de autenticación, roles y cuentas de prueba
│   │   └── sources.js        # Lista de fuentes RSS y configuración de la API
│   ├── context/
│   │   ├── authContext.js    # Contexto de la sesión
│   │   ├── AuthProvider.jsx  # Maneja login, logout y restauración de sesión
│   │   ├── notificationContext.js # Contexto de los avisos
│   │   └── NotificationProvider.jsx # Muestra avisos desde cualquier componente
│   ├── data/
│   │   └── news.json         # Posts curados de TikTok e Instagram
│   ├── hooks/
│   │   ├── useAuth.js        # Acceso a la sesión desde cualquier componente
│   │   ├── useNews.js        # Carga las noticias con estados de carga, error y reintento
│   │   ├── useNotify.js      # Muestra un aviso emergente
│   │   └── useZodForm.js     # Formularios validados con un esquema de Zod
│   ├── pages/
│   │   ├── Curation.jsx      # 🛡️ Panel de curaduría (admin y moderator)
│   │   ├── Forbidden.jsx     # 403: sin permiso
│   │   ├── Home.jsx          # Página principal con el tablero
│   │   ├── Login.jsx         # Formulario de inicio de sesión
│   │   ├── NotFound.jsx      # 404: ruta inexistente
│   │   └── Profile.jsx       # 🔒 Perfil del usuario
│   ├── routes/
│   │   └── ProtectedRoute.jsx # Protege rutas por sesión y por rol
│   ├── schemas/              # Esquemas de Zod
│   │   ├── auth.js           # Login, usuario, tokens y sesión
│   │   ├── news.js           # Noticia y formulario de posts curados
│   │   └── rss.js            # Respuestas de rss2json
│   ├── services/             # Comunicación con el backend
│   │   ├── authService.js    # Login, validación y renovación de tokens
│   │   ├── curatedService.js # Lee y guarda los posts curados
│   │   ├── httpClient.js     # Cliente HTTP: tiempo límite, errores y validación
│   │   ├── rssClient.js      # Petición HTTP a rss2json
│   │   └── newsService.js    # Une y normaliza las noticias de todas las fuentes
│   ├── styles/
│   │   └── variables.css     # Colores, tipografías y medidas de la marca
│   ├── utils/
│   │   ├── errors.js         # AppError y mensajes de error para el usuario
│   │   ├── html.js           # Limpia texto con HTML
│   │   ├── session.js        # Guarda los tokens y lee su expiración
│   │   └── tags.js           # Genera etiquetas a partir del texto
│   ├── App.jsx               # Componente raíz y definición de rutas
│   ├── index.css             # Estilos globales
│   └── main.jsx              # Punto de entrada de React
├── .env.example              # Variables de entorno de ejemplo
├── .gitignore                # Archivos que Git no debe subir
├── index.html
├── package.json
├── vercel.json               # Hace que Vercel sirva las rutas de React
└── vite.config.js
```

Cada componente tiene su propio archivo `.css` junto a él (ej. `NewsCard.jsx` + `NewsCard.css`).

### Capas de la aplicación

```
components / pages   →  muestran la información
        ↓
routes               →  deciden quién puede ver cada página
        ↓
context / hooks      →  manejan estados: sesión, avisos, cargando, error, datos
        ↓
services             →  hablan con el backend y normalizan los datos
        ↓
httpClient + schemas →  clasifican errores y validan cada respuesta con Zod
        ↓
rss2json + JSON local + DummyJSON Auth
```

### Árbol de componentes

```
App
└── BrowserRouter
    └── NotificationProvider   (+ Toaster)
        └── AuthProvider
            └── Layout
                ├── Header
                └── ErrorBoundary
                    └── (página según la ruta)
                        ├── Home  →  Board  →  NewsCard  →  PlatformBadge
                        ├── Login  →  FormField
                        ├── ProtectedRoute  →  Profile
                        ├── ProtectedRoute (roles)  →  Curation  →  CuratedPostForm  |  Forbidden
                        └── NotFound
```

### Modelo de una noticia

Todas las fuentes se convierten a este mismo formato:

```json
{
  "id": "https://www.vogue.com/fashion-shows/...",
  "title": "Emporio Armani Spring 2027 Ready-to-Wear",
  "excerpt": "Resumen corto de la noticia…",
  "source": "Vogue",
  "platform": "web",
  "url": "https://www.vogue.com/fashion-shows/...",
  "image": "https://assets.vogue.com/photos/...jpg",
  "date": "2026-09-24 22:58:17",
  "tags": ["pasarela", "runway"]
}
```

`platform` puede ser `web`, `youtube`, `tiktok` o `instagram`.

---

## 🚀 Cómo correr el proyecto

```bash
git clone https://github.com/cruzhernandezmauricio4-wq/DEVF_ProyectoFinal.git
cd DEVF_ProyectoFinal
npm install
npm run dev
```

**Variables de entorno (opcional):** sin clave, cada fuente devuelve hasta 10 noticias. Con una clave gratuita de rss2json se piden 20. Para usarla, copia `.env.example` como `.env.local` y agrega la clave.

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión de producción |
| `npm run lint` | Revisa el código con oxlint |
| `npm run api:check` | Hace una solicitud de muestra a cada fuente y muestra si responde |

---

## 🤝 Forma de trabajo

La dinámica de trabajo, los acuerdos y el uso de SCRUM están en **[docs/ACUERDOS.md](docs/ACUERDOS.md)**.
El backlog y el plan por entregas están en **[docs/BACKLOG.md](docs/BACKLOG.md)**.
El flujo de Git (ramas, commits y cómo actualizar el repositorio remoto) está en **[docs/GIT.md](docs/GIT.md)**.

---

## 🗺️ Estado

- [x] **Parte 1:** definición del proyecto, acuerdos de trabajo y repositorio en GitHub
- [x] **Parte 2:** app creada con Vite, `.gitignore`, estructura de carpetas y primeros componentes
- [x] **Parte 3:** backend definido (rss2json + JSON local), capa de servicios y noticias reales en el tablero
- [x] **Parte 4:** rutas protegidas por sesión y por rol, con autenticación JWT validada en el backend
- [x] **Parte 5:** validaciones con Zod y manejo de errores de formularios y peticiones al backend
- [ ] Tablero disperso
- [ ] Efecto *pop* elástico e interacciones de clic y doble clic
- [ ] Vista de recomendaciones
- [ ] Rebranding visual final y despliegue en Vercel

---

## 👤 Autor

**Mauricio Cruz Hernández** · Proyecto Final M6 · DEV.F
