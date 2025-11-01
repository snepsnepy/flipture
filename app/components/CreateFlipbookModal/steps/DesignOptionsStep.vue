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
    <section class="space-y-2">
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

      <div class="p-3 bg-warning-content/20 rounded-2xl border border-warning">
        <p class="text-sm leading-4 font-poppins text-warning">
          <span class="font-semibold">Note:</span> Cover options can be modified
          later in the flipbook settings page.
        </p>
      </div>
    </section>

    <!-- Cover Options Section -->
    <section class="space-y-4">
      <p class="text-lg leading-4 font-poppins text-base-content">
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
              class="label-text font-poppins text-sm md:text-base md:leading-4"
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
              class="label-text font-poppins text-sm md:text-base md:leading-4"
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
              class="label-text font-poppins text-sm md:text-base md:leading-4"
            >
              First and Last Pages as Covers
            </span>
          </label>
        </div>
      </fieldset>
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
const localFormData = ref({
  coverOption: props.formData.coverOption,
});

// Watch for prop changes
watch(
  () => props.formData.coverOption,
  (newValue) => {
    localFormData.value.coverOption = newValue;
  }
);

const updateFormData = () => {
  flipbookStore.updateFormData({
    coverOption: localFormData.value.coverOption,
  });
};

const getCoverOptionText = (option: string | null) => {
  switch (option) {
    case "default":
      return "Flipture Branded Cover";
    case "first-page":
      return "PDF Cover Only (Front)";
    case "first-last-page":
      return "PDF Cover + Back Cover";
    default:
      return "Flipture Branded Cover";
  }
};
</script>
