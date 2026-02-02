"use client"

import ArticlePost from "@/components/article-post"
import { AuthGuard } from "@/guard/AuthGuard"
import { Bell } from "lucide-react"

export default function NotificationClient() {
  return (
    <>
      <AuthGuard>
        <ArticlePost>
          <div className="border-b-2 bg-neutral-900 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-medium">Notificações</h1>
            <Bell />
          </div>
        </ArticlePost>
      </AuthGuard>
    </>
  )
}