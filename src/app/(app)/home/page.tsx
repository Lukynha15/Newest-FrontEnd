"use client"

import ArticlePost from "@/components/article-post";
import Post from "@/components/post";
import { AuthGuard } from "@/guard/AuthGuard";
import { CirclePlus } from "lucide-react";

export default function Home() {

  return (
    <AuthGuard>
      <ArticlePost>
        {/* <div className="gap-2 flex flex-col"> */}
        <div className="border-b-2 bg-neutral-900 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-medium">Página inicial</h1>
          <button><CirclePlus className="cursor-pointer hover:scale-110 transition-all" /></button>
        </div>

        <Post username="Lucas" createdAt="Há 1 dia" title="Título do post" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, repellat." likes={10} comments={5} />
        <Post username="Lucas" createdAt="Há 1 dia" title="Título do post" content="Conteúdo do post" likes={10} comments={5} />
        {/* </div> */}
      </ArticlePost>
    </AuthGuard>
  );
}