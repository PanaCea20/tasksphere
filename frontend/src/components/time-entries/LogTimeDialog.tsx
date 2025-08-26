"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createTimeEntrySchema, type CreateTimeEntryFormData } from "@/lib/schemas"
import { useCreateTimeEntry } from "@/hooks/useTimeEntries"
import { useTasks } from "@/hooks/useTasks"
import { useProjects } from "@/hooks/useProjects"
import { cn } from "@/lib/utils"

interface LogTimeDialogProps {
  children?: React.ReactNode
}

export function LogTimeDialog({ children }: LogTimeDialogProps) {
  const [open, setOpen] = useState(false)
  const createTimeEntry = useCreateTimeEntry()
  const { data: tasks } = useTasks()
  const { data: projects } = useProjects()

  const form = useForm<CreateTimeEntryFormData>({
    resolver: zodResolver(createTimeEntrySchema),
    defaultValues: {
      taskId: undefined,
      startedAt: new Date().toISOString(),
      minutes: undefined,
      note: "",
    },
  })

  const getTaskName = (taskId: number) => {
    const task = tasks?.find((t) => t.id === taskId)
    const project = projects?.find((p) => p.id === task?.projectId)
    return task ? `${project?.name || "Project"} - ${task.title}` : `Task ${taskId}`
  }

  const onSubmit = (data: CreateTimeEntryFormData) => {
    createTimeEntry.mutate(data, {
      onSuccess: () => {
        setOpen(false)
        form.reset({
          taskId: undefined,
          startedAt: new Date().toISOString(),
          minutes: undefined,
          note: "",
        })
      },
    })
  }

  // Generate time options (15-minute intervals)
  const timeOptions = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      timeOptions.push(timeString)
    }
  }

  const selectedDate = form.watch("startedAt") ? new Date(form.watch("startedAt")) : new Date()
  const selectedTime = format(selectedDate, "HH:mm")

  const updateDateTime = (date: Date | undefined, time?: string) => {
    if (!date) return

    const currentTime = time || format(selectedDate, "HH:mm")
    const [hours, minutes] = currentTime.split(":").map(Number)

    const newDate = new Date(date)
    newDate.setHours(hours, minutes, 0, 0)
    form.setValue("startedAt", newDate.toISOString())
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Log Time
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Time Entry</DialogTitle>
          <DialogDescription>Record time spent on a task with details and notes.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="taskId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task</FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a task" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tasks?.map((task) => (
                        <SelectItem key={task.id} value={task.id.toString()}>
                          {getTaskName(task.id)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startedAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(new Date(field.value), "MMM d, yyyy") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => updateDateTime(date)}
                          disabled={(date) => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Time</FormLabel>
                <Select value={selectedTime} onValueChange={(time) => updateDateTime(selectedDate, time)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter minutes worked"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add any notes about this time entry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createTimeEntry.isPending}>
                {createTimeEntry.isPending ? "Logging..." : "Log Time"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
