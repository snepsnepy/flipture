<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box rounded-3xl p-6 flex flex-col gap-y-8">
      <header class="flex flex-col justify-center items-center space-y-4">
        <p
          class="text-base-content font-bold font-poppins text-2xl leading-6 text-center"
        >
          Edit details for <br />
          <span class="text-primary">{{ flipbook.title }}</span>
        </p>
        <p
          class="text-base-content font-poppins text-base leading-4 text-center"
        >
          Update your flipbook details below.
        </p>
      </header>

      <form @submit.prevent="confirmEdit" class="flex flex-col gap-4">
        <!-- Title -->
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

        <!-- Company Name -->
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
          <div class="label text-secondary font-poppins">Optional</div>
        </fieldset>

        <!-- Description -->
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
          <div class="label text-secondary font-poppins">Optional</div>
        </fieldset>
      </form>
      <div class="modal-action mt-0 justify-start w-full">
        <div class="flex flex-col-reverse md:flex-row gap-2.5 w-full">
          <ActionButton
            type="secondary"
            text="Cancel"
            @click="closeModal"
            class="w-full md:w-1/2"
          />
          <ActionButton
            type="primary"
            text="Save Changes"
            class="w-full md:w-1/2"
            @click="confirmEdit"
            :disabled="!isFormValid"
          />
        </div>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import type { Flipbook } from "~/types";
import { createFlipbookFormSchema } from "~~/schema/form.schema";
import { useForm, useField } from "vee-validate";

const props = defineProps<{
  flipbook: Flipbook;
}>();

const emit = defineEmits<{
  confirm: [
    data: {
      title: string;
      company_name: string | null;
      description: string | null;
    }
  ];
  cancel: [];
}>();

const modal = ref<HTMLDialogElement>();
const validationSchema = createFlipbookFormSchema();

const { errors, resetForm } = useForm({
  validationSchema,
});

const { value: title, errorMessage: titleErrors } = useField<string>("title");
const { value: company, errorMessage: companyErrors } =
  useField<string>("company");
const { value: description, errorMessage: descriptionErrors } =
  useField<string>("description");

const isFormValid = computed(() => {
  return Object.keys(errors.value).length === 0 && title.value;
});

const openModal = () => {
  // Reset form data to current flipbook values when opening
  resetForm({
    values: {
      title: props.flipbook.title,
      company: props.flipbook.company_name || "",
      description: props.flipbook.description || "",
    },
  });
  modal.value?.showModal();
};

const closeModal = () => {
  modal.value?.close();
  emit("cancel");
};

const confirmEdit = () => {
  if (!isFormValid.value) {
    return;
  }

  modal.value?.close();
  emit("confirm", {
    title: title.value,
    company_name: company.value?.trim() || null,
    description: description.value?.trim() || null,
  });
};

// Expose methods for parent component
defineExpose({
  openModal,
  closeModal,
});
</script>
