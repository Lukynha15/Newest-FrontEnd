'use client';

import ArticlePost from '@/components/article-post';
import Post from '@/components/post';
import CommentSection from '@/components/comment-section';
import { AuthGuard } from '@/guard/AuthGuard';
import { getPostById } from '@/services/post.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function PostPage() {
  const { id } = useParams();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <AuthGuard>
        <ArticlePost>
          <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </ArticlePost>
      </AuthGuard>
    );
  }

  if (isError || !post) {
    return (
      <AuthGuard>
        <ArticlePost>
          <div className="p-8 text-center">Post não encontrado</div>
        </ArticlePost>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <ArticlePost>
        <div className="space-y-6 p-6">
          <Post
            id={post.id}
            username={post.author.name}
            authorId={post.author.id}
            createdAt={new Date(post.createdAt).toLocaleDateString('pt-BR')}
            title={post.title}
            content={post.content}
            image={post.image}
            likes={post.likes}
            isLiked={post.isLiked}
            comments={post.comments || 0}
            clickable={false}
            avatar={post.author.avatar}
          />

          <CommentSection postId={post.id} />
        </div>
      </ArticlePost>
    </AuthGuard>
  );
}