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
    const { accessToken } = await authApi.login(email, password)
    setToken(accessToken)
    await fetchUser()
  }

  const fetchUser = async () => {
    if (!token.value) return
    user.value = await authApi.fetchUser()
  }

  const logout = async () => {
    await authApi.logout()
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
