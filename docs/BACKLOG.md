# 📋 Product Backlog

Historias de usuario del proyecto **MAU**, ordenadas por prioridad.

**Prioridad:** 🔴 Alta · 🟡 Media · 🟢 Baja

---

## Historias de usuario

| ID | Historia | Prioridad | Sprint |
|---|---|---|---|
| HU-01 | Como visitante, quiero ver las noticias de moda en un tablero disperso para explorarlas como un moodboard. | 🔴 | 2 · disperso en 10 ✅ |
| HU-02 | Como visitante, quiero identificar el tipo de fuente (revista, YouTube, TikTok, Instagram) en cada tarjeta. | 🔴 | 2 |
| HU-11 | Como visitante, quiero ver noticias reales y actuales de revistas y canales de moda. | 🔴 | 3 |
| HU-12 | Como usuario, quiero iniciar sesión para ver mi perfil. | 🔴 | 4 |
| HU-13 | Como curador, quiero un panel privado para gestionar el contenido, al que solo accedan administradores y moderadores. | 🔴 | 4 |
| HU-14 | Como usuario, quiero mensajes claros cuando lleno mal un formulario o algo falla, para saber qué hacer. | 🔴 | 5 |
| HU-15 | Como curador, quiero agregar posts de TikTok, Instagram o YouTube al tablero desde el panel. | 🟡 | 5 |
| HU-16 | Como visitante, quiero que buscar y filtrar se sienta instantáneo, incluso en el celular. | 🔴 | 6 |
| HU-17 | Como visitante, quiero entrar a MAU desde una URL pública para verlo sin instalar nada. | 🔴 | 7 |
| HU-18 | Como equipo, queremos que cada cambio se revise automáticamente antes de publicarse. | 🟡 | 7 |
| HU-03 | Como visitante, quiero que la tarjeta haga un efecto *pop* elástico al pasar el mouse para sentir que el tablero está vivo. | 🔴 | 8 ✅ |
| HU-04 | Como visitante, quiero que un doble clic me lleve directo a la noticia original. | 🔴 | 8 ✅ |
| HU-05 | Como visitante, quiero que un clic me muestre noticias similares para seguir descubriendo contenido. | 🔴 | 8 ✅ |
| HU-19 | Como visitante, quiero seguir viendo más noticias al bajar, sin esperar a que cargue todo al inicio. | 🔴 | 9 ✅ |
| HU-20 | Como visitante, quiero un modo oscuro para leer de noche. | 🟡 | 9 ✅ |
| HU-06 | Como visitante, quiero filtrar el tablero por etiqueta (diseñador, tendencia, tema). | 🟡 | 6 ✅ |
| HU-07 | Como visitante, quiero que el sitio se vea bien en el celular. | 🟡 | 10 ✅ |
| HU-08 | Como visitante, quiero una identidad visual editorial y moderna (rebranding). | 🟡 | 8 ✅ |
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
- [x] Cambiar el mosaico por un acomodo disperso → hecho en el Sprint 10
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
- [x] Pruebas automáticas con Vitest (37 pruebas; 41 desde el Sprint 8)
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
- [x] Recomendaciones (antes planeadas para el Sprint 9): similitud por etiquetas y vista con su propia ruta

### Sprint 9: Experiencia ✅
- [x] Scroll infinito: fuentes en tandas (`SOURCE_PAGES`) y componente `LoadMore` con `IntersectionObserver` (HU-19)
- [x] 4 revistas nuevas: Elle, Glamour, Esquire y Cosmopolitan (10 fuentes en total)
- [x] Caché por tanda: al volver al tablero se muestran todas las tandas ya vistas
- [x] Si falla una tanda posterior, el error aparece al final sin perder lo ya cargado
- [x] Enlace compartido a una noticia de otra tanda: se siguen pidiendo tandas hasta encontrarla
- [x] Modo oscuro con `ThemeToggle` + `useTheme`, que sigue al sistema y recuerda la elección (HU-20)
- [x] `theme-init.js` aplica el tema antes de pintar, sin romper la CSP
- [x] Colores del tema en variables (`--surface-*`, `--shadow-rgb`, `--backdrop`…)
- [x] Logo con la leyenda completa y las iniciales M·A·U en plata
- [x] Metadatos: descripción y `theme-color` para claro y oscuro
- [x] Documentar en README, `docs/DISENO.md`, `docs/API.md` y `docs/OPTIMIZACION.md`

### Sprint 10: Pulido con referencias de diseño ✅
- [x] Paleta, tipografía y logo nuevos (Sprint 8)
- [x] Estudiar awesome-design-md (Apple, Pinterest, Wired) y awesome-liquid-glass
- [x] `DESIGN.md` de MAU en el formato de awesome-design-md
- [x] Tokens: escala de espaciado, tipografía (17 px de lectura, eyebrow), radios 16/24/32/píldora y área de toque de 44 px
- [x] Vidrio en tres capas (tinte + brillo especular, desenfoque, borde de luz)
- [x] Refracción con filtro SVG (`LiquidGlassFilter`) solo en Chromium; vidrio esmerilado en los demás
- [x] Cápsula de navegación fija: arriba en la computadora y barra de pestañas abajo en el celular
- [x] Diseño responsivo afinado para celular: 2 columnas, filtros deslizables, panel compacto (HU-07)
- [x] Buscador de vidrio líquido y control segmentado de plataforma
- [x] Tablero disperso: tarjetas apenas giradas en pantallas grandes (HU-01)
- [x] Página de la noticia editorial (eyebrow, líneas finas, lectura a 17 px) y foto sin recortar la cara
- [x] Optimización de imágenes: prioridad alta en las 6 primeras, fundido al cargar y respaldo si fallan
- [x] Pie de página con las fuentes
- [x] Accesibilidad: foco visible en modo oscuro y `prefers-reduced-transparency`
- [x] Modo oscuro en un solo bloque de CSS (`theme-init.js` siempre pone `data-theme`)
- [x] Corregir el logo sin estilos del Sprint 9
- [x] Capturas en `docs/capturas/parte-9-*` y `parte-10-*`

### Pendientes (requieren la cuenta del autor)
- [ ] Crear la cuenta de Vercel, importar el repositorio y pegar la URL en el README (Sprint 7)
- [ ] Proteger `main` para exigir la CI en verde (Sprint 7)
- [ ] Cambiar los 2 posts de ejemplo de `news.json` por TikToks e Instagrams reales (Sprint 3)
