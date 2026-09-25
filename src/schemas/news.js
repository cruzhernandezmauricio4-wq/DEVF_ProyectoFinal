import { z } from 'zod'

export const PLATFORMS = ['web', 'youtube', 'tiktok', 'instagram']
export const PlatformSchema = z.enum(PLATFORMS)

// Solo se aceptan enlaces http(s): evita URLs peligrosas como `javascript:`.
const httpUrl = (error) => z.url({ protocol: /^https?$/, error })

// Modelo de noticia que usa toda la app, venga de la fuente que venga.
export const NewsSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().default(''),
  source: z.string().min(1),
  platform: PlatformSchema,
  url: httpUrl(),
  image: httpUrl(),
  date: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

export const NewsListSchema = z.array(NewsSchema)

// Dominios válidos para cada plataforma en el formulario de curaduría.
const PLATFORM_HOSTS = {
  youtube: ['youtube.com', 'youtu.be'],
  tiktok: ['tiktok.com'],
  instagram: ['instagram.com'],
}

function matchesPlatform(url, platform) {
  const hosts = PLATFORM_HOSTS[platform]
  if (!hosts || !URL.canParse(url)) return true // un enlace inválido ya lo reporta el campo `url`
  const { hostname } = new URL(url)
  return hosts.some((host) => hostname === host || hostname.endsWith(`.${host}`))
}

// "#Streetwear, japón" → ["streetwear", "japón"]
const splitTags = (text) =>
  text
    .split(',')
    .map((tag) => tag.trim().toLowerCase().replace(/^#/, ''))
    .filter(Boolean)

// Formulario del panel de curaduría para agregar un post al tablero.
export const CuratedPostFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(5, 'El título debe tener al menos 5 caracteres.')
      .max(120, 'El título no puede pasar de 120 caracteres.'),
    platform: z.enum(PLATFORMS, { error: 'Elige una plataforma.' }),
    url: httpUrl('Escribe un enlace válido que empiece con https://'),
    image: httpUrl('La imagen debe ser un enlace válido que empiece con https://'),
    tags: z
      .string()
      .trim()
      .min(1, 'Agrega al menos una etiqueta.')
      .transform(splitTags)
      .pipe(
        z
          .array(
            z
              .string()
              .regex(/^[a-z0-9áéíóúñü-]+$/, 'Las etiquetas solo llevan letras, números o guiones (sin espacios).'),
          )
          .min(1, 'Agrega al menos una etiqueta.')
          .max(5, 'Máximo 5 etiquetas.'),
      ),
  })
  .refine((post) => matchesPlatform(post.url, post.platform), {
    path: ['url'],
    message: 'El enlace no corresponde a la plataforma elegida.',
  })
