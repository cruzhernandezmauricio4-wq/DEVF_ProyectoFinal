import { afterEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { AppError } from '../utils/errors'
import { requestJson } from './httpClient'

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

afterEach(() => vi.unstubAllGlobals())

describe('requestJson', () => {
  it('devuelve los datos validados por el esquema', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ name: 'MAU', extra: 1 })))
    const data = await requestJson('https://api.test', { schema: z.object({ name: z.string() }) })
    expect(data).toEqual({ name: 'MAU' })
  })

  it('convierte una falla de red en AppError "network"', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    await expect(requestJson('https://api.test')).rejects.toMatchObject({ kind: 'network' })
  })

  it('convierte un código de error en AppError "http" con su status y mensaje', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ message: 'Invalid credentials' }, 400)))
    const error = await requestJson('https://api.test').catch((e) => e)
    expect(error).toBeInstanceOf(AppError)
    expect(error).toMatchObject({ kind: 'http', status: 400, message: 'Invalid credentials' })
  })

  it('marca como "validation" una respuesta que no cumple el esquema', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ name: 42 })))
    await expect(
      requestJson('https://api.test', { schema: z.object({ name: z.string() }) }),
    ).rejects.toMatchObject({ kind: 'validation' })
  })

  it('corta la petición al agotarse el tiempo', async () => {
    // fetch que nunca responde, salvo que lo cancelen
    const hangingFetch = (url, { signal }) =>
      new Promise((_, reject) => signal.addEventListener('abort', () => reject(signal.reason)))
    vi.stubGlobal('fetch', vi.fn(hangingFetch))
    await expect(requestJson('https://api.test', { timeoutMs: 20 })).rejects.toMatchObject({ kind: 'timeout' })
  })

  it('propaga la cancelación hecha por la app sin convertirla en error de red', async () => {
    const hangingFetch = (url, { signal }) =>
      new Promise((_, reject) => signal.addEventListener('abort', () => reject(signal.reason)))
    vi.stubGlobal('fetch', vi.fn(hangingFetch))
    const controller = new AbortController()
    const request = requestJson('https://api.test', { signal: controller.signal })
    controller.abort()
    const error = await request.catch((e) => e)
    expect(error).not.toBeInstanceOf(AppError)
    expect(error.name).toBe('AbortError')
  })
})
