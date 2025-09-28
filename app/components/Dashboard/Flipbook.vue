<template>
  <section class="p-6 md:p-8 rounded-3xl border-2 border-base-content">
    <header class="flex flex-row justify-between items-center">
      <h3
        class="font-poppins font-bold text-2xl leading-6 md:text-[32px] md:leading-8"
      >
        {{ flipbook.title }}
      </h3>
    </header>
    <p class="font-poppins text-base leading-4 md:text-xl text-base-content/50">
      {{ flipbook.description }}
    </p>
    <p class="font-poppins text-base leading-4 md:text-xl text-base-content/50">
      {{ flipbook.company_name }}
    </p>
  </section>
</template>

<script lang="ts" setup>
import type { Flipbook } from "~/types";

defineProps<{
  flipbook: Flipbook;
}>();
</script>
