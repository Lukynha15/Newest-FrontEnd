"use client";

import { Heart, MessageCircle } from "lucide-react";

interface PostProps {
  username: string;
  createdAt: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
}

export default function Post({
  username,
  createdAt,
  title,
  content,
  likes,
  comments,
}: PostProps) {
  return (
    <article className="w-full bg-accent border border-input rounded-2xl p-4 flex flex-col gap-3 cursor-pointer hover:bg-accent/95">
      <header>
        <div>
          <span className="text-sm text-muted-foreground">{username} - {createdAt}</span>
        </div>
        <h1 className="text-2xl font-medium leading-tight mt-1">
          {title}
        </h1>
      </header>

      <section className="text-sm leading-relaxed">
        {content}
      </section>

      <footer className="mt-auto pt-3 border-t border-input flex justify-evenly">
        <button className="flex gap-2 items-center">
          <Heart size={20} className="cursor-pointer hover:scale-110 transition-all hover:text-red-500" />
          <span className="text-muted-foreground">{likes}</span>
        </button>
        <button className="flex gap-2 items-center">
          <MessageCircle size={20} className="cursor-pointer hover:scale-110 transition-all" />
          <span className="text-muted-foreground">{comments}</span>
        </button>
      </footer>
    </article>
  );
}
