import api from "@/lib/axios"
import type { CreateProjectFormData } from "@/lib/schemas"

export interface Project {
  id: number
  name: string
  description?: string
}

export const projectsApi = {
  list: async (): Promise<Project[]> => {
    const response = await api.get("/api/projects")
    return response.data
  },

  create: async (data: CreateProjectFormData): Promise<Project> => {
    const response = await api.post("/api/projects", data)
    return response.data
  },
}
