"use client"

import ArticlePost from "@/components/article-post";
import Post from "@/components/post";
import { AuthGuard } from "@/guard/AuthGuard";
import { usePosts } from "@/hooks/usePost";
import { CirclePlus } from "lucide-react";

export default function Home() {

  const { data: posts } = usePosts()
  console.log(posts)

  return (
    <AuthGuard>
      <ArticlePost>
        {/* <div className="gap-2 flex flex-col"> */}
        <div className="border-b-2 bg-neutral-900 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-medium">Página inicial</h1>
          <button><CirclePlus className="cursor-pointer hover:scale-110 transition-all" /></button>
        </div>

        {posts?.map(post => (
          <Post key={post.id} username={post.author.name} createdAt={new Date(post.createdAt).toLocaleString()} title={post.title} content={post.content} likes={post.likes} comments={post.comments} />
        ))}
        {/* </div> */}
      </ArticlePost>
    </AuthGuard>
  );
}