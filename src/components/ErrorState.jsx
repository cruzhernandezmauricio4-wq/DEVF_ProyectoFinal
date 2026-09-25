import { Link } from 'react-router'
import './ErrorState.css'

// Bloque de error con opción de reintentar. Se usa cuando falla una petición o una sección.
function ErrorState({ title = 'No se pudo cargar', message, onRetry, showHomeLink = false }) {
  return (
    <section className="error-state glass" role="alert">
      <h2 className="error-state__title">{title}</h2>
      <p className="error-state__message">{message}</p>
      <div className="error-state__actions">
        {onRetry && (
          <button type="button" className="button" onClick={onRetry}>
            Reintentar
          </button>
        )}
        {showHomeLink && (
          <Link to="/" className="button button--ghost">
            Volver al tablero
          </Link>
        )}
      </div>
    </section>
  )
}

export default ErrorState
