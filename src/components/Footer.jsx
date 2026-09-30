import { Link } from 'react-router'
import { RSS_SOURCES } from '../config/sources'
import './Footer.css'

// Nombres únicos de las fuentes (Vogue aparece dos veces: revista y YouTube).
const SOURCE_NAMES = [...new Set(RSS_SOURCES.map((source) => source.name))]

// Pie editorial: la marca, de dónde vienen las noticias y a quién pertenecen.
function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="footer__brand">
        MAU
      </Link>
      <p className="footer__sources">
        <span className="eyebrow">Fuentes</span> {SOURCE_NAMES.join(' · ')}
      </p>
      <p className="footer__legal">
        Las noticias y sus imágenes pertenecen a cada medio; MAU solo enlaza a la fuente original. Proyecto final
        del Módulo 6 de DEV.F.
      </p>
    </footer>
  )
}

export default Footer
