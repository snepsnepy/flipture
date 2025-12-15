<template>
  <div
    class="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
  >
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {{ title }}
        </p>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ formattedValue }}
        </p>
        <div v-if="showChange && percentageChange !== null" class="mt-2">
          <span
            :class="[
              'inline-flex items-center text-sm font-medium',
              changeColor,
            ]"
          >
            <svg
              v-if="percentageChange > 0"
              class="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else-if="percentageChange < 0"
              class="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            {{ Math.abs(percentageChange).toFixed(1) }}%
            <span class="ml-1 text-gray-600">vs previous period</span>
          </span>
        </div>
      </div>
      <div
        v-if="icon"
        class="shrink-0 ml-4 p-3 rounded-full"
        :class="iconBgColor"
      >
        <component :is="icon" class="w-6 h-6" :class="iconColor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  value: number;
  percentageChange?: number | null;
  showChange?: boolean;
  icon?: any;
  iconBgColor?: string;
  iconColor?: string;
  formatAsNumber?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showChange: true,
  percentageChange: null,
  iconBgColor: "bg-blue-100",
  iconColor: "text-blue-600",
  formatAsNumber: true,
});

const formattedValue = computed(() => {
  if (props.formatAsNumber) {
    return props.value.toLocaleString();
  }
  return props.value;
});

const changeColor = computed(() => {
  if (props.percentageChange === null || props.percentageChange === 0) {
    return "text-gray-600";
  }
  return props.percentageChange > 0 ? "text-green-600" : "text-red-600";
});
</script>
