import ArticlePost from "@/components/article-post";
import Post from "@/components/post";
import ProfileCard from "@/components/profile-card";
import { AuthGuard } from "@/guard/AuthGuard";

export default function Profile() {
  return (
    <AuthGuard>
      <ArticlePost>
        <ProfileCard />
        <div className="flex items-center justify-center flex-col w-120 gap-1 mt-4 mx-auto">
          <Post username="Lucas" createdAt="Há 1 dia" title="Título do post" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, repellat." likes={10} comments={5} /> <Post username="Lucas" createdAt="Há 1 dia" title="Título do post" content="Conteúdo do post" likes={10} comments={5} />
          <Post username="Lucas" createdAt="Há 1 dia" title="BBB26 PEGANDO MUITO FOGO" content="Loremmmmmmm ipsum dolor sit amet consectetur adipisicing elit. Quos, repellat." likes={10} comments={5} />
          <Post username="Lucas" createdAt="Há 1 dia" title="Título do post" content="Conteúdo do post" likes={10} comments={5} />
          <Post username="Lucas" createdAt="Há 1 dia" title="Título do post" content="Conteúdo do post" likes={10} comments={5} />
        </div>
      </ArticlePost>
    </AuthGuard>
  );
}