"use client"

import ArticlePost from "@/components/article-post";
import { DialogNoCloseButton } from "@/components/dialog";
import Post from "@/components/post";

import { TextareaDemo } from "@/components/textarea";
import { Input } from "@/components/ui/input";
import { AuthGuard } from "@/guard/AuthGuard";
import { usePosts } from "@/hooks/usePost";
import { formatDate } from "@/lib/settings.date";
import { createPost } from "@/services/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CirclePlus, NewspaperIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const { data: posts } = usePosts();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setTitle('');
      setContent('');
      setError('');
      setOpenNewPost(false);

      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Erro ao criar post:', error);
      setError('Erro ao criar post. Tente novamente.');
    },
  });

  function handleOpenNewPost() {
    setOpenNewPost(true);
    setError('');
  }

  function handleCloseNewPost() {
    setOpenNewPost(false);
    setTitle('');
    setContent('');
    setError('');
  }

  function handleSubmit() {
    setError('');

    if (!content.trim()) {
      setError('O conteúdo não pode estar vazio!');
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
              <span>{error}</span>
            </div>
          )}
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
            />
          ))}


        </ArticlePost>
      </AuthGuard>
    </>
  );
}