import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar.tsx"
import { AppSidebar } from "./AppSidebar"
import { Topbar } from "./Topbar"

interface ShellProps {
  children: React.ReactNode
}

export function Shell({ children }: ShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
