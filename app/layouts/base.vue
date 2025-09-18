<template>
  <div class="bg-white min-h-screen flex flex-col">
    <Navigation />
    <main class="flex-1 py-5 md:py-10 items-center">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
