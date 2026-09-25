import { useCallback, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/authService'
import { clearSession, loadSession, saveSession } from '../utils/session'
import { AuthContext } from './authContext'

// Comparte en toda la app quién está conectado y cómo entrar o salir.
function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  // Mientras se valida una sesión guardada, las rutas protegidas esperan.
  const [checking, setChecking] = useState(() => loadSession() !== null)

  useEffect(() => {
    const stored = loadSession()
    if (!stored) return

    const controller = new AbortController()
    authService
      .restoreSession(stored, { signal: controller.signal })
      .then(({ user, session }) => {
        if (controller.signal.aborted) return
        saveSession(session)
        setSession(session)
        setUser(user)
      })
      .catch(() => {
        if (!controller.signal.aborted) clearSession()
      })
      .finally(() => {
        if (!controller.signal.aborted) setChecking(false)
      })

    return () => controller.abort()
  }, [])

  const login = useCallback(async (username, password) => {
    const { user, session } = await authService.login(username, password)
    saveSession(session)
    setSession(session)
    setUser(user)
    return user
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setSession(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, token: session?.accessToken ?? null, checking, login, logout }),
    [user, session, checking, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
