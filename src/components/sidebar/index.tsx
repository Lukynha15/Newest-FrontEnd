"use client"

import { ArrowBigLeft, Bell, Home, Search, Settings, UserPen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotification";

const items = [
  { title: "Página Inicial", url: "/home", icon: Home },
  { title: "Procurar", url: "/search", icon: Search },
  { title: "Notificações", url: "/notification", icon: Bell },
  { title: "Perfil", url: "/profile", icon: UserPen },
  { title: "Configurações", url: "/settings", icon: Settings }
];

export function AppSidebar() {
  const { logout } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <Sidebar>
      <SidebarFooter>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Newest</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="relative flex items-center gap-2">
                        <div className="relative">
                          <item.icon />
                          {item.title === "Notificações" && unreadCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                              {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                          )}
                        </div>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <SidebarMenuItem className="cursor-pointer">
                <SidebarMenuButton asChild>
                  <button
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={logout}
                  >
                    <ArrowBigLeft />
                    <span>Sair</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  )
}