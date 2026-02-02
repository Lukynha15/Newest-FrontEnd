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

const items = [
  { title: "Página Inicial", url: "/home", icon: Home },
  { title: "Procurar", url: "/search", icon: Search },
  { title: "Notificações", url: "/notification", icon: Bell },
  { title: "Perfil", url: "/profile", icon: UserPen },
  { title: "Configurações", url: "/settings", icon: Settings }
];

export function AppSidebar() {
  const { logout } = useAuth();

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
                      <a href={item.url}>
                        <item.icon />
                        <span >{item.title}</span>
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
    </Sidebar >
  )
}