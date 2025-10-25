<template>
  <div class="flex flex-col items-center justify-center min-h-[400px] p-6">
    <div class="text-center mb-8">
      <h4 class="font-poppins font-bold text-2xl mb-2">Upload Your PDF</h4>
      <p class="font-poppins text-base-content/70">
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
