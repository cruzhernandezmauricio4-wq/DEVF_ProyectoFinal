import { Navigate, Outlet, useLocation } from 'react-router'
import StatusMessage from '../components/StatusMessage'
import { useAuth } from '../hooks/useAuth'
import Forbidden from '../pages/Forbidden'

// Envuelve rutas que requieren sesión. Con `roles`, además exige uno de esos roles.
function ProtectedRoute({ roles }) {
  const { user, checking } = useAuth()
  const location = useLocation()

  if (checking) return <StatusMessage>Verificando sesión…</StatusMessage>

  // Sin sesión: al login, recordando a dónde quería ir.
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />

  // Con sesión pero sin permiso: 403.
  if (roles && !roles.includes(user.role)) return <Forbidden />

  return <Outlet />
}

export default ProtectedRoute
