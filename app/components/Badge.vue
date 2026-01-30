<template>
  <div>
    <span class="badge font-poppins font-medium text-xs p-2 rounded-md whitespace-nowrap" :class="variantClass">
      <slot name="icon" />
      {{ text }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  text: string;
  variant: 'secondary' | 'info';
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  variant: 'secondary',
});

const variantClass = computed(() => {
  return {
    'badge-secondary bg-secondary/30 text-base-content/70': props.variant === 'secondary',
    'badge-info bg-info/30 text-base-content/70': props.variant === 'info',
  };
});
</script>