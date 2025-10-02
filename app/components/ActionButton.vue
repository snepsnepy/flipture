<template>
  <a
    class="relative inline-block text-lg group rounded-full transition-transform duration-200 ease-out active:scale-95"
    :class="{
      'hover:cursor-pointer': !disabled,
      'opacity-50 pointer-events-none': disabled,
    }"
  >
    <span
      class="relative z-10 block px-3 md:px-4 py-2 md:py-3 overflow-hidden font-medium leading-tight text-base-content transition-colors duration-300 ease-out border-2 border-base-content rounded-full group-hover:text-base-content"
    >
      <span
        class="absolute inset-0 w-full h-full px-5 py-3 rounded-full bg-base-100"
        :class="{
          '!bg-secondary': type === 'primary',
          '!bg-base-100': type === 'secondary' || type === 'error',
          '!bg-error': type === 'confirmation',
        }"
      ></span>
      <span
        class="absolute left-0 w-96 h-96 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-secondary group-hover:-rotate-180 ease"
        :class="{
          '!bg-base-100': type === 'primary',
          '!bg-secondary': type === 'secondary',
          '!bg-error': type === 'error',
          '!bg-base-100/50': type === 'confirmation',
        }"
      ></span>
      <div class="flex gap-2 relative z-10 justify-center items-center">
        <span
          v-if="text"
          class="relative whitespace-nowrap text-base md:text-lg leading-4 font-poppins font-bold"
        >
          {{ text }}
        </span>
        <slot name="icon" />
      </div>
    </span>
    <span
      class="absolute bottom-0 right-0 w-full -mb-1 h-10 md:h-12 -mr-1 transition-all duration-200 ease-linear bg-base-content rounded-full group-hover:mb-0 group-hover:mr-0"
      :class="{
        '!h-9 md:h-10': !hasIcon,
      }"
      data-rounded="rounded-lg"
    ></span>
  </a>
</template>

<script lang="ts" setup>
interface Props {
  text?: string;
  type?: "primary" | "secondary" | "error" | "confirmation";
  disabled?: boolean;
}

defineProps<Props>();

const slots = useSlots();
const hasIcon = computed(() => !!slots.icon);
</script>
