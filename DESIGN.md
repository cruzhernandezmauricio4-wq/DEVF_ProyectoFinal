---
version: 1.0
name: MAU-design-system
description: Tablero editorial de noticias de moda. Plata cromada y vidrio líquido sobre un fondo perlado; la fotografía es la protagonista y la interfaz flota encima en cápsulas de cristal. Un solo acento (grafito), títulos en serif editorial y un pop elástico al tocar las tarjetas.
references:
  - "awesome-design-md / apple: vidrio sobre fotografía, toques de 44 px, presión scale(0.95), lectura a 17 px"
  - "awesome-design-md / pinterest: la foto es la tarjeta, mosaico por columnas, radios 16/32/píldora"
  - "awesome-design-md / wired: serif editorial, eyebrow en mayúsculas, líneas finas como separadores"
  - "awesome-liquid-glass: refracción con feTurbulence + feDisplacementMap, capas de tinte, brillo y borde"

colors:
  graphite: "#1c1d21"          # único acento en claro: botones, chip activo, foco
  graphite-soft: "#3a3c42"
  silver-50: "#f7f8fa"
  silver-100: "#eef0f3"
  silver-200: "#dfe2e7"
  silver-300: "#c9cdd4"
  silver-400: "#a4a9b2"
  bg: "#e6e8ec"
  text: "#1c1d21"
  muted: "#595d65"
  error: "#b3261e"
  success: "#1f7a52"
  dark-bg: "#0f1013"
  dark-text: "#eceef2"
  dark-muted: "#a3a8b1"
  dark-accent: "#e4e7ec"        # en oscuro el acento se invierte a plata clara

typography:
  display:  { fontFamily: "Instrument Serif", weight: 400, lineHeight: 0.9-1.1, letterSpacing: -0.02em }
  body:     { fontFamily: "Inter Variable", size: 17px, weight: 400, lineHeight: 1.47 }
  ui:       { fontFamily: "Inter Variable", size: 13px, weight: 500-600 }
  eyebrow:  { fontFamily: "Inter Variable", size: 11px, weight: 600, transform: uppercase, letterSpacing: 0.14em }

rounded: { sm: 16px, md: 24px, lg: 32px, pill: 999px }
spacing: { base: 8px, scale: [4, 8, 12, 16, 24, 32, 48, 80], gutter: "16px celular / 24px desde 768px" }
touch-target: 44px

components:
  glass:          "tinte translúcido + ::before con backdrop-filter blur(20px) saturate(180%) + ::after borde de luz diagonal"
  glass--liquid:  "blur(4px) + filter url(#mau-liquid) (refracción) + tinte más denso; solo Chromium"
  nav-capsule:    "cápsula fija; arriba a la derecha en computadora, barra de pestañas abajo en celular"
  news-card:      "foto a sangre, radio 24px (16px en celular), panel de vidrio con fuente, plataforma y título"
  segmented:      "control segmentado de vidrio para la plataforma; opción activa en grafito"
  chip:           "píldora de vidrio para etiquetas; activa en grafito"
  button:         "píldora metálica de 44px; ghost = vidrio"
---

# MAU · Sistema de diseño

Este archivo sigue el formato de [awesome-design-md](https://github.com/voltagent/awesome-design-md): describe el sistema en texto para que una persona o un agente de código genere pantallas que combinen con MAU. Los valores reales viven en [`src/styles/variables.css`](src/styles/variables.css); el porqué de cada decisión, con capturas, está en [`docs/DISENO.md`](docs/DISENO.md).

## 1. Tema visual y atmósfera

Un **moodboard editorial**. La fotografía de moda ocupa todo; la interfaz es cristal que flota encima. El fondo es plata perlada (azul hielo, rosa, menta y champaña) en claro, y grafito con reflejos apagados en oscuro. El logo es la leyenda completa en letras cromadas.

- La foto es la tarjeta (Pinterest): sin márgenes internos, los datos van encima en un panel de vidrio.
- La interfaz no compite con las fotos (Apple): un solo acento y cromo discreto.
- La voz es de revista (Wired): títulos serif grandes y etiquetas pequeñas en mayúsculas.

## 2. Color

| Rol | Claro | Oscuro | Uso |
|---|---|---|---|
| Acento | `#1c1d21` grafito | `#e4e7ec` plata | **Solo** botones, chip/segmento activo y foco. Nunca decorativo |
| Texto | `#1c1d21` | `#eceef2` | Títulos y cuerpo |
| Texto secundario | `#595d65` | `#a3a8b1` | Metadatos, ayudas, conectores del logo |
| Error / éxito | `#b3261e` / `#1f7a52` | `#ff8a80` / `#6fd6a4` | Formularios y avisos |
| Línea fina | grafito al 10 % | blanco al 10 % | Separadores (Wired) |

No hay un segundo color de marca. Los degradados solo existen en el fondo perlado, en el cromo del logo y en el metal de los botones.

## 3. Tipografía

| Rol | Fuente | Tamaño | Notas |
|---|---|---|---|
| Logo | Instrument Serif | `clamp(2.75rem, 7.5vw, 7rem)` | Cromo; "for" y "and" en cursiva, al 55 % y en gris |
| Título de página | Instrument Serif 400 | `clamp(2.5rem, 6vw, 4.5rem)` | Tracking −0.02em |
| Título de tarjeta | Instrument Serif 400 | 1.3rem (1rem en celular) | Máximo 3 líneas |
| Cuerpo de lectura | Inter 400 | 17px / 1.47 | Resumen de la noticia |
| Interfaz | Inter 500–600 | 13px | Navegación, chips, botones |
| Eyebrow | Inter 600 | 11px, MAYÚSCULAS, +0.14em | Fuente, fecha, "51 noticias", "Fuentes" |

Las fuentes van empaquetadas con la app porque la CSP no permite fuentes externas.

## 4. Componentes

- **Vidrio (`.glass`)**: tres capas. El elemento lleva el tinte y el brillo especular (sombras interiores arriba a la izquierda y abajo a la derecha). `::before` desenfoca el fondo. `::after` pinta un borde de luz que se desvanece en diagonal.
- **Vidrio líquido (`.glass--liquid`)**: igual, pero con poco desenfoque y **refracción SVG** (`#mau-liquid`), así el fondo se ve doblado y no solo borroso. Se usa en la cápsula de navegación, el buscador, "Volver al tablero" y el panel de la tarjeta durante el pop.
- **Cápsula de navegación**: siempre visible. En la computadora va arriba a la derecha y solo tiene texto (el tema y "Salir" son íconos). En el celular es una barra de pestañas abajo, con ícono y texto.
- **Tarjeta de noticia**: foto a sangre, sombra suave (la única sombra "de producto"), panel de vidrio con eyebrow de la fuente, insignia de plataforma y título serif. Al pasar el mouse hace el **pop elástico**, se endereza si estaba girada y su panel se vuelve líquido.
- **Buscador**: píldora de vidrio líquido de 48px.
- **Control segmentado**: plataforma (Todas, Revista, YouTube, TikTok, Instagram) en una sola cápsula.
- **Chips**: etiquetas en píldoras de vidrio; en el celular van en una tira que se desliza.
- **Botón**: píldora metálica de 44px. La versión *ghost* es de vidrio y *small* mide 36px.

## 5. Diseño y espaciado

- Base de 8px: 4, 8, 12, 16, 24, 32, 48, 80.
- Margen lateral (`--gutter`): 16px en el celular y 24px desde 768px. El ancho máximo es de 1,680px.
- Tablero en columnas (masonry): **2** en el celular (separación de 10px), columnas de 220px desde 640px y de 250px desde 1,024px, con 5 en una pantalla de 1,440px.
- **Tablero disperso** desde 1,024px: las tarjetas giran entre −0.7° y 0.8°, como recortes pegados a mano.

## 6. Profundidad

| Nivel | Tratamiento | Uso |
|---|---|---|
| Plano | Sin sombra | Texto, fondo |
| Línea fina | 1px al 10 % | Separadores de la noticia y del pie |
| Vidrio | Tinte + desenfoque + borde de luz + sombra suave | Paneles, avisos, formularios |
| Vidrio líquido | Lo anterior + refracción | Controles que flotan sobre fotos |
| Foto | `0 8px 24px` y `0 22px 50px` en el pop | Tarjetas de noticia |

## 7. Movimiento

- **Pop elástico**: `cubic-bezier(0.34, 1.56, 0.64, 1)`, se deforma hasta un 13 % y termina en 1.045.
- **Líquido**: `cubic-bezier(0.175, 0.885, 0.32, 1.6)` en la cápsula, los segmentos y los avisos.
- **Presión**: `scale(0.95)` en botones, pestañas y chips.
- Las animaciones de elementos de vidrio **no usan opacidad**: un elemento semitransparente no deja que su vidrio vea el fondo.
- `prefers-reduced-motion`: sin rebotes. `prefers-reduced-transparency`: superficies sólidas.

## 8. Hacer y no hacer

**Hacer**
- Poner los datos de una foto en un panel de vidrio **encima** de la foto, no debajo.
- Usar el grafito (o la plata en oscuro) solo para acciones y estados activos.
- Dejar al menos 44px de área de toque en todo lo que se toca.
- Crear variables en `variables.css` y definir su valor oscuro en `:root[data-theme='dark']`.
- Usar `.glass--liquid` solo en controles pequeños que flotan sobre fotos.

**No hacer**
- Agregar un segundo color de acento.
- Poner `.glass--liquid` en muchos elementos a la vez (por ejemplo, en todas las tarjetas): el filtro cuesta.
- Poner `mask`, `filter` u `opacity` en un contenedor que tenga vidrio adentro, porque el vidrio deja de ver el fondo.
- Usar blancos o sombras fijas (`rgb(255 255 255 / …)`) en los componentes; usar las variables para que funcione el modo oscuro.
- Cargar fuentes o scripts externos: la CSP los bloquea.

## 9. Responsivo

| Ancho | Cambios |
|---|---|
| < 640px | 2 columnas, panel compacto, plataforma solo con ícono |
| < 720px | Navegación como barra de pestañas abajo; avisos arriba de ella |
| 720–1,279px | Cápsula arriba a la derecha y el logo un renglón abajo |
| ≥ 1,024px | Etiquetas en renglones (sin deslizar) y tablero disperso |
| ≥ 1,280px | Logo y cápsula en la misma línea |

## 10. Guía para agentes

- "Agrega una página nueva": usa `.page`, un `.page__title` serif y los paneles con `.glass`.
- "Agrega un control que flota sobre fotos": usa `.glass .glass--liquid` con radio de píldora.
- "Agrega una etiqueta de metadatos": usa `.eyebrow`.
- Cualquier color nuevo va como variable en `:root` y en `:root[data-theme='dark']`.
