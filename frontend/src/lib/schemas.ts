import { z } from "zod"

// Auth schemas
export const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

// Project schemas
export const createProjectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string().optional(),
})

// Task schemas
export const createTaskSchema = z.object({
  projectId: z.number(),
  title: z.string().min(2, "Task title must be at least 2 characters"),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  dueDate: z.string().datetime().optional(),
})

// Time entry schemas
export const createTimeEntrySchema = z.object({
  taskId: z.number(),
  startedAt: z.string().datetime(),
  minutes: z.number().int().positive("Minutes must be a positive number"),
  note: z.string().max(200, "Note must be less than 200 characters").optional(),
})

export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type CreateProjectFormData = z.infer<typeof createProjectSchema>
export type CreateTaskFormData = z.infer<typeof createTaskSchema>
export type CreateTimeEntryFormData = z.infer<typeof createTimeEntrySchema>

export * from "./schemas"
