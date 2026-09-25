import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { DEMO_ACCOUNTS } from '../config/auth'
import { useAuth } from '../hooks/useAuth'
import './Login.css'

function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Después de entrar, regresa a la página protegida que se quería ver.
  const redirectTo = location.state?.from ?? '/perfil'

  if (user) return <Navigate to={redirectTo} replace />

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(form.username.trim(), form.password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <main className="page login">
      <h1 className="page__title">Entrar</h1>
      <p className="page__lead">Inicia sesión para ver tu perfil y el panel de curaduría.</p>

      <form className="login__form" onSubmit={handleSubmit}>
        <label>
          Usuario
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            required
          />
        </label>
        <label>
          Contraseña
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </label>

        {error && (
          <p className="login__error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="button" disabled={submitting}>
          {submitting ? 'Entrando…' : 'Entrar'}
        </button>
      </form>

      <section className="login__demo">
        <h2>Cuentas de prueba</h2>
        <p>Elige una para llenar el formulario:</p>
        <div className="login__demo-list">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.username}
              type="button"
              className="button button--ghost"
              onClick={() => setForm({ username: account.username, password: account.password })}
            >
              {account.role} · {account.username}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Login
