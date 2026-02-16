import type { Contact, CreateContactRequest } from '~/types/contact'

export const useContacts = () => {
  const { request } = useApi()

  const fetchContacts = () =>
    request<Contact[]>('/api/contacts')

  const createContact = (payload: CreateContactRequest) =>
    request<Contact>('/api/contacts', {
      method: 'POST',
      body: payload
    })

  const updateContact = (id: number, payload: CreateContactRequest) =>
    request<Contact>(`/api/contacts/${id}`, {
      method: 'PUT',
      body: payload
    })

  const deleteContact = (id: number) =>
    request(`/api/contacts/${id}`, {
      method: 'DELETE'
    })

  return {
    fetchContacts,
    createContact,
    updateContact,
    deleteContact
  }
}
