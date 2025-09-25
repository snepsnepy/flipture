<template>
  <section class="container mx-auto py-0 flex flex-col gap-10">
    <header class="flex flex-col xl:flex-row gap-8 xl:h-80">
      <!-- Hero -->
      <DashboardHero />

      <!-- User Details -->
      <DashboardUserDetails />
    </header>

    <!-- Content -->
    <div class="flex flex-col gap-6">
      <header class="space-y-4">
        <div class="flex flex-row justify-between items-center">
          <h4 class="font-poppins font-bold text-[32px] leading-8">
            Your Flipbooks
          </h4>

          <button
            v-if="hasFlipbooks"
            ref="createFlipbookButtonRef"
            type="button"
            class="w-fit flex gap-4 py-2 hover:bg-base-200 px-4 pr-3 text-center border border-base-content justify-center items-center bg-primary-content rounded-full transition-all duration-300 text-base-content hover:cursor-pointer hover:border hover:border-base-content hover:text-primary font-poppins font-bold text-base leading-4 disabled:opacity-50 disabled:pointer-events-none"
            role="menuitem"
          >
            Create Flipbook
            <span class="bg-primary rounded-full p-2"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="#fff"
                  stroke-dasharray="16"
                  stroke-dashoffset="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M5 12h14">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.4s"
                      values="16;0"
                    />
                  </path>
                  <path d="M12 5v14">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.4s"
                      dur="0.4s"
                      values="16;0"
                    />
                  </path>
                </g>
              </svg>
            </span>
          </button>
        </div>
        <HorizontalDivider />
      </header>

      <FileInput
        v-if="hasFlipbooks"
        @upload-success="handleUploadSuccess"
        @upload-error="handleUploadError"
        @upload-started="handleUploadStarted"
        @file-cleared="handleFileCleared"
      />

      <!-- No Flipbooks -->
      <DashboardNoItems />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useElementHover } from "@vueuse/core";
import { useTemplateRef } from "vue";

definePageMeta({
  layout: "base",
  middleware: "auth",
});

const user = useSupabaseUser();

const buttonRef = useTemplateRef<HTMLElement>("createFlipbookButtonRef");
const isHovered = useElementHover(buttonRef);

const hasFlipbooks = ref(false);

// Event handlers for FileInput component
const handleUploadStarted = (file: File) => {
  console.log("Upload started for:", file.name);
};

const handleUploadSuccess = (fileName: string) => {
  console.log("Upload successful! File saved as:", fileName);
  // You can add any post-upload logic here
};

const handleUploadError = (error: string, fileName?: string) => {
  console.error("Upload error:", error, fileName);
  // You can add error handling logic here
};

const handleFileCleared = () => {
  console.log("File cleared");
  // You can add cleanup logic here if needed
};

onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      return navigateTo("/login");
    }
  });
});
</script>
