<template>
  <motion.span
    class="relative hover:cursor-pointer w-fit inline-block"
    :class="[textClass, props.class]"
    initial="rest"
    whileHover="hover"
    :variants="parentVariants"
    v-bind="$attrs"
  >
    <slot />
    <motion.span
      class="absolute bottom-0 left-0 w-full bg-current origin-left"
      :class="underlineClass"
      :variants="underlineVariants"
      :transition="underlineTransition"
      style="transform-origin: left"
    />
  </motion.span>
</template>

<script setup lang="ts">
import { motion } from "motion-v";

interface Props {
  duration?: number;
  thickness?: string;
  class?: string;
  textClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 0.25,
  thickness: "h-[1.5px]",
  textClass: "",
});

const underlineClass = computed(() => props.thickness);

const parentVariants = { rest: {}, hover: {} };

const underlineVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

const underlineTransition = computed(() => ({ duration: props.duration }));
</script>
