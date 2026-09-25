// Convierte entidades HTML (&amp;, &#8217;…) en texto normal y quita etiquetas.
export function toPlainText(html = '') {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.documentElement.textContent.trim()
}
