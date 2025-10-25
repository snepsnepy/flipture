import { defineStore } from "pinia";
import type { FlipbookFormData } from "~/types";

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

  return {
    // State
    formData: readonly(formData),
    currentStep: readonly(currentStep),
    isModalOpen: readonly(isModalOpen),

    // Getters
    hasFile,
    hasTitle,
    canProceedToStep2,
    canProceedToStep3,
    canCreate,

    // Actions
    openModal,
    closeModal,
    resetForm,
    updateFormData,
    nextStep,
    prevStep,
    setStep,
  };
});
