import { AppError } from '../utils/errors'

const DEFAULT_TIMEOUT_MS = 10_000

// Única puerta de salida hacia las APIs. Todas las peticiones pasan por aquí para
// que los errores lleguen siempre con el mismo formato (AppError).
export async function requestJson(url, { method = 'GET', headers, body, signal, schema, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const timeout = AbortSignal.timeout(timeoutMs)
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout

  let response
  try {
    response = await fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json', ...headers } : headers,
      body: body && JSON.stringify(body),
      signal: combined,
    })
  } catch (error) {
    // Cancelación hecha por la app (al desmontar un componente): se propaga tal cual.
    if (signal?.aborted) throw error
    if (timeout.aborted) throw new AppError('timeout', `Tiempo agotado: ${url}`, { cause: error })
    throw new AppError('network', `Sin respuesta de ${url}`, { cause: error })
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new AppError('http', data?.message ?? `Error ${response.status}`, { status: response.status })
  }

  if (!schema) return data

  const result = schema.safeParse(data)
  if (!result.success) {
    throw new AppError('validation', `Respuesta inválida de ${url}`, { cause: result.error })
  }
  return result.data
}
