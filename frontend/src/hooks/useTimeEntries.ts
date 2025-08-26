import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { timeEntriesApi, type TimeEntry } from "@/api/timeEntries"
import { toast } from "sonner"

export function useTimeEntries() {
  return useQuery({
    queryKey: ["time-entries"],
    queryFn: timeEntriesApi.list,
    retry: 0,
    refetchOnWindowFocus: false,
  })
}

export function useCreateTimeEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: timeEntriesApi.create,
    onSuccess: (newEntry: TimeEntry) => {
      // Update the time entries list in the cache
      queryClient.setQueryData(["time-entries"], (oldEntries: TimeEntry[] = []) => [...oldEntries, newEntry])
      toast.success("Time entry logged successfully!")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to log time entry")
    },
  })
}
