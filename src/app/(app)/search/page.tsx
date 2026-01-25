import ArticlePost from "@/components/article-post";
import { Input } from "@/components/ui/input";
import { AuthGuard } from "@/guard/AuthGuard";
import { LucideSearch } from "lucide-react";

export default function Search() {
  return (
    <AuthGuard>
      <ArticlePost>
        <div className="border-b-2 bg-neutral-900 p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <LucideSearch />
            <h1 className="text-2xl font-medium">Buscar perfil</h1>
          </div>
          <Input className="flex items-center" placeholder="Pesquisar"></Input>
        </div>
      </ArticlePost>
    </AuthGuard>
  );
}