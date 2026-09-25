import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

function Forbidden() {
  const { user } = useAuth()

  return (
    <main className="page">
      <h1 className="page__title">403 · Acceso restringido</h1>
      <p className="page__lead">
        Tu cuenta tiene el rol <strong>{user?.role}</strong> y esta sección es solo para
        curadores de MAU.
      </p>
      <Link to="/" className="button">
        Volver al tablero
      </Link>
    </main>
  )
}

export default Forbidden
