'use client';

import { cn } from "@/lib/utils";
import { toggleLike } from '@/services/post.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Clock, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from 'react';

interface PostProps {
  id: number;
  username: string;
  createdAt: string;
  title: string;
  content: string;
  likes: number;
  isLiked: boolean;
  comments: number;
  clickable?: boolean;
}

export default function Post({
  id,
  username,
  createdAt,
  title,
  content,
  likes,
  isLiked,
  comments,
  clickable = true,
}: PostProps) {
  const router = useRouter();
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localLikesCount, setLocalLikesCount] = useState(likes);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => toggleLike(id),
    onMutate: async () => {
      setLocalIsLiked(!localIsLiked);
      setLocalLikesCount(localIsLiked ? localLikesCount - 1 : localLikesCount + 1);
    },
    onSuccess: (data) => {
      setLocalIsLiked(data.isLiked);
      setLocalLikesCount(data.likesCount);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
      queryClient.invalidateQueries({ queryKey: ['post', id.toString()] });
    },
    onError: () => {
      setLocalIsLiked(!localIsLiked);
      setLocalLikesCount(localIsLiked ? localLikesCount + 1 : localLikesCount - 1);
    },
  });

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutation.mutate();
  };

  const handlePostClick = () => {
    if (clickable) {
      router.push(`/post/${id}`);
    }
  };


  return (
    <article
      className={cn(
        "group w-full bg-card border border-border rounded-2xl p-6",
        "transition-all duration-300 ease-out",
        "hover:shadow-lg hover:border-primary/30 hover:bg-accent/50",
        clickable && "cursor-pointer hover:-translate-y-1"
      )}
      onClick={handlePostClick}
    >
      <header className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <Image
            src="/profilePicture.png"
            alt={username}
            width={44}
            height={44}
            className="rounded-full object-cover ring-2 ring-background w-10 h-10"
          />

          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm flex items-center gap-2">
              {username}
            </span>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="text-xs">
                {createdAt}
              </span>
            </div>
          </div>
        </div>

        {localLikesCount > 15 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">Em alta</span>
          </div>
        )}
      </header>

      <div className="space-y-3 mb-6">
        <h2 className="text-xl font-bold leading-snug">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {content}
        </p>
      </div>

      <footer className="flex items-center gap-3">
        <button
          onClick={handleLike}
          disabled={mutation.isPending}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm",
            "transition-all duration-300 cursor-pointer hover:scale-110 h-full",
            localIsLiked
              ? "bg-red-500/15 text-red-500"
              : "bg-secondary hover:bg-secondary/80"
          )}
        >
          <Heart className={cn(
            "h-4 w-4 transition-all duration-300",
            localIsLiked && "fill-red-500 scale-110 "
          )} />
          <span>{localLikesCount}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/post/${id}`);
          }}
          className="flex items-center hover:scale-110 gap-2 px-5 py-2.5 rounded-xl font-medium 
          text-sm bg-secondary hover:bg-secondary/80 transition-all duration-300 cursor-pointer"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{comments}</span>
        </button>
      </footer>
    </article>
  );
}