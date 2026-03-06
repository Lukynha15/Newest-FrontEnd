import { cn } from "@/lib/utils";

interface ArticlePostProps {
  children: React.ReactNode;
  className?: string;
}

export default function ArticlePost({ children, className }: ArticlePostProps) {
  return (
    <div
      className={cn(
        "px-6 space-y-6 bg-neutral-900 h-dvh overflow-y-auto custom-scrollbar",
        "border-x border-neutral-800",
        className
      )}
    >
      {children}
    </div>
  );
}