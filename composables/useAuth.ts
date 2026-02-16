import { useAuthStore } from '~/stores/auth'
import type { LoginRequest, LoginResponse } from '~/types/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  const login = async (payload: LoginRequest) => {
    try {
      const response = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: payload
      })

      authStore.setAuth(response.token, response.email)
      await router.push('/addressbook')
    } catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.statusMessage || 'Login failed'
      })
    }
  }

  const logout = async () => {
    authStore.logout()
    await router.push('/login')
  }

  return { login, logout }
}
