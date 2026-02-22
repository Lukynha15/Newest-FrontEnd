import { api } from "./api";
import { CommentDTO } from "@/types/Comment.types";

export const getCommentsByPostId = async (postId: string): Promise<CommentDTO[]> => {
  const { data } = await api.get(`/comment/post/${postId}`);
  return data;
};

export const createComment = async (commentData: {
  content: string;
  postId: string;
}) => {
  const { data } = await api.post("/comment", commentData);
  return data;
};

export const deleteComment = async (commentId: string) => {
  const { data } = await api.delete(`/comment/${commentId}`);
  return data;
};