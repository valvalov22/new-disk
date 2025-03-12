import axiosInstance from './axiosInstance'

export interface User {
  id: number
  email: string
}

interface AuthResponse {
  accessToken: string
}

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<AuthResponse>('/auth', { email, password })
    return data
  },

  async fetchUser(): Promise<User> {
    const { data } = await axiosInstance.get<User>('/auth')
    return data
  },

  async logout(): Promise<void> {
    await axiosInstance.delete('/auth')
  },
}
