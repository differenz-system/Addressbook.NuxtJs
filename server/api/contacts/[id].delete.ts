import { contacts } from './_store'
import { validateAuth } from '~/server/utils/auth'

export default defineEventHandler((event) => {
  validateAuth(event)

  const id = Number(event.context.params?.id)
  const index = contacts.findIndex(c => c.id === id)

  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  contacts.splice(index, 1)

  return { success: true }
})
