<template>
  <Transition
    enter-active-class="transition-transform duration-200 ease-linear"
    enter-from-class="scale-0"
    enter-to-class="scale-100"
    leave-active-class="transition-transform duration-200 ease-linear"
    leave-from-class="scale-100"
    leave-to-class="scale-0"
  >
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-10 right-10 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-secondary shadow-lg transition-all hover:bg-secondary-content hover:shadow-xl focus:outline-none"
      aria-label="Scroll to top"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="#000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path stroke-dasharray="20" stroke-dashoffset="20" d="M12 21l0 -17.5">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.2s"
              values="20;0"
            />
          </path>
          <path
            stroke-dasharray="12"
            stroke-dashoffset="12"
            d="M12 3l7 7M12 3l-7 7"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.2s"
              dur="0.2s"
              values="12;0"
            />
          </path>
        </g>
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref<boolean>(false);
const SCROLL_THRESHOLD = 400;

const scrollToTop = (): void => {
  const duration = 800; // Duration in milliseconds
  const start = window.pageYOffset;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth deceleration
    const easeInOutCubic = (t: number): number => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    
    window.scrollTo(0, start * (1 - easeInOutCubic(progress)));
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

const handleScroll = (): void => {
  isVisible.value = window.pageYOffset >= SCROLL_THRESHOLD;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
