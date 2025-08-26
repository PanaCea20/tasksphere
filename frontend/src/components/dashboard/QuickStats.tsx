import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, CheckSquare, Clock, Timer } from "lucide-react"
//TrendingUp,
import type { Project } from "@/api/projects"
import type { Task } from "@/api/tasks"
import type { TimeEntry } from "@/api/timeEntries"

interface QuickStatsProps {
    projects: Project[]
    tasks: Task[]
    timeEntries: TimeEntry[]
}

export function QuickStats({ projects, tasks, timeEntries }: QuickStatsProps) {
    // Basic counts
    const totalProjects = projects.length
    const activeTasks = tasks.filter((t) => t.status !== "DONE").length
    const completedTasks = tasks.length - activeTasks

    // Helpers
    const formatTime = (hours: number, minutes: number) =>
        hours > 0 ? `${hours}h${minutes ? ` ${minutes}m` : ""}` : `${minutes}m`

    const sumMinutes = (entries: TimeEntry[]) =>
        entries.reduce((sum, e) => sum + e.minutes, 0)

    // Total tracked (use the previously unused values)
    const totalMinutes = sumMinutes(timeEntries)
    const totalHours = Math.floor(totalMinutes / 60)
    const totalRemainingMinutes = totalMinutes % 60

    // Today
    const todayStr = new Date().toDateString()
    const todayEntries = timeEntries.filter(
        (e) => new Date(e.startedAt).toDateString() === todayStr,
    )
    const todayMinutes = sumMinutes(todayEntries)
    const todayHours = Math.floor(todayMinutes / 60)
    const todayRemainingMinutes = todayMinutes % 60

    // This week
    //const weekStart = new Date()
    //weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    //weekStart.setHours(0, 0, 0, 0)
    //const weekEntries = timeEntries.filter((e) => new Date(e.startedAt) >= weekStart)
    //const weekMinutes = sumMinutes(weekEntries)
    //const weekHours = Math.floor(weekMinutes / 60)
    //const weekRemainingMinutes = weekMinutes % 60

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalProjects}</div>
                    <p className="text-xs text-muted-foreground">
                        {totalProjects === 0 ? "No projects yet" : `${totalProjects} project${totalProjects === 1 ? "" : "s"}`}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                    <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{activeTasks}</div>
                    <p className="text-xs text-muted-foreground">
                        {completedTasks > 0 ? `${completedTasks} completed` : "No completed tasks yet"}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Tracked</CardTitle>
                    <Timer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatTime(totalHours, totalRemainingMinutes)}</div>
                    <p className="text-xs text-muted-foreground">
                        {timeEntries.length === 0
                            ? "No time logged yet"
                            : `${timeEntries.length} entr${timeEntries.length === 1 ? "y" : "ies"}`}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Hours Today</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatTime(todayHours, todayRemainingMinutes)}</div>
                    <p className="text-xs text-muted-foreground">
                        {todayMinutes === 0
                            ? "No time logged today"
                            : `${todayEntries.length} entr${todayEntries.length === 1 ? "y" : "ies"}`}
                    </p>
                </CardContent>
            </Card>

            {/* If you prefer week instead of total, swap these two cards */}
            {/* <Card> ... Hours This Week ... </Card> */}
        </div>
    )
}
