'use client';

import ArticlePost from '@/components/article-post';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserSearch } from '@/components/user-search';
import { AuthGuard } from '@/guard/AuthGuard';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPageClient() {
  return (
    <AuthGuard>
      <ArticlePost>
        <div className="p-6 space-y-6 bg-neutral-900 h-dvh">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <SidebarTrigger className="md:hidden size-8 p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700/50 rounded-lg transition-colors cursor-pointer" />
              <SearchIcon className="h-8 w-8 text-primary" />
              Buscar Usuários
            </h1>
          </div>

          <div className="max-w-2xl mx-auto">
            <UserSearch />
          </div>

          <Separator />

          <div className="max-w-2xl mx-auto mt-8 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-semibold text-sm mb-2">💡 Dicas de busca</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Digite o nome ou email do usuário</li>
              <li>• A busca é feita em tempo real</li>
            </ul>
          </div>
        </div>
      </ArticlePost>
    </AuthGuard>
  );
}