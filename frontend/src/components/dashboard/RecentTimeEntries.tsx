import { format } from "date-fns"
import { Clock, Calendar } from "lucide-react"
import type { TimeEntry } from "@/api/timeEntries"
import type { Task } from "@/api/tasks"
import type { Project } from "@/api/projects"

interface RecentTimeEntriesProps {
  timeEntries: TimeEntry[]
  tasks?: Task[]
  projects?: Project[]
  limit?: number
}

export function RecentTimeEntries({ timeEntries, tasks, projects, limit = 5 }: RecentTimeEntriesProps) {
  const getTaskName = (taskId: number) => {
    return tasks?.find((t) => t.id === taskId)?.title || "Unknown Task"
  }

  const getProjectName = (taskId: number) => {
    const task = tasks?.find((t) => t.id === taskId)
    return projects?.find((p) => p.id === task?.projectId)?.name || "Unknown Project"
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ""}`
    }
    return `${mins}m`
  }

  // Sort by most recent and limit
  const recentEntries = timeEntries
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    .slice(0, limit)

  if (recentEntries.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p className="text-sm">No time entries yet. Start tracking your time!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recentEntries.map((entry) => (
        <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm font-medium">{getProjectName(entry.taskId)}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{getTaskName(entry.taskId)}</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(entry.startedAt), "MMM d")}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{format(new Date(entry.startedAt), "h:mm a")}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-brand-600">{formatDuration(entry.minutes)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
