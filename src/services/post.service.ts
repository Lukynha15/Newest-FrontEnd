import { PostDTO } from "@/dto/Post";
import { api } from "./api";

export async function getPosts(): Promise<PostDTO[]> {
  const response = await api.get<PostDTO[]>("/posts");
  return response.data;
}
