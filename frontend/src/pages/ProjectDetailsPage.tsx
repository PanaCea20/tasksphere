import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft } from "lucide-react"
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog"
import { TasksTable } from "@/components/tasks/TasksTable"
import { useTasks } from "@/hooks/useTasks"
import { useProjects } from "@/hooks/useProjects"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectDetailsPage() {
    const { id } = useParams()
    const projectId = Number(id)
    const validProjectId = Number.isFinite(projectId) ? projectId : undefined

    const { data: tasks, isLoading: tasksLoading } = useTasks(validProjectId)
    const { data: projects, isLoading: projectsLoading } = useProjects()

    const project = projects?.find((p) => p.id === validProjectId)
    const isLoading = tasksLoading || projectsLoading

    const totalTasks = tasks?.length ?? 0
    const completedTasks = tasks?.filter((t) => t.status === "DONE").length ?? 0
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    if (!validProjectId) {
        return (
            <div className="space-y-6">
                <Button variant="ghost" size="sm" asChild>
                    <Link to="/projects">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Projects
                    </Link>
                </Button>
                <Card>
                    <CardContent className="pt-6">Invalid project id.</CardContent>
                </Card>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-9 w-32" />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-9 w-48 mb-2" />
                        <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-10 w-24" />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="pb-2">
                                <Skeleton className="h-4 w-24" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-8 w-8 mb-1" />
                                <Skeleton className="h-3 w-16" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                    <Link to="/projects">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Projects
                    </Link>
                </Button>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{project?.name ?? "Project Details"}</h2>
                    {project?.description && <p className="text-muted-foreground">{project.description}</p>}
                </div>
                <CreateTaskDialog defaultProjectId={validProjectId}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Task
                    </Button>
                </CreateTaskDialog>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalTasks}</div>
                        <p className="text-xs text-muted-foreground">
                            {totalTasks === 0 ? "No tasks yet" : `${totalTasks} task${totalTasks === 1 ? "" : "s"}`}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedTasks}</div>
                        <p className="text-xs text-muted-foreground">{completionPercentage}% complete</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Time Logged</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0h</div>
                        <p className="text-xs text-muted-foreground">No time logged</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Project Tasks</CardTitle>
                    <CardDescription>Tasks for this project</CardDescription>
                </CardHeader>
                <CardContent>
                    <TasksTable tasks={tasks ?? []} projects={projects ?? []} showProject={false} />
                </CardContent>
            </Card>
        </div>
    )
}

