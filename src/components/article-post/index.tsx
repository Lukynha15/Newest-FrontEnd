interface ArticlePostProps {
  children: React.ReactNode
}

export default function ArticlePost({ children }: ArticlePostProps) {
  return (
    <div className="w-lg h-screen bg-popover border-accent border-y-0 border-x-2">
      {children}
    </div>
  );
}