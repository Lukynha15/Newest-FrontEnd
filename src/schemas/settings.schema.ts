import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(30, 'Nome pode ter no máximo 30 caracteres'),
  email: z.string()
    .email('Email inválido'),
  bio: z.string()
    .max(200, 'Bio pode ter no máximo 200 caracteres')
    .optional(),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .optional()
    .or(z.literal('')),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.password && data.password !== '') {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type UpdateProfileFormData = z.infer<typeof UpdateProfileSchema>;