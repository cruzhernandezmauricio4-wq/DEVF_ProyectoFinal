import { useCallback, useEffect, useState } from 'react'
import CuratedPostForm from '../components/CuratedPostForm'
import ErrorState from '../components/ErrorState'
import PlatformBadge from '../components/PlatformBadge'
import StatusMessage from '../components/StatusMessage'
import { useAuth } from '../hooks/useAuth'
import { useNotify } from '../hooks/useNotify'
import { getCommunityMembers } from '../services/authService'
import { getCuratedPosts } from '../services/curatedService'
import { getErrorMessage } from '../utils/errors'
import './Curation.css'

function Curation() {
  const { token, logout } = useAuth()
  const notify = useNotify()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)
  const [posts, setPosts] = useState(getCuratedPosts)

  useEffect(() => {
    const controller = new AbortController()

    getCommunityMembers(token, { signal: controller.signal })
      .then((users) => {
        if (!controller.signal.aborted) setMembers(users)
      })
      .catch((err) => {
        if (controller.signal.aborted) return
        // El backend rechazó el token (expiró o es inválido): se avisa y se cierra la sesión.
        if (err.status === 401) {
          notify({ tone: 'error', message: getErrorMessage(err) })
          logout()
        } else {
          setError(err)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [token, logout, notify, attempt])

  const retryMembers = () => {
    setLoading(true)
    setError(null)
    setAttempt((n) => n + 1)
  }

  const handleAdded = useCallback((post) => setPosts((current) => [post, ...current]), [])

  return (
    <main className="page">
      <h1 className="page__title">Panel de curaduría</h1>
      <p className="page__lead">Solo visible para administradores y moderadores.</p>

      <section className="curation__section">
        <h2>Comunidad MAU</h2>
        <p className="curation__hint">Datos protegidos: el backend solo los entrega con un token válido.</p>
        {loading && <StatusMessage>Cargando comunidad…</StatusMessage>}
        {error && (
          <ErrorState
            title="No pudimos cargar la comunidad"
            message={getErrorMessage(error)}
            onRetry={retryMembers}
          />
        )}
        {!loading && !error && (
          <ul className="curation__members">
            {members.map((member) => (
              <li key={member.username} className="glass">
                <img src={member.image} alt="" width="48" height="48" loading="lazy" />
                <div>
                  <strong>
                    {member.firstName} {member.lastName}
                  </strong>
                  <span>{member.email}</span>
                </div>
                <span className={`role-badge role-badge--${member.role}`}>{member.role}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="curation__section">
        <h2>Agregar un post</h2>
        <p className="curation__hint">
          Suma un video de TikTok o YouTube, un post de Instagram o un artículo al tablero.
        </p>
        <CuratedPostForm onAdded={handleAdded} />
      </section>

      <section className="curation__section">
        <h2>Posts curados</h2>
        <p className="curation__hint">Publicaciones agregadas por el equipo que se suman al tablero.</p>
        <div className="curation__table-wrapper glass">
          <table className="curation__table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Plataforma</th>
                <th>Etiquetas</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((item) => (
                <tr key={item.id}>
                  <td>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </td>
                  <td>
                    <PlatformBadge platform={item.platform} />
                  </td>
                  <td>{item.tags.map((tag) => `#${tag}`).join(' ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default Curation
