import { SessionSchema } from '../schemas/auth'

// Guarda los tokens en el navegador para no pedir login en cada visita.
const STORAGE_KEY = 'mau.session'

// Si lo guardado no tiene la forma esperada (alguien lo editó a mano), se descarta.
export function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const result = SessionSchema.safeParse(JSON.parse(raw))
    if (result.success) return result.data
    clearSession()
    return null
  } catch {
    clearSession()
    return null
  }
}

export function saveSession(session) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Sin almacenamiento disponible, la sesión dura hasta recargar la página.
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nada que limpiar.
  }
}

// Lee la fecha de expiración que viene dentro del token JWT.
export function getTokenExpiration(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return new Date(JSON.parse(atob(payload)).exp * 1000)
  } catch {
    return null
  }
}
