"use client"

import { AuthGuard } from "@/guard/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <div>
        <h1>Home</h1>
      </div>
    </AuthGuard>
  );
}