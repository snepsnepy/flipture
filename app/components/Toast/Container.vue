<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-[9999] space-y-2">
      <TransitionGroup
        enter-active-class="transform transition-all duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transform transition-all duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
        move-class="transition-transform duration-300 ease-out"
      >
        <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { toasts } = useToast();
</script>
