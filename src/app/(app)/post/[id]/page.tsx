
'use client';

import ArticlePost from '@/components/article-post';
import Post from '@/components/post';
import { AuthGuard } from '@/guard/AuthGuard';
import { getPostById } from '@/services/post.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function PostPage() {
  const { id } = useParams();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="p-8">Carregando post...</div>;
  }

  if (isError || !post) {
    return <div className="p-8">Post não encontrado</div>;
  }

  return (
    <AuthGuard>
      <ArticlePost>
        <Post
          id={post.id}
          username={post.author.name}
          createdAt={new Date(post.createdAt).toLocaleDateString('pt-BR')}
          title={post.title}
          content={post.content}
          likes={post.likes}
          isLiked={post.isLiked}
          comments={post.comments || 0}
          clickable={false}
          avatar={post.author.avatar}
        />
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Comentários</h2>
        </div>
      </ArticlePost>
    </AuthGuard>
  );
}