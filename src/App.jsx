import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import { CURATOR_ROLES } from './config/auth'
import AuthProvider from './context/AuthProvider'
import NotificationProvider from './context/NotificationProvider'
import Home from './pages/Home'
import ProtectedRoute from './routes/ProtectedRoute'

// React.lazy: estas páginas se descargan solo cuando alguien las visita.
// Quien solo ve el tablero no descarga el código del login, perfil ni curaduría.
const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const Curation = lazy(() => import('./pages/Curation'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              {/* Rutas públicas */}
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />

              {/* Requieren sesión */}
              <Route element={<ProtectedRoute />}>
                <Route path="perfil" element={<Profile />} />
              </Route>

              {/* Requieren sesión y rol de curador */}
              <Route element={<ProtectedRoute roles={CURATOR_ROLES} />}>
                <Route path="curaduria" element={<Curation />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  )
}

export default App
