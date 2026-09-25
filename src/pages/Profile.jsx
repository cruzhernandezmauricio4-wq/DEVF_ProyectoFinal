import { useAuth } from '../hooks/useAuth'
import { getTokenExpiration } from '../utils/session'
import './Profile.css'

function Profile() {
  const { user, token, logout } = useAuth()
  const expiresAt = getTokenExpiration(token)

  return (
    <main className="page">
      <section className="profile glass">
        <img className="profile__avatar" src={user.image} alt="" width="128" height="128" />
        <div>
          <h1 className="page__title">
            {user.firstName} {user.lastName}
          </h1>
          <p className="profile__username">@{user.username}</p>
          <span className={`role-badge role-badge--${user.role}`}>{user.role}</span>
        </div>
      </section>

      <dl className="profile__details">
        <div>
          <dt>Correo</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Sesión válida hasta</dt>
          <dd>{expiresAt ? expiresAt.toLocaleTimeString('es-MX', { timeStyle: 'short' }) : '—'}</dd>
        </div>
      </dl>

      <section className="profile__favorites glass">
        <h2>Mis favoritos</h2>
        <p>Aquí aparecerán las noticias que guardes. Disponible en un próximo sprint.</p>
      </section>

      <button type="button" className="button button--ghost" onClick={logout}>
        Cerrar sesión
      </button>
    </main>
  )
}

export default Profile
