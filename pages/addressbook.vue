<script setup lang="ts">
definePageMeta({ middleware: "auth" });

import { useForm } from "vee-validate";
import { contactSchema } from "~/utils/contactSchema";
import type { Contact, CreateContactRequest } from "~/types/contact";

const { fetchContacts, createContact, updateContact, deleteContact } =
  useContacts();
const { logout } = useAuth();

const contacts = ref<Contact[]>([]);
const loading = ref(false);
const saving = ref(false);
const deleting = ref(false);

const showConfirm = ref(false);
const selectedId = ref<number | null>(null);
const editingId = ref<number | null>(null);

const { handleSubmit, errors, defineField, resetForm } =
  useForm<CreateContactRequest>({
    validationSchema: contactSchema,
  });

const [firstName] = defineField("firstName");
const [lastName] = defineField("lastName");
const [mobile] = defineField("mobile");
const [email] = defineField("email");

const submit = handleSubmit(async (values) => {
  saving.value = true;

  const created = await createContact(values);

  contacts.value.push(created);

  resetForm();

  saving.value = false;
});

const load = async () => {
  loading.value = true;
  contacts.value = await fetchContacts();
  loading.value = false;
};

const startEdit = (contact: Contact) => {
  editingId.value = contact.id;
};

const cancelEdit = () => {
  editingId.value = null;
};

const saveEdit = async (contact: Contact) => {
  try {
    await contactSchema.validate(contact, { abortEarly: false });

    const updated = await updateContact(contact.id, contact);
    const index = contacts.value.findIndex((c) => c.id === contact.id);

    if (index !== -1) {
      contacts.value[index] = updated;
    }

    editingId.value = null;
  } catch (err: any) {
    alert(err.errors?.join("\n"));
  }
};

const requestDelete = (id: number) => {
  selectedId.value = id;
  showConfirm.value = true;
};

const confirmDelete = async () => {
  if (!selectedId.value) return;

  const id = selectedId.value;
  const index = contacts.value.findIndex((c) => c.id === id);
  if (index === -1) return;

  const removed = contacts.value[index];

  contacts.value.splice(index, 1);

  deleting.value = true;

  try {
    await deleteContact(id);
  } catch {
    contacts.value.splice(index, 0, removed);
  } finally {
    deleting.value = false;
  }

  showConfirm.value = false;
  selectedId.value = null;
};

const cancelDelete = () => {
  showConfirm.value = false;
  selectedId.value = null;
};

onMounted(load);
</script>

<template>
  <div class="p-8 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-3xl font-semibold">Address Book</h1>

      <button
        @click="logout"
        class="bg-yellow-500 hover:bg-yellow-600 transition px-4 py-2 rounded text-white"
      >
        Logout
      </button>
    </div>

    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div>
        <label class="label">First Name</label>
        <input v-model="firstName" placeholder="e.g. John" class="input" />
        <p class="error">{{ errors.firstName }}</p>
      </div>

      <div>
        <label class="label">Last Name</label>
        <input v-model="lastName" placeholder="e.g. Doe" class="input" />
        <p class="error">{{ errors.lastName }}</p>
      </div>

      <div>
        <label class="label">Mobile No</label>
        <input v-model="mobile" placeholder="e.g. 9876543210" class="input" />
        <p class="error">{{ errors.mobile }}</p>
      </div>

      <div>
        <label class="label">Email Address</label>
        <input
          v-model="email"
          placeholder="e.g. john@example.com"
          class="input"
        />
        <p class="error">{{ errors.email }}</p>
      </div>
    </div>

    <button
      @click="submit"
      :disabled="saving"
      class="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded mb-10 disabled:opacity-50"
    >
      {{ saving ? "Saving..." : "Save" }}
    </button>

    <div class="overflow-x-auto">
      <table class="w-full border border-gray-300 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="th">#</th>
            <th class="th">First Name</th>
            <th class="th">Last Name</th>
            <th class="th">Mobile</th>
            <th class="th">Email</th>
            <th class="th text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="!contacts.length">
            <td colspan="6" class="text-center py-6 border-t">
              No Contacts Found
            </td>
          </tr>

          <tr
            v-for="(contact, i) in contacts"
            :key="contact.id"
            class="hover:bg-gray-50"
          >
            <td class="td">{{ i + 1 }}</td>

            <td class="td">
              <input
                v-if="editingId === contact.id"
                v-model="contact.firstName"
                class="input"
              />
              <span v-else>{{ contact.firstName }}</span>
            </td>

            <td class="td">
              <input
                v-if="editingId === contact.id"
                v-model="contact.lastName"
                class="input"
              />
              <span v-else>{{ contact.lastName }}</span>
            </td>

            <td class="td">
              <input
                v-if="editingId === contact.id"
                v-model="contact.mobile"
                class="input"
              />
              <span v-else>{{ contact.mobile }}</span>
            </td>

            <td class="td">
              <input
                v-if="editingId === contact.id"
                v-model="contact.email"
                class="input"
              />
              <span v-else>{{ contact.email }}</span>
            </td>

            <td class="td text-center space-x-3 whitespace-nowrap">
              <template v-if="editingId === contact.id">
                <button
                  @click="saveEdit(contact)"
                  class="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Update
                </button>

                <button
                  @click="cancelEdit"
                  class="bg-gray-400 hover:bg-gray-500 transition text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Cancel
                </button>
              </template>

              <template v-else>
                <button
                  @click="startEdit(contact)"
                  class="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Edit
                </button>

                <button
                  @click="requestDelete(contact.id)"
                  :disabled="deleting"
                  class="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
                >
                  Delete
                </button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ConfirmModal
      :show="showConfirm"
      title="Delete Contact"
      message="Are you sure you want to delete this contact?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
.label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.input {
  @apply border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.error {
  @apply text-sm text-red-500 mt-1;
}

.th {
  @apply px-4 py-3 border border-gray-300 text-left font-medium;
}

.td {
  @apply px-4 py-3 border border-gray-300 align-middle;
}

.input::placeholder {
  @apply text-gray-400;
}
</style>
