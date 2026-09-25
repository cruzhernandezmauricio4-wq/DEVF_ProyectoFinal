import { useId } from 'react'
import './FormField.css'

// Campo de formulario con etiqueta, ayuda y mensaje de error accesible.
// Con `options` se muestra como <select>.
function FormField({ label, error, hint, options, ...inputProps }) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  const controlProps = {
    id,
    className: 'form-field__control',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    ...inputProps,
  }

  return (
    <div className={`form-field${error ? ' form-field--invalid' : ''}`}>
      <label htmlFor={id} className="form-field__label">
        {label}
      </label>
      {options ? (
        <select {...controlProps}>
          {options.map(({ value, label: optionLabel }) => (
            <option key={value} value={value}>
              {optionLabel}
            </option>
          ))}
        </select>
      ) : (
        <input {...controlProps} />
      )}
      {hint && (
        <p id={hintId} className="form-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="form-field__error">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
