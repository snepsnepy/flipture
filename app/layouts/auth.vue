<template>
  <div class="bg-white min-h-screen flex flex-col">
    <Navigation />
    <main class="flex-1 flex items-center">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
