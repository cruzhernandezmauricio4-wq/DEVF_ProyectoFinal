import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import { CURATOR_ROLES } from './config/auth'
import AuthProvider from './context/AuthProvider'
import NotificationProvider from './context/NotificationProvider'
import Curation from './pages/Curation'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import ProtectedRoute from './routes/ProtectedRoute'

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
