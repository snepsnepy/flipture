<template>
  <div class="flex flex-col gap-6">
    <!-- Custom File Drop Zone -->
    <div
      class="relative border-2 border-dashed border-primary rounded-lg p-8 text-center bg-base-200 hover:bg-primary/5 transition-all duration-300"
      :class="{
        'border-primary bg-primary/5': isDragOver,
        'opacity-50 pointer-events-none': selectedFile || uploadError,
      }"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="handleFileDrop"
    >
      <input
        ref="fileInput"
        type="file"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        @change="handleFileChange"
        accept=".pdf"
      />

      <div class="space-y-4">
        <svg
          class="mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 32 32"
        >
          <path
            fill="#ef5350"
            d="M28.967 12H9.442a2 2 0 0 0-1.898 1.368L4 24V10h24a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22l4.805-11.212A2 2 0 0 0 28.967 12"
          />
          <path
            fill="#ffcdd2"
            d="M22.433 17.937a14.7 14.7 0 0 1-1.015 2.407a9 9 0 0 0-.494 1.036l.109-.041a18.3 18.3 0 0 1 3.342-.924q-.218-.151-.42-.324a6.25 6.25 0 0 1-1.522-2.154m6.474 3.812a1.14 1.14 0 0 1-.9.299a7.2 7.2 0 0 1-2.985-.739a20 20 0 0 0-4.047.75l-.184.07c-1.243 2.123-2.162 3.07-2.974 3.07a1 1 0 0 1-.44-.104l-.48-.315l-.023-.053a.83.83 0 0 1-.053-.538a3.8 3.8 0 0 1 1.883-2.118a5.5 5.5 0 0 1 .89-.49c.296-.522.616-1.128.952-1.804a17.3 17.3 0 0 0 1.087-2.924l-.005-.012a4.94 4.94 0 0 1-.219-3.265c.11-.386.42-.776.794-.776h.237a.85.85 0 0 1 .608.246c.659.659.357 2.267.022 3.595l-.035.141a5.8 5.8 0 0 0 1.596 2.556a8 8 0 0 0 .862.586a12 12 0 0 1 1.298-.074c1.24 0 1.986.224 2.277.686a.8.8 0 0 1 .124.551a.96.96 0 0 1-.285.662M30 10H16a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2m-1.486 11.043c-.112-.106-.522-.356-1.918-.356a.26.26 0 0 0-.23.1a5.4 5.4 0 0 0 1.902.512a1.3 1.3 0 0 0 .196-.015l.034-.006c.048-.014.08-.03.09-.13a1 1 0 0 0-.074-.105m-9.185 1.455a4 4 0 0 0-.475.314a3.66 3.66 0 0 0-1.215 1.692c.455-.156 1.043-.812 1.692-2.006Zm3.016-6.906l.056-.037c.073-.323.12-.601.16-.823l.03-.162c.096-.541.085-.853-.098-1.096l-.147-.05a1 1 0 0 0-.067.118a3.65 3.65 0 0 0 .067 2.05Z"
          />
        </svg>

        <div class="space-y-2">
          <div
            v-if="isUploading"
            class="text-lg leading-[18px] font-medium text-base-content font-poppins"
          >
            Uploading your file...
          </div>
          <div
            v-else-if="selectedFile && uploadSuccess"
            class="text-lg leading-[18px] font-medium text-base-content font-poppins"
          >
            File uploaded successfully!
          </div>
          <div
            v-else
            class="text-lg leading-[18px] font-medium text-base-content font-poppins"
          >
            Drop your file(s) here, or
            <span class="text-primary cursor-pointer">Browse</span>
          </div>

          <p class="text-sm leading-[14px] font-poppins text-base-content/50">
            PDF files only, max {{ formatFileSize(MAX_FILE_SIZE) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Success State -->
    <div v-if="selectedFile">
      <div class="flex flex-row gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 16 16"
        >
          <path
            fill="none"
            stroke="#ed8796"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.8 14.34c1.81-1.25 3.02-3.16 3.91-5.5c.9-2.33 1.86-4.33 1.44-6.63c-.06-.36-.57-.73-.83-.7c-1.02.06-.95 1.21-.85 1.9c.24 1.71 1.56 3.7 2.84 5.56c1.27 1.87 2.32 2.16 3.78 2.26c.5.03 1.25-.14 1.37-.58c.77-2.8-9.02-.54-12.28 2.08c-.4.33-.86 1-.6 1.46c.2.36.87.4 1.23.15h0Z"
            stroke-width="1"
          />
        </svg>

        <section class="flex justify-between w-full items-center">
          <div class="flex flex-col gap-1">
            <span class="font-semibold text-base leading-4 font-poppins">{{
              selectedFile.name
            }}</span>

            <div class="flex flex-row gap-2">
              <span class="text-base-content/50 font-medium font-poppins">{{
                formatFileSize(selectedFile.size)
              }}</span>
              <span class="font-semibold text-success font-poppins">
                Success
              </span>
            </div>
          </div>

          <section class="flex gap-1 items-center" @click="clearFile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="#5CB338"
                fill-rule="evenodd"
                d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                clip-rule="evenodd"
              />
            </svg>

            <!-- Cancel File Button -->
            <button
              class="btn border-none shadow-none bg-neutral hover:bg-neutral/50 w-fit rounded-full px-1 h-fit py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M18 6L6 18m12 0L6 6"
                />
              </svg>
            </button>
          </section>
        </section>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="uploadError" class="flex flex-row gap-2 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 16 16"
      >
        <path
          fill="none"
          stroke="#ed8796"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.8 14.34c1.81-1.25 3.02-3.16 3.91-5.5c.9-2.33 1.86-4.33 1.44-6.63c-.06-.36-.57-.73-.83-.7c-1.02.06-.95 1.21-.85 1.9c.24 1.71 1.56 3.7 2.84 5.56c1.27 1.87 2.32 2.16 3.78 2.26c.5.03 1.25-.14 1.37-.58c.77-2.8-9.02-.54-12.28 2.08c-.4.33-.86 1-.6 1.46c.2.36.87.4 1.23.15h0Z"
          stroke-width="1"
        />
      </svg>

      <section class="flex justify-between w-full items-center">
        <div class="flex flex-col gap-2">
          <span class="font-semibold text-base leading-4 font-poppins">{{
            fileName
          }}</span>

          <span
            class="font-semibold text-error text-sm leading-[14px] font-poppins"
            >{{ uploadError }}</span
          >
        </div>

        <section class="flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ff3f33"
              fill-rule="evenodd"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-.763-15.864l.11 7.596h1.305l.11-7.596zm.759 10.967c.512 0 .902-.383.902-.882c0-.5-.39-.882-.902-.882a.88.88 0 0 0-.896.882c0 .499.396.882.896.882"
            />
          </svg>
          <button
            @click="clearFile"
            class="btn border-none shadow-none bg-neutral hover:bg-neutral/50 w-fit rounded-full px-1 h-fit py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M18 6L6 18m12 0L6 6"
              />
            </svg>
          </button>
        </section>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FileInputEvents {
  uploadSuccess: [fileName: string];
  uploadError: [error: string, fileName?: string];
  uploadStarted: [file: File];
  fileCleared: [];
}

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB (adjust based on your Supabase plan)

const emit = defineEmits<FileInputEvents>();

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const selectedFile = ref<File | null>(null);
const uploadError = ref<string | null>(null);
const isUploading = ref(false);
const uploadSuccess = ref(false);
const isDragOver = ref(false);
const fileInput = ref<HTMLInputElement>();
const fileName = ref<string>();

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    processFile(file);
  }
};

const handleFileDrop = (event: DragEvent) => {
  isDragOver.value = false;
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    processFile(files[0]!);
  }
};

const processFile = (file: File) => {
  // Check file type
  if (file.type !== "application/pdf") {
    const error = "Please select a PDF file only.";
    uploadError.value = error;
    fileName.value = file.name;
    selectedFile.value = null;
    uploadSuccess.value = false;
    emit("uploadError", error, file.name);
    return;
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    const error = `File size exceeds ${formatFileSize(
      MAX_FILE_SIZE
    )} limit. Your file is ${formatFileSize(file.size)}.`;
    uploadError.value = error;
    fileName.value = file.name;
    selectedFile.value = null;
    uploadSuccess.value = false;
    emit("uploadError", error, file.name);
    return;
  }

  selectedFile.value = file;
  // Reset previous upload states
  uploadError.value = null;
  fileName.value = undefined;
  uploadSuccess.value = false;
};

const uploadFile = async () => {
  if (!selectedFile.value || !user.value) {
    const error = "No file selected or user not authenticated";
    uploadError.value = error;
    emit("uploadError", error);
    return;
  }

  isUploading.value = true;
  uploadError.value = null;
  uploadSuccess.value = false;
  emit("uploadStarted", selectedFile.value);

  try {
    // Create a unique filename
    const fileExt = selectedFile.value.name.split(".").pop();
    const fileName = `${user.value.id}/${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    // Upload file to Supabase Storage
    const { error } = await supabase.storage
      .from("uploads") // You'll need to create this bucket in Supabase
      .upload(fileName, selectedFile.value, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    uploadSuccess.value = true;
    emit("uploadSuccess", fileName);
  } catch (error: any) {
    const errorMessage = error.message || "An error occurred during upload";
    uploadError.value = errorMessage;
    fileName.value = selectedFile.value?.name;
    selectedFile.value = null;
    uploadSuccess.value = false;
    emit("uploadError", errorMessage, fileName.value);
  } finally {
    isUploading.value = false;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Method to clear the selected file (can be called from parent)
const clearFile = () => {
  selectedFile.value = null;
  uploadError.value = null;
  fileName.value = undefined;
  uploadSuccess.value = false;
  isUploading.value = false;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
  emit("fileCleared");
};

// Expose methods that parent components might need
defineExpose({
  clearFile,
  selectedFile: readonly(selectedFile),
});
</script>
