import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/auth"
import { Shell } from "@/components/layout/Shell"

export default function ProtectedRoute() {
    const location = useLocation()
    const hasHydrated = useAuthStore((s) => s.hasHydrated)
    const token = useAuthStore((s) => s.token)

    // Don't decide until persisted store is ready (prevents 1s flash → login)
    if (!hasHydrated) {
        return null // or a full-screen spinner
    }

    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return (
        <Shell>
            <Outlet />
        </Shell>
    )
}



