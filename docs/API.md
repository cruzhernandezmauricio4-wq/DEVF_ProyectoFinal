# 🔌 Backend y comunicación con el frontend

Cómo obtiene MAU sus noticias y cómo viajan los datos desde el backend hasta la pantalla.

---

## 1. Backend elegido

MAU no tiene un servidor propio. Consume **APIs gratuitas** que ya existen:

| Fuente | Tipo | Qué aporta | ¿Requiere clave? |
|---|---|---|---|
| [rss2json](https://rss2json.com/) | API REST pública | Convierte feeds RSS de revistas y de YouTube a JSON | No (opcional para más resultados) |
| `src/data/news.json` | Archivo local | Posts curados de TikTok e Instagram | No |
| [DummyJSON Auth](https://dummyjson.com/docs/auth) | API REST pública | Login con tokens JWT, roles y datos protegidos. Ver [RUTAS.md](RUTAS.md) | No |

### ¿Por qué rss2json?

- Las revistas de moda (Vogue, Dazed, Hypebeast…) publican sus noticias en **RSS**, un formato XML. rss2json lo convierte a **JSON**, que es fácil de usar en JavaScript.
- Permite peticiones desde el navegador (**CORS** habilitado), así que el frontend puede llamarla directamente.
- YouTube publica un feed RSS por canal, así que con la misma API se obtienen videos.
- Es gratuita y no requiere registro.

### Opciones descartadas

| API | Motivo |
|---|---|
| NewsAPI | En el plan gratuito bloquea las peticiones desde un sitio publicado (solo funciona en `localhost`) |
| The Guardian | Pide registro y su clave de prueba ya no funciona |
| APIs de TikTok e Instagram | Requieren una cuenta de desarrollador y aprobación de la app |

### Fuentes configuradas

Viven en [`src/config/sources.js`](../src/config/sources.js):

| Nombre | Plataforma | Feed |
|---|---|---|
| Vogue | web | `https://www.vogue.com/feed/rss` |
| Vogue | youtube | `https://www.youtube.com/feeds/videos.xml?channel_id=UCRXiA3h1no_PFkb1JCP0yMA` |
| Dazed | web | `https://www.dazeddigital.com/rss` |
| Hypebeast | web | `https://hypebeast.com/feed` |
| Harper's Bazaar | web | `https://www.harpersbazaar.com/rss/all.xml/` |
| Fashionista | web | `https://fashionista.com/.rss/full/` |

Para agregar una fuente nueva basta con sumar un objeto a esa lista.

---

## 2. Dinámica de comunicación

```
┌─────────────┐   1. monta    ┌──────────────┐   2. pide     ┌──────────────────┐
│  Home.jsx   │ ────────────► │  useNews()   │ ────────────► │  newsService.js  │
│  (página)   │ ◄──────────── │   (hook)     │ ◄──────────── │   getNews()      │
└─────────────┘  6. news /    └──────────────┘  5. noticias  └────────┬─────────┘
                 loading /                      normalizadas          │ 3. una petición
                 error                                                ▼    por fuente
                                                              ┌──────────────────┐
                                                              │  rssClient.js    │
                                                              │  fetchFeed()     │
                                                              └────────┬─────────┘
                                                                       │ HTTP GET
                                                                       ▼
                                                              ┌──────────────────┐
                                                              │    rss2json      │ 4. JSON
                                                              │  (API externa)   │
                                                              └──────────────────┘
```

1. **`Home`** se monta y llama al hook `useNews()`.
2. **`useNews`** activa el estado `loading` y llama a `getNews()`.
3. **`newsService`** lanza **una petición por fuente en paralelo** (`Promise.allSettled`) usando `fetchFeed()`.
4. **`rssClient`** hace el `GET` a rss2json y valida la respuesta.
5. **`newsService`** convierte cada noticia al **modelo de MAU**, genera sus etiquetas, descarta las que no tienen imagen, agrega los posts locales e intercala las fuentes.
6. **`useNews`** entrega `news`, `loading` y `error` a la página, que muestra el tablero o un mensaje.

### Responsabilidad de cada capa

| Capa | Archivo | Responsabilidad |
|---|---|---|
| Configuración | `config/sources.js` | Qué fuentes se consultan y con qué clave |
| Cliente HTTP | `services/rssClient.js` | Hacer la petición y detectar errores |
| Servicio | `services/newsService.js` | Unir, limpiar y normalizar los datos |
| Hook | `hooks/useNews.js` | Estados de React: cargando, error, datos |
| Vista | `pages/Home.jsx` | Mostrar la información |

Los componentes **nunca llaman a la API directamente**. Si algún día cambia el backend, solo se modifica la capa de servicios.

---

## 3. Solicitud de muestra

### Petición

```http
GET https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.vogue.com%2Ffeed%2Frss
```

### Respuesta (resumida)

```json
{
  "status": "ok",
  "feed": { "title": "Vogue", "link": "https://www.vogue.com/" },
  "items": [
    {
      "title": "Emporio Armani Spring 2027 Ready-to-Wear",
      "pubDate": "2026-09-24 22:58:17",
      "link": "https://www.vogue.com/fashion-shows/spring-2027-ready-to-wear/emporio-armani",
      "guid": "6a8f0720c83c5cee0665eb26",
      "author": "Luke Leitch",
      "thumbnail": "https://assets.vogue.com/photos/.../00001-emporio-armani-spring-2027.jpg",
      "description": "",
      "categories": ["Runway"]
    }
  ]
}
```

### Después de normalizar (modelo de MAU)

```json
{
  "id": "6a8f0720c83c5cee0665eb26",
  "title": "Emporio Armani Spring 2027 Ready-to-Wear",
  "excerpt": "",
  "source": "Vogue",
  "platform": "web",
  "url": "https://www.vogue.com/fashion-shows/spring-2027-ready-to-wear/emporio-armani",
  "image": "https://assets.vogue.com/photos/.../00001-emporio-armani-spring-2027.jpg",
  "date": "2026-09-24 22:58:17",
  "tags": ["pasarela", "runway"]
}
```

### Validar la comunicación

**Desde la terminal:**

```bash
npm run api:check
```

Resultado esperado:

```
Probando 6 fuentes en https://api.rss2json.com/v1/api.json

✔ Vogue (web)                10 noticias · "Emporio Armani Spring 2027 Ready-to-Wear"
✔ Vogue (youtube)            10 noticias · "Hunter Schafer Gets Ready for Vogue World: Milano | Last Looks | Vogue"
✔ Dazed (web)                10 noticias · "Here's what happened when Dazed launched a t-shirt with YMC"
✔ Hypebeast (web)            10 noticias · "Jil Sander SS27 Puts a Wrinkle In Its Minimalism"
✔ Harper's Bazaar (web)      10 noticias · "The Spring 2027 Runways Want You to Show Off Your Bra"
✔ Fashionista (web)          10 noticias · "Must Read: Aurora James and the 15 Percent Pledge Sued for Fraud…"

6/6 fuentes disponibles
```

**Desde el navegador:** con `npm run dev`, el tablero muestra las noticias reales. En DevTools → pestaña **Network**, filtra por `rss2json` para ver las 6 peticiones y sus respuestas.

---

## 4. Manejo de errores

Todas las peticiones pasan por el cliente central [`httpClient.js`](../src/services/httpClient.js), que clasifica los errores y valida las respuestas con Zod. El detalle completo está en **[ERRORES.md](ERRORES.md)**.

| Situación | Qué pasa |
|---|---|
| Una fuente falla | Se muestran las demás y un aviso indica cuáles no respondieron |
| Todas las fuentes fallan | Se muestra el motivo (sin conexión, servidor caído…) con un botón **Reintentar** |
| El servidor tarda más de 10 s | Se cancela la petición y se informa |
| El usuario sale de la página antes de que termine la carga | La petición se cancela con `AbortController` |
| Una noticia viene incompleta (sin imagen, enlace inválido) | Zod la descarta sin afectar a las demás |

---

## 5. Etiquetas para las recomendaciones

Las recomendaciones de noticias similares dependen de las **etiquetas**. Se generan en [`src/utils/tags.js`](../src/utils/tags.js) de dos formas:

1. **Categorías del feed**, cuando la revista las incluye (ej. `Runway`).
2. **Palabras clave** encontradas en el título y la descripción, agrupadas en temas:

| Etiqueta | Algunas palabras que la activan |
|---|---|
| `pasarela` | runway, ready-to-wear, fashion week |
| `streetwear` | streetwear, sneaker, nike, adidas |
| `lujo` | luxury, gucci, prada, chanel, dior |
| `vanguardia` | rick owens, margiela, comme des garçons |
| `sustentable` | sustainable, recycled, vintage |
| `celebridades` | red carpet, met gala, vogue world |

---

## 6. Próximos pasos del backend

- [ ] Guardar las noticias en caché unos minutos para no repetir peticiones
- [ ] Mover la clave de rss2json a una **función serverless de Vercel** (`/api/news`) para no exponerla en el navegador
- [ ] Llenar `news.json` con posts reales de TikTok e Instagram
