import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { tasksApi, type Task } from "@/api/tasks"
import { toast } from "sonner"

export function useTasks(projectId?: number) {
  return useQuery({
    queryKey: ["tasks", { projectId }],
    queryFn: () => tasksApi.list(projectId),
      retry: 0,
      refetchOnWindowFocus: false,
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tasksApi.create,
    onSuccess: (newTask: Task) => {
      // Update the tasks list in the cache
      queryClient.setQueryData(["tasks", { projectId: newTask.projectId }], (oldTasks: Task[] = []) => [
        ...oldTasks,
        newTask,
      ])
      // Also update the general tasks list
      queryClient.setQueryData(["tasks", {}], (oldTasks: Task[] = []) => [...oldTasks, newTask])
      toast.success("Task created successfully!")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create task")
    },
  })
}
