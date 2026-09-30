import { Link, NavLink } from 'react-router'
import { CURATOR_ROLES } from '../config/auth'
import { useAuth } from '../hooks/useAuth'
import ThemeToggle from './ThemeToggle'
import './Header.css'

// Íconos de línea de la navegación. En el celular la barra va abajo y muestra el
// ícono con el texto debajo, como una barra de pestañas.
const ICONS = {
  board: (
    <>
      <rect x="4" y="4" width="7" height="9" rx="2" />
      <rect x="13" y="4" width="7" height="6" rx="2" />
      <rect x="4" y="15" width="7" height="5" rx="2" />
      <rect x="13" y="12" width="7" height="8" rx="2" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  curation: <path d="m12 3 2.2 5.3L20 9l-4.4 3.8L17 18.5 12 15.6 7 18.5l1.4-5.7L4 9l5.8-.7L12 3Z" />,
  login: <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l4-4-4-4M14 12H4" />,
  logout: <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 16l4-4-4-4M19 12H9" />,
}

function NavIcon({ name }) {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

function Header() {
  const { user, checking, logout } = useAuth()
  const isCurator = user && CURATOR_ROLES.includes(user.role)

  return (
    <header className="header">
      {/* El logo es la leyenda completa; las iniciales M·A·U resaltan en plata cromada. */}
      <Link to="/" className="header__logo" aria-label="MAU · Moda for All and U, ir al tablero">
        <span className="logo__initial">M</span>oda <span className="logo__joiner">for</span>{' '}
        <span className="logo__initial">A</span>ll <span className="logo__joiner">and</span>{' '}
        <span className="logo__initial">U</span>
      </Link>

      {/* Cápsula de vidrio líquido que flota siempre visible: arriba en la computadora,
          abajo en el celular. */}
      <nav className="header__nav glass glass--liquid" aria-label="Principal">
        <NavLink to="/" end className="nav-item">
          <NavIcon name="board" />
          <span>Tablero</span>
        </NavLink>
        {user && (
          <NavLink to="/perfil" className="nav-item">
            <NavIcon name="profile" />
            <span>Perfil</span>
          </NavLink>
        )}
        {isCurator && (
          <NavLink to="/curaduria" className="nav-item">
            <NavIcon name="curation" />
            <span>Curaduría</span>
          </NavLink>
        )}

        <ThemeToggle />

        {!checking &&
          (user ? (
            <div className="header__user">
              <img src={user.image} alt="" width="32" height="32" />
              <span className="header__user-name">{user.firstName}</span>
              <button type="button" className="nav-item nav-item--button" onClick={logout}>
                <NavIcon name="logout" />
                <span>Salir</span>
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="nav-item nav-item--primary">
              <NavIcon name="login" />
              <span>Entrar</span>
            </NavLink>
          ))}
      </nav>
    </header>
  )
}

export default Header
