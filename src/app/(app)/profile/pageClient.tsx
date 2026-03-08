"use client"

import { DialogNoCloseButton } from "@/components/dialog";
import Post from "@/components/post";
import ProfileCard from "@/components/profile-card";
import { TextareaDemo } from "@/components/textarea";
import { Input } from "@/components/ui/input";
import { AuthGuard } from "@/guard/AuthGuard";
import { queryClient } from "@/lib/react-query";
import { formatDate } from "@/lib/settings.date";
import { CreatePostSchema } from "@/schemas/post.schemas";
import { createPost, getMyPost } from "@/services/post.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircle, FileText, Loader2, NewspaperIcon } from "lucide-react";
import { useState } from "react";

export default function ProfileClient() {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setTitle('');
      setContent('');
      setErrors({});
      setOpenNewPost(false);

      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
    },
    onError: (error: any) => {
      console.error('Erro ao criar post:', error);
    },
  });

  function handleOpenNewPost() {
    setOpenNewPost(true);
    setErrors({});
  }

  function handleCloseNewPost() {
    setOpenNewPost(false);
    setTitle('');
    setContent('');
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

    mutation.mutate({ title, content });
  }

  const {
    data: posts,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['myPosts'],
    queryFn: getMyPost,
  });

  return (
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
            <Input
              placeholder="Título do post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
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
        </div>
      </DialogNoCloseButton>

      <div className="bg-neutral-900 min-h-dvh overflow-y-auto custom-scrollbar space-y-6">

        <div className="z-10 bg-card/95 backdrop-blur-md border-b border-border rounded-b-2xl">
          <ProfileCard />
        </div>

        <div className="pt-4 space-y-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Carregando seus posts...</p>
            </div>
          )}
          {isError && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">Erro ao carregar posts</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  {error?.message || "Ocorreu um erro inesperado. Tente novamente."}
                </p>
              </div>
            </div>
          )}

          {!isLoading && !isError && posts?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <FileText className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">Nenhum post ainda</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Compartilhe seus pensamentos criando seu primeiro post!
                </p>
              </div>
              <button className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all cursor-pointer" onClick={handleOpenNewPost}>
                Criar primeiro post
              </button>
            </div>
          )}

          {!isLoading && !isError && posts && posts.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Seus posts ({posts.length})
                </h2>
              </div>

              <div className="space-y-4">
                {posts?.map(post => (
                  <Post
                    key={`${post.id}-${post.isLiked}`}
                    id={post.id}
                    username={post.author.name}
                    authorId={post.author.id}
                    createdAt={formatDate(post.createdAt)}
                    title={post.title}
                    content={post.content}
                    likes={post.likes}
                    image={post.image}
                    isLiked={post.isLiked}
                    comments={post.comments}
                    avatar={post.author.avatar}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}