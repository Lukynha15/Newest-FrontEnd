"use client"

import { AuthGuard } from "@/guard/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <h1>Home</h1>
    </AuthGuard>
  );
}