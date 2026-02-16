<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuth } from '~/composables/useAuth'

const { login } = useAuth()

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
})

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: schema
})

const [email] = defineField('email')
const [password] = defineField('password')

const serverError = ref<string | null>(null)

const onSubmit = handleSubmit(async (values) => {
  try {
    serverError.value = null
    await login(values)
  } catch (e: any) {
    serverError.value = e?.statusMessage || 'Login failed'
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <AppLogo class="mb-8" />

    <h1 class="text-5xl font-light text-gray-700 mb-10">
      Address Book
    </h1>

    <form
      @submit="onSubmit"
      class="w-full max-w-md space-y-6"
    >
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Enter email"
          class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p class="text-sm text-red-500 mt-1">
          {{ errors.email }}
        </p>
      </div>

      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Enter Password"
          class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p class="text-sm text-red-500 mt-1">
          {{ errors.password }}
        </p>
      </div>

      <p v-if="serverError" class="text-sm text-red-600 text-center">
        {{ serverError }}
      </p>

      <div class="text-center">
        <button
          :disabled="isSubmitting"
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition disabled:opacity-50"
        >
          {{ isSubmitting ? 'Loading...' : 'Submit' }}
        </button>
      </div>
    </form>
  </div>
</template>
