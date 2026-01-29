"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { getAcessToken } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";


import { useState } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const token = getAcessToken();

    if (!token || !isAuthenticated) {
      router.replace("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) return null;

  return <>{children}</>;
}
