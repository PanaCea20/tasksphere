import api from "@/lib/axios"
import type { CreateTimeEntryFormData } from "@/lib/schemas"

export interface TimeEntry {
  id: number
  taskId: number
  userId: number
  startedAt: string
  minutes: number
  note?: string
}

export const timeEntriesApi = {
  list: async (): Promise<TimeEntry[]> => {
    const response = await api.get("/time-entries")
    return response.data
  },

  create: async (data: CreateTimeEntryFormData): Promise<TimeEntry> => {
    const response = await api.post("/time-entries", data)
    return response.data
  },
}
