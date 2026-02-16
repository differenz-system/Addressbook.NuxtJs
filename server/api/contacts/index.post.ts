import { contacts, generateId } from './_store'
import type { CreateContactRequest, Contact } from '~/types/contact'
import { validateAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  validateAuth(event)

  const body = await readBody<CreateContactRequest>(event)

  const newContact: Contact = {
    id: generateId(),
    ...body
  }

  contacts.push(newContact)

  return newContact
})
