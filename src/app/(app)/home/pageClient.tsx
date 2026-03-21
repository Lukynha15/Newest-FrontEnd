"use client"

import ArticlePost from "@/components/article-post";
import { DialogNoCloseButton } from "@/components/dialog";
import { MentionTextarea } from "@/components/mention-area-props";
import Post from "@/components/post";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AuthGuard } from "@/guard/AuthGuard";
import { useCloudinaryUpload } from "@/hooks/use-cloudinary";
import { usePosts } from "@/hooks/usePost";
import { formatDate } from "@/lib/settings.date";
import { CreatePostSchema } from "@/schemas/post.schemas";
import { createPost } from "@/services/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, ImagePlus, Loader2, NewspaperIcon, X } from "lucide-react";
import { useRef, useState } from "react";

export default function HomeClient() {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ title?: string; content?: string; image?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, uploading } = useCloudinaryUpload();

  const { data: posts, isLoading } = usePosts();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setTitle('');
      setContent('');
      setImages([]);
      setImagePreviews([]);
      setErrors({});
      setOpenNewPost(false);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error: any) => {
      console.error('Erro ao criar post:', error);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (images.length + files.length > 3) {
      setErrors({ image: 'Máximo de 3 imagens por post' });
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setErrors({ image: 'Por favor, selecione apenas imagens' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ image: 'Cada imagem deve ter no máximo 5MB' });
        return;
      }
    }

    setImages(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    setErrors({});
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  function handleOpenNewPost() {
    setOpenNewPost(true);
    setErrors({});
  }

  function handleCloseNewPost() {
    setOpenNewPost(false);
    setTitle('');
    setContent('');
    setImages([]);
    setImagePreviews([]);
    setErrors({});
  }

  async function handleSubmit() {
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

    const imageUrls = await Promise.all(images.map(img => uploadImage(img)));

    mutation.mutate({ title, content, images: imageUrls });
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
          onSubmit={handleSubmit}
          textButton={mutation.isPending || uploading ? "Postando..." : "Postar"}
          disabled={mutation.isPending || uploading}
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
              <MentionTextarea
                placeholder="Conteúdo do post"
                value={content}
                onChange={(val) => setContent(val)}
                className="h-36 resize-none w-full wrap-break-word whitespace-pre-wrap break-all"
              />
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content}</p>
              )}
            </div>

            <div className="space-y-2">
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute cursor-pointer top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {images.length < 3 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors cursor-pointer"
                >
                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {images.length === 0 ? 'Clique para adicionar uma imagem' : `Adicionar mais (${images.length}/3)`}
                  </span>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
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
          <div className="bg-neutral-800/50 border border-neutral-700/50 shadow-lg px-4 py-3 flex justify-between items-center rounded-b-2xl mb-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700/50 rounded-lg transition-colors cursor-pointer" />
              <h1 className="text-2xl font-semibold">Página inicial</h1>
            </div>
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
              images={post.images}
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