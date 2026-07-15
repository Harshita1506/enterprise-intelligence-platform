"use client"

import { useState } from "react"
import { WorkspaceSidebar } from "@/components/workspace/workspace-sidebar"
import { WorkspaceTopNav } from "@/components/workspace/workspace-topnav"

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <WorkspaceSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <WorkspaceTopNav onMenuClick={() => setSidebarOpen(true)} />
        <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}
