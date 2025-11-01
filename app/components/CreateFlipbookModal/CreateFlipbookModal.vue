<template>
  <div class="modal" :class="{ 'modal-open': isOpen }">
    <div class="fixed inset-0 bg-base-content/60 z-40"></div>
    <div
      class="modal-box max-w-2xl rounded-3xl relative z-50 flex flex-col gap-y-6"
    >
      <!-- Modal Header -->
      <div class="flex justify-between items-center">
        <h3 class="font-delight font-semibold text-xl leading-5 md:text-2xl">
          Create New Flipbook
        </h3>
        <button
          class="btn btn-sm btn-circle btn-ghost p-1 border border-base-content"
          @click="closeModal"
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
              stroke-dasharray="16"
              stroke-dashoffset="16"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M7 7l10 10">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.4s"
                  values="16;0"
                />
              </path>
              <path d="M17 7l-10 10">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.4s"
                  dur="0.4s"
                  values="16;0"
                />
              </path>
            </g>
          </svg>
        </button>
      </div>

      <!-- Custom Stepper -->
      <div class="pb-4">
        <Stepper
          :active-step="flipbookStore.currentStep - 1"
          :steps="stepperSteps"
        />
      </div>

      <!-- Dynamic Step Content -->
      <div class="md:min-h-[550px]">
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
        <ActionButton
          v-if="flipbookStore.currentStep > 1"
          type="secondary"
          @click="flipbookStore.prevStep"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M244 400L100 256l144-144M120 256h292"
              />
            </svg>
          </template>
        </ActionButton>

        <ActionButton
          v-if="flipbookStore.currentStep < 3"
          text="Next"
          type="primary"
          @click="flipbookStore.nextStep"
          :disabled="!canProceed"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m7 7l7-7l-7-7"
              />
            </svg>
          </template>
        </ActionButton>

        <ActionButton
          v-if="flipbookStore.currentStep === 3"
          text="Create Flipbook"
          type="primary"
          @click="createFlipbook"
          :disabled="isLoading"
        >
          <template #icon>
            <span
              v-if="isLoading"
              class="loading loading-spinner loading-sm"
            ></span>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000"
                d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z"
              />
              <path fill="#000" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z" />
            </svg>
          </template>
        </ActionButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createFlipbookFormSchema } from "~~/schema/form.schema";
import { useForm } from "vee-validate";
import { useCreateFlipbook } from "~/composables/useCreateFlipbook";
import { useFlipbookStore } from "~/stores/useFlipbookStore";
import { useToast } from "~/composables/useToast";
import { Toast } from "~/types";

// Step components
import FileUploadStep from "~/components/CreateFlipbookModal/steps/FileUploadStep.vue";
import FlipbookDetailsStep from "~/components/CreateFlipbookModal/steps/FlipbookDetailsStep.vue";
import CoverOptionsStep from "~/components/CreateFlipbookModal/steps/DesignOptionsStep.vue";
import Stepper from "~/components/Stepper.vue";
import type { FlipbookFormData } from "~/types";

const { createFlipbook: createFlipbookFn, isLoading } = useCreateFlipbook();
const flipbookStore = useFlipbookStore();
const { showToast } = useToast();

// Stepper steps configuration
const stepperSteps = [
  { stepTitle: "Upload PDF" },
  { stepTitle: "Details" },
  { stepTitle: "Design Options" },
];

defineProps<{
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
    showToast(Toast.SUCCESS, {
      toastTitle: "Flipbook Created Successfully!",
      description: `Your flipbook "${flipbookStore.formData.title}" has been created and is ready to view.`,
      duration: 3000,
    });
    flipbookStore.resetForm();
    emit("success");
    emit("close");
    flipbookStore.closeModal();
  }
};
</script>
