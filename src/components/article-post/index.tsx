import { cn } from "@/lib/utils";

interface ArticlePostProps {
  children: React.ReactNode;
  className?: string;
}

export default function ArticlePost({ children, className }: ArticlePostProps) {
  return (
    <div
      className={cn(
        "space-y-6 bg-neutral-900 min-h-dvh overflow-y-auto custom-scrollbar",
        className
      )}
    >
      {children}
    </div>
  );
}