import { describe, expect, it } from 'vitest'
import { AppError, getErrorMessage } from './errors'

describe('getErrorMessage', () => {
  it.each([
    [new AppError('network', 'x'), 'No hay conexión con el servidor. Revisa tu internet e inténtalo de nuevo.'],
    [new AppError('timeout', 'x'), 'El servidor tardó demasiado en responder. Inténtalo de nuevo.'],
    [new AppError('validation', 'x'), 'El servidor respondió con datos inesperados. Inténtalo más tarde.'],
    [new AppError('http', 'x', { status: 401 }), 'Tu sesión expiró. Vuelve a iniciar sesión.'],
    [new AppError('http', 'x', { status: 503 }), 'El servidor tuvo un problema. Inténtalo más tarde.'],
    [new AppError('auth', 'Usuario o contraseña incorrectos.'), 'Usuario o contraseña incorrectos.'],
  ])('traduce %o a un mensaje claro', (error, message) => {
    expect(getErrorMessage(error)).toBe(message)
  })

  it('usa el mensaje del servidor para códigos HTTP sin traducción', () => {
    expect(getErrorMessage(new AppError('http', 'Algo raro', { status: 418 }))).toBe('Algo raro')
  })

  it('no muestra detalles técnicos de errores desconocidos', () => {
    expect(getErrorMessage(new TypeError('undefined is not a function'))).toBe(
      'Ocurrió un error inesperado. Inténtalo de nuevo.',
    )
  })
})
