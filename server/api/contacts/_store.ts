import type { Contact } from '~/types/contact'

export const contacts: Contact[] = []
let idCounter = 1

export const generateId = () => idCounter++
