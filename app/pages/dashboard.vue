<template>
  <section class="container mx-auto py-0 flex flex-col gap-6 md:gap-8">
    <header class="flex flex-col xl:flex-row gap-6 xl:h-80">
      <!-- Hero -->
      <DashboardHero v-if="!hasFlipbooks" />

      <!-- User Details -->
      <DashboardUserDetails
        :hasFlipbooks="hasFlipbooks"
        :flipbooksLength="flipbooksLength!"
      />
    </header>

    <!-- Content -->
    <div class="flex flex-col gap-6">
      <header class="space-y-2 md:space-y-4">
        <div class="flex flex-row justify-between items-center">
          <h4
            class="font-poppins font-bold text-2xl leading-6 md:text-[32px] md:leading-8"
          >
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

      <!-- Content -->
      <section
        v-if="hasFlipbooks"
        v-for="(flipbook, index) in flipbooks"
        :key="index"
      >
        <DashboardFlipbook :flipbook="flipbook" />
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
</script>
