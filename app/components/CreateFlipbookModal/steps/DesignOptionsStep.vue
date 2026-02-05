<template>
  <section class="flex flex-col gap-6">
    <div class="text-center space-y-2">
      <h4 class="font-delight font-semibold text-2xl leading-6">
        Design Options
      </h4>
      <p class="font-delight text-neutral text-sm md:text-base">
        Customize the design and appearance of your flipbook
      </p>
    </div>

    <!-- Info Section -->
    <section
      class="flex flex-row gap-2 items-start md:items-center border border-primary bg-base-200 p-3 rounded-2xl"
    >
      <Icon name="fluent:info-24-regular" :size="24" style="color: var(--color-primary)" />
      <div class="flex flex-row items-center justify-between flex-1 gap-4">
        <p class="text-xs md:text-sm font-poppins">
          <span class="font-medium">Flipture Branded Cover</span>
          uses our branding, while the other options use the
          <span class="font-medium">first</span> or
          <span class="font-medium">last</span> pages from your
          uploaded PDF file as covers.
        </p>
      </div>
    </section>

    <!-- Cover Options Section -->
    <section class="space-y-4">
      <div class="flex justify-between gap-1 xl:items-center flex-col xl:flex-row">
        <p class="text-base md:text-xl leading-4 font-delight text-base-content">
          Choose the cover option for your flipbook
        </p>
        <span
          v-if="userStore.isFreePlan && !userStore.isLoadingProfile"
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
          <label
            class="label justify-start gap-3"
            :class="[
              option.isPremium && userStore.isFreePlan && !userStore.isLoadingProfile
                ? 'opacity-60 cursor-default' 
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
              :disabled="option.isPremium && userStore.isFreePlan && !userStore.isLoadingProfile"
              @change="updateFormData"
            />
            <span
              class="label-text font-poppins text-base-content text-sm md:text-base md:leading-4 flex items-center gap-2"
            >
              {{ option.label }}
              <span
                v-if="option.isPremium && userStore.isFreePlan && !userStore.isLoadingProfile"
                class="text-[10px] bg-base-content/50 text-primary-content px-1.5 py-0.5 rounded-full font-semibold"
              >
                PRO
              </span>
            </span>
          </label>
        </div>
      </fieldset>
    </section>

    <section class="space-y-4">
      <div class="flex justify-between gap-1 xl:items-center flex-col xl:flex-row">
        <p class="text-base md:text-xl leading-4 font-delight text-base-content">
          Choose the background gradient for your flipbook
        </p>
        <span
          v-if="userStore.isFreePlan && !userStore.isLoadingProfile"
          class="text-xs text-neutral font-poppins"
        >
          {{ availableGradientsCount }} / {{ backgroundGradients.length }} available
        </span>
      </div>

      <!-- Scrollable Color Picker -->
      <ColorScrollPicker
        v-model="localFormData.backgroundGradient!"
        :gradients="backgroundGradients"
        :is-free-plan="userStore.isFreePlan && !userStore.isLoadingProfile"
        @gradient-selected="handleGradientSelection"
      />
    </section>

    <!-- PRO Features Footer Info -->
    <footer
      v-if="userStore.isFreePlan && !userStore.isLoadingProfile"
      class="flex flex-row gap-2 items-start md:items-center border border-base-content/20 bg-base-100 p-3 rounded-2xl"
    >
      <Icon name="prime:sparkles" :size="32" class="text-warning shrink-0 mt-0.5 md:mt-0" />
      <p class="text-xs md:text-sm font-poppins text-base-content/80">
        Options marked with 
        <span class="text-[10px] bg-base-content/50 text-primary-content px-1.5 py-0.5 rounded-full font-semibold mx-1">PRO</span>
        are available with our <span class="font-medium">Standard and Premium</span> plans. 
        <NuxtLink to="/pricing" class="text-primary hover:underline font-medium">
          Upgrade now
        </NuxtLink>
        to unlock all features and create even more stunning flipbooks!
      </p>
    </footer>
  </section>
</template>

<script setup lang="ts">
import type { FlipbookFormData } from "~/types";
import { useFlipbookStore } from "~/stores/useFlipbookStore";

const props = defineProps<{
  formData: FlipbookFormData;
}>();

const flipbookStore = useFlipbookStore();
const userStore = useUserStore();

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
  if (option?.isPremium && userStore.isFreePlan) {
    return;
  }

  localFormData.value.coverOption = optionValue;
  updateFormData();
};

const selectGradient = (gradientId: string) => {
  const gradient = backgroundGradients.find((g) => g.id === gradientId);

  // Prevent selecting premium backgrounds on FREE plan
  if (gradient?.isPremium && userStore.isFreePlan) {
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

// Handle gradient selection from the ColorScrollPicker
const handleGradientSelection = (gradientId: string) => {
  selectGradient(gradientId);
};
</script>
