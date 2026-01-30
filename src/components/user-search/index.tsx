'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchUsers } from '@/services/user.service';
import { getMyProfile } from '@/services/user.service';
import { Input } from '@/components/ui/input';
import { Search, Loader2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';

interface SearchedUser {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  totalPosts: number;
}

export function UserSearch() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const router = useRouter();

  const { data: myProfile } = useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
  });

  const { data: users, isLoading } = useQuery<SearchedUser[]>({
    queryKey: ['searchUsers', debouncedQuery],
    queryFn: () => searchUsers(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });
  const filteredUsers = users?.filter(user => user.id !== myProfile?.id) || [];

  const showResults = isFocused && query.length > 0;

  const handleUserClick = (userId: number) => {
    router.push(`/user/${userId}`);
    setQuery('');
    setIsFocused(false);
  };

  const getAvatarUrl = (avatar: string | null) => {
    if (!avatar) return null;
    if (avatar.startsWith('http')) return avatar;
    return `http://localhost:3000${avatar}`;
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Buscar usuários..."
          className={cn(
            "pl-9 pr-9 transition-all",
            showResults && "rounded-b-none"
          )}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 bg-card border border-t-0 border-border rounded-b-lg shadow-lg max-h-96 overflow-y-auto z-50 custom-scrollbar">
          {isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Buscando usuários...</p>
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="py-2">
              {filteredUsers.map((user) => {
                const avatarUrl = getAvatarUrl(user.avatar);
                
                return (
                  <button
                    key={user.id}
                    onClick={() => handleUserClick(user.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted shrink-0 ring-2 ring-background">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={user.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{user.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="truncate">{user.email}</span>
                        <span>•</span>
                        <span>{user.totalPosts} {user.totalPosts === 1 ? 'post' : 'posts'}</span>
                      </div>
                      {user.bio && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {user.bio}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">Nenhum usuário encontrado</p>
              <p className="text-xs text-muted-foreground mt-1">
                Tente buscar por outro nome ou email
              </p>
            </div>
          )}
        </div>
      )}

      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsFocused(false);
            setQuery('');
          }}
        />
      )}
    </div>
  );
}