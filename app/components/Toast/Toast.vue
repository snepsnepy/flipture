<template>
  <Transition
    enter-active-class="transform transition-all duration-300 ease-out"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transform transition-all duration-200 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div
      class="alert shadow-lg w-full flex items-center !gap-2"
      :class="alertClasses"
    >
      <!-- Icon -->
      <div>
        <svg
          v-if="toast.type === Toast.SUCCESS"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="#5cb338"
            d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0"
          />
        </svg>
        <svg
          v-else-if="toast.type === Toast.INFO"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
        >
          <path
            fill="#0046ff"
            d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#ff3f33"
            fill-rule="evenodd"
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-1.2a8.8 8.8 0 1 0 0-17.6a8.8 8.8 0 0 0 0 17.6m-.66-14.369h1.32l-.089 7.06H11.43l-.088-7.06zM12 17.073a.825.825 0 0 1-.835-.835a.82.82 0 0 1 .835-.835c.476 0 .835.36.835.835a.82.82 0 0 1-.835.835"
          />
        </svg>
      </div>

      <!-- Content -->
      <div>
        <div class="font-semibold text-base leading-4 font-poppins">
          {{ toast.toastTitle }}
        </div>
        <div
          v-if="toast.description"
          class="text-sm opacity-70 font-poppins mt-1"
        >
          {{ toast.description }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Toast, type ToastItem } from "~/types";

interface Props {
  toast: ToastItem;
}

const props = defineProps<Props>();

const alertClasses = computed(() => {
  const baseClasses = "rounded-2xl border-2 px-4";

  switch (props.toast.type) {
    case Toast.SUCCESS:
      return `${baseClasses} bg-success-content border-success text-success`;
    case Toast.ERROR:
      return `${baseClasses} bg-error-content border-error text-error`;
    case Toast.INFO:
      return `${baseClasses} bg-base-100 border-primary text-primary`;
    default:
      return `${baseClasses} alert-info border-base-content`;
  }
});
</script>
