import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog"
import { TasksTable } from "@/components/tasks/TasksTable"
import { TasksFilter } from "@/components/tasks/TasksFilter"
import { useTasks } from "@/hooks/useTasks"
import { useProjects } from "@/hooks/useProjects"
import { Skeleton } from "@/components/ui/skeleton"

function TasksPageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-9 w-24 mb-2" />
                    <Skeleton className="h-5 w-64" />
                </div>
                <Skeleton className="h-10 w-28" />
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-4 w-48 mt-2" />
                        </div>
                        <div className="flex gap-4">
                            <Skeleton className="h-10 w-[200px]" />
                            <Skeleton className="h-10 w-[150px]" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center space-x-4 py-2">
                                <Skeleton className="h-4 flex-1" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function TasksPage() {
    const [selectedProject, setSelectedProject] = useState<string>("all")
    const [selectedStatus, setSelectedStatus] = useState<string>("all")

    const projectId = selectedProject === "all" ? undefined : Number(selectedProject)
    const { data: tasks, isLoading: tasksLoading } = useTasks(projectId)
    const { data: projects, isLoading: projectsLoading } = useProjects()

    if (tasksLoading || projectsLoading) return <TasksPageSkeleton />

    const filteredTasks = (tasks ?? []).filter((task) =>
        selectedStatus === "all" ? true : task.status === selectedStatus
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
                    <p className="text-muted-foreground">View and manage all your tasks across projects.</p>
                </div>
                <CreateTaskDialog />
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>All Tasks</CardTitle>
                            <CardDescription>Tasks from all your projects</CardDescription>
                        </div>
                        <TasksFilter
                            projects={projects ?? []}
                            selectedProject={selectedProject}
                            selectedStatus={selectedStatus}
                            onProjectChange={setSelectedProject}
                            onStatusChange={setSelectedStatus}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <TasksTable tasks={filteredTasks} projects={projects ?? []} showProject />
                </CardContent>
            </Card>
        </div>
    )
}
