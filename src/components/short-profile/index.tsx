import { Calendar } from "lucide-react";
import Image from "next/image";

interface ShortProfileProps {
  name: string;
  avatar: string;
  bio: string;
  createdAt: string;
}

export default function ShortProfile({
  name,
  bio,
  createdAt,
  avatar,
}: ShortProfileProps) {
  return (
    <div className="flex gap-4 p-4 w-full rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer">
      <div className="shrink-0">
        <Image
          src={avatar}
          alt={`Avatar de ${name}`}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="font-medium text-base text-white truncate">
            {name}
          </h2>
          <span className="text-xs text-neutral-400 whitespace-nowrap flex items-center gap-3">
            <Calendar className="w-4 h-4" /> {createdAt}
          </span>
        </div>

        <p className="text-sm text-neutral-400 line-clamp-2">
          {bio}
        </p>
      </div>
    </div>
  );
}
