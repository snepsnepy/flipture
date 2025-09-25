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
      <div class="space-y-4">
        <h4 class="font-poppins font-bold text-[32px] leading-8">
          Your Flipbooks
        </h4>
        <HorizontalDivider />
      </div>

      <FileInput
        :max-file-size="MAX_FILE_SIZE"
        @upload-success="handleUploadSuccess"
        @upload-error="handleUploadError"
        @upload-started="handleUploadStarted"
        @file-cleared="handleFileCleared"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "base",
  middleware: "auth",
});

const user = useSupabaseUser();

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB (adjust based on your Supabase plan)

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
