import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogTimeDialog } from "@/components/time-entries/LogTimeDialog"
import { TimeEntriesTable } from "@/components/time-entries/TimeEntriesTable"
import { TimeEntryCard } from "@/components/time-entries/TimeEntryCard"
import { useTimeEntries } from "@/hooks/useTimeEntries"
import { useTasks } from "@/hooks/useTasks"
import { useProjects } from "@/hooks/useProjects"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function TimeEntriesPageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-9 w-32 mb-2" />
                    <Skeleton className="h-5 w-64" />
                </div>
                <Skeleton className="h-10 w-24" />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center space-x-4 py-2">
                                <Skeleton className="h-4 flex-1" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function TimeEntriesPage() {
    const { data: entries, isLoading: entriesLoading } = useTimeEntries()
    const { data: tasks, isLoading: tasksLoading } = useTasks()
    const { data: projects, isLoading: projectsLoading } = useProjects()

    if (entriesLoading || tasksLoading || projectsLoading) return <TimeEntriesPageSkeleton />

    const sortedEntries = (entries ?? []).slice().sort(
        (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    )

    const totalMinutes = (entries ?? []).reduce((sum, e) => sum + e.minutes, 0)
    const totalHours = Math.floor(totalMinutes / 60)
    const remainingMinutes = totalMinutes % 60

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Time Entries</h2>
                    <p className="text-muted-foreground">Track and manage your time entries.</p>
                </div>
                <LogTimeDialog />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{entries?.length ?? 0}</div>
                        <p className="text-xs text-muted-foreground">
                            {entries?.length ? `${entries.length} entr${entries.length === 1 ? "y" : "ies"}` : "No entries yet"}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {totalHours > 0 ? `${totalHours}h` : ""} {remainingMinutes > 0 ? `${remainingMinutes}m` : totalHours === 0 ? "0m" : ""}
                        </div>
                        <p className="text-xs text-muted-foreground">{totalMinutes === 0 ? "No time logged" : "Time logged"}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Average Entry</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {entries?.length ? Math.round(totalMinutes / entries.length) : 0}m
                        </div>
                        <p className="text-xs text-muted-foreground">Per time entry</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Entries</CardTitle>
                    <CardDescription>Your latest time tracking entries</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="table" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="table">Table View</TabsTrigger>
                            <TabsTrigger value="cards">Card View</TabsTrigger>
                        </TabsList>
                        <TabsContent value="table" className="mt-4">
                            <TimeEntriesTable entries={sortedEntries} tasks={tasks ?? []} projects={projects ?? []} />
                        </TabsContent>
                        <TabsContent value="cards" className="mt-4">
                            {sortedEntries.length ? (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {sortedEntries.map((entry) => (
                                        <TimeEntryCard key={entry.id} entry={entry} tasks={tasks ?? []} projects={projects ?? []} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    <h3 className="text-lg font-medium mb-2">No time entries found</h3>
                                    <p className="text-sm">Time entries will appear here once you start logging time.</p>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
