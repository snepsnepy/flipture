<template>
  <section class="container mx-auto py-0 space-y-6">
    <div class="flex flex-row items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#0046ff"
          fill-rule="evenodd"
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-.47-13.53a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72H16a.75.75 0 0 0 0-1.5H9.81l1.72-1.72a.75.75 0 0 0 0-1.06"
          clip-rule="evenodd"
        />
      </svg>
      <button
        @click="goToDashboard"
        class="text-base-content text-sm md:text-base leading-4 font-poppins font-medium hover:cursor-pointer hover:text-primary"
      >
        Back
      </button>
    </div>
    <section
      class="flex flex-col md:flex-row gap-8 md:gap-20 justify-center items-stretch"
    >
      <!-- Left Side -->
      <div
        v-if="!isMobile"
        class="flex w-full flex-row bg-[url('@/assets/img/magazine_water.jpg')] bg-cover bg-center bg-no-repeat rounded-3xl items-end min-h-[780px] relative"
      >
        <!-- Dark overlay mask -->
        <div class="absolute inset-0 bg-base-content/70 rounded-3xl"></div>
        <p
          class="text-primary-content text-2xl leading-6 md:text-6xl md:leading-12 font-medium p-6 pb-8 relative z-10"
        >
          Flip the ordinary <br />
          into extraordinary.
        </p>
      </div>

      <!-- Right Side - Form Content -->
      <div
        class="w-full flex flex-col gap-y-6 max-w-2xl rounded-3xl min-h-[750px]"
      >
        <!-- Page Header -->
        <div class="flex justify-between items-center">
          <h3 class="font-delight font-semibold text-xl leading-5 md:text-2xl">
            Create New Flipbook
          </h3>
        </div>

        <!-- Custom Stepper -->
        <div class="pb-4">
          <Stepper
            :active-step="flipbookStore.currentStep - 1"
            :steps="stepperSteps"
          />
        </div>

        <!-- Dynamic Step Content -->
        <div class="md:min-h-[550px] flex-1">
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
        <div class="flex gap-4 justify-end">
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
    </section>
  </section>
</template>

<script lang="ts" setup>
import { createFlipbookFormSchema } from "~~/schema/form.schema";
import { useForm } from "vee-validate";
import { useCreateFlipbook } from "~/composables/useCreateFlipbook";
import { useFlipbookStore } from "~/stores/useFlipbookStore";
import { useToast } from "~/composables/useToast";
import { Toast } from "~/types";
import { useIsMobile } from "~/composables/useIsMobile";

// Step components
import FileUploadStep from "~/components/CreateFlipbookModal/steps/FileUploadStep.vue";
import FlipbookDetailsStep from "~/components/CreateFlipbookModal/steps/FlipbookDetailsStep.vue";
import CoverOptionsStep from "~/components/CreateFlipbookModal/steps/DesignOptionsStep.vue";
import Stepper from "~/components/Stepper.vue";
import ActionButton from "~/components/ActionButton.vue";

definePageMeta({
  layout: "base",
  middleware: "auth",
});

const { isMobile } = useIsMobile();
const { createFlipbook: createFlipbookFn, isLoading } = useCreateFlipbook();
const flipbookStore = useFlipbookStore();
const { showToast } = useToast();
const router = useRouter();

// Stepper steps configuration
const stepperSteps = [
  { stepTitle: "Upload PDF" },
  { stepTitle: "Details" },
  { stepTitle: "Design Options" },
];

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

// Reset form when component is mounted
onMounted(() => {
  if (flipbookStore.currentStep !== 1) {
    flipbookStore.resetForm();
  }
});

// Clean up on unmount
onUnmounted(() => {
  // Optionally reset form when leaving page
  // flipbookStore.resetForm();
});

const goToDashboard = () => {
  return navigateTo({ name: "dashboard" });
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
    // Invalidate cache so dashboard will fetch fresh data
    flipbookStore.invalidateCache();
    // Navigate to dashboard and reset to page 1 to show the newly created flipbook
    return navigateTo({ name: "dashboard", query: { page: "1" } });
  }
};
</script>
