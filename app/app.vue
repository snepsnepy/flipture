<script setup lang="ts">
// Initialize auth state management
const { initialize } = useAuthStateManager();

onMounted(() => {
  // Set up auth listeners and periodic checks
  const cleanup = initialize();

  // Clean up on unmount
  onUnmounted(() => {
    cleanup();
  });
});
</script>

<template>
  <div class="min-h-screen">
    <NuxtLayout>
      <NuxtPage />
      <ScrollToTop />
    </NuxtLayout>
  </div>
</template>
