'use client';

import { CreateCommentSchema } from '@/schemas/comment.schema';
import { createComment, getCommentsByPostId } from '@/services/comment.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import Comment from '../comment';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { MentionTextarea } from '../mention-area-props';


interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ content?: string }>({});
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentsByPostId(postId),
  });

  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setContent('');
      setErrors({});
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });

  const handleSubmit = () => {
    setErrors({});

    const result = CreateCommentSchema.safeParse({ content });

    if (!result.success) {
      const fieldErrors: { content?: string } = {};
      result.error.issues.forEach((err) => {
        fieldErrors.content = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    mutation.mutate({ content, postId });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Comentários</h2>
          <span className="text-sm text-muted-foreground">
            ({comments?.length || 0})
          </span>
        </div>
      </div>

      <Separator />
      <div className="space-y-3 bg-accent/30 p-4 rounded-xl border border-border">
        <MentionTextarea
          placeholder="Adicione um comentário..."
          value={content}
          onChange={(val) => setContent(val)}
          className="resize-none bg-background"
        />
        {errors.content && (
          <p className="text-sm text-destructive flex items-center gap-1">
            {errors.content}
          </p>
        )}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending || !content.trim()}
            className="gap-2"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Comentar
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Carregando comentários...</p>
          </div>
        )}

        {!isLoading && comments?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center space-y-1">
              <p className="font-semibold">Nenhum comentário ainda</p>
              <p className="text-sm text-muted-foreground">
                Seja o primeiro a comentar!
              </p>
            </div>
          </div>
        )}

        {comments && comments.length > 0 && (
          <div className="space-y-3">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                content={comment.content}
                authorId={comment.author.id}
                authorName={comment.author.name}
                authorAvatar={comment.author.avatar}
                createdAt={comment.createdAt}
                postId={postId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}