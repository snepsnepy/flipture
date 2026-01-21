<template>
  <div class="flex flex-col gap-6">
    <div class="text-center space-y-2">
      <h4 class="font-delight font-semibold text-2xl leading-6">
        Design Options
      </h4>
      <p class="font-delight text-neutral text-sm md:text-base">
        Customize the design and appearance of your flipbook
      </p>
    </div>

    <!-- Info Section -->
    <div class="bg-primary/10 rounded-3xl flex items-center gap-2 md:gap-4">
      <div class="bg-primary px-4 py-6 rounded-l-3xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 48 48"
        >
          <g fill="none">
            <path
              stroke="#ffffff"
              stroke-linejoin="round"
              stroke-width="4"
              d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"
            />
            <path
              fill="#ffffff"
              fill-rule="evenodd"
              d="M24 11a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"
              clip-rule="evenodd"
            />
            <path
              stroke="#ffffff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M24.5 34V20h-2M21 34h7"
            />
          </g>
        </svg>
      </div>
      <p
        class="text-xs md:text-sm leading-3 md:leading-4 text-primary font-poppins px-1 md:px-2"
      >
        <span class="font-delight font-semibold">Flipture Branded Cover</span>
        uses our branding, while the other options use the
        <span class="font-semibold font-delight">first</span> or
        <span class="font-semibold font-delight">last</span> pages from your
        uploaded PDF file as covers.
      </p>
    </div>

    <!-- Cover Options Section -->
    <section class="space-y-4">
      <div class="flex justify-between items-center">
        <p class="text-base md:text-xl leading-4 font-delight text-base-content">
          Choose the cover option for your flipbook
        </p>
        <span
          v-if="isFreePlan && !isLoadingProfile"
          class="text-xs text-neutral font-poppins"
        >
          1 / {{ coverOptions.length }} available
        </span>
      </div>
      <fieldset class="p-0 flex flex-col gap-2 max-w-full min-w-0">
        <div 
          v-for="option in coverOptions" 
          :key="option.value"
          class="form-control"
        >
          <Tooltip
            :text="option.isPremium && isFreePlan && !isLoadingProfile ? 'Upgrade to Standard or Premium to unlock this cover option' : ''"
            :hidden="!(option.isPremium && isFreePlan && !isLoadingProfile)"
            class="w-full"
          >
            <label 
              class="label justify-start gap-3"
              :class="[
                option.isPremium && isFreePlan && !isLoadingProfile
                  ? 'cursor-not-allowed opacity-60' 
                  : 'cursor-pointer'
              ]"
              @click="selectCoverOption(option.value)"
            >
              <input
                type="radio"
                name="cover-option"
                class="radio border-base-content checked:text-blue-600 checked:border-base-content"
                :value="option.value"
                v-model="localFormData.coverOption"
                :disabled="option.isPremium && isFreePlan && !isLoadingProfile"
                @change="updateFormData"
              />
              <span
                class="label-text font-poppins text-base-content text-sm md:text-base md:leading-4 flex items-center gap-2"
              >
                {{ option.label }}
                <span
                  v-if="option.isPremium && isFreePlan && !isLoadingProfile"
                  class="text-[10px] bg-warning/20 text-warning px-1.5 py-0.5 rounded-full font-semibold"
                >
                  PRO
                </span>
              </span>
            </label>
          </Tooltip>
        </div>
      </fieldset>
    </section>

    <section class="space-y-4">
      <div class="flex justify-between items-center">
        <p class="text-base md:text-xl leading-4 font-delight text-base-content">
          Choose the background gradient for your flipbook
        </p>
        <span
          v-if="isFreePlan && !isLoadingProfile"
          class="text-xs text-neutral font-poppins"
        >
          {{ availableGradientsCount }} / {{ backgroundGradients.length }} available
        </span>
      </div>
      <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <Tooltip
          v-for="gradient in backgroundGradients"
          :key="gradient.id"
          :text="gradient.isPremium && isFreePlan && !isLoadingProfile ? 'Upgrade to Standard or Premium to unlock this background' : ''"
          :hidden="!(gradient.isPremium && isFreePlan && !isLoadingProfile)"
          class="flex flex-col items-center gap-2"
        >
          <div
            class="flex flex-col items-center gap-2 group relative"
            :class="[
              gradient.isPremium && isFreePlan && !isLoadingProfile
                ? 'cursor-not-allowed opacity-60'
                : 'cursor-pointer',
            ]"
            @click="selectGradient(gradient.id)"
          >
            <div
              class="w-16 h-16 rounded-full border-2 transition-all duration-200 relative"
              :class="[
                localFormData.backgroundGradient === gradient.id
                  ? 'border-primary ring-2 ring-primary ring-offset-2 scale-105'
                  : gradient.isPremium && isFreePlan && !isLoadingProfile
                  ? 'border-base-content/20'
                  : 'border-base-content/30! group-hover:border-base-content!',
                gradient.gradient,
              ]"
            >
              <!-- Lock Icon for Premium Backgrounds on FREE plan -->
              <div
                v-if="gradient.isPremium && isFreePlan && !isLoadingProfile"
                class="absolute inset-0 flex items-center justify-center bg-base-content/40 rounded-full backdrop-blur-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            </div>
            <span
              class="text-xs md:text-sm font-poppins text-center text-base-content flex items-center gap-1"
              :class="[
                localFormData.backgroundGradient === gradient.id
                  ? 'font-semibold text-primary'
                  : '',
                gradient.isPremium && isFreePlan && !isLoadingProfile ? 'text-neutral' : '',
              ]"
            >
              {{ gradient.name }}
              <span
                v-if="gradient.isPremium && isFreePlan && !isLoadingProfile"
                class="text-[10px] bg-warning/20 text-warning px-1.5 py-0.5 rounded-full font-semibold"
              >
                PRO
              </span>
            </span>
          </div>
        </Tooltip>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FlipbookFormData } from "~/types";
import { useFlipbookStore } from "~/stores/useFlipbookStore";
import { useToast } from "~/composables/useToast";
import { Toast } from "~/types";

const props = defineProps<{
  formData: FlipbookFormData;
}>();

const flipbookStore = useFlipbookStore();
const { isFreePlan, isLoadingProfile } = useSubscriptionPlan();
const { showToast } = useToast();

// Local form data
const localFormData = ref<{
  coverOption: string | null;
  backgroundGradient: string | null;
}>({
  coverOption: props.formData.coverOption,
  backgroundGradient: props.formData.backgroundGradient || "deep-white",
});

// Watch for prop changes
watch(
  () => props.formData.coverOption,
  (newValue) => {
    localFormData.value.coverOption = newValue;
  }
);

watch(
  () => props.formData.backgroundGradient,
  (newValue) => {
    localFormData.value.backgroundGradient = newValue || "deep-white";
  }
);

const updateFormData = () => {
  flipbookStore.updateFormData({
    coverOption: localFormData.value.coverOption,
    backgroundGradient: localFormData.value.backgroundGradient || "deep-white",
  });
};

// Initialize background gradient if not set when component mounts
onMounted(() => {
  if (!localFormData.value.backgroundGradient) {
    localFormData.value.backgroundGradient = "deep-white";
    updateFormData();
  }
});

const selectCoverOption = (optionValue: string) => {
  const option = coverOptions.find((o) => o.value === optionValue);

  // Prevent selecting premium cover options on FREE plan
  if (option?.isPremium && isFreePlan.value) {
    return;
  }

  localFormData.value.coverOption = optionValue;
  updateFormData();
};

const selectGradient = (gradientId: string) => {
  const gradient = backgroundGradients.find((g) => g.id === gradientId);

  // Prevent selecting premium backgrounds on FREE plan
  if (gradient?.isPremium && isFreePlan.value) {
    return;
  }

  localFormData.value.backgroundGradient = gradientId;
  updateFormData();
};

// Cover options
interface CoverOption {
  value: string;
  label: string;
  isPremium: boolean; // TRUE = Standard/Premium only, FALSE = FREE
}

const coverOptions: CoverOption[] = [
  {
    value: "default",
    label: "Flipture Branded Cover",
    isPremium: false, // FREE
  },
  {
    value: "first-page",
    label: "First Page as Cover",
    isPremium: true, // PREMIUM
  },
  {
    value: "first-last-page",
    label: "First and Last Pages as Covers",
    isPremium: true, // PREMIUM
  },
];

// Background gradient options
interface GradientOption {
  id: string;
  name: string;
  gradient: string;
  isPremium: boolean; // TRUE = Standard/Premium only, FALSE = FREE
}

const backgroundGradients: GradientOption[] = [
  // FREE Backgrounds (available to all users)
  {
    id: "deep-white",
    name: "Deep White",
    gradient: "bg-gradient-to-br from-[#FFFFFF] to-[#F0F0F0]",
    isPremium: false,
  },
  {
    id: "deep-black",
    name: "Deep Black",
    gradient: "bg-gradient-to-br from-[#000000] to-[#212121]",
    isPremium: false,
  },
  // PREMIUM Backgrounds (Standard/Premium only)
  {
    id: "royal-blue",
    name: "Royal Blue",
    gradient: "bg-gradient-to-br from-[#091E3A] via-[#2F80ED] to-[#2D9EE0]",
    isPremium: true,
  },
  {
    id: "purple-dream",
    name: "Purple Dream",
    gradient: "bg-gradient-to-br from-[#9400D3] to-[#4B0082]",
    isPremium: true,
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    gradient: "bg-gradient-to-br from-[#E65C00] to-[#F9D423]",
    isPremium: true,
  },
  {
    id: "fire-red",
    name: "Fire Red",
    gradient: "bg-gradient-to-br from-[#E52D27] to-[#B31217]",
    isPremium: true,
  },
  {
    id: "spring-green",
    name: "Spring Green",
    gradient: "bg-gradient-to-br from-[#ADD100] to-[#7B920A]",
    isPremium: true,
  },
  {
    id: "arctic-blue",
    name: "Arctic Blue",
    gradient: "bg-gradient-to-br from-[#00F5FF] via-[#00CED1] to-[#20B2AA]",
    isPremium: true,
  },
];

// Count available gradients for FREE users
const availableGradientsCount = computed(() => {
  return backgroundGradients.filter((g) => !g.isPremium).length;
});
</script>
