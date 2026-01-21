"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import { getAcessToken } from "@/services/auth.service";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const token = getAcessToken();

    if (!token || !isAuthenticated) {
      logout();
      router.replace("/login");
    }
  }, [isAuthenticated, logout, router]);

  return <>{children}</>;
}
