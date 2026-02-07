"use client"

import ArticlePost from "@/components/article-post";
import { DialogNoCloseButton } from "@/components/dialog";
import Post from "@/components/post";
import { TextareaDemo } from "@/components/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthGuard } from "@/guard/AuthGuard";
import { usePosts } from "@/hooks/usePost";
import { formatDate } from "@/lib/settings.date";
import { createPost } from "@/services/post.service";
import { CreatePostSchema } from "@/schemas/post.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, Loader2, NewspaperIcon, ImagePlus, X } from "lucide-react";
import { useState, useRef } from "react";

export default function HomeClient() {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ title?: string; content?: string; image?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: posts, isLoading } = usePosts();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setTitle('');
      setContent('');
      setImage(null);
      setImagePreview(null);
      setErrors({});
      setOpenNewPost(false);

      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error: any) => {
      console.error('Erro ao criar post:', error);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors({ image: 'Por favor, selecione uma imagem válida' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ image: 'A imagem deve ter no máximo 5MB' });
      return;
    }

    setImage(file);
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
    setErrors({});
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  function handleOpenNewPost() {
    setOpenNewPost(true);
    setErrors({});
  }

  function handleCloseNewPost() {
    setOpenNewPost(false);
    setTitle('');
    setContent('');
    setImage(null);
    setImagePreview(null);
    setErrors({});
  }

  function handleSubmit() {
    setErrors({});

    const result = CreatePostSchema.safeParse({ title, content });

    if (!result.success) {
      const fieldErrors: { title?: string; content?: string } = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as 'title' | 'content';
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    mutation.mutate({ title, content, image: image || undefined });
  }

  return (
    <>
      <AuthGuard>
        <DialogNoCloseButton
          open={openNewPost}
          onClose={handleCloseNewPost}
          title="O que deseja postar?"
          description="Preencha os campos abaixo para criar um novo post."
          icon={<NewspaperIcon />}
          textButton={mutation.isPending ? "Postando..." : "Postar"}
          onSubmit={handleSubmit}
          disabled={mutation.isPending}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Título do post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo</Label>
              <TextareaDemo
                placeholder="Conteúdo do post"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-36 resize-none w-full wrap-break-word whitespace-pre-wrap break-all"
              />
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content}</p>
              )}
            </div>

            <div className="space-y-2">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors cursor-pointer"
                >
                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Clique para adicionar uma imagem</span>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {errors.image && (
                <p className="text-sm text-destructive">{errors.image}</p>
              )}
            </div>
          </div>
        </DialogNoCloseButton>

        <ArticlePost>
          <div className="border-b-2 bg-neutral-900 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-medium">Página inicial</h1>
            <button>
              <CirclePlus
                className="cursor-pointer hover:scale-110 transition-all"
                onClick={handleOpenNewPost}
              />
            </button>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Carregando seus posts...</p>
            </div>
          )}

          {posts?.map(post => (
            <Post
              key={`${post.id}-${post.isLiked}`}
              id={post.id}
              username={post.author.name}
              authorId={post.author.id}
              avatar={post.author.avatar}
              createdAt={formatDate(post.createdAt)}
              title={post.title}
              content={post.content}
              image={post.image}
              likes={post.likes}
              isLiked={post.isLiked}
              comments={post.comments}
            />
          ))}
        </ArticlePost>
      </AuthGuard>
    </>
  );
}