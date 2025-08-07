<template>
  <section>
    <Hero />
  </section>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "base",
});

const name = ref<string>("John Test");
</script>
