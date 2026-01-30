<template>
  <ToastProvider>
    <div class="bg-white min-h-screen flex flex-col">
      <Navigation />
      <main class="flex-1 flex items-center py-5 md:py-10">
        <slot />
      </main>
      <Footer />
    </div>
  </ToastProvider>
</template>

<script lang="ts" setup></script>

<style></style>
