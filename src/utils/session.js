// Guarda los tokens en el navegador para no pedir login en cada visita.
const STORAGE_KEY = 'mau.session'

export function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
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
