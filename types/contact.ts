export interface Contact {
  id: number
  firstName: string
  lastName: string
  mobile: string
  email: string
}

export interface CreateContactRequest {
  firstName: string
  lastName: string
  mobile: string
  email: string
}
