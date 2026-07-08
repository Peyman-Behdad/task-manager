import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService, CreateTaskData, UpdateTaskData } from '../services/task.service'

// کلیدهای query رو اینجا تعریف میکنیم
export const taskKeys = {
  all: ['tasks'] as const,
  detail: (id: string) => ['tasks', id] as const,
}

export const useTasks = () => {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: () => taskService.getAll(),
    select: (data) => data.tasks,
  })
}

export const useTask = (id: string) => {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => taskService.getOne(id),
    select: (data) => data.task,
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTaskData) => taskService.create(data),
    onSuccess: () => {
      // بعد از ساخت تسک، لیست رو refresh کن
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskData }) =>
      taskService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => taskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })
}