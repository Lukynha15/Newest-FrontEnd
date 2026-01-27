"use client";

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { getAcessToken, logout as removeAccessToken } from "../services/auth.service";

interface AuthContextData {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = getAcessToken();
    return !!token;
  });

  useEffect(() => {
    const token = getAcessToken();
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, []);

  async function signIn(email: string, password: string) {
    const response = await api.post("auth/login", { email, password });

    const { acessToken } = response.data;

    localStorage.setItem("token", acessToken);
    api.defaults.headers.common.Authorization = `Bearer ${acessToken}`;

    setIsAuthenticated(true);

    window.location.href = "/home";
  }

  async function register(name: string, email: string, password: string) {
    await api.post("user", { name, email, password });
  }

  async function logout() {
    removeAccessToken();

    delete api.defaults.headers.common.Authorization;

    setIsAuthenticated(false);
    
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}