import { z } from 'zod'

export const ROLES = ['admin', 'moderator', 'user']

// Formulario de inicio de sesión.
export const LoginFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Escribe tu usuario.')
    .min(3, 'El usuario debe tener al menos 3 caracteres.')
    .max(30, 'El usuario no puede pasar de 30 caracteres.')
    .regex(/^[a-zA-Z0-9._]+$/, 'El usuario solo lleva letras, números, punto o guion bajo.'),
  password: z
    .string()
    .min(1, 'Escribe tu contraseña.')
    .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
})

// Respuestas del backend de autenticación.
export const TokensSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
})

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  image: z.url(),
  role: z.enum(ROLES),
})

export const MembersResponseSchema = z.object({
  users: z.array(UserSchema),
})

// La sesión guardada en el navegador se valida antes de usarla.
export const SessionSchema = TokensSchema
