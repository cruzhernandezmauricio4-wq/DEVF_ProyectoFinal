import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { LoginFormSchema, SessionSchema, UserSchema } from './auth'

const fieldErrors = (schema, data) => z.flattenError(schema.safeParse(data).error).fieldErrors

describe('LoginFormSchema', () => {
  it('acepta credenciales válidas y quita espacios del usuario', () => {
    const result = LoginFormSchema.safeParse({ username: '  emilys ', password: 'emilyspass' })
    expect(result.success).toBe(true)
    expect(result.data.username).toBe('emilys')
  })

  it('pide los campos vacíos', () => {
    const errors = fieldErrors(LoginFormSchema, { username: '', password: '' })
    expect(errors.username[0]).toBe('Escribe tu usuario.')
    expect(errors.password[0]).toBe('Escribe tu contraseña.')
  })

  it('valida longitud mínima', () => {
    const errors = fieldErrors(LoginFormSchema, { username: 'ab', password: '123' })
    expect(errors.username).toContain('El usuario debe tener al menos 3 caracteres.')
    expect(errors.password).toContain('La contraseña debe tener al menos 6 caracteres.')
  })

  it('rechaza caracteres no permitidos en el usuario', () => {
    const errors = fieldErrors(LoginFormSchema, { username: 'emi lys!', password: 'emilyspass' })
    expect(errors.username).toContain('El usuario solo lleva letras, números, punto o guion bajo.')
  })
})

describe('SessionSchema', () => {
  it('acepta una sesión con ambos tokens', () => {
    expect(SessionSchema.safeParse({ accessToken: 'a', refreshToken: 'b' }).success).toBe(true)
  })

  it('rechaza una sesión alterada', () => {
    expect(SessionSchema.safeParse({ foo: 1 }).success).toBe(false)
    expect(SessionSchema.safeParse({ accessToken: '', refreshToken: 'b' }).success).toBe(false)
  })
})

describe('UserSchema', () => {
  const user = {
    id: 1,
    username: 'emilys',
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@x.dummyjson.com',
    image: 'https://dummyjson.com/icon/emilys/128',
    role: 'admin',
  }

  it('acepta un usuario válido del backend', () => {
    expect(UserSchema.safeParse(user).success).toBe(true)
  })

  it('rechaza un rol desconocido', () => {
    expect(UserSchema.safeParse({ ...user, role: 'superadmin' }).success).toBe(false)
  })
})
