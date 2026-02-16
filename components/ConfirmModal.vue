<script setup lang="ts">
interface Props {
  show: boolean
  title?: string
  message?: string
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
      <h2 class="text-lg font-semibold mb-3">
        {{ title || 'Confirm Action' }}
      </h2>

      <p class="text-gray-600 mb-6">
        {{ message || 'Are you sure?' }}
      </p>

      <div class="flex justify-end gap-3">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 rounded bg-gray-300"
        >
          Cancel
        </button>

        <button
          @click="$emit('confirm')"
          class="px-4 py-2 rounded bg-red-600 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
