import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { TimeEntry } from "@/api/timeEntries"
import type { Task } from "@/api/tasks"
import type { Project } from "@/api/projects"

interface TimeEntriesTableProps {
  entries: TimeEntry[]
  tasks?: Task[]
  projects?: Project[]
}

export function TimeEntriesTable({ entries, tasks, projects }: TimeEntriesTableProps) {
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

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <h3 className="text-lg font-medium mb-2">No time entries found</h3>
        <p className="text-sm">Time entries will appear here once you start logging time.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Task</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell className="font-medium">{getProjectName(entry.taskId)}</TableCell>
            <TableCell>{getTaskName(entry.taskId)}</TableCell>
            <TableCell>{format(new Date(entry.startedAt), "MMM d, yyyy")}</TableCell>
            <TableCell>{format(new Date(entry.startedAt), "h:mm a")}</TableCell>
            <TableCell className="font-semibold text-brand-600">{formatDuration(entry.minutes)}</TableCell>
            <TableCell className="max-w-[200px] truncate">{entry.note || "—"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
