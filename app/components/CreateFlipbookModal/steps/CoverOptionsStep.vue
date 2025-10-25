<template>
  <div class="flex flex-col gap-6 p-6">
    <div class="text-center mb-6">
      <h4 class="font-poppins font-bold text-2xl mb-2">Cover Options</h4>
      <p class="font-poppins text-base-content/70">
        Choose how you want your flipbook cover to look
      </p>
    </div>

    <fieldset class="fieldset p-0">
      <legend
        class="fieldset-legend pb-4 !pt-0 font-poppins text-base leading-4 text-base-content"
      >
        Cover Options
      </legend>
      <div class="flex flex-col gap-3">
        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-3">
            <input
              type="radio"
              name="cover-option"
              class="radio radio-primary"
              value="default"
              v-model="localFormData.coverOption"
              @change="updateFormData"
            />
            <span class="label-text font-poppins text-base">
              Use default Flipture cover
            </span>
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-3">
            <input
              type="radio"
              name="cover-option"
              class="radio radio-primary"
              value="first-page"
              v-model="localFormData.coverOption"
              @change="updateFormData"
            />
            <span class="label-text font-poppins text-base">
              Use first page of PDF as cover
            </span>
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-3">
            <input
              type="radio"
              name="cover-option"
              class="radio radio-primary"
              value="first-last-page"
              v-model="localFormData.coverOption"
              @change="updateFormData"
            />
            <span class="label-text font-poppins text-base">
              Use first page as cover and last page as back cover
            </span>
          </label>
        </div>
        <div class="mt-2 p-3 bg-base-200 rounded-lg border border-base-300">
          <p class="text-sm font-poppins text-base-content/70">
            <span class="font-semibold">Note:</span> This setting can be
            modified later in the flipbook settings.
          </p>
        </div>
      </div>
    </fieldset>

    <!-- Summary -->
    <div class="mt-8 p-4 bg-base-200 rounded-lg">
      <h5 class="font-poppins font-semibold text-lg mb-3">Summary</h5>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-base-content/70">File:</span>
          <span class="font-medium">{{
            formData.file?.name || "No file selected"
          }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-base-content/70">Title:</span>
          <span class="font-medium">{{
            formData.title || "Not specified"
          }}</span>
        </div>
        <div v-if="formData.company" class="flex justify-between">
          <span class="text-base-content/70">Company:</span>
          <span class="font-medium">{{ formData.company }}</span>
        </div>
        <div v-if="formData.description" class="flex justify-between">
          <span class="text-base-content/70">Description:</span>
          <span class="font-medium">{{ formData.description }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-base-content/70">Cover Option:</span>
          <span class="font-medium">
            {{ getCoverOptionText(formData.coverOption) }}
          </span>
        </div>
      </div>
    </div>
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
      return "Default Flipture cover";
    case "first-page":
      return "First page as cover";
    case "first-last-page":
      return "First and last page as covers";
    default:
      return "Default Flipture cover";
  }
};
</script>
