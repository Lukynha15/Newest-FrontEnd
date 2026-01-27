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