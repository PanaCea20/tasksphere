import { ProjectCard } from "./ProjectCard"
import { CreateProjectDialog } from "./CreateProjectDialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Project } from "@/api/projects"

interface ProjectsListProps {
  projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Plus className="h-6 w-6" />
          </div>
        </div>
        <h3 className="text-lg font-medium mb-2">No projects yet</h3>
        <p className="text-sm text-muted-foreground mb-4">Get started by creating your first project.</p>
        <CreateProjectDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </CreateProjectDialog>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
