import Lenis from 'lenis';

export default defineNuxtPlugin(() => {
  let lenis: Lenis | null = null;
  let rafId: number | null = null;

  // Initialize Lenis
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
    autoResize: true,
  });

  // Request animation frame loop
  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);

  // Cleanup on app unmount
  if (import.meta.client) {
    window.addEventListener('beforeunload', () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      lenis?.destroy();
    });
  }

  // Provide lenis instance globally
  return {
    provide: {
      lenis,
    },
  };
});
