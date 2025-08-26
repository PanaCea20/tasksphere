"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar.tsx"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/store/auth"
import { toast } from "sonner"
import { Logo } from "@/components/Logo"   // <-- add this

const pageNames: Record<string, string> = {
    "/": "Dashboard",
    "/projects": "Projects",
    "/tasks": "Tasks",
    "/time-entries": "Time Entries",
}

export function Topbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const clearToken = useAuthStore((state) => state.clearToken)

    const getPageName = () => {
        const pathname = location.pathname
        if (pathname.startsWith("/projects/") && pathname !== "/projects") return "Project Details"
        return pageNames[pathname] || "Page"
    }

    const handleLogout = () => {
        clearToken()
        toast.success("Logged out successfully")
        navigate("/login")
    }

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />

                {/* Brand */}
                <Link to="/" className="flex items-center">
                    {/* Show full logo on ≥sm, just the mark on xs */}
                    <span className="hidden sm:block">
            <Logo withText className="h-6" />
          </span>
                    <span className="sm:hidden">
            <Logo className="h-6" />
          </span>
                </Link>

                {/* Current page title */}
                <h1 className="ml-3 text-lg font-semibold">{getPageName()}</h1>
            </div>

            <div className="ml-auto px-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuItem className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">User</p>
                                <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
