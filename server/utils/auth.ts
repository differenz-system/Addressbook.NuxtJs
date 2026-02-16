import type { H3Event } from 'h3'

export const validateAuth = (event: H3Event) => {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader || authHeader !== 'Bearer valid-token') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
}
