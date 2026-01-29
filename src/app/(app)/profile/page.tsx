"use client"

import ArticlePost from "@/components/article-post";
import Post from "@/components/post";
import ProfileCard from "@/components/profile-card";
import { AuthGuard } from "@/guard/AuthGuard";
import { formatDate } from "@/lib/settings.date";
import { getMyPost } from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, FileText, Loader2 } from "lucide-react";

export default function Profile() {
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
              <button className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all">
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