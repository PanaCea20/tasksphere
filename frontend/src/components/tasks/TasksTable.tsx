import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TaskStatusBadge } from "./TaskStatusBadge"
import type { Task } from "@/api/tasks"
import type { Project } from "@/api/projects"

interface TasksTableProps {
  tasks: Task[]
  projects?: Project[]
  showProject?: boolean
}

export function TasksTable({ tasks, projects, showProject = true }: TasksTableProps) {
  const getProjectName = (projectId: number) => {
    return projects?.find((p) => p.id === projectId)?.name || `Project ${projectId}`
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <h3 className="text-lg font-medium mb-2">No tasks found</h3>
        <p className="text-sm">Tasks will appear here once you create them.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task</TableHead>
          {showProject && <TableHead>Project</TableHead>}
          <TableHead>Status</TableHead>
          <TableHead>Due Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            {showProject && <TableCell>{getProjectName(task.projectId)}</TableCell>}
            <TableCell>
              <TaskStatusBadge status={task.status} />
            </TableCell>
            <TableCell>{task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "No due date"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
