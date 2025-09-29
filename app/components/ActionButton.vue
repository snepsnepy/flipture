<template>
  <a class="relative inline-block text-lg group rounded-full">
    <span
      class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-base-content transition-colors duration-300 ease-out border-2 border-base-content rounded-full group-hover:text-base-content"
    >
      <span
        class="absolute inset-0 w-full h-full px-5 py-3 rounded-full bg-base-100"
        :class="{
          '!bg-secondary': type === 'primary',
          '!bg-base-100': type === 'secondary' || type === 'error',
        }"
      ></span>
      <span
        class="absolute left-0 w-64 h-64 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-secondary group-hover:-rotate-180 ease"
        :class="{
          '!bg-base-100': type === 'primary',
          '!bg-secondary': type === 'secondary',
          '!bg-error': type === 'error',
        }"
      ></span>
      <div class="flex gap-2 relative z-10">
        <span
          v-if="text"
          class="relative whitespace-nowrap font-poppins font-bold"
        >
          {{ text }}
        </span>
        <slot name="icon" />
      </div>
    </span>
    <span
      class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-base-content rounded-full group-hover:mb-0 group-hover:mr-0"
      data-rounded="rounded-lg"
    ></span>
  </a>
</template>

<script lang="ts" setup>
interface Props {
  text?: string;
  type?: "primary" | "secondary" | "error";
}

defineProps<Props>();
</script>
