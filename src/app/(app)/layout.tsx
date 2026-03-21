import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { WhatsNewModal } from "@/components/whats-new-modal";
import { ReactQueryProvider } from "@/provider/ReactQueryProvider";
import "../../app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Newest",
    template: "%s | Newest",
  },
  description: "Faça parte de nossa comunidade!",
  icons: {
    icon: "/icon.png",
  },
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1 flex justify-center items-start bg-neutral-900 min-w-0">
              <Toaster />
              <WhatsNewModal />
              <div className="w-full max-w-2xl">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}