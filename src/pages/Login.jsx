import { Navigate, useLocation, useNavigate } from 'react-router'
import FormField from '../components/FormField'
import StatusMessage from '../components/StatusMessage'
import { DEMO_ACCOUNTS } from '../config/auth'
import { useAuth } from '../hooks/useAuth'
import { useNotify } from '../hooks/useNotify'
import { useZodForm } from '../hooks/useZodForm'
import { LoginFormSchema } from '../schemas/auth'
import './Login.css'

function Login() {
  const { user, checking, login } = useAuth()
  const notify = useNotify()
  const navigate = useNavigate()
  const location = useLocation()
  const form = useZodForm(LoginFormSchema, { username: '', password: '' })

  // Después de entrar, regresa a la página protegida que se quería ver.
  const redirectTo = location.state?.from ?? '/perfil'

  // Si hay una sesión guardada, se espera a verificarla antes de mostrar el formulario.
  if (checking) return <StatusMessage>Verificando sesión…</StatusMessage>
  if (user) return <Navigate to={redirectTo} replace />

  // Solo se llama si los datos pasaron la validación de Zod.
  const onSubmit = async ({ username, password }) => {
    const loggedUser = await login(username, password)
    notify({ tone: 'success', message: `Hola, ${loggedUser.firstName}. Iniciaste sesión.` })
    navigate(redirectTo, { replace: true })
  }

  return (
    <main className="page login">
      <h1 className="page__title">Entrar</h1>
      <p className="page__lead">Inicia sesión para ver tu perfil y el panel de curaduría.</p>

      <form className="form login__form glass" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FormField label="Usuario" autoComplete="username" {...form.field('username')} />
        <FormField
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          {...form.field('password')}
        />

        {form.formError && (
          <p className="form-alert" role="alert">
            {form.formError}
          </p>
        )}

        <button type="submit" className="button" disabled={form.submitting}>
          {form.submitting ? 'Entrando…' : 'Entrar'}
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
              onClick={() => form.reset({ username: account.username, password: account.password })}
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
