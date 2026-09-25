// Backend de autenticación: DummyJSON emite y valida tokens JWT reales.
// Documentación: https://dummyjson.com/docs/auth
export const AUTH_API = 'https://dummyjson.com/auth'

// Minutos que dura un token de acceso antes de tener que renovarse.
export const SESSION_MINUTES = 60

// Roles con permiso para entrar al panel de curaduría.
export const CURATOR_ROLES = ['admin', 'moderator']

// Cuentas de prueba de DummyJSON, una por rol.
export const DEMO_ACCOUNTS = [
  { role: 'admin', username: 'emilys', password: 'emilyspass' },
  { role: 'moderator', username: 'oliviaw', password: 'oliviawpass' },
  { role: 'user', username: 'averyp', password: 'averyppass' },
]
