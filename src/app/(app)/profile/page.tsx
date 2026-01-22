import Post from "@/components/post";
import ProfileCard from "@/components/profile-card";
import { AuthGuard } from "@/guard/AuthGuard";

export default function Profile() {
  return (
    <AuthGuard>
      <div className="w-lg h-screen bg-popover border-accent border-2">
        <ProfileCard />
        <div className="flex items-center justify-center flex-col w-120 gap-1 mt-5 mx-auto">
          <Post />
          <Post />
        </div>
      </div>
    </AuthGuard>
  );
}