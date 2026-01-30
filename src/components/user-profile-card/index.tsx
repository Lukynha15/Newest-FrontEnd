"use client"

import { formatDateLong } from "@/lib/settings.date";
import { postSettings } from "@/lib/settings.post";
import { Calendar, FileText, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface UserProfileCardProps {
  user: any;
  isLoading: boolean;
}

export default function UserProfileCard({ user, isLoading }: UserProfileCardProps) {
  const getAvatarUrl = () => {
    if (user?.avatar) {
      if (user.avatar.startsWith('http')) return user.avatar;
      return `http://localhost:3000${user.avatar}`;
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="p-6 border-b border-border">
        <div className="flex items-start gap-6">
          <Skeleton className="w-32 h-32 rounded-full shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const avatarUrl = getAvatarUrl();

  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />

      <div className="px-6 pb-6">
        <div className="flex items-end justify-between -mt-16 mb-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-background shadow-xl">
              {avatarUrl ? (
                <img 
                  src={avatarUrl}
                  alt={user.name} 
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <User className="h-16 w-16 text-primary" />
                </div>
              )}
            </div>
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-background" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
            <p className="text-muted-foreground">@{user.name?.toLowerCase().replace(/\s+/g, '')}</p>
          </div>

          {user.bio && (
            <p className="text-sm leading-relaxed">{user.bio}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Desde {formatDateLong(user.createdAt)}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>{postSettings(user.totalPosts ?? 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}