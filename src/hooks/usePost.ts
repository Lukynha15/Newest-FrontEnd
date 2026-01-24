import { PostDTO } from "@/dto/Post";
import { getPosts } from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export function usePosts() {
  const { isAuthenticated } = useAuth();

  return useQuery<PostDTO[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
    enabled: isAuthenticated,
  });
}
