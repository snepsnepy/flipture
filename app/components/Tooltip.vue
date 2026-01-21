<template>
  <div
    :class="[
      tooltipClasses,
      !hidden ? 'tooltip' : '',
    ]"
    :data-tip="!hidden ? text : undefined"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  hidden?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  hidden: false,
  class: "",
});

const tooltipClasses = computed(() => props.class);
</script>

<style scoped lang="scss">
.tooltip {
  --tt-bg: var(--color-base-content);
  font-family: var(--font-poppins);

  &:before {
    padding: 8px 12px;
    border-radius: 12px;
  }
}
</style>
