# 🌿 Guía de Git del proyecto

Cómo se trabaja con Git y GitHub en **MAU**. Complementa la sección de flujo de Git en [ACUERDOS.md](ACUERDOS.md).

- **Repositorio remoto:** https://github.com/cruzhernandezmauricio4-wq/DEVF_ProyectoFinal
- **Rama principal:** `main`

---

## 1. Crear el proyecto con Vite

El proyecto se generó con:

```bash
npm create vite@latest mau -- --template react
cd mau
npm install
npm run dev
```

Vite crea automáticamente el `.gitignore`, que evita subir:

| Se ignora | Por qué |
|---|---|
| `node_modules/` | Dependencias. Se reinstalan con `npm install` |
| `dist/` | Versión compilada. Se genera con `npm run build` |
| `*.log` | Registros de errores de npm |
| `*.local` | Variables de entorno locales, que pueden incluir claves |
| `.DS_Store`, `.idea` | Archivos del sistema operativo y del editor |

---

## 2. Ciclo de trabajo diario

```bash
# 1. Traer lo último del remoto
git pull origin main

# 2. Crear una rama para la funcionalidad
git switch -c feature/nombre-de-la-funcionalidad

# 3. Revisar qué cambió
git status
git diff

# 4. Agregar los archivos del cambio
git add src/components/NewsCard.jsx src/components/NewsCard.css

# 5. Guardar el cambio con un mensaje claro
git commit -m "feat: agrega componente NewsCard"

# 6. Subir la rama a GitHub
git push -u origin feature/nombre-de-la-funcionalidad
```

Luego, en GitHub: **Pull Request → revisar → Merge** a `main`.

> Mientras el proyecto sea individual y pequeño, está bien hacer commits directo a `main`. Usar ramas es la práctica recomendada conforme el proyecto crezca.

---

## 3. Mensajes de commit

Formato: `tipo: descripción en presente y en minúsculas`

| Tipo | Cuándo usarlo |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de un error |
| `docs` | Cambios en documentación (`.md`) |
| `style` | Cambios visuales o de CSS que no alteran la lógica |
| `refactor` | Reorganizar código sin cambiar lo que hace |
| `chore` | Configuración, dependencias y mantenimiento |

---

## 4. Comandos útiles

| Comando | Qué hace |
|---|---|
| `git log --oneline` | Muestra el historial resumido |
| `git restore <archivo>` | Descarta cambios no guardados de un archivo |
| `git restore --staged <archivo>` | Saca un archivo del `git add` |
| `git branch` | Lista las ramas locales |
| `git remote -v` | Muestra el repositorio remoto configurado |

---

## 5. Antes de hacer push

- [ ] `npm run lint` sin errores
- [ ] `npm run build` sin errores
- [ ] `git status` no muestra archivos que no deberían subirse
