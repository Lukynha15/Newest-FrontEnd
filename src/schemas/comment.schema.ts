import { z } from 'zod';

export const CreateCommentSchema = z.object({
  content: z.string()
    .min(1, 'Comentário é obrigatório')
    .max(300, 'Comentário pode ter no máximo 300 caracteres'),
});

export type CreateCommentFormData = z.infer<typeof CreateCommentSchema>;