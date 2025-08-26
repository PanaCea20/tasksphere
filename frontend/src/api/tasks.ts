import api from "@/lib/axios"
import type { CreateTaskFormData } from "@/lib/schemas"

export interface Task {
  id: number
  projectId: number
  title: string
  status: "TODO" | "IN_PROGRESS" | "DONE"
  dueDate?: string
}

export const tasksApi = {
  list: async (projectId?: number): Promise<Task[]> => {
    const params = projectId ? { projectId } : {}
    const response = await api.get("/tasks", { params })
    return response.data
  },

  create: async (data: CreateTaskFormData): Promise<Task> => {
    const response = await api.post("/tasks", data)
    return response.data
  },
}
