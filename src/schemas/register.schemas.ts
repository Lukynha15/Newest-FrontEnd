import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(30, 'Nome pode ter no máximo 30 caracteres'),
  email: z.string()
    .email('Email inválido'),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  bio: z.string()
    .max(200, 'Bio pode ter no máximo 200 caracteres')
    .optional(),
  avatar: z.instanceof(File).optional()
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;