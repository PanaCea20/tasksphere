import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QuickStats } from "@/components/dashboard/QuickStats"
import { HoursTrendChart } from "@/components/dashboard/HoursTrendChart"
import { RecentTimeEntries } from "@/components/dashboard/RecentTimeEntries"
import { ProjectProgress } from "@/components/dashboard/ProjectProgress"
import { useProjects } from "@/hooks/useProjects"
import { useTasks } from "@/hooks/useTasks"
import { useTimeEntries } from "@/hooks/useTimeEntries"
import { Skeleton } from "@/components/ui/skeleton"

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-9 w-48 mb-2" />
                <Skeleton className="h-5 w-96" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-12 mb-1" />
                            <Skeleton className="h-3 w-20" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-32 mb-2" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                    <Skeleton className="h-4 w-12" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function DashboardPage() {
    const { data: projects, isLoading: projectsLoading } = useProjects()
    const { data: tasks, isLoading: tasksLoading } = useTasks()
    const { data: timeEntries, isLoading: entriesLoading } = useTimeEntries()

    if (projectsLoading || tasksLoading || entriesLoading) return <DashboardSkeleton />

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
                <p className="text-muted-foreground">Here&apos;s an overview of your time tracking activity.</p>
            </div>

            <QuickStats projects={projects ?? []} tasks={tasks ?? []} timeEntries={timeEntries ?? []} />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Hours Trend</CardTitle>
                        <CardDescription>Daily hours over the past week</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <HoursTrendChart timeEntries={timeEntries ?? []} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Time Entries</CardTitle>
                        <CardDescription>Your latest time tracking entries</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentTimeEntries timeEntries={timeEntries ?? []} tasks={tasks ?? []} projects={projects ?? []} limit={5} />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Project Progress</CardTitle>
                    <CardDescription>Track completion status across your projects</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProjectProgress projects={projects ?? []} tasks={tasks ?? []} limit={5} />
                </CardContent>
            </Card>
        </div>
    )
}

