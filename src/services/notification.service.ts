import { api } from "./api";

export interface NotificationDTO {
  id: string;
  type: "like" | "comment";
  read: boolean;
  createdAt: string;
  actor: {
    id: string;
    name: string;
    avatar: string | null;
  };
  post: {
    id: string;
    title: string;
  } | null;
}

export async function getNotifications(): Promise<NotificationDTO[]> {
  const { data } = await api.get("/notification");
  return data;
}

export async function getUnreadCount(): Promise<number> {
  const { data } = await api.get("/notification/unread-count");
  return data;
}

export async function markAllAsRead(): Promise<void> {
  await api.patch("/notification/mark-all-read");
}