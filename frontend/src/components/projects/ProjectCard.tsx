import { Link } from "react-router-dom"
import { FolderOpen, Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Project } from "@/api/projects"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-brand-600/10 rounded-lg">
              <FolderOpen className="h-4 w-4 text-brand-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              {project.description && <CardDescription className="mt-1">{project.description}</CardDescription>}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>0 tasks</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>0h logged</span>
            </div>
          </div>
        </div>
        <Button asChild className="w-full">
          <Link to={`/projects/${project.id}`}>View Project</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
