// Error de la app con un tipo que permite decidir qué mensaje mostrar.
//   network    → no hubo respuesta (sin internet, CORS, servidor caído)
//   timeout    → el servidor tardó demasiado
//   http       → el servidor respondió con un código de error (4xx, 5xx)
//   validation → el servidor respondió, pero con datos que no cumplen el esquema
export class AppError extends Error {
  constructor(kind, message, { status, cause } = {}) {
    super(message, { cause })
    this.name = 'AppError'
    this.kind = kind
    this.status = status
  }
}

const HTTP_MESSAGES = {
  400: 'La solicitud no es válida.',
  401: 'Tu sesión expiró. Vuelve a iniciar sesión.',
  403: 'No tienes permiso para realizar esta acción.',
  404: 'No encontramos lo que buscabas.',
  429: 'Hiciste demasiadas solicitudes. Espera un momento e inténtalo de nuevo.',
}

// Traduce cualquier error a un mensaje claro para el usuario.
export function getErrorMessage(error) {
  if (!(error instanceof AppError)) return 'Ocurrió un error inesperado. Inténtalo de nuevo.'

  switch (error.kind) {
    case 'network':
      return 'No hay conexión con el servidor. Revisa tu internet e inténtalo de nuevo.'
    case 'timeout':
      return 'El servidor tardó demasiado en responder. Inténtalo de nuevo.'
    case 'validation':
      return 'El servidor respondió con datos inesperados. Inténtalo más tarde.'
    case 'http':
      if (error.status >= 500) return 'El servidor tuvo un problema. Inténtalo más tarde.'
      return HTTP_MESSAGES[error.status] ?? error.message
    default:
      return error.message
  }
}

export const isAbortError = (error) => error?.name === 'AbortError'
