import { describe, expect, it } from 'vitest'
import { toPlainText } from './html'

describe('toPlainText', () => {
  it('convierte entidades HTML en texto', () => {
    expect(toPlainText('H&amp;M Group &#8217;s sales')).toBe('H&M Group ’s sales')
  })

  it('quita etiquetas HTML', () => {
    expect(toPlainText('<p>Hola <strong>MAU</strong></p>')).toBe('Hola MAU')
  })

  it('no ejecuta scripts incrustados', () => {
    expect(toPlainText('<img src=x onerror="window.hacked=true">Texto')).toBe('Texto')
    expect(window.hacked).toBeUndefined()
  })
})
