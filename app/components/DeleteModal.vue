<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box rounded-3xl p-6 flex flex-col gap-y-8 text-center">
      <header class="flex flex-col justify-center items-center space-y-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#ff3f33"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"
          />
        </svg>
        <p
          class="text-base-content font-bold font-poppins text-2xl leading-6 text-center"
        >
          <span class="text-primary">{{ title }}</span>
          will be deleted permanently.
        </p>
      </header>
      <p class="text-base-content font-poppins text-base leading-4">
        All inserted data for this flipbook will be lost. Are you sure you want
        to delete it?
      </p>
      <div class="modal-action mt-0 justify-start w-full">
        <form method="dialog" class="w-full">
          <div class="flex flex-col-reverse md:flex-row gap-2.5 w-full">
            <ActionButton
              type="secondary"
              text="Cancel"
              @click="closeModal"
              class="w-full md:w-1/2"
            />
            <ActionButton
              type="confirmation"
              text="Delete"
              @click="confirmDelete"
              class="w-full md:w-1/2"
            />
          </div>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const modal = ref<HTMLDialogElement>();

const openModal = () => {
  modal.value?.showModal();
};

const closeModal = () => {
  modal.value?.close();
  emit("cancel");
};

const confirmDelete = () => {
  modal.value?.close();
  emit("confirm");
};

// Expose methods for parent component
defineExpose({
  openModal,
  closeModal,
});
</script>
