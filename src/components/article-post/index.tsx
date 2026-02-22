import { cn } from "@/lib/utils";

interface ArticlePostProps {
  children: React.ReactNode;
  className?: string;
}

export default function ArticlePost({ children, className }: ArticlePostProps) {
  return (
    <div 
      className={cn(
        "w-full min-h-screen",
        "bg-background",
        "overflow-y-auto custom-scrollbar",
        className
      )}
    >
      {children}
    </div>
  );  
}