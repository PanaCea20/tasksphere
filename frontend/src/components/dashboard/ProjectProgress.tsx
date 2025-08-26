import { Progress } from "@/components/ui/progress"
import type { Project } from "@/api/projects"
import type { Task } from "@/api/tasks"

interface ProjectProgressProps {
  projects: Project[]
  tasks: Task[]
  limit?: number
}

export function ProjectProgress({ projects, tasks, limit = 5 }: ProjectProgressProps) {
  const projectsWithProgress = projects
    .map((project) => {
      const projectTasks = tasks.filter((task) => task.projectId === project.id)
      const completedTasks = projectTasks.filter((task) => task.status === "DONE")
      const progress = projectTasks.length > 0 ? (completedTasks.length / projectTasks.length) * 100 : 0

      return {
        ...project,
        totalTasks: projectTasks.length,
        completedTasks: completedTasks.length,
        progress: Math.round(progress),
      }
    })
    .filter((project) => project.totalTasks > 0) // Only show projects with tasks
    .sort((a, b) => b.totalTasks - a.totalTasks) // Sort by most tasks
    .slice(0, limit)

  if (projectsWithProgress.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p className="text-sm">No projects with tasks yet. Create projects and add tasks to see progress!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {projectsWithProgress.map((project) => (
        <div key={project.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">{project.name}</h4>
              <p className="text-xs text-muted-foreground">
                {project.completedTasks} of {project.totalTasks} tasks completed
              </p>
            </div>
            <span className="text-sm font-semibold">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
      ))}
    </div>
  )
}
