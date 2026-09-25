import { AUTH_API, SESSION_MINUTES } from '../config/auth'
import { MembersResponseSchema, TokensSchema, UserSchema } from '../schemas/auth'
import { AppError } from '../utils/errors'
import { requestJson } from './httpClient'

// Petición al backend de autenticación. Si hay token, lo envía como Bearer.
function request(path, { token, ...options } = {}) {
  return requestJson(`${AUTH_API}${path}`, {
    ...options,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
}

// El backend valida el token y responde con los datos del usuario (incluido su rol).
export function getCurrentUser(accessToken, { signal } = {}) {
  return request('/me', { token: accessToken, signal, schema: UserSchema })
}

export async function login(username, password) {
  let session
  try {
    session = await request('/login', {
      method: 'POST',
      body: { username, password, expiresInMins: SESSION_MINUTES },
      schema: TokensSchema,
    })
  } catch (error) {
    if (error.status === 400) throw new AppError('auth', 'Usuario o contraseña incorrectos.')
    throw error
  }

  const user = await getCurrentUser(session.accessToken)
  return { user, session }
}

// Valida una sesión guardada. Si el token expiró, intenta renovarlo una vez.
export async function restoreSession(session, { signal } = {}) {
  try {
    return { user: await getCurrentUser(session.accessToken, { signal }), session }
  } catch (error) {
    if (error.status !== 401) throw error

    const renewed = await request('/refresh', {
      method: 'POST',
      body: { refreshToken: session.refreshToken, expiresInMins: SESSION_MINUTES },
      schema: TokensSchema,
      signal,
    })
    return { user: await getCurrentUser(renewed.accessToken, { signal }), session: renewed }
  }
}

// Recurso protegido: el backend solo lo entrega con un token válido.
export async function getCommunityMembers(accessToken, { signal } = {}) {
  const data = await request('/users?limit=12&select=firstName,lastName,username,email,role,image', {
    token: accessToken,
    signal,
    schema: MembersResponseSchema,
  })
  return data.users
}
