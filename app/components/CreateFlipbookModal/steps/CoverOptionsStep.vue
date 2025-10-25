<template>
  <div class="flex flex-col gap-8">
    <div class="text-center space-y-2">
      <h4 class="font-poppins font-bold text-2xl leading-6">Cover Options</h4>
      <p class="font-poppins text-neutral">
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
              class="radio border-base-content checked:text-blue-600 checked:border-base-content"
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
              class="radio border-base-content checked:text-blue-600 checked:border-base-content"
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
              class="radio border-base-content checked:text-blue-600 checked:border-base-content"
              value="first-last-page"
              v-model="localFormData.coverOption"
              @change="updateFormData"
            />
            <span class="label-text font-poppins text-base">
              Use first page as cover and last page as back cover
            </span>
          </label>
        </div>
        <div class="mt-2 p-3 bg-warning/10 rounded-lg border border-warning">
          <p class="text-sm leading-4 font-poppins text-warning">
            <span class="font-semibold">Note:</span> This setting can be
            modified later in the flipbook settings.
          </p>
        </div>
      </div>
    </fieldset>

    <!-- Summary -->
    <div class="p-4 bg-base-200 rounded-lg flex flex-col gap-y-4">
      <h5 class="font-poppins font-semibold text-lg leading-4 mb-3">Summary</h5>
      <div class="space-y-2.5 text-base leading-4">
        <div class="flex justify-between">
          <span class="text-base-content">Uploaded File:</span>
          <span class="font-medium">{{
            formData.file?.name || "No file selected"
          }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-base-content">Flipbook Title:</span>
          <span class="font-medium">{{
            formData.title || "Not specified"
          }}</span>
        </div>
        <div v-if="formData.company" class="flex justify-between">
          <span class="text-base-content">Company Name:</span>
          <span class="font-medium">{{ formData.company }}</span>
        </div>
        <div v-if="formData.description" class="flex justify-between">
          <span class="text-base-content">Flipbook Description:</span>
          <span class="font-medium">{{ formData.description }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-base-content">Flipbook Cover:</span>
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
