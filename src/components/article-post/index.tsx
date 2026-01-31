import { cn } from "@/lib/utils";

interface ArticlePostProps {
  children: React.ReactNode;
  className?: string;
}

export default function ArticlePost({ children, className }: ArticlePostProps) {
  return (
    <div 
      className={cn(
        "w-xl h-screen",
        "bg-card border-x border-border",
        "shadow-sm",
        "overflow-y-auto custom-scrollbar",
        className
      )}
    >
      {children}
    </div>
  );
}