import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { CuratedPostFormSchema, NewsSchema } from './news'

const validPost = {
  title: 'Look de Tokio',
  platform: 'tiktok',
  url: 'https://www.tiktok.com/@mau/video/123',
  image: 'https://picsum.photos/seed/tokio/600/800',
  tags: '#Streetwear, japon',
}

const fieldErrors = (data) => z.flattenError(CuratedPostFormSchema.safeParse(data).error).fieldErrors

describe('CuratedPostFormSchema', () => {
  it('acepta un post válido y convierte las etiquetas en lista', () => {
    const result = CuratedPostFormSchema.safeParse(validPost)
    expect(result.success).toBe(true)
    expect(result.data.tags).toEqual(['streetwear', 'japon'])
  })

  it('muestra un error por cada campo vacío', () => {
    const errors = fieldErrors({ title: '', platform: '', url: '', image: '', tags: '' })
    expect(Object.keys(errors).sort()).toEqual(['image', 'platform', 'tags', 'title', 'url'])
  })

  it('bloquea enlaces javascript:', () => {
    const errors = fieldErrors({ ...validPost, image: 'javascript:alert(1)' })
    expect(errors.image).toBeDefined()
  })

  it('rechaza etiquetas con espacios y más de 5 etiquetas', () => {
    expect(fieldErrors({ ...validPost, tags: 'street wear' }).tags).toBeDefined()
    expect(fieldErrors({ ...validPost, tags: 'a, b, c, d, e, f' }).tags).toContain('Máximo 5 etiquetas.')
  })

  it('exige que el enlace corresponda a la plataforma', () => {
    const errors = fieldErrors({ ...validPost, url: 'https://www.instagram.com/p/abc/' })
    expect(errors.url).toContain('El enlace no corresponde a la plataforma elegida.')
  })

  it('no truena con un enlace inválido al comparar la plataforma', () => {
    expect(() => CuratedPostFormSchema.safeParse({ ...validPost, url: 'hola' })).not.toThrow()
  })

  it('acepta subdominios de la plataforma (m.youtube.com, youtu.be)', () => {
    const youtube = { ...validPost, platform: 'youtube' }
    expect(CuratedPostFormSchema.safeParse({ ...youtube, url: 'https://m.youtube.com/watch?v=x' }).success).toBe(true)
    expect(CuratedPostFormSchema.safeParse({ ...youtube, url: 'https://youtu.be/x' }).success).toBe(true)
  })
})

describe('NewsSchema', () => {
  const news = {
    id: '1',
    title: 'Noticia',
    source: 'Vogue',
    platform: 'web',
    url: 'https://www.vogue.com/a',
    image: 'https://assets.vogue.com/a.jpg',
  }

  it('completa valores por defecto', () => {
    const result = NewsSchema.parse(news)
    expect(result.tags).toEqual([])
    expect(result.excerpt).toBe('')
  })

  it('descarta noticias sin imagen o con plataforma desconocida', () => {
    expect(NewsSchema.safeParse({ ...news, image: '' }).success).toBe(false)
    expect(NewsSchema.safeParse({ ...news, platform: 'myspace' }).success).toBe(false)
  })
})
