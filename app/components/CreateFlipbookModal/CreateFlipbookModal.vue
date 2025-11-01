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
      <div v-if="!showSuccess" class="pb-4">
        <Stepper
          :active-step="flipbookStore.currentStep - 1"
          :steps="stepperSteps"
        />
      </div>

      <!-- Dynamic Step Content -->
      <div class="md:min-h-[550px]">
        <!-- Success State -->
        <div
          v-if="showSuccess"
          class="flex flex-col items-center justify-center md:min-h-[400px]"
        >
          <div class="items-center flex flex-col gap-y-8">
            <div class="gap-y-2 text-center items-center flex flex-col">
              <!-- Success Icon -->
              <div
                class="rounded-full flex w-fit items-center justify-center border-3 border-base-content bg-success-content p-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="96"
                  height="96"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      fill="#5cb338"
                      d="M1.987 13.704a1.084 1.084 0 0 0 0 1.534l5.203 5.204c.424.423 1.11.423 1.534 0l13.289-13.29a1.084 1.084 0 0 0 0-1.533l-2.06-2.06a1.084 1.084 0 0 0-1.533 0L7.957 14.022L5.58 11.644a1.085 1.085 0 0 0-1.534 0z"
                    />
                    <path
                      fill="#deffd3"
                      d="M7.957 17.167L20.76 4.365l-.809-.809a1.085 1.085 0 0 0-1.534 0L7.957 14.022L5.58 11.644a1.084 1.084 0 0 0-1.534 0l-.809.809z"
                    />
                    <path
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M1.987 13.704a1.084 1.084 0 0 0 0 1.534l5.203 5.204c.424.423 1.11.423 1.534 0l13.289-13.29a1.084 1.084 0 0 0 0-1.533l-2.06-2.06a1.084 1.084 0 0 0-1.533 0L7.957 14.022L5.58 11.644a1.085 1.085 0 0 0-1.534 0z"
                      stroke-width="1"
                    />
                  </g>
                </svg>
              </div>

              <!-- Success Message -->
              <h4
                class="font-poppins font-bold text-xl md:text-2xl leading-6 text-success"
              >
                Flipbook Created Successfully!
              </h4>
              <p
                class="font-poppins text-neutral text-sm md:text-base leading-4"
              >
                Your flipbook
                <span class="text-primary">{{
                  flipbookStore.formData.title
                }}</span>
                has been created and is ready to view.
              </p>
            </div>

            <!-- Additional Info -->
            <div
              class="bg-primary/10 rounded-2xl p-6 flex flex-col gap-y-4 shadow-md border border-primary"
            >
              <h5
                class="font-poppins font-semibold text-primary text-base md:text-lg leading-4"
              >
                What's Next?
              </h5>
              <ul class="text-sm space-y-2 text-left font-poppins text-primary">
                <li class="flex items-start gap-2">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="#0046ff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m5 12l5 5L20 7"
                      />
                    </svg>
                  </div>
                  Your flipbook is now available in your dashboard
                </li>
                <li class="flex items-start gap-2">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="#0046ff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m5 12l5 5L20 7"
                      />
                    </svg>
                  </div>
                  You can share it with others or embed it on your website
                </li>
                <li class="flex items-start gap-2">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="#0046ff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m5 12l5 5L20 7"
                      />
                    </svg>
                  </div>
                  Edit settings anytime from the flipbook menu
                </li>
              </ul>
            </div>

            <!-- Close Button -->
            <ActionButton
              text="View My Flipbooks"
              type="primary"
              @click="handleSuccessClose"
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
                    d="M11 8h5m0 4h-5m5 4h-5m-5 4h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2m2-4"
                  />
                </svg>
              </template>
            </ActionButton>
          </div>
        </div>

        <!-- Regular Step Content -->
        <component
          v-else
          :is="currentStepComponent"
          @next="flipbookStore.nextStep"
          @prev="flipbookStore.prevStep"
          @complete="handleComplete"
          :form-data="flipbookStore.formData"
          @update:form-data="flipbookStore.updateFormData"
        />
      </div>

      <!-- Navigation Buttons -->
      <div v-if="!showSuccess" class="modal-action">
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

// Step components
import FileUploadStep from "~/components/CreateFlipbookModal/steps/FileUploadStep.vue";
import FlipbookDetailsStep from "~/components/CreateFlipbookModal/steps/FlipbookDetailsStep.vue";
import CoverOptionsStep from "~/components/CreateFlipbookModal/steps/DesignOptionsStep.vue";
import Stepper from "~/components/Stepper.vue";
import type { FlipbookFormData } from "~/types";

const { createFlipbook: createFlipbookFn, isLoading } = useCreateFlipbook();
const flipbookStore = useFlipbookStore();

// Stepper steps configuration
const stepperSteps = [
  { stepTitle: "Upload PDF" },
  { stepTitle: "Details" },
  { stepTitle: "Design Options" },
];

// Success state
const showSuccess = ref(false);

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
  // Only reset form if we're in success state
  if (showSuccess.value) {
    showSuccess.value = false;
    flipbookStore.resetForm();
  }
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
    showSuccess.value = true;
    emit("success");
  }
};

// Handle success close
const handleSuccessClose = () => {
  showSuccess.value = false;
  flipbookStore.resetForm();
  emit("close");
  flipbookStore.closeModal();
};
</script>
