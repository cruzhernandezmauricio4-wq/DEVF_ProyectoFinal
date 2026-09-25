// Ruta de la página de una noticia. El id puede ser una URL, así que se codifica.
export const newsPath = (id) => `/noticia/${encodeURIComponent(id)}`
