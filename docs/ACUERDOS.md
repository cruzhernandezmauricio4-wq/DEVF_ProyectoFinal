# 🤝 Acuerdos de trabajo

Registro de la dinámica de trabajo del Proyecto Final (M6 · DEV.F).

---

## 1. Definición del proyecto

| Punto | Acuerdo |
|---|---|
| Proyecto | **MAU · Moda for All and U**, un tablero interactivo de noticias de moda |
| Opción base del curso | 🛒 Catálogo Interactivo de Productos, adaptado a noticias de moda |
| Origen | Continuación y rebranding de [Proyecto-DEFV](https://github.com/cruzhernandezmauricio4-wq/Proyecto-DEFV) |
| Validación | Propuesta presentada al/la sensei para su aprobación |

---

## 2. Modalidad de trabajo

- **Modalidad:** individual.
- **Metodología:** **SCRUM adaptado a una sola persona**. Se conservan los artefactos y ceremonias que aportan orden: backlog, sprints, revisión y retrospectiva.

### Roles

| Rol SCRUM | Quién |
|---|---|
| Product Owner | Mauricio Cruz Hernández (define y prioriza el backlog) |
| Scrum Master / guía | Sensei del grupo (resuelve bloqueos y da retroalimentación) |
| Development Team | Mauricio Cruz Hernández |

---

## 3. Sprints y ceremonias

- **Duración del sprint:** 1 semana, alineado a cada entrega del curso.
- **Sprint Planning (inicio de semana):** elegir del backlog las historias que entran al sprint.
- **Daily (autoevaluación de 5 min):** anotar qué hice, qué haré y qué me bloquea.
- **Sprint Review (fin de semana):** entregar en el campus y mostrar avances al/la sensei.
- **Retrospectiva:** registrar qué salió bien y qué mejorar (sección 7).

El tablero de tareas se lleva en **GitHub Projects**, con las columnas *Por hacer → En progreso → En revisión → Hecho*.

---

## 4. Flujo de Git

### Ramas

| Rama | Uso |
|---|---|
| `main` | Código estable. Vercel lo publica automáticamente en **producción** |
| `sprint-<n>-<tema>` | Una rama por sprint/entrega (ej. `sprint-7-despliegue`), para ver qué se hizo en cada uno |

**Flujo:** `sprint-<n>-<tema>` → Pull Request → `main`.

En cada Pull Request:
1. **GitHub Actions (CI)** revisa el código: linter, pruebas y build. Debe quedar en ✅.
2. **Vercel** publica una **vista previa** con su propia URL para probar los cambios antes de fusionar.
3. Al fusionar en `main`, Vercel despliega a producción.

Detalle en [DESPLIEGUE.md](DESPLIEGUE.md).

### Commits

Se usa el formato [Conventional Commits](https://www.conventionalcommits.org/es/):

```
feat: agrega efecto pop elástico a NewsCard
fix: corrige conflicto entre clic y doble clic
docs: actualiza README con estructura del proyecto
style: ajusta paleta de colores del rebranding
refactor: extrae lógica de recomendaciones a un hook
```

- Commits pequeños y frecuentes, con mensajes en español.
- Nunca se sube `node_modules/` ni archivos `.env`.

---

## 5. Convenciones de código

- Componentes en **PascalCase**, un componente por archivo (`NewsCard.jsx`).
- Hooks con prefijo `use` (`useRecommendations.js`).
- Variables y funciones en **camelCase**.
- Colores, tipografías y espaciados de la marca como **variables CSS** en `src/styles/`.
- Solo componentes funcionales con hooks.
- Antes de cada commit, correr `npm run lint`, `npm test` y `npm run build` (lo mismo que revisa la CI).

---

## 6. Definición de "Terminado" (Definition of Done)

Una historia está terminada cuando:

- [ ] Funciona en escritorio y en móvil
- [ ] No hay errores en consola ni en `npm run lint`
- [ ] `npm test` y `npm run build` terminan sin errores
- [ ] La CI de GitHub Actions está en ✅
- [ ] Está fusionada en `main` mediante Pull Request
- [ ] La vista previa en Vercel se revisó
- [ ] El README está actualizado si cambió algo relevante

---

## 7. Comunicación y retrospectivas

- **Dudas técnicas:** primero documentación e investigación (máx. 1 h). Después, consulta al/la sensei o asesoría desde el campus.
- **Entregas:** liga del repositorio y de la rama correspondiente compartida en el campus.

### Registro de retrospectivas

| Sprint | ✅ Qué salió bien | 🔧 Qué mejorar |
|---|---|---|
| 1 | Proyecto definido y repositorio creado | — |
