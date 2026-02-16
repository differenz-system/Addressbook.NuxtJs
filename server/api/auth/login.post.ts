import type { LoginRequest, LoginResponse } from '~/types/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginRequest>(event)

  if (body.email !== 'admin@admin.com' || body.password !== '123456') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  const response: LoginResponse = {
    token: 'valid-token',
    email: body.email
  }

  return response
})
