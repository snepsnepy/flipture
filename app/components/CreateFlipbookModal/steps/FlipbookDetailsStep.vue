<template>
  <div class="flex flex-col gap-6">
    <div class="text-center space-y-2">
      <h4 class="font-delight font-semibold text-2xl leading-6">
        Flipbook Details
      </h4>
      <p class="font-delight text-neutral text-sm md:text-base">
        Provide information about your flipbook
      </p>
    </div>

    <div class="flex flex-col gap-4 md:gap-6">
      <!-- Title -->
      <fieldset class="fieldset p-0">
        <legend
          class="fieldset-legend pb-2 md:pb-4 !pt-0 font-poppins text-sm md:text-base md:leading-4 text-base-content"
        >
          <p>Flipbook Title <span class="text-error">*</span></p>
        </legend>
        <label
          class="input validator border-2 bg-base-100 h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content"
        >
          <input
            name="title"
            type="text"
            placeholder="Enter flipbook title"
            class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
            v-model="title"
          />
        </label>
        <span
          class="text-error text-xs leading-3 font-poppins"
          v-if="titleError"
        >
          {{ titleError }}
        </span>
      </fieldset>

      <!-- Company Name -->
      <fieldset class="fieldset p-0">
        <legend
          class="fieldset-legend pb-2 md:pb-4 !pt-0 font-poppins text-sm md:text-base md:leading-4 text-base-content flex justify-between items-center w-full"
        >
          <p>Company Name</p>
          <span class="text-primary text-xs">Optional</span>
        </legend>
        <label
          class="input validator border-2 bg-base-100 rounded-2xl h-14 !outline-none !shadow-none w-full border-base-content"
        >
          <input
            name="company"
            type="text"
            placeholder="Enter company name"
            class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
            v-model="company"
          />
        </label>
        <span
          class="text-error text-xs leading-3 font-poppins"
          v-if="companyError"
        >
          {{ companyError }}
        </span>
      </fieldset>

      <!-- Description -->
      <fieldset class="fieldset p-0">
        <legend
          class="fieldset-legend pb-2 md:pb-4 !pt-0 font-poppins text-sm md:text-base md:leading-4 text-base-content flex justify-between items-center w-full"
        >
          <p>Description</p>
          <span class="text-primary text-xs">Optional</span>
        </legend>
        <textarea
          class="textarea px-4 h-24 w-full font-poppins rounded-2xl text-xl leading-4 placeholder:text-xl !border-2 border-base-content focus:outline-none focus:border-base-content"
          placeholder="Type a short description"
          name="description"
          v-model="description"
        ></textarea>
        <span
          class="text-error text-xs leading-3 font-poppins"
          v-if="descriptionError"
        >
          {{ descriptionError }}
        </span>
      </fieldset>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { createFlipbookFormSchema } from "~~/schema/form.schema";
import type { FlipbookFormData } from "~/types";
import { useFlipbookStore } from "~/stores/useFlipbookStore";

const props = defineProps<{
  formData: FlipbookFormData;
}>();

const flipbookStore = useFlipbookStore();

// Initialize form with validation schema
const validationSchema = createFlipbookFormSchema();

useForm({
  validationSchema,
  initialValues: {
    title: props.formData.title,
    company: props.formData.company,
    description: props.formData.description,
  },
});

// Individual field validation
const { value: title, errorMessage: titleError } = useField<string>("title");
const { value: company, errorMessage: companyError } =
  useField<string>("company");
const { value: description, errorMessage: descriptionError } =
  useField<string>("description");

// Watch for prop changes and update form values
watch(
  () => props.formData,
  (newData) => {
    // Update form values
    title.value = newData.title;
    company.value = newData.company;
    description.value = newData.description;
  },
  { deep: true }
);

// Watch for vee-validate field changes and update store
watch(
  [title, company, description],
  () => {
    flipbookStore.updateFormData({
      title: title.value,
      company: company.value,
      description: description.value,
    });
  },
  { deep: true }
);
</script>
