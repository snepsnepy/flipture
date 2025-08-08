import { useWindowSize } from "@vueuse/core";

export const useIsMobile = () => {
  const { width } = useWindowSize();
  const isMobile = computed(() => width.value <= 1024);

  return { isMobile };
};
