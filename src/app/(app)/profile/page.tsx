"use client"

import ArticlePost from "@/components/article-post";
import Post from "@/components/post";
import ProfileCard from "@/components/profile-card";
import { AuthGuard } from "@/guard/AuthGuard";
import { getMyPost } from "@/services/post.service";
import { formatDate } from "@/types/settings.date";
import { useQuery } from "@tanstack/react-query";

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
        <ProfileCard />
        <div className="flex items-center justify-center flex-col w-120 gap-1 mt-4 mx-auto">
          {isLoading && (
            <div className="text-center py-8">
              <p>Carregando seus posts...</p>
            </div>
          )}

          {isError && (
            <div className="text-center py-8 text-red-500">
              <p>Erro ao carregar posts: {error.message}</p>
            </div>
          )}

          {!isLoading && !isError && posts?.length === 0 && (
            <div className="text-center py-8">
              <p>Você ainda não tem posts.</p>
            </div>
          )}

          {!isLoading && !isError && posts?.map((post) => (
            <Post
              key={post.id}
              username={post.author?.name}
              createdAt={formatDate(post.createdAt)}
              title={post.title || ""}
              content={post.content}
              likes={post.likes || 0}
              comments={post.comments || 0}
            />
          ))}
        </div>
      </ArticlePost>
    </AuthGuard>
  );
}