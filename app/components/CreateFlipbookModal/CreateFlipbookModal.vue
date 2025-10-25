<template>
  <div class="modal" :class="{ 'modal-open': isOpen }">
    <div class="modal-box w-11/12 max-w-4xl">
      <div class="flex justify-between items-center mb-6">
        <h3 class="font-poppins font-bold text-2xl">Create New Flipbook</h3>
        <button class="btn btn-sm btn-circle btn-ghost" @click="closeModal">
          ✕
        </button>
      </div>

      <!-- DaisyUI Steps -->
      <div class="steps w-full mb-8">
        <div
          class="step"
          :class="{ 'step-primary': flipbookStore.currentStep >= 1 }"
        >
          Upload PDF
        </div>
        <div
          class="step"
          :class="{ 'step-primary': flipbookStore.currentStep >= 2 }"
        >
          Details
        </div>
        <div
          class="step"
          :class="{ 'step-primary': flipbookStore.currentStep >= 3 }"
        >
          Cover Options
        </div>
      </div>

      <!-- Dynamic Step Content -->
      <div class="min-h-[400px]">
        <component
          :is="currentStepComponent"
          @next="flipbookStore.nextStep"
          @prev="flipbookStore.prevStep"
          @complete="handleComplete"
          :form-data="flipbookStore.formData"
          @update:form-data="flipbookStore.updateFormData"
        />
      </div>

      <!-- Navigation Buttons -->
      <div class="modal-action">
        <button
          v-if="flipbookStore.currentStep > 1"
          class="btn btn-outline"
          @click="flipbookStore.prevStep"
        >
          Previous
        </button>
        <button
          v-if="flipbookStore.currentStep < 3"
          class="btn btn-primary"
          @click="flipbookStore.nextStep"
          :disabled="!canProceed"
          :class="{
            'btn-error': flipbookStore.currentStep === 2 && hasValidationErrors,
          }"
          :title="
            flipbookStore.currentStep === 2 && hasValidationErrors
              ? 'Please fix validation errors before proceeding'
              : ''
          "
        >
          Next
        </button>
        <button
          v-if="flipbookStore.currentStep === 3"
          class="btn btn-primary"
          @click="createFlipbook"
          :disabled="isLoading"
        >
          <span
            v-if="isLoading"
            class="loading loading-spinner loading-sm"
          ></span>
          Create Flipbook
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createFlipbookFormSchema } from "~~/schema/form.schema";
import { useForm } from "vee-validate";
import { useCreateFlipbook } from "~/composables/useCreateFlipbook";
import { useFlipbookStore } from "~/stores/useFlipbookStore";

// Step components
import FileUploadStep from "~/components/CreateFlipbookModal/steps/FileUploadStep.vue";
import FlipbookDetailsStep from "~/components/CreateFlipbookModal/steps/FlipbookDetailsStep.vue";
import CoverOptionsStep from "~/components/CreateFlipbookModal/steps/CoverOptionsStep.vue";
import type { FlipbookFormData } from "~/types";

const { createFlipbook: createFlipbookFn, isLoading } = useCreateFlipbook();
const flipbookStore = useFlipbookStore();

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
  success: [];
}>();

// Validation using vee-validate schema
const validationSchema = createFlipbookFormSchema();
const { setFieldValue } = useForm({
  validationSchema,
  initialValues: {
    title: flipbookStore.formData.title,
    company: flipbookStore.formData.company,
    description: flipbookStore.formData.description,
  },
});

// Step components mapping
const stepComponents = {
  1: FileUploadStep,
  2: FlipbookDetailsStep,
  3: CoverOptionsStep,
};

const currentStepComponent = computed(
  () => stepComponents[flipbookStore.currentStep as keyof typeof stepComponents]
);

// Navigation logic
const canProceed = computed(() => {
  switch (flipbookStore.currentStep) {
    case 1:
      return flipbookStore.canProceedToStep2;
    case 2:
      return flipbookStore.canProceedToStep3 && !hasValidationErrors.value;
    case 3:
      return true;
    default:
      return false;
  }
});

// Check for validation errors using store data
const hasValidationErrors = computed(() => {
  if (flipbookStore.currentStep !== 2) return false;

  // Check validation rules directly from store data
  const title = flipbookStore.formData.title.trim();
  const company = flipbookStore.formData.company.trim();
  const description = flipbookStore.formData.description.trim();

  // Title validation: required, 3-30 characters
  const titleError = !title || title.length < 3 || title.length > 30;

  // Company validation: max 20 characters
  const companyError = company.length > 20;

  // Description validation: max 100 characters
  const descriptionError = description.length > 100;

  return titleError || companyError || descriptionError;
});

// Watch for store changes and update vee-validate form
watch(
  () => flipbookStore.formData,
  (newData) => {
    setFieldValue("title", newData.title);
    setFieldValue("company", newData.company);
    setFieldValue("description", newData.description);
  },
  { deep: true }
);

const closeModal = () => {
  emit("close");
  flipbookStore.closeModal();
};

const handleComplete = () => {
  createFlipbook();
};

// Create flipbook logic
const createFlipbook = async () => {
  if (!flipbookStore.formData.file) {
    return;
  }

  const result = await createFlipbookFn(flipbookStore.formData);

  if (result.success) {
    emit("success");
    flipbookStore.resetForm();
    closeModal();
  }
};
</script>
