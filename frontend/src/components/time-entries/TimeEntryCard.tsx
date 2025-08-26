import { format } from "date-fns"
import { Clock, Calendar, FileText } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { TimeEntry } from "@/api/timeEntries"
import type { Task } from "@/api/tasks"
import type { Project } from "@/api/projects"

interface TimeEntryCardProps {
  entry: TimeEntry
  tasks?: Task[]
  projects?: Project[]
}

export function TimeEntryCard({ entry, tasks, projects }: TimeEntryCardProps) {
  const task = tasks?.find((t) => t.id === entry.taskId)
  const project = projects?.find((p) => p.id === task?.projectId)

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ""}`
    }
    return `${mins}m`
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-sm text-muted-foreground">{project?.name || "Unknown Project"}</h3>
            <p className="font-semibold">{task?.title || "Unknown Task"}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-brand-600">{formatDuration(entry.minutes)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(entry.startedAt), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{format(new Date(entry.startedAt), "h:mm a")}</span>
          </div>
        </div>
        {entry.note && (
          <div className="flex items-start space-x-1 text-sm">
            <FileText className="h-3 w-3 mt-0.5 text-muted-foreground" />
            <p className="text-muted-foreground">{entry.note}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
