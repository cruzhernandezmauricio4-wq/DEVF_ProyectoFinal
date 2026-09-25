import { Link } from 'react-router'

function NotFound() {
  return (
    <main className="page">
      <h1 className="page__title">404 · Página no encontrada</h1>
      <p className="page__lead">Esta ruta no existe en MAU.</p>
      <Link to="/" className="button">
        Volver al tablero
      </Link>
    </main>
  )
}

export default NotFound
