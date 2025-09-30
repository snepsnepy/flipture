<template>
  <section class="container mx-auto py-0 flex flex-col gap-6 md:gap-8">
    <header class="flex flex-col xl:flex-row gap-4 xl:h-80">
      <!-- Hero -->
      <DashboardHero :has-flipbooks="true" v-if="!isMobile" />

      <!-- User Details -->
      <DashboardUserDetails
        :hasFlipbooks="hasFlipbooks"
        :flipbooksLength="flipbooksLength!"
      />
    </header>

    <!-- Content -->
    <div class="flex flex-col gap-6">
      <header class="space-y-6">
        <div
          class="flex flex-col md:flex-row justify-between items-start gap-y-2.5 md:items-center"
        >
          <h4
            class="font-poppins font-bold text-2xl leading-6 md:text-4xl md:leading-8"
          >
            Your Flipbooks
          </h4>

          <ActionButton
            v-if="hasFlipbooks"
            text="Create Flipbook"
            class="w-full md:w-fit hover:cursor-pointer"
            @click="navigateToNewFlipbook"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                  />
                  <path
                    fill="#000"
                    d="M11 20a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7z"
                  />
                </g>
              </svg>
            </template>
          </ActionButton>
        </div>
        <HorizontalDivider />
      </header>

      <!-- Content -->
      <section
        class="grid grid-cols-1 xl:grid-cols-2 w-full gap-4"
        v-if="hasFlipbooks"
      >
        <DashboardFlipbook
          v-for="(flipbook, index) in flipbooks"
          :key="index"
          :flipbook="flipbook"
        />
      </section>

      <!-- No Flipbooks -->
      <DashboardNoItems v-else />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Flipbook } from "~/types";

definePageMeta({
  layout: "base",
  middleware: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const hasFlipbooks = ref(false);
const flipbooksLength = ref(0);
const flipbooks = ref<Flipbook[]>([]);
const { isMobile } = useIsMobile();

onMounted(async () => {
  watchEffect(() => {
    if (!user.value) {
      return navigateTo("/login");
    }
  });

  const { data: flipbooksData } = await client
    .from("flipbooks")
    .select("*")
    .eq("user_id", user.value?.id!);

  flipbooks.value = flipbooksData || [];
  flipbooksLength.value = flipbooks.value.length;
  hasFlipbooks.value = flipbooksLength.value > 0;
});

const navigateToNewFlipbook = () => {
  return navigateTo({ name: "new-flipbook" });
};
</script>
