"use client";

import ArticlePost from "@/components/article-post";
import ShortProfile from "@/components/short-profile";
import { Input } from "@/components/ui/input";
import { AuthGuard } from "@/guard/AuthGuard";
import { formatDate, formatDateLong } from "@/lib/settings.date";
import { getAllUsers } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { LucideSearch } from "lucide-react";

export default function Search() {
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });


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

        <div className="pt-5 pl-5">
          {isLoading && <p>Carregando...</p>}
          {isError && <p>Erro ao carregar usuários</p>}

          <h1 className="text-2xl font-medium">Resultados</h1>
          {users?.map((user) => (
            <ShortProfile
              key={user.id}
              name={user.name}
              createdAt={formatDateLong(user.createdAt)}
              bio={user.bio}
              avatar={user.avatar!}
            />
          ))}
        </div>
      </ArticlePost>
    </AuthGuard>
  );
}