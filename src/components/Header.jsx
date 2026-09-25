import { Link, NavLink } from 'react-router'
import { CURATOR_ROLES } from '../config/auth'
import { useAuth } from '../hooks/useAuth'
import './Header.css'

function Header() {
  const { user, checking, logout } = useAuth()
  const isCurator = user && CURATOR_ROLES.includes(user.role)

  return (
    <header className="header">
      <div className="header__brand">
        <Link to="/" className="header__logo">
          MAU
        </Link>
        <p className="header__tagline">Moda for All and U</p>
      </div>

      <nav className="header__nav glass" aria-label="Principal">
        <NavLink to="/" end>
          Tablero
        </NavLink>
        {user && <NavLink to="/perfil">Perfil</NavLink>}
        {isCurator && <NavLink to="/curaduria">Curaduría</NavLink>}

        {!checking &&
          (user ? (
            <div className="header__user">
              <img src={user.image} alt="" width="32" height="32" />
              <span>{user.firstName}</span>
              <button type="button" className="button button--ghost" onClick={logout}>
                Salir
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="button">
              Entrar
            </NavLink>
          ))}
      </nav>
    </header>
  )
}

export default Header
