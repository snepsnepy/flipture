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
const userMetadata = user.value?.user_metadata;

const userFullName = computed(() => {
  return `${userMetadata?.firstName} ${userMetadata?.lastName}`;
});
onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      return navigateTo("/login");
    }
  });
});
</script>
