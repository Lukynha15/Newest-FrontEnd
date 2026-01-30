"use client"

import ArticlePost from "@/components/article-post";
import { DialogNoCloseButton } from "@/components/dialog";
import Post from "@/components/post";
import ProfileCard from "@/components/profile-card";
import { TextareaDemo } from "@/components/textarea";
import { Input } from "@/components/ui/input";
import { AuthGuard } from "@/guard/AuthGuard";
import { queryClient } from "@/lib/react-query";
import { formatDate } from "@/lib/settings.date";
import { createPost, getMyPost } from "@/services/post.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircle, FileText, Loader2, NewspaperIcon } from "lucide-react";
import { useState } from "react";

export default function ProfileClient() {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorState, setErrorState] = useState('');

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setTitle('');
      setContent('');
      setErrorState('');
      setOpenNewPost(false);

      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      setErrorState('Erro ao criar post. Tente novamente.');
    },
  });

  function handleOpenNewPost() {
    setOpenNewPost(true);
    setErrorState('');
  }

  function handleCloseNewPost() {
    setOpenNewPost(false);
    setTitle('');
    setContent('');
    setErrorState('');
  }

  function handleSubmit() {
    setErrorState('');

    if (!content.trim()) {
      setErrorState('O conteúdo não pode estar vazio!');
      return;
    }

    mutation.mutate({ title, content });
    location.reload()
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
        <Input
          placeholder="Título do post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextareaDemo
          placeholder="Conteúdo do post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-36 resize-none w-full wrap-break-word whitespace-pre-wrap break-all"
        />

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-400 text-red-500 rounded-md">
            <AlertCircle className="w-5 h-5" />
            <span>{errorState}</span>
          </div>
        )}
      </DialogNoCloseButton>

      <ArticlePost>
        <div className="z-10 bg-card/95 backdrop-blur-md border-b border-border">
          <ProfileCard />
        </div>

        <div className="p-6 pt-4 space-y-4">
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
                    id={Number(post.id)}
                    username={post.author.name}
                    createdAt={formatDate(post.createdAt)}
                    title={post.title}
                    content={post.content}
                    likes={post.likes}
                    isLiked={post.isLiked}
                    comments={post.comments}
                    avatar={post.author.avatar}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </ArticlePost>
    </AuthGuard>
  );
}