import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z
    .string()
    .max(100, "Título pode ter no máximo 100 caracteres")
    .min(1, "Título é obrigatório"),
  content: z
    .string()
    .min(1, "Conteúdo é obrigatório")
    .max(500, "Conteúdo pode ter no máximo 500 caracteres"),
});

export type CreatePostFormData = z.infer<typeof CreatePostSchema>;
