import Post from "@/components/post";
import { AuthGuard } from "@/guard/AuthGuard";

export default function Profile() {
  return (
    <AuthGuard>
      <div className="w-full h-screen max-w-3xl bg-popover border-accent border-2">
        <div className="h-screen flex items-center justify-center flex-col w-120 gap-1">
          <Post />
          <Post />
        </div>
      </div>
    </AuthGuard>
  );
}