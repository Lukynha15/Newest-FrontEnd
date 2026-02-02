import { AuthProvider } from "@/contexts/AuthContext";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "../lib/utils";
import "./globals.css";

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
  },
  description: "Descrição padrão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(`${geistSans.variable} ${geistMono.variable} antialiased`)}
      >
        <AuthProvider>
          <div className="flex min-h-screen">
            <main className="flex-1">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
