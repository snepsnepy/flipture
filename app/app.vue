<script setup lang="ts">
// Initialize auth state management immediately (client-side only)
// Must be in setup (not onMounted) to catch PASSWORD_RECOVERY events
// before child components mount
let cleanup: (() => void) | undefined;

if (process.client) {
  const { initialize } = useAuthStateManager();
  cleanup = initialize();
}

onUnmounted(() => {
  cleanup?.();
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
