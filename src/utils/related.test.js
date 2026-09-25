import { describe, expect, it } from 'vitest'
import { getRelatedNews } from './related'

const news = (id, tags, source = 'Vogue', platform = 'web') => ({ id, tags, source, platform })

describe('getRelatedNews', () => {
  const base = news('base', ['pasarela', 'lujo'])
  const all = [
    base,
    news('dos-tags', ['pasarela', 'lujo'], 'Dazed'),
    news('un-tag', ['lujo'], 'Dazed'),
    news('misma-fuente', ['belleza']),
    news('nada', ['belleza'], 'Hypebeast', 'youtube'),
  ]

  it('no incluye la noticia misma', () => {
    expect(getRelatedNews(base, all).map((n) => n.id)).not.toContain('base')
  })

  it('ordena por etiquetas en común y luego por fuente', () => {
    expect(getRelatedNews(base, all).map((n) => n.id)).toEqual(['dos-tags', 'un-tag', 'misma-fuente'])
  })

  it('descarta noticias sin nada en común', () => {
    expect(getRelatedNews(base, all).map((n) => n.id)).not.toContain('nada')
  })

  it('respeta el límite', () => {
    expect(getRelatedNews(base, all, 1)).toHaveLength(1)
  })
})
