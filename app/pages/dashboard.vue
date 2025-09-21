<template>
  <section class="container mx-auto space-y-6">
    <h1 class="text-base-content text-xl leading-5 font-bold font-poppins">
      Welcome back, {{ userFullName }}
    </h1>

    <!-- Content -->
    <div class="bg-base-200 border-base-300 border rounded-3xl p-8 md:w-1/2">
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
const userFullName = computed(() => {
  const appMetadata = user.value?.app_metadata;
  const userMetadata = user.value?.user_metadata;

  if (appMetadata?.provider === "google") {
    return userMetadata?.full_name;
  } else {
    return `${userMetadata?.firstName} ${userMetadata?.lastName}`;
  }
});

onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      return navigateTo("/login");
    }
  });
});
</script>
