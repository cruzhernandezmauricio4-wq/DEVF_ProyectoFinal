# 📋 Product Backlog

Historias de usuario del proyecto **MAU**, ordenadas por prioridad.

**Prioridad:** 🔴 Alta · 🟡 Media · 🟢 Baja

---

## Historias de usuario

| ID | Historia | Prioridad | Sprint |
|---|---|---|---|
| HU-01 | Como visitante, quiero ver las noticias de moda en un tablero disperso para explorarlas como un moodboard. | 🔴 | 2 |
| HU-02 | Como visitante, quiero identificar el tipo de fuente (revista, YouTube, TikTok, Instagram) en cada tarjeta. | 🔴 | 2 |
| HU-03 | Como visitante, quiero que la tarjeta haga un efecto *pop* elástico al pasar el mouse para sentir que el tablero está vivo. | 🔴 | 3 |
| HU-04 | Como visitante, quiero que un doble clic me lleve directo a la noticia original. | 🔴 | 3 |
| HU-05 | Como visitante, quiero que un clic me muestre noticias similares para seguir descubriendo contenido. | 🔴 | 4 |
| HU-06 | Como visitante, quiero filtrar el tablero por etiqueta (diseñador, tendencia, tema). | 🟡 | 4 |
| HU-07 | Como visitante, quiero que el sitio se vea bien en el celular. | 🟡 | 5 |
| HU-08 | Como visitante, quiero una identidad visual editorial y moderna (rebranding). | 🟡 | 5 |
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

### Sprint 2: Estructura y tablero base
- [x] Confirmar el proyecto creado con Vite y el `.gitignore`
- [x] Variables de marca en `src/styles/variables.css`
- [x] Componente `Header` con logo y lema
- [x] Página `Home` que carga las noticias desde `news.json`
- [x] Componente `Board` con acomodo tipo mosaico (versión inicial)
- [x] Componente `NewsCard` con imagen, título, etiquetas y enlace
- [x] Componente `PlatformBadge` para identificar la fuente
- [x] Guía de Git en `docs/GIT.md`
- [ ] Llenar `news.json` con al menos 20 noticias reales y sus etiquetas
- [ ] Cambiar el mosaico por un acomodo disperso
- [ ] Primer despliegue en Vercel

### Sprint 3: Interacciones
- [ ] Efecto *pop* elástico en *hover*
- [ ] Hook `useClickOrDoubleClick` para distinguir clic y doble clic
- [ ] Doble clic que abre la URL en una pestaña nueva

### Sprint 4: Recomendaciones
- [ ] Algoritmo de similitud por etiquetas en común
- [ ] Vista de recomendaciones con React Router
- [ ] Filtros por etiqueta

### Sprint 5: Rebranding y producción
- [ ] Paleta, tipografía y logo nuevos
- [ ] Diseño responsivo
- [ ] Optimización de imágenes y rendimiento
- [ ] Despliegue final en Vercel con dominio de producción
