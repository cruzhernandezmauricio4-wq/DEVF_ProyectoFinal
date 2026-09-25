import { useNotify } from '../hooks/useNotify'
import { useZodForm } from '../hooks/useZodForm'
import { CuratedPostFormSchema } from '../schemas/news'
import { addCuratedPost } from '../services/curatedService'
import FormField from './FormField'
import './CuratedPostForm.css'

const EMPTY = { title: '', platform: '', url: '', image: '', tags: '' }

const PLATFORM_OPTIONS = [
  { value: '', label: 'Elige una plataforma' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'web', label: 'Revista / web' },
]

// Formulario para agregar un post curado al tablero. Todo se valida con Zod.
function CuratedPostForm({ onAdded }) {
  const notify = useNotify()
  const form = useZodForm(CuratedPostFormSchema, EMPTY)

  const onSubmit = (data) => {
    const post = addCuratedPost(data)
    form.reset()
    notify({ tone: 'success', message: `"${post.title}" se agregó al tablero.` })
    onAdded(post)
  }

  return (
    <form className="form curated-form glass" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FormField label="Título" {...form.field('title')} />
      <FormField label="Plataforma" options={PLATFORM_OPTIONS} {...form.field('platform')} />
      <FormField
        label="Enlace del post"
        type="url"
        placeholder="https://www.tiktok.com/@usuario/video/…"
        {...form.field('url')}
      />
      <FormField label="Imagen de portada" type="url" placeholder="https://…" {...form.field('image')} />
      <FormField
        label="Etiquetas"
        placeholder="streetwear, japon, vanguardia"
        hint="Separadas por comas. Máximo 5."
        {...form.field('tags')}
      />

      {form.formError && (
        <p className="form-alert" role="alert">
          {form.formError}
        </p>
      )}

      <button type="submit" className="button" disabled={form.submitting}>
        Agregar al tablero
      </button>
    </form>
  )
}

export default CuratedPostForm
