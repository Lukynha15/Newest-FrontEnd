"use client"

import ArticlePost from "@/components/article-post";
import { DialogNoCloseButton } from "@/components/dialog";
import Post from "@/components/post";
import { TextareaDemo } from "@/components/textarea";
import { Input } from "@/components/ui/input";
import { AuthGuard } from "@/guard/AuthGuard";
import { usePosts } from "@/hooks/usePost";
import { formatDate } from "@/lib/settings.date";
import { CreatePostSchema } from "@/schemas/post.schemas";
import { createPost } from "@/services/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, Loader2, NewspaperIcon } from "lucide-react";
import { useState } from "react";

export default function HomeClient() {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const { data: posts, isLoading } = usePosts();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setTitle('');
      setContent('');
      setErrors({});
      setOpenNewPost(false);

      queryClient.invalidateQueries({ queryKey: ['posts'] });
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