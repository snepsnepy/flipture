<template>
  <Transition
    enter-active-class="transform transition-all duration-300 ease-out"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transform transition-all duration-200 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div class="alert shadow-lg max-w-md w-full" :class="alertClasses">
      <!-- Icon -->
      <div class="flex-shrink-0">
        <svg
          v-if="toast.type === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else-if="toast.type === 'error'"
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="flex-1">
        <div class="font-semibold text-base leading-4 font-poppins">
          {{ toast.title }}
        </div>
        <div
          v-if="toast.description"
          class="text-sm opacity-70 font-poppins mt-1"
        >
          {{ toast.description }}
        </div>
      </div>

      <!-- Action Button -->
      <div v-if="toast.action" class="flex-shrink-0">
        <button class="btn btn-sm btn-ghost" @click="toast.action?.onClick">
          {{ toast.action.label }}
        </button>
      </div>

      <!-- Close Button -->
      <div class="flex-shrink-0">
        <button class="btn btn-sm btn-ghost btn-circle" @click="dismiss">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { ToastItem } from "~/composables/useToast";

interface Props {
  toast: ToastItem;
}

const props = defineProps<Props>();

const { dismissToast } = useToast();

const alertClasses = computed(() => {
  const baseClasses = "rounded-2xl border-2";

  switch (props.toast.type) {
    case "success":
      return `${baseClasses} bg-success/50 border-green-200 text-green-800`;
    case "error":
      return `${baseClasses} alert-error border-error`;
    default:
      return `${baseClasses} alert-info border-base-content`;
  }
});

const dismiss = () => {
  dismissToast(props.toast.id);
};
</script>
