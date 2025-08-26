import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateProjectDialog } from "@/components/projects/CreateProjectDialog"
import { ProjectsList } from "@/components/projects/ProjectsList"
import { useProjects } from "@/hooks/useProjects"
import { Skeleton } from "@/components/ui/skeleton"

function ProjectsPageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-9 w-32 mb-2" />
                    <Skeleton className="h-5 w-64" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="border rounded-lg p-6">
                                <div className="flex items-start space-x-3 mb-4">
                                    <Skeleton className="h-8 w-8 rounded-lg" />
                                    <div className="flex-1">
                                        <Skeleton className="h-5 w-32 mb-2" />
                                        <Skeleton className="h-4 w-48" />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function ProjectsPage() {
    const { data: projects, isLoading, error } = useProjects()

    if (isLoading) return <ProjectsPageSkeleton />

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                        <p className="text-muted-foreground">Manage your projects and track progress.</p>
                    </div>
                    <CreateProjectDialog />
                </div>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center py-12 text-destructive">
                            <h3 className="text-lg font-medium mb-2">Failed to load projects</h3>
                            <p className="text-sm">Please try refreshing the page or check your connection.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                    <p className="text-muted-foreground">Manage your projects and track progress.</p>
                </div>
                <CreateProjectDialog />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Projects</CardTitle>
                    <CardDescription>All your projects in one place</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProjectsList projects={projects ?? []} />
                </CardContent>
            </Card>
        </div>
    )
}
