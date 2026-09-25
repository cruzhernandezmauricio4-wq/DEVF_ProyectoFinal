import { describe, expect, it } from 'vitest'
import { extractTags } from './tags'

describe('extractTags', () => {
  it('detecta temas por palabras clave', () => {
    expect(extractTags('Emporio Armani Spring 2027 Ready-to-Wear')).toEqual(['pasarela'])
    expect(extractTags('Naomi Campbell Arrives at Vogue World: Milano')).toEqual(['celebridades'])
  })

  it('suma las categorías del feed sin duplicar', () => {
    expect(extractTags('Gucci luxury bag', ['Runway', 'Shopping / Fashion'])).toEqual([
      'lujo',
      'accesorios',
      'runway',
      'fashion',
    ])
  })

  it('devuelve máximo 5 etiquetas', () => {
    const text = 'runway streetwear luxury recycled beauty red carpet shopping ceo bag'
    expect(extractTags(text)).toHaveLength(5)
  })
})
