import { createBrowserRouter } from "react-router-dom"
import ProtectedRoute from "@/components/ProtectedRoute"

import DashboardPage from "@/pages/DashboardPage"
import ProjectsPage from "@/pages/ProjectsPage"
import ProjectDetailsPage from "@/pages/ProjectDetailsPage"
import TasksPage from "@/pages/TasksPage"
import TimeEntriesPage from "@/pages/TimeEntriesPage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import NotFoundPage from "@/pages/NotFoundPage"

export const router = createBrowserRouter([
    // Public routes
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },

    // Protected app shell + children (note: child paths are RELATIVE)
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: "projects", element: <ProjectsPage /> },
            { path: "projects/:id", element: <ProjectDetailsPage /> },
            { path: "tasks", element: <TasksPage /> },
            { path: "time-entries", element: <TimeEntriesPage /> },
            { path: "*", element: <NotFoundPage /> }, // 404 inside authed area
        ],
    },

    // Fallback 404 for anything else
    { path: "*", element: <NotFoundPage /> },
])
