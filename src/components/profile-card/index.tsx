import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateLong } from "@/lib/settings.date";
import { postSettings } from "@/lib/settings.post";
import { getMyProfile } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { Calendar, FileText, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";

export default function ProfileCard() {
  const router = useRouter();

  const {
    data: user,
    isLoading
  } = useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
  });

  const getAvatarUrl = () => {
    if (user?.avatar) return user.avatar;
    return '/profilePicture.png';
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

  return (
    <div className="relative">
      <div className="h-32 bg-linear-to-br from-primary/20 via-primary/10 to-background flex justify-end items-start p-5">
        <SidebarTrigger className="md:hidden size-10 p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700/50 rounded-lg transition-colors cursor-pointer" />
      </div>  

      <div className="px-6 pb-6">
        <div className="flex items-end justify-between -mt-16 mb-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-background shadow-xl">
              <img
                src={getAvatarUrl()}
                alt="Profile Picture"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-background" />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/settings')}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Editar perfil
          </Button>
        </div>

        <div className="space-y-4 ">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{user?.name}</h1>
            <p className="text-muted-foreground">@{user?.name?.toLowerCase().replace(/\s+/g, '')}</p>
          </div>

          {user?.bio && (
            <p className="text-sm leading-relaxed">{user.bio}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Desde {formatDateLong(user?.createdAt)}</span>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>{postSettings(user?.totalPosts ?? 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}