<template>
  <section class="flex w-full items-center gap-x-2">
    <template v-for="(step, index) in steps" :key="index">
      <!-- Step -->
      <div
        class="flex items-center gap-x-1.5"
        :class="{ 'opacity-50': activeStep < index }"
      >
        <!-- Step Indicator -->
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full border border-base-content"
          :class="{
            'bg-primary border-primary': activeStep === index,
            'border-2 border-success bg-success-content': activeStep > index,
          }"
        >
          <span
            v-if="activeStep <= index"
            class="font-sans text-md font-medium leading-3"
            :class="{
              'text-base-100': activeStep === index,
            }"
          >
            {{ index + 1 }}
          </span>
          <svg
            v-if="activeStep > index"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-6 w-6 text-success"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <span
          class="whitespace-nowrap font-poppins font-bold text-base md:block"
          :class="{
            'hidden font-normal': activeStep !== index,
          }"
        >
          {{ step.stepTitle }}
        </span>
      </div>

      <!-- Divider -->
      <div
        v-if="index < steps.length - 1"
        class="h-0.5 w-full rounded-lg bg-base-300"
      ></div>
    </template>
  </section>
</template>

<script setup lang="ts">
export interface Step {
  stepTitle: string;
}

defineProps<{
  activeStep: number;
  steps: Array<Step>;
}>();
</script>
