"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Project } from "@/api/projects"

interface TasksFilterProps {
  projects?: Project[]
  selectedProject?: string
  selectedStatus?: string
  onProjectChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export function TasksFilter({
  projects,
  selectedProject,
  selectedStatus,
  onProjectChange,
  onStatusChange,
}: TasksFilterProps) {
  return (
    <div className="flex gap-4">
      <Select value={selectedProject} onValueChange={onProjectChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All projects" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All projects</SelectItem>
          {projects?.map((project) => (
            <SelectItem key={project.id} value={project.id.toString()}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="TODO">To Do</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="DONE">Done</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
