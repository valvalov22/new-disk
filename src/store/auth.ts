import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi, type User } from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
    token.value = newToken
  }

  const login = async (email: string, password: string) => {
    try {
      const { accessToken } = await authApi.login(email, password)
      setToken(accessToken)
      await fetchUser()
    } catch (error) {
      console.error('Ошибка входа:', error)
    }
  }

  const fetchUser = async () => {
    if (!token.value) return
    try {
      user.value = await authApi.fetchUser()
    } catch {
      logout()
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Ошибка выхода:', error)
    }
    user.value = null
    setToken(null)
  }

  return {
    user,
    token,
    login,
    fetchUser,
    logout,
  }
})
