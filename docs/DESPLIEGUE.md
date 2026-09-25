# 🚀 Despliegue en Vercel y CI/CD

Cómo MAU pasa de un commit a estar publicado en internet, y qué se revisa automáticamente en el camino.

---

## 1. Resumen

```
  tú: git push ──► GitHub ──┬──► GitHub Actions (CI) ──► linter · pruebas · build ──► ✅ / ❌ en el PR
                            │
                            └──► Vercel (CD) ──┬── rama sprint-*  →  vista previa (URL temporal)
                                               └── main           →  producción (URL pública)
```

| Práctica | Herramienta | Qué hace en MAU |
|---|---|---|
| **CI**: Integración Continua | GitHub Actions ([`ci.yml`](../.github/workflows/ci.yml)) | En cada Pull Request y en cada cambio a `main`: instala las dependencias, corre el linter, las pruebas y el build. Si algo falla, el PR queda marcado con ❌ |
| **CD**: Despliegue Continuo | Vercel | Cada push genera un despliegue. Las ramas obtienen una **vista previa** con URL propia; `main` se publica en **producción** |

---

## 2. Antes de desplegar: tener todo en `main`

Vercel publica en producción lo que hay en `main`. Fusiona los Pull Requests **en orden**:

1. `sprint-5-validaciones → main`
2. `sprint-6-optimizacion → main`
3. `sprint-7-despliegue → main`

---

## 3. Paso a paso en Vercel

Basado en la guía oficial: [Projects and Deployments](https://vercel.com/docs/getting-started-with-vercel/projects-deployments).

### 3.1 Crear la cuenta

1. Entra a [vercel.com/signup](https://vercel.com/signup).
2. Elige el plan **Hobby** (gratis, para proyectos personales).
3. Regístrate con **Continue with GitHub**, así Vercel puede ver tus repositorios.

### 3.2 Importar el repositorio

1. En el panel de Vercel: **Add New… → Project**.
2. En **Import Git Repository**, busca `DEVF_ProyectoFinal` y pulsa **Import**.
   - Si no aparece: **Adjust GitHub App Permissions** y dale acceso a ese repositorio.
3. Revisa la configuración:

| Campo | Valor | Nota |
|---|---|---|
| **Project Name** | `mau-moda` (o el que prefieras) | Define la URL: `https://mau-moda.vercel.app` |
| **Framework Preset** | Vite | Lo detecta solo |
| **Root Directory** | `./` | La app está en la raíz del repositorio |
| **Build and Output Settings** | Déjalos como están | Los toma de [`vercel.json`](../vercel.json): `npm ci`, `npm run build` y `dist` |
| **Environment Variables** | *(opcional)* `VITE_RSS2JSON_API_KEY` | Solo si sacaste una clave gratis en rss2json.com para traer 20 noticias por fuente en vez de 10 |

4. Pulsa **Deploy**. En 1 o 2 minutos verás la pantalla de felicitación con la URL.

### 3.3 Verificar el despliegue

Abre la URL y revisa:

- [ ] El tablero carga noticias con imágenes
- [ ] Los filtros y el buscador funcionan
- [ ] Abrir directo `https://<tu-url>/perfil` lleva al login (no marca 404)
- [ ] Entrar con `emilys` / `emilyspass` y abrir **Curaduría** muestra la comunidad
- [ ] Recargar la página en `/curaduria` mantiene la sesión

### 3.4 Compartir

Copia la URL de producción (**Domains** en el panel del proyecto) y agrégala:

- al inicio del [README](../README.md), en la línea **Demo**
- en **About → Website** del repositorio en GitHub
- en el campus, junto con la liga del repositorio

---

## 4. Despliegue continuo (CD)

Una vez conectado, **no hay que volver a desplegar a mano**:

| Acción | Qué hace Vercel |
|---|---|
| `git push` a una rama `sprint-*` | Crea un **Preview Deployment** con URL propia (ej. `mau-moda-git-sprint-8-….vercel.app`) |
| Abrir un Pull Request | El bot de Vercel comenta en el PR con la liga de la vista previa |
| Fusionar el PR en `main` | Crea el **Production Deployment** en la URL pública |
| Un despliegue sale mal | En **Deployments**, elige uno anterior → **Promote to Production** (vuelve atrás en segundos) |

---

## 5. Integración continua (CI)

El workflow [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) corre en una máquina Linux de GitHub:

| Paso | Comando | Falla si… |
|---|---|---|
| Instalar dependencias | `npm ci` | `package-lock.json` no coincide con `package.json` |
| Linter | `npm run lint:ci` | Hay **cualquier** aviso u error de oxlint |
| Pruebas | `npm test` | Falla alguna de las 37 pruebas de Vitest |
| Build | `npm run build` | Vite no puede compilar la app |

Se ve en la pestaña **Actions** del repositorio y como ✅/❌ en cada Pull Request. El badge del README muestra el estado de `main`.

### Proteger `main` (recomendado)

Para que nadie pueda fusionar código que rompe la CI:

1. En GitHub: **Settings → Branches → Add branch ruleset** (o *Add rule*).
2. Aplícalo a la rama `main`.
3. Activa **Require a pull request before merging**.
4. Activa **Require status checks to pass** y agrega **Lint, pruebas y build**.

### Pruebas automáticas

Se agregaron con [Vitest](https://vitest.dev) para que la CI revise algo real:

| Archivo | Qué prueba | Pruebas |
|---|---|---|
| [`schemas/auth.test.js`](../src/schemas/auth.test.js) | Formulario de login, sesión guardada y usuario del backend | 8 |
| [`schemas/news.test.js`](../src/schemas/news.test.js) | Formulario de posts (URLs, etiquetas, plataforma) y modelo de noticia | 9 |
| [`services/httpClient.test.js`](../src/services/httpClient.test.js) | Errores de red, HTTP, validación, tiempo límite y cancelación | 6 |
| [`utils/errors.test.js`](../src/utils/errors.test.js) | Mensajes para el usuario según el tipo de error | 8 |
| [`utils/tags.test.js`](../src/utils/tags.test.js) | Etiquetas automáticas de las noticias | 3 |
| [`utils/html.test.js`](../src/utils/html.test.js) | Limpieza de HTML (y que no ejecute scripts incrustados) | 3 |

```bash
npm test            # corre todas una vez
npm run test:watch  # las vuelve a correr al guardar
```

Para confirmar que las pruebas **sí detectan errores**, se rompió el código a propósito dos veces: se cambió un mensaje y se reintrodujo el bug del sprint 5 del `new URL()`. En ambos casos fallaron justo las pruebas esperadas.

---

## 6. Configuración de Vercel (`vercel.json`)

| Clave | Valor | Para qué |
|---|---|---|
| `framework` | `vite` | Ajustes óptimos para Vite |
| `installCommand` | `npm ci` | Instala exactamente las versiones del `package-lock.json` |
| `buildCommand` / `outputDirectory` | `npm run build` / `dist` | Qué compilar y qué publicar |
| `rewrites` | todo → `/index.html` | React Router maneja las rutas en el navegador. Sin esto, abrir o recargar `/perfil` daría **404** |
| `headers` en `/assets/*` | `Cache-Control: max-age=31536000, immutable` | Los archivos de Vite llevan un hash en el nombre (`index-Dr47nK8W.js`). Se guardan en caché un año y, al cambiar el código, el nombre cambia |

### Encabezados de seguridad

| Encabezado | Protege contra |
|---|---|
| `Content-Security-Policy` | Scripts inyectados (XSS): solo se ejecuta JavaScript del propio sitio y solo se conecta a rss2json y DummyJSON |
| `X-Frame-Options: DENY` | Que otro sitio meta MAU en un `<iframe>` para engañar clics |
| `X-Content-Type-Options: nosniff` | Que el navegador interprete un archivo como otro tipo |
| `Referrer-Policy` | Filtrar la URL completa a otros sitios |
| `Permissions-Policy` | Que la página pida cámara, micrófono o ubicación |

La política de seguridad (CSP) permite:

| Directiva | Permite | Por qué |
|---|---|---|
| `script-src 'self'` | Solo scripts de MAU | Nada inyectado ni `eval` |
| `connect-src` | `'self'`, `api.rss2json.com`, `dummyjson.com` | Las únicas APIs que usa la app |
| `img-src 'self' https: data:` | Imágenes de cualquier sitio https | Las portadas vienen de muchas revistas |
| `frame-ancestors 'none'` | Nadie | Igual que `X-Frame-Options` |

> ⚠️ Si en el futuro se agrega otra API, hay que sumarla a `connect-src`, o el navegador bloqueará las peticiones.

---

## 7. Verificación antes de publicar

Como el despliegue requiere tu cuenta de Vercel, se verificó en local todo lo que se pudo:

| Verificación | Resultado |
|---|---|
| Sintaxis de `ci.yml` y `vercel.json` | ✅ válidos |
| Secuencia de la CI (`npm ci` → lint → pruebas → build) en una copia limpia del proyecto | ✅ |
| `package-lock.json` incluye los binarios de Linux que necesita GitHub Actions | ✅ |
| Servidor local que aplica las reglas de `vercel.json` sobre el build de producción: | |
| · Encabezados de seguridad y caché presentes | ✅ |
| · `/perfil`, `/curaduria` y rutas inexistentes sirven la app (no 404) | ✅ |
| · El tablero carga 60 noticias y las imágenes externas | ✅ |
| · Enlace directo a `/curaduria` → login → regresa con datos de DummyJSON | ✅ |
| · Las páginas diferidas cargan su CSS | ✅ |
| · Recargar `/perfil` conserva la sesión | ✅ |
| · Sin violaciones de la política de seguridad ni errores en consola | ✅ |

### Problema encontrado y corregido

Con la CSP activa, el navegador reportó 3 bloqueos `script-src eval`. **Zod 4** intenta acelerar las validaciones generando código con `new Function` (una forma de `eval`). No se relajó la seguridad; se desactivó ese atajo con `z.config({ jitless: true })` en [`src/config/zod.js`](../src/config/zod.js). Zod valida igual, sin usar `eval`.

---

## 8. Problemas comunes

| Síntoma | Causa | Solución |
|---|---|---|
| 404 al recargar `/perfil` en Vercel | Falta la regla `rewrites` | Ya está en `vercel.json`; revisa que el archivo esté en la raíz |
| El build falla en Vercel por la versión de Node | Vite 8 pide Node 22.12 o mayor | `package.json` ya lo declara en `engines`. En Vercel: **Settings → Build and Deployment → Node.js Version → 22.x** |
| La variable `VITE_RSS2JSON_API_KEY` no se aplica | Las variables se leen **al compilar** | Guárdala en **Settings → Environment Variables** y vuelve a desplegar (**Redeploy**) |
| `npm ci` falla en la CI | `package-lock.json` desactualizado | Corre `npm install` y sube el `package-lock.json` |
| Una API nueva no responde en producción, pero sí en local | La CSP la bloquea | Agrega su dominio a `connect-src` en `vercel.json` |
| Las noticias no cargan en producción | rss2json limita las peticiones gratuitas | Revisa la consola; la app muestra el aviso y el botón **Reintentar** |
