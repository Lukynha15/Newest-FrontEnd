import { User } from "@/types/user.types";
import { api } from "./api";

export const getMyProfile = async (): Promise<User> => {
  const { data } = await api.get("/user/me");
  return data;
};

export const getMyInformations = async (): Promise<User> => {
  const { data } = await api.get("/user/me");
  return data;
};

export const updateMyProfile = async (data: {
  name?: string;
  bio?: string;
  email?: string;
  password?: string;
}) => {
  const { data: response } = await api.patch("/user/me", data);
  return response;
};

export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/user");
  return data;
};

export const searchUsers = async (query: string) => {
  const { data } = await api.get("/user/search", {
    params: { q: query },
  });
  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await api.get(`/user/${id}`);
  return data;
};

export const getPostByUserId = async (id: string) => {
  const { data } = await api.get(`/user/${id}/posts`);
  return data;
};

export const uploadAvatar = async (
  file: File,
): Promise<{ avatarUrl: string }> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await api.post("/user/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteMyAccount = async () => {
  const { data } = await api.delete("/user/me");
  return data;
};
