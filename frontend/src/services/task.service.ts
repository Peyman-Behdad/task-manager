import { api } from './api'
import { Task } from '../types'

export interface CreateTaskData {
  title: string
  description?: string
  status?: Task['status']
  priority?: Task['priority']
  dueDate?: string
}

export type UpdateTaskData = Partial<CreateTaskData>

export const taskService = {
  getAll: () =>
    api.get<{ tasks: Task[] }>('/tasks'),

  getOne: (id: string) =>
    api.get<{ task: Task }>(`/tasks/${id}`),

  create: (data: CreateTaskData) =>
    api.post<{ task: Task; message: string }>('/tasks', data),

  update: (id: string, data: UpdateTaskData) =>
    api.put<{ task: Task; message: string }>(`/tasks/${id}`, data),

  delete: (id: string) =>
    api.delete<{ message: string }>(`/tasks/${id}`),
}