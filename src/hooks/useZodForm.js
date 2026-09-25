import { useState } from 'react'
import { z } from 'zod'
import { getErrorMessage } from '../utils/errors'

function validate(schema, values) {
  const result = schema.safeParse(values)
  if (result.success) return { data: result.data, errors: {} }
  return { data: null, errors: z.flattenError(result.error).fieldErrors }
}

// Maneja un formulario validado con un esquema de Zod.
// - Los errores de un campo aparecen cuando el usuario sale de él o al enviar.
// - Si el envío falla (ej. el backend responde con error), se muestra en `formError`.
export function useZodForm(schema, initialValues) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [formError, setFormError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    const next = { ...values, [name]: value }
    setValues(next)
    setFormError(null)
    if (touched[name]) setErrors(validate(schema, next).errors)
  }

  const handleBlur = (event) => {
    setTouched((current) => ({ ...current, [event.target.name]: true }))
    setErrors(validate(schema, values).errors)
  }

  const fieldError = (name) => (touched[name] ? errors[name]?.[0] : undefined)

  // Props listas para un <FormField />.
  const field = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: fieldError(name),
  })

  const handleSubmit = (onValid) => async (event) => {
    event.preventDefault()
    setFormError(null)
    setTouched(Object.fromEntries(Object.keys(values).map((key) => [key, true])))

    const { data, errors: nextErrors } = validate(schema, values)
    setErrors(nextErrors)
    if (!data) return

    setSubmitting(true)
    try {
      await onValid(data)
    } catch (error) {
      setFormError(getErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  const reset = (nextValues = initialValues) => {
    setValues(nextValues)
    setErrors({})
    setTouched({})
    setFormError(null)
  }

  return { values, setValues, field, handleSubmit, submitting, formError, reset }
}
