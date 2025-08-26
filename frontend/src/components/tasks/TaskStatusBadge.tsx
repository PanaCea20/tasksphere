import { Badge } from "@/components/ui/badge"

interface TaskStatusBadgeProps {
  status: "TODO" | "IN_PROGRESS" | "DONE"
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "TODO":
        return {
          label: "To Do",
          variant: "outline" as const,
          className: "border-slate-300 text-slate-600",
        }
      case "IN_PROGRESS":
        return {
          label: "In Progress",
          variant: "default" as const,
          className: "bg-blue-100 text-blue-800 border-blue-200",
        }
      case "DONE":
        return {
          label: "Done",
          variant: "secondary" as const,
          className: "bg-green-100 text-green-800 border-green-200",
        }
      default:
        return {
          label: status,
          variant: "outline" as const,
          className: "",
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  )
}
