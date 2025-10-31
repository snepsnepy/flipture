import { defineStore } from "pinia";
import type { FlipbookFormData, Flipbook } from "~/types";

// Cache expiration time (5 minutes)
const CACHE_EXPIRATION_MS = 5 * 60 * 1000;

export const useFlipbookStore = defineStore("flipbook", () => {
  // State
  const formData = ref<FlipbookFormData>({
    file: null,
    title: "",
    company: "",
    description: "",
    coverOption: "default",
  });

  const currentStep = ref(1);
  const isModalOpen = ref(false);

  // Cache state
  const cachedFlipbooks = ref<Flipbook[]>([]);
  const cacheTimestamp = ref<number | null>(null);
  const cachedUserId = ref<string | null>(null); // Track which user the cache belongs to
  const isLoading = ref(false);
  const isSigningOut = ref(false); // Track sign-out state to prevent UI flashes

  // Getters
  const hasFile = computed(() => formData.value.file !== null);
  const hasTitle = computed(() => formData.value.title.trim() !== "");
  const canProceedToStep2 = computed(() => hasFile.value);
  const canProceedToStep3 = computed(() => hasFile.value && hasTitle.value);
  const canCreate = computed(() => hasFile.value && hasTitle.value);

  // Actions
  const openModal = () => {
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const resetForm = () => {
    formData.value = {
      file: null,
      title: "",
      company: "",
      description: "",
      coverOption: "default",
    };
    currentStep.value = 1;
  };

  const updateFormData = (data: Partial<FlipbookFormData>) => {
    formData.value = { ...formData.value, ...data };
  };

  const nextStep = () => {
    if (currentStep.value < 3) {
      currentStep.value++;
    }
  };

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  };

  const setStep = (step: number) => {
    currentStep.value = step;
  };

  // Cache getters
  const isCacheValid = computed(() => {
    if (!cacheTimestamp.value) {
      return false;
    }
    const now = Date.now();
    const age = now - cacheTimestamp.value;
    return age < CACHE_EXPIRATION_MS;
  });

  const hasCachedFlipbooks = computed(() => {
    return cachedFlipbooks.value.length > 0 && isCacheValid.value;
  });

  // Cache actions
  const setCachedFlipbooks = (flipbooks: Flipbook[], userId: string) => {
    cachedFlipbooks.value = flipbooks;
    cacheTimestamp.value = Date.now();
    cachedUserId.value = userId;
  };

  const getCachedFlipbooks = (currentUserId: string | null): Flipbook[] => {
    // Only return cached data if it belongs to the current user and is still valid
    if (
      hasCachedFlipbooks.value &&
      cachedUserId.value === currentUserId &&
      currentUserId !== null
    ) {
      return cachedFlipbooks.value;
    }
    return [];
  };

  const invalidateCache = () => {
    cacheTimestamp.value = null;
    cachedFlipbooks.value = [];
    cachedUserId.value = null;
  };

  const setSigningOut = (value: boolean) => {
    isSigningOut.value = value;
  };

  const updateCachedFlipbook = (updatedFlipbook: Flipbook) => {
    const index = cachedFlipbooks.value.findIndex(
      (flipbook) => flipbook.id === updatedFlipbook.id
    );
    if (index !== -1) {
      cachedFlipbooks.value[index] = updatedFlipbook;
    }
  };

  const removeCachedFlipbook = (flipbookId: string) => {
    cachedFlipbooks.value = cachedFlipbooks.value.filter(
      (flipbook) => flipbook.id !== flipbookId
    );
  };

  const addCachedFlipbook = (flipbook: Flipbook) => {
    // Add to the beginning of the array (most recent first)
    cachedFlipbooks.value.unshift(flipbook);
  };

  return {
    // State
    formData: readonly(formData),
    currentStep: readonly(currentStep),
    isModalOpen: readonly(isModalOpen),
    isLoading: readonly(isLoading),

    // Cache state
    cachedFlipbooks: readonly(cachedFlipbooks),
    cacheTimestamp: readonly(cacheTimestamp),
    cachedUserId: readonly(cachedUserId),
    isSigningOut: readonly(isSigningOut),

    // Getters
    hasFile,
    hasTitle,
    canProceedToStep2,
    canProceedToStep3,
    canCreate,
    isCacheValid,
    hasCachedFlipbooks,

    // Actions
    openModal,
    closeModal,
    resetForm,
    updateFormData,
    nextStep,
    prevStep,
    setStep,

    // Cache actions
    setCachedFlipbooks,
    getCachedFlipbooks,
    invalidateCache,
    updateCachedFlipbook,
    removeCachedFlipbook,
    addCachedFlipbook,
    setSigningOut,
  };
});
