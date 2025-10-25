<template>
  <section class="flex flex-col gap-6 md:gap-10">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <!-- First Name and Last Name -->
        <div class="flex flex-col md:flex-row gap-4 w-full">
          <!-- Fisrt Name -->
          <fieldset class="fieldset p-0 w-full">
            <legend
              class="fieldset-legend pb-4 !pt-0 font-poppins text-base leading-4 text-base-content"
            >
              Flipbook Title
            </legend>
            <label
              class="input validator border-2 bg-base-100 h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content"
            >
              <input
                name="title"
                type="text"
                placeholder="Flipbook Title"
                class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
                v-model="title"
              />
            </label>
            <span
              class="text-error text-xs leading-3 font-poppins"
              v-if="titleErrors"
            >
              {{ titleErrors }}
            </span>
          </fieldset>

          <!-- LastName -->
          <fieldset class="fieldset p-0 w-full">
            <legend
              class="fieldset-legend pb-4 !pt-0 font-poppins text-base leading-4 text-base-content"
            >
              Company Name
            </legend>
            <label
              class="input validator border-2 bg-base-100 rounded-2xl h-14 !outline-none !shadow-none w-full border-base-content"
            >
              <input
                name="company"
                type="text"
                placeholder="Company Name"
                class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
                v-model="company"
              />
            </label>
            <span
              class="text-error text-xs leading-3 font-poppins"
              v-if="companyErrors"
            >
              {{ companyErrors }}
            </span>
            <div class="label text-primary font-poppins">Optional</div>
          </fieldset>
        </div>

        <fieldset class="fieldset p-0">
          <legend
            class="fieldset-legend pb-4 !pt-0 font-poppins text-base leading-4 text-base-content"
          >
            Description
          </legend>
          <textarea
            class="textarea px-4 h-24 w-full font-poppins rounded-2xl text-xl leading-4 placeholder:text-xl !border-2 border-base-content focus:outline-none focus:border-base-content"
            placeholder="Type a short description"
            name="description"
            v-model="description"
          ></textarea>
          <span
            class="text-error text-xs leading-3 font-poppins"
            v-if="descriptionErrors"
          >
            {{ descriptionErrors }}
          </span>
          <div class="label text-primary font-poppins">Optional</div>
        </fieldset>

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
                  value="first-page"
                  v-model="coverOption"
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
                  v-model="coverOption"
                />
                <span class="label-text font-poppins text-base">
                  Use first page as cover and last page as back cover
                </span>
              </label>
            </div>
            <div class="mt-2 p-3 bg-base-200 rounded-lg border border-base-300">
              <p class="text-sm font-poppins text-base-content/70">
                <span class="font-semibold">Default:</span> A standard Flipture
                cover will be used if no option is selected.
              </p>
            </div>
          </div>
          <div class="label text-primary font-poppins">Optional</div>
        </fieldset>
      </div>
    </div>
    <FileInput
      @uploadSuccess="handleUploadSuccess"
      @uploadError="handleUploadError"
      @uploadStarted="handleFileUpload"
      @fileCleared="clearFile"
    />

    <button
      type="button"
      @click="createFlipbook"
      :disabled="isButtonDisabled"
      class="w-full py-3 md:py-4 md:px-10 rounded-3xl font-poppins font-bold border-2 border-base-content text-base md:text-lg transition-all duration-300 bg-secondary text-base-content hover:cursor-pointer hover:bg-primary-content hover:border-2 hover:border-base-content hover:text-base-content disabled:pointer-events-none disabled:bg-secondary-content disabled:text-base-content/50"
    >
      Create Flipbook
      <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
    </button>
  </section>
</template>

<script setup lang="ts">
import { createFlipbookFormSchema } from "~~/schema/form.schema";
import { useForm, useField } from "vee-validate";
import { useCreateFlipbook } from "~/composables/useCreateFlipbook";

const { createFlipbook: createFlipbookFn, isLoading } = useCreateFlipbook();
const validationSchema = createFlipbookFormSchema();

const user = useSupabaseUser();

// File upload state
const selectedFile = ref<File | null>(null);
const uploadError = ref<string | null>(null);
const uploadSuccess = ref(false);

// Cover option state
const coverOption = ref<string | null>(null);

const { errors } = useForm({
  validationSchema,
});

const { value: title, errorMessage: titleErrors } = useField<string>("title");
const { value: company, errorMessage: companyErrors } =
  useField<string>("company");
const { value: description, errorMessage: descriptionErrors } =
  useField<string>("description");

const isButtonDisabled = computed(() => !isFormValid.value || isLoading.value);

const isFormValid = computed(() => {
  return (
    Object.keys(errors.value).length === 0 && title.value && selectedFile.value
  );
});

// File upload methods
const handleFileUpload = (file: File) => {
  selectedFile.value = file;
  uploadError.value = null;
  uploadSuccess.value = false;
};

const handleUploadError = (error: string) => {
  uploadError.value = error;
  selectedFile.value = null;
  uploadSuccess.value = false;
};

const handleUploadSuccess = () => {
  uploadSuccess.value = true;
  uploadError.value = null;
};

const clearFile = () => {
  selectedFile.value = null;
  uploadError.value = null;
  uploadSuccess.value = false;
};

const createFlipbook = async () => {
  if (!selectedFile.value || !user.value) {
    console.error("No file selected or user not authenticated");
    return;
  }

  const result = await createFlipbookFn({
    file: selectedFile.value,
    title: title.value,
    company: company.value,
    description: description.value,
    coverOption: coverOption.value,
  });

  if (result.success) {
    // Success - navigate to dashboard
    await navigateTo("/dashboard");
  } else {
    uploadError.value = result.error || "Unknown error occurred";
  }
};
</script>
