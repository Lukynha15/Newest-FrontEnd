"use client"

import { AuthGuard } from "@/guard/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <div>
      </div>
    </AuthGuard>
  );
}