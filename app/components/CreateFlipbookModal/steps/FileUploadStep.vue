<template>
  <div class="flex flex-col items-center justify-center gap-y-6">
    <div class="text-center space-y-2">
      <h4 class="font-delight font-semibold text-2xl leading-6">
        Upload Your PDF
      </h4>
      <p class="font-delight text-neutral text-sm md:text-base">
        Select the PDF file you want to convert into a flipbook
      </p>
    </div>

    <FileInput
      :initial-file="flipbookStore.formData.file"
      @uploadSuccess="handleUploadSuccess"
      @uploadError="handleUploadError"
      @uploadStarted="handleFileUpload"
      @fileCleared="handleFileCleared"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import type { FlipbookFormData } from "~/types";
import { useFlipbookStore } from "~/stores/useFlipbookStore";

const props = defineProps<{
  formData: FlipbookFormData;
}>();

const flipbookStore = useFlipbookStore();

const handleFileUpload = (file: File) => {
  flipbookStore.updateFormData({ file });
};

const handleUploadSuccess = () => {
  // File upload successful
};

const handleUploadError = (error: string) => {
  console.error("Upload error:", error);
  flipbookStore.updateFormData({ file: null });
};

const handleFileCleared = () => {
  flipbookStore.updateFormData({ file: null });
};
</script>
