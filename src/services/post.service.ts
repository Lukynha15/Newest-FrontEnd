import { PostDTO } from "@/types/Post.types";
import { api } from "./api";

export async function getPosts(): Promise<PostDTO[]> {
  const response = await api.get<PostDTO[]>("/posts");
  return response.data;
}

export async function getMyPost(): Promise<PostDTO[]> {
  const response = await api.get<PostDTO[]>("/posts/me");
  return response.data;
}

export const createPost = async (postData: {
  title?: string;
  content: string;
}) => {
  const { data } = await api.post("/posts", postData);
  return data;
};
