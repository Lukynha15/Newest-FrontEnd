import { getMyProfile } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function ProfileCard() {
  const {
    data: user,
    isLoading
  } = useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
  });

  const formatDateLong = (date?: string) => {
    if (!date) return 'Data não disponível';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="p-3 border-b-2">
      <div className="flex items-center">
        <Image src="/profilePicture.png" alt="Profile Picture" width={160} height={160} className="rounded-full object-cover w-44 h-44" />

        <div className="ml-4 flex flex-col gap-2">
          {isLoading && (
            <div className="text-center flex py-8">
              <p className="text-xl font-bold">Carregando seu perfil...</p>
            </div>
          )}
          <h1 className="text-3xl font-bold">{user?.name}</h1>
          <div>
            <p className="text-sm text-muted-foreground">Membro desde {formatDateLong(user?.createdAt)}</p>
            <p className="mt-1 text-sm text-muted-foreground">12 posts</p>
            <p className="mt-1 text-sm text-muted-foreground">{user?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}