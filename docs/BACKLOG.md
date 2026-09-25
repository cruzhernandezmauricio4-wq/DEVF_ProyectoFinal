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
| HU-14 | Como usuario, quiero mensajes claros cuando lleno mal un formulario o algo falla, para saber qué hacer. | 🔴 | 5 |
| HU-15 | Como curador, quiero agregar posts de TikTok, Instagram o YouTube al tablero desde el panel. | 🟡 | 5 |
| HU-16 | Como visitante, quiero que buscar y filtrar se sienta instantáneo, incluso en el celular. | 🔴 | 6 |
| HU-17 | Como visitante, quiero entrar a MAU desde una URL pública para verlo sin instalar nada. | 🔴 | 7 |
| HU-18 | Como equipo, queremos que cada cambio se revise automáticamente antes de publicarse. | 🟡 | 7 |
| HU-03 | Como visitante, quiero que la tarjeta haga un efecto *pop* elástico al pasar el mouse para sentir que el tablero está vivo. | 🔴 | 8 |
| HU-04 | Como visitante, quiero que un doble clic me lleve directo a la noticia original. | 🔴 | 8 |
| HU-05 | Como visitante, quiero que un clic me muestre noticias similares para seguir descubriendo contenido. | 🔴 | 9 |
| HU-06 | Como visitante, quiero filtrar el tablero por etiqueta (diseñador, tendencia, tema). | 🟡 | 6 ✅ |
| HU-07 | Como visitante, quiero que el sitio se vea bien en el celular. | 🟡 | 10 |
| HU-08 | Como visitante, quiero una identidad visual editorial y moderna (rebranding). | 🟡 | 10 |
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
- [x] Primer despliegue en Vercel → movido al Sprint 7

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

### Sprint 5: Validaciones y manejo de errores ✅
- [x] Instalar Zod y crear esquemas en `src/schemas/`
- [x] Hook `useZodForm` y componente `FormField` con mensajes accesibles
- [x] Validar el formulario de login con Zod
- [x] Formulario "Agregar un post" en Curaduría, validado con Zod
- [x] Cliente HTTP central con tiempo límite y errores clasificados (`AppError`)
- [x] Validar con Zod las respuestas de rss2json y DummyJSON
- [x] Validar la sesión y los posts guardados en `localStorage`
- [x] Avisos emergentes (`NotificationProvider` + `Toaster`)
- [x] Estados de error con botón Reintentar y aviso de fuentes caídas
- [x] `ErrorBoundary` para errores de renderizado
- [x] Documentar en `docs/ERRORES.md` y probar 17 casos en el navegador

### Sprint 6: Optimización ✅
- [x] Analizar qué partes de la app conviene optimizar
- [x] Filtros del tablero: buscador, plataforma y etiquetas (HU-06)
- [x] Medir el rendimiento antes de optimizar (Profiler de React)
- [x] `useMemo` para etiquetas, índice de búsqueda y lista filtrada
- [x] `React.memo` en `NewsCard`, `Board` y `NewsFilters`
- [x] `useCallback` para los manejadores de los filtros
- [x] `useDeferredValue` para que el buscador no se trabe
- [x] Caché de noticias de 5 minutos y peticiones compartidas
- [x] `React.lazy` + `Suspense` para Login, Perfil, Curaduría y 404
- [x] Medir después de optimizar y documentar en `docs/OPTIMIZACION.md`

### Sprint 7: Despliegue y CI/CD
- [x] `vercel.json`: build, rutas de React, caché de archivos y encabezados de seguridad
- [x] Pruebas automáticas con Vitest (37 pruebas)
- [x] CI con GitHub Actions: linter sin avisos, pruebas y build en cada PR
- [x] Verificar el build de producción con las reglas de Vercel en local
- [x] Corregir el `eval` de Zod bloqueado por la CSP (`jitless`)
- [x] Guía paso a paso en `docs/DESPLIEGUE.md`
- [ ] Crear la cuenta de Vercel e importar el repositorio
- [ ] Pegar la URL de producción en el README y en GitHub
- [ ] Proteger `main` para exigir la CI en verde

### Sprint 8: Diseño e interacciones ✅
- [x] Identidad plata cromada + vidrio líquido (variables, fondo, clase `.glass`)
- [x] Tipografías editoriales empaquetadas (Instrument Serif + Inter)
- [x] Tarjetas con foto completa y panel de vidrio
- [x] Efecto *pop* elástico en *hover* con reflejo que sigue al cursor
- [x] Hook `useClickOrDoubleClick` para distinguir clic y doble clic
- [x] Doble clic que abre la URL en una pestaña nueva
- [x] Página de noticia `/noticia/:id` con botón a la fuente
- [x] Noticias relacionadas por etiquetas, fuente y plataforma (con pruebas)
- [x] Rediseño de header, filtros, login, perfil, curaduría y avisos

### Sprint 9: Recomendaciones ✅ (se hizo en el Sprint 8)
- [x] Algoritmo de similitud por etiquetas en común
- [x] Vista de recomendaciones con su propia ruta

### Sprint 10: Pulido
- [x] Paleta, tipografía y logo nuevos (Sprint 8)
- [ ] Diseño responsivo afinado para celular
- [ ] Optimización de imágenes
