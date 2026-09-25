import { AUTH_API, SESSION_MINUTES } from '../config/auth'

// Petición al backend de autenticación. Si hay token, lo envía como Bearer.
async function request(path, { token, body, signal } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${AUTH_API}${path}`, {
    method: body ? 'POST' : 'GET',
    headers,
    body: body && JSON.stringify(body),
    signal,
  })

  const data = await response.json()
  if (!response.ok) {
    const error = new Error(data.message ?? 'Error de autenticación')
    error.status = response.status
    throw error
  }
  return data
}

// El backend valida el token y responde con los datos del usuario (incluido su rol).
export function getCurrentUser(accessToken, { signal } = {}) {
  return request('/me', { token: accessToken, signal })
}

export async function login(username, password) {
  let tokens
  try {
    tokens = await request('/login', {
      body: { username, password, expiresInMins: SESSION_MINUTES },
    })
  } catch (error) {
    if (error.status === 400) throw new Error('Usuario o contraseña incorrectos.')
    throw error
  }

  const session = { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }
  const user = await getCurrentUser(session.accessToken)
  return { user, session }
}

// Valida una sesión guardada. Si el token expiró, intenta renovarlo una vez.
export async function restoreSession(session, { signal } = {}) {
  try {
    return { user: await getCurrentUser(session.accessToken, { signal }), session }
  } catch (error) {
    if (error.status !== 401) throw error

    const tokens = await request('/refresh', {
      body: { refreshToken: session.refreshToken, expiresInMins: SESSION_MINUTES },
      signal,
    })
    const renewed = { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }
    return { user: await getCurrentUser(renewed.accessToken, { signal }), session: renewed }
  }
}

// Recurso protegido: el backend solo lo entrega con un token válido.
export async function getCommunityMembers(accessToken, { signal } = {}) {
  const data = await request(
    '/users?limit=12&select=firstName,lastName,username,email,role,image',
    { token: accessToken, signal },
  )
  return data.users
}
