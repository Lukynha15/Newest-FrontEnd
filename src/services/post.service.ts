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
  image?: File;
}) => {
  const formData = new FormData();

  if (postData.title) formData.append("title", postData.title);
  formData.append("content", postData.content);
  if (postData.image) formData.append("image", postData.image);

  const { data } = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const toggleLike = async (postId: string) => {
  const { data } = await api.patch(`/posts/${postId}/like`);
  return data;
};

export const getPostById = async (postId: string) => {
  const { data } = await api.get(`/posts/${postId}`);
  return data;
};

export const getUserPosts = async (userId: string) => {
  const { data } = await api.get(`/posts/user/${userId}`);
  return data;
};

export const deletePost = async (postId: string) => {
  const { data } = await api.delete(`/posts/${postId}`);
  return data;
};
