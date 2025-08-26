import { Routes, Route } from "react-router-dom"

// PUBLIC pages
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import NotFoundPage from "./pages/NotFoundPage"

// PROTECTED pages
import DashboardPage from "./pages/DashboardPage"
import ProjectsPage from "./pages/ProjectsPage"
import ProjectDetailsPage from "./pages/ProjectDetailsPage"
import TasksPage from "./pages/TasksPage"
import TimeEntriesPage from "./pages/TimeEntriesPage"

import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Private */}
            <Route element={<ProtectedRoute />}>
                <Route index element={<DashboardPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/time-entries" element={<TimeEntriesPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}
