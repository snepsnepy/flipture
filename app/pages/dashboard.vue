<template>
  <section class="container mx-auto">
    <h1 class="text-base-content text-xl leading-5 font-bold font-poppins">
      Welcome back, {{ userFullName }}
    </h1>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "base",
  middleware: "auth",
});

const user = useSupabaseUser();

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
