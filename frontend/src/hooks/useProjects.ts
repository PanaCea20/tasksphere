import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { projectsApi, type Project } from "@/api/projects"
import { toast } from "sonner"

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: projectsApi.list,
      retry: 0,
      refetchOnWindowFocus: false,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: projectsApi.create,
    onSuccess: (newProject: Project) => {
      // Update the projects list in the cache
      queryClient.setQueryData(["projects"], (oldProjects: Project[] = []) => [...oldProjects, newProject])
      toast.success("Project created successfully!")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create project")
    },
  })
}
