// src/schemas/auth.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid e-mail!'),
  password: z.string().min(6, 'Password must be at least 6 characters long!'),
})

export const registerSchema = z
  .object({
    name: z.string().min(3, 'The name must be at least 3 characters long!'),
    email: z.string().email('Invalid e-mail!'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long!')
      .regex(/[A-Z]/, 'The password must contain at least one capital letter!')
      .regex(/[0-9]/, 'The password must contain at least one number!')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'The password must contain at least one special character!',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid e-mail!'),
})

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long!')
      .regex(/[A-Z]/, 'The password must contain at least one capital letter!')
      .regex(/[0-9]/, 'The password must contain at least one number!')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'The password must contain at least one special character!',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ['confirmPassword'],
  })

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, 'The current password must be at least 6 characters long!'),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long!')
      .regex(/[A-Z]/, 'The password must contain at least one capital letter!')
      .regex(/[0-9]/, 'The password must contain at least one number!')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'The password must contain at least one special character!',
      ),
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Passwords don't match!",
    path: ['newPasswordConfirm'],
  })

export const changeUsernameSchema = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long!')
    .regex(/[A-Z]/, 'The password must contain at least one capital letter!')
    .regex(/[0-9]/, 'The password must contain at least one number!')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'The password must contain at least one special character!',
    ),
  name: z
    .string()
    .min(6, 'The new password must be at least 6 characters long!')
    .max(10),
})

export const DeleteUserSchema = z.object({
  password: z
    .string()
    .min(6, 'The password must be at least 6 characters long!'),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type DeleteUserFormData = z.infer<typeof DeleteUserSchema>

export const verificationSchema = z.object({
  token: z.string().min(1, 'Token de verificação é obrigatório'),
})

export type VerificationData = z.infer<typeof verificationSchema>
