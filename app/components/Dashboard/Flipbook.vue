<template>
  <section class="p-6 md:p-8 rounded-3xl border-2 border-base-content">
    <header class="flex flex-row items-start">
      <div
        class="max-w-[300px] border-2 border-base-content p-2 bg-base-300 rounded-2xl"
      >
        <PDFThumbnail :pdf-url="flipbook.pdf_file_url!" />
      </div>
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
