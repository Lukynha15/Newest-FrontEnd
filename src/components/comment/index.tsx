'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatDate } from '@/lib/settings.date';
import { deleteComment } from '@/services/comment.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DialogNoCloseButton } from "../dialog";
import { renderContentWithMentions } from "@/lib/render-mentions";

interface CommentProps {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string | null;
  createdAt: Date;
  postId: string;
}

export default function Comment({
  id,
  content,
  authorId,
  authorName,
  authorAvatar,
  createdAt,
  postId,
}: CommentProps) {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isOwner = currentUser?.id === authorId;

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(id),
    onSuccess: () => {
      setShowDeleteModal(false);
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });

  const getAvatarUrl = () => {
    if (!authorAvatar) return '/profilePicture.png';
    if (authorAvatar.startsWith('http')) return authorAvatar;
    return `http://localhost:3000${authorAvatar}`;
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate();
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <DialogNoCloseButton
        open={showDeleteModal}
        onClose={handleCancelDelete}
        title="Deletar comentário?"
        description="Esta ação não pode ser desfeita. O comentário será permanentemente removido."
        icon={<AlertTriangle className="h-6 w-6 text-destructive" />}
        textButton={deleteMutation.isPending ? "Deletando..." : "Deletar"}
        onSubmit={handleConfirmDelete}
        disabled={deleteMutation.isPending}
        showCancelButton={true}
        showSubmitButton={true}
      />

      <div className="flex gap-3 p-4 bg-card rounded-lg border border-border hover:bg-accent/50 transition-colors">
        <img
          src={getAvatarUrl()}
          alt={authorName}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-background"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-sm">{authorName}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(createdAt)}
              </p>
            </div>

            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:bg-accent rounded transition-colors cursor-pointer">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleDeleteClick}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Deletar comentário
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <p className="text-sm mt-2 wrap-break-words">
            {renderContentWithMentions(content)}
          </p>
        </div>
      </div>
    </>
  );
}