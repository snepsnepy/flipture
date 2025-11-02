<template>
  <div class="flex flex-col gap-8">
    <div class="text-center space-y-2">
      <h4 class="font-delight font-semibold text-2xl leading-6">
        Design Options
      </h4>
      <p class="font-delight text-neutral text-sm md:text-base">
        Customize the design and appearance of your flipbook
      </p>
    </div>

    <!-- Info Section -->
    <div class="bg-primary/10 rounded-3xl flex items-center gap-4">
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
      <p class="text-sm leading-base text-primary font-poppins pr-2">
        <span class="font-delight font-semibold">Flipture Branded Cover</span>
        uses our branding, while the other options use the
        <span class="font-semibold font-delight">first</span> or
        <span class="font-semibold font-delight">last</span> pages from your
        uploaded PDF file as covers.
      </p>
    </div>

    <!-- Cover Options Section -->
    <section class="space-y-4">
      <p class="text-xl leading-4 font-delight text-base-content">
        Choose the cover option for your flipbook
      </p>
      <fieldset class="p-0 flex flex-col gap-2 max-w-full min-w-0">
        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-3">
            <input
              type="radio"
              name="cover-option"
              class="radio border-base-content checked:text-blue-600 checked:border-base-content"
              value="default"
              v-model="localFormData.coverOption"
              @change="updateFormData"
            />
            <span
              class="label-text font-poppins text-base-content text-sm md:text-base md:leading-4"
            >
              Flipture Branded Cover
            </span>
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-3">
            <input
              type="radio"
              name="cover-option"
              class="radio border-base-content checked:text-blue-600 checked:border-base-content"
              value="first-page"
              v-model="localFormData.coverOption"
              @change="updateFormData"
            />
            <span
              class="label-text font-poppins text-base-content text-sm md:text-base md:leading-4"
            >
              First Page as Cover
            </span>
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-3">
            <input
              type="radio"
              name="cover-option"
              class="radio border-base-content checked:text-blue-600 checked:border-base-content"
              value="first-last-page"
              v-model="localFormData.coverOption"
              @change="updateFormData"
            />
            <span
              class="label-text font-poppins text-base-content text-sm md:text-base md:leading-4"
            >
              First and Last Pages as Covers
            </span>
          </label>
        </div>
      </fieldset>
      <div class="p-3 bg-warning-content/20 rounded-2xl border border-warning">
        <p class="text-sm leading-4 font-poppins text-warning">
          <span class="font-semibold">Note:</span> Cover options can be modified
          later in the flipbook settings page.
        </p>
      </div>
    </section>

    <section class="space-y-4">
      <p class="text-xl leading-4 font-delight text-base-content">
        Choose the background gradient for your flipbook
      </p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="gradient in backgroundGradients"
          :key="gradient.id"
          class="flex flex-col items-center gap-2 cursor-pointer group"
          @click="selectGradient(gradient.id)"
        >
          <div
            class="w-20 h-20 rounded-full border-2 transition-all duration-200"
            :class="[
              localFormData.backgroundGradient === gradient.id
                ? 'border-primary ring-2 ring-primary ring-offset-2 scale-105'
                : 'border-base-content/50 group-hover:border-base-content',
              gradient.gradient,
            ]"
          ></div>
          <span
            class="text-xs md:text-sm font-poppins text-center text-base-content"
            :class="[
              localFormData.backgroundGradient === gradient.id
                ? 'font-semibold text-primary'
                : '',
            ]"
          >
            {{ gradient.name }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FlipbookFormData } from "~/types";
import { useFlipbookStore } from "~/stores/useFlipbookStore";

const props = defineProps<{
  formData: FlipbookFormData;
}>();

const flipbookStore = useFlipbookStore();

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

const selectGradient = (gradientId: string) => {
  localFormData.value.backgroundGradient = gradientId;
  updateFormData();
};

// Background gradient options
interface GradientOption {
  id: string;
  name: string;
  gradient: string;
}

const backgroundGradients: GradientOption[] = [
  // Row 1
  {
    id: "deep-white",
    name: "Deep White",
    gradient: "bg-gradient-to-br from-[#FFFFFF] to-[#F0F0F0]",
  },
  {
    id: "deep-black",
    name: "Deep Black",
    gradient: "bg-gradient-to-br from-[#000000] to-[#212121]",
  },
  {
    id: "royal-blue",
    name: "Royal Blue",
    gradient: "bg-gradient-to-br from-[#091E3A] via-[#2F80ED] to-[#2D9EE0]",
  },
  {
    id: "purple-dream",
    name: "Purple Dream",
    gradient: "bg-gradient-to-br from-[#9400D3] to-[#4B0082]",
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    gradient: "bg-gradient-to-br from-[#E65C00] to-[#F9D423]",
  },
  {
    id: "fire-red",
    name: "Fire Red",
    gradient: "bg-gradient-to-br from-[#E52D27] to-[#B31217]",
  },
  {
    id: "spring-green",
    name: "Spring Green",
    gradient: "bg-gradient-to-br from-[#ADD100] to-[#7B920A]",
  },
  {
    id: "arctic-blue",
    name: "Arctic Blue",
    gradient: "bg-gradient-to-br from-[#00F5FF] via-[#00CED1] to-[#20B2AA]",
  },
];
</script>
