
import { api } from './api'
import { AuthResponse, User } from '../types'

export const authService = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post<AuthResponse>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data),

  getMe: () =>
    api.get<{ user: User }>('/auth/me'),
}