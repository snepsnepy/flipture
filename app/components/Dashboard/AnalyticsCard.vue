<template>
  <div
    class="card bg-base-200 border-2 border-base-content shadow-lg rounded-2xl p-6"
  >
    <div class="flex justify-between items-start mb-4">
      <h3 class="font-delight font-bold text-xl">Analytics</h3>
      <button @click="$emit('close')" class="btn btn-sm btn-circle btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
          />
        </svg>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <LoadingSpinner />
    </div>

    <!-- Analytics Content -->
    <div v-else-if="analytics" class="space-y-6">
      <!-- Key Metrics Grid -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Total Views -->
        <div class="bg-base-100 rounded-xl p-4 border border-base-300">
          <div class="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              class="text-primary"
            >
              <path
                fill="currentColor"
                d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
              />
            </svg>
            <span class="text-xs text-neutral font-medium">Total Views</span>
          </div>
          <div class="text-3xl font-bold font-delight">
            {{ formatNumber(analytics.total_views) }}
          </div>
        </div>

        <!-- Unique Visitors -->
        <div class="bg-base-100 rounded-xl p-4 border border-base-300">
          <div class="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              class="text-secondary"
            >
              <path
                fill="currentColor"
                d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"
              />
            </svg>
            <span class="text-xs text-neutral font-medium"
              >Unique Visitors</span
            >
          </div>
          <div class="text-3xl font-bold font-delight">
            {{ formatNumber(analytics.unique_visitors) }}
          </div>
        </div>
      </div>

      <!-- Last Viewed -->
      <div
        v-if="analytics.last_viewed_at"
        class="text-sm text-neutral flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m.5-13H11v6l5.2 3.2l.8-1.3l-4.5-2.7z"
          />
        </svg>
        <span>Last viewed: {{ formatDate(analytics.last_viewed_at) }}</span>
      </div>

      <!-- Info Message -->
      <div class="alert alert-info text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-current shrink-0 w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span
          >Analytics are tracked when viewers open your flipbook in the reader
          app.</span
        >
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="text-center py-12 space-y-4 flex flex-col items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        class="text-neutral opacity-50"
      >
        <path
          fill="currentColor"
          d="M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z"
        />
      </svg>
      <div>
        <p class="font-semibold text-base-content">No analytics yet</p>
        <p class="text-sm text-neutral mt-1">
          Share your flipbook to start tracking views!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FlipbookAnalytics } from "~/types/analytics";
import { useAnalytics } from "~/composables/useAnalytics";

const props = defineProps<{
  flipbookId: string;
}>();

defineEmits<{
  close: [];
}>();

const { getFlipbookAnalytics, formatNumber, formatDate } = useAnalytics();
const analytics = ref<FlipbookAnalytics | null>(null);
const isLoading = ref(true);

// Fetch analytics on mount
onMounted(async () => {
  analytics.value = await getFlipbookAnalytics(props.flipbookId);
  isLoading.value = false;
});
</script>
