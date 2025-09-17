<template>
  <section class="flex flex-col gap-y-20 md:gap-y-36">
    <Hero />
    <Separator />
    <LivePreview />
    <Pricing />
    <faqs />
  </section>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "base",
});
</script>
