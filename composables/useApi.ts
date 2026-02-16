export const useApi = () => {
  const auth = useAuthStore()

  const request = async <T>(
    url: string,
    options?: Parameters<typeof $fetch>[1]
  ): Promise<T> => {
    try {
      return await $fetch<T>(url, {
        ...options,
        headers: {
          ...(options?.headers || {}),
          Authorization: auth.token ? `Bearer ${auth.token}` : ''
        }
      })
    } catch (error: any) {
      throw createError({
        statusCode: error?.statusCode ?? 500,
        statusMessage: error?.statusMessage ?? 'API Error'
      })
    }
  }

  return { request }
}
