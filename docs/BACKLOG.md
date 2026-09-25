# 📋 Product Backlog

Historias de usuario del proyecto **MAU**, ordenadas por prioridad.

**Prioridad:** 🔴 Alta · 🟡 Media · 🟢 Baja

---

## Historias de usuario

| ID | Historia | Prioridad | Sprint |
|---|---|---|---|
| HU-01 | Como visitante, quiero ver las noticias de moda en un tablero disperso para explorarlas como un moodboard. | 🔴 | 2 |
| HU-02 | Como visitante, quiero identificar el tipo de fuente (revista, YouTube, TikTok, Instagram) en cada tarjeta. | 🔴 | 2 |
| HU-11 | Como visitante, quiero ver noticias reales y actuales de revistas y canales de moda. | 🔴 | 3 |
| HU-12 | Como usuario, quiero iniciar sesión para ver mi perfil. | 🔴 | 4 |
| HU-13 | Como curador, quiero un panel privado para gestionar el contenido, al que solo accedan administradores y moderadores. | 🔴 | 4 |
| HU-03 | Como visitante, quiero que la tarjeta haga un efecto *pop* elástico al pasar el mouse para sentir que el tablero está vivo. | 🔴 | 5 |
| HU-04 | Como visitante, quiero que un doble clic me lleve directo a la noticia original. | 🔴 | 5 |
| HU-05 | Como visitante, quiero que un clic me muestre noticias similares para seguir descubriendo contenido. | 🔴 | 6 |
| HU-06 | Como visitante, quiero filtrar el tablero por etiqueta (diseñador, tendencia, tema). | 🟡 | 6 |
| HU-07 | Como visitante, quiero que el sitio se vea bien en el celular. | 🟡 | 7 |
| HU-08 | Como visitante, quiero una identidad visual editorial y moderna (rebranding). | 🟡 | 7 |
| HU-09 | Como visitante, quiero ver una vista previa del video o post incrustado. | 🟢 | Extra |
| HU-10 | Como visitante, quiero guardar mis noticias favoritas. | 🟢 | Extra |

---

## Plan por sprints

### Sprint 1: Definición ✅
- [x] Definir el proyecto y la opción base del curso
- [x] Documentar los acuerdos de trabajo (`docs/ACUERDOS.md`)
- [x] Crear el proyecto con React + Vite y su estructura de carpetas
- [x] Redactar el README y el backlog
- [x] Crear el repositorio en GitHub y hacer el primer commit

### Sprint 2: Estructura y tablero base ✅
- [x] Confirmar el proyecto creado con Vite y el `.gitignore`
- [x] Variables de marca en `src/styles/variables.css`
- [x] Componente `Header` con logo y lema
- [x] Página `Home` que carga las noticias desde `news.json`
- [x] Componente `Board` con acomodo tipo mosaico (versión inicial)
- [x] Componente `NewsCard` con imagen, título, etiquetas y enlace
- [x] Componente `PlatformBadge` para identificar la fuente
- [x] Guía de Git en `docs/GIT.md`

### Sprint 3: Backend y datos reales ✅
- [x] Investigar APIs gratuitas de noticias de moda
- [x] Elegir rss2json como backend y JSON local para TikTok e Instagram
- [x] Configurar las fuentes en `src/config/sources.js` y `.env.example`
- [x] Capa de servicios: `rssClient.js` y `newsService.js`
- [x] Hook `useNews` con estados de carga y error
- [x] Etiquetas automáticas en `src/utils/tags.js`
- [x] Solicitud de muestra con `npm run api:check`
- [x] Documentar la comunicación en `docs/API.md`
- [ ] Llenar `news.json` con posts reales de TikTok e Instagram
- [ ] Cambiar el mosaico por un acomodo disperso
- [ ] Primer despliegue en Vercel

### Sprint 4: Rutas protegidas ✅
- [x] Definir qué rutas son públicas, cuáles requieren sesión y cuáles requieren rol
- [x] Instalar React Router y crear `Layout` con navegación
- [x] Backend de autenticación con DummyJSON (JWT, roles, endpoints protegidos)
- [x] `AuthProvider` + `useAuth` para compartir la sesión
- [x] `ProtectedRoute` con protección por sesión y por rol
- [x] Páginas `Login`, `Profile`, `Curation`, `Forbidden` (403) y `NotFound` (404)
- [x] Validación y renovación del token con el backend al recargar
- [x] `vercel.json` para que funcionen las rutas en producción
- [x] Documentar en `docs/RUTAS.md` y probar 11 casos en el navegador

### Sprint 5: Interacciones
- [ ] Efecto *pop* elástico en *hover*
- [ ] Hook `useClickOrDoubleClick` para distinguir clic y doble clic
- [ ] Doble clic que abre la URL en una pestaña nueva

### Sprint 6: Recomendaciones
- [ ] Algoritmo de similitud por etiquetas en común
- [ ] Vista de recomendaciones con su propia ruta
- [ ] Filtros por etiqueta

### Sprint 7: Rebranding y producción
- [ ] Paleta, tipografía y logo nuevos
- [ ] Diseño responsivo
- [ ] Optimización de imágenes y rendimiento
- [ ] Despliegue final en Vercel con dominio de producción
