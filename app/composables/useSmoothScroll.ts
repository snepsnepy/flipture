import Lenis from 'lenis';

export const useSmoothScroll = () => {
  let lenis: Lenis | null = null;
  let rafId: number | null = null;

  const init = () => {
    if (import.meta.client) {
      // Initialize Lenis
      lenis = new Lenis({
        duration: 1.2,           // Animation duration in seconds
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing function
        orientation: 'vertical', // Vertical scrolling
        gestureOrientation: 'vertical', // Gesture direction
        smoothWheel: true,       // Enable smooth wheel scrolling
        wheelMultiplier: 1,      // Mouse wheel sensitivity
        touchMultiplier: 2,      // Touch scroll sensitivity
        infinite: false,         // Disable infinite scroll
        autoResize: true,        // Auto resize on window resize
      });

      // Request animation frame loop for Lenis
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    }
  };

  const cleanup = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
  };

  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    lenis?.scrollTo(target, options);
  };

  const getInstance = () => lenis;

  return {
    init,
    cleanup,
    scrollTo,
    getInstance,
  };
};
