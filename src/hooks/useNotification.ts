import { getNotifications, getUnreadCount, markAllAsRead, NotificationDTO } from "@/services/notification.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function useNotifications() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const prevIdsRef = useRef<Set<string>>(new Set());

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 15000,
  });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["notifications-unread"],
    queryFn: getUnreadCount,
    refetchInterval: 15000,
  });

  const { mutate: readAll } = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread"] });
    },
  });

  useEffect(() => {
    if (notifications.length === 0) return;

    if (prevIdsRef.current.size === 0) {
      notifications.forEach((n: NotificationDTO) => prevIdsRef.current.add(n.id));
      return;
    }

    const newNotifications = notifications.filter(
      (n: NotificationDTO) => !prevIdsRef.current.has(n.id)
    );

    if (newNotifications.length > 0 && pathname !== "/notification") {
      newNotifications.forEach((n: NotificationDTO) => {
        toast(
          n.type === "like"
            ? `${n.actor.name} curtiu seu post`
            : `${n.actor.name} comentou no seu post`,
          {
            duration: 5000,
            action: {
              label: "Ver",
              onClick: () => window.location.href = "/notification",
            },
          }
        );
      });
    }

    notifications.forEach((n: NotificationDTO) => prevIdsRef.current.add(n.id));
  }, [notifications, pathname]);

  return { notifications, unreadCount, readAll };
}