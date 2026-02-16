import { contacts } from './_store'
import { validateAuth } from '~/server/utils/auth'

export default defineEventHandler((event) => {
  validateAuth(event)
  return contacts
})
