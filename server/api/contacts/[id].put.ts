import { contacts } from './_store'
import type { CreateContactRequest, Contact } from '~/types/contact'
import { validateAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  validateAuth(event)

  const id = Number(event.context.params?.id)
  const body = await readBody<CreateContactRequest>(event)

  const index = contacts.findIndex(c => c.id === id)

  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const updated: Contact = {
    id,
    ...body
  }

  contacts[index] = updated

  return updated
})
