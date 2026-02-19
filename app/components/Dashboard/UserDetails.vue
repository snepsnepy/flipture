<template>
  <!-- User Details Section -->
  <div
    class="collapse bg-base-200 border-2 border-base-content p-2 md:p-4 rounded-3xl h-fit w-full!"
  >
    <input type="checkbox" v-model="checkboxState" />

    <!-- TITLE -->
    <div
      class="collapse-title p-2 md:p-4 flex flex-row items-center justify-between"
    >
      <!-- Header -->
      <header class="flex flex-row md:items-center justify-between gap-4">
        <div class="items-center">
          <h2
            class="text-neutral text-left text-base md:text-base leading-4 font-poppins flex flex-col gap-1"
          >
            <span
              class="text-neutral text-sm leading-[14px] md:text-base md:leading-4"
              >Welcome back,
            </span>
            <div class="flex items-center gap-2 flex-wrap">
              <span
                v-if="!flipbookStore.isSigningOut && userFullName"
                class="text-primary text-2xl leading-6 md:text-4xl md:leading-8 font-delight font-semibold"
                >{{ userFullName }}
              </span>
              <span
                v-else-if="flipbookStore.isSigningOut"
                class="text-primary text-2xl leading-6 md:text-4xl md:leading-8 font-delight font-semibold flex items-center gap-2"
              >
                <span class="loading loading-spinner loading-sm"></span>
                Signing out...
              </span>
              <span
                v-else
                class="text-primary text-2xl leading-6 md:text-4xl md:leading-8 font-delight font-semibold"
              ></span>
            </div>
          </h2>
        </div>
      </header>

      <div class="p-2 bg-base-100 border border-base-content rounded-full">
        <svg
          :class="[
            'w-4 h-4 transition-transform duration-300',
            checkboxState ? 'rotate-180' : 'rotate-0',
          ]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

    <!-- CONTENT -->
    <div
      v-if="checkboxState"
      class="collapse-content flex flex-col justify-between gap-4 p-2 md:p-4 pt-0"
    >
      <HorizontalDivider />

      <section class="flex gap-2 items-center justify-between">
        <h4 class="text-base md:text-lg leading-4 font-poppins font-medium">
          Quick Overview
        </h4>
        <!-- Subscription Badge -->
        <div
          v-if="!flipbookStore.isSigningOut && userFullName"
          class="badge font-medium text-xs md:text-sm font-poppins"
          :class="planBadgeClass"
        >
          {{ planBadgeText }}
        </div>
      </section>

      <!-- Stats -->
      <div class="flex flex-col gap-3 md:gap-4">
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
          <div
            class="bg-base-100 w-full flex flex-col font-poppins p-3 md:p-4 rounded-2xl gap-6 shadow-md"
          >
            <div class="flex flex-row justify-between items-center">
              <h4
                class="text-base-content tracking-wide text-sm whitespace-nowrap font-poppins leading-[14px] font-medium"
              >
                Storage Used
              </h4>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
                    />
                    <path
                      fill="#000"
                      d="M19 4a2 2 0 0 1 1.995 1.85L21 6v4a2 2 0 0 1-1.85 1.995L19 12H5a2 2 0 0 1-1.995-1.85L3 10V6a2 2 0 0 1 1.85-1.995L5 4zm0 2H5v4h14zm-9 1a1 1 0 0 1 .117 1.993L10 9H8a1 1 0 0 1-.117-1.993L8 7zm9 6a2 2 0 0 1 1.995 1.85L21 15v4a2 2 0 0 1-1.85 1.995L19 21H5a2 2 0 0 1-1.995-1.85L3 19v-4a2 2 0 0 1 1.85-1.995L5 13zm0 2H5v4h14zm-9 1a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2z"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <p class="text-sm text-base-content leading-3 font-poppins">
              <span class="font-medium text-primary text-4xl leading-[30px]">{{
                formattedStorageSize.number
              }}</span>
              {{ formattedStorageSize.unit }}
            </p>
          </div>
          <div
            class="bg-base-100 w-full flex flex-col font-poppins p-3 md:p-4 rounded-2xl gap-6 shadow-md"
          >
            <div class="flex flex-row justify-between items-center">
              <h4
                class="text-base-content text-sm whitespace-nowrap leading-[14px] font-medium"
              >
                Flipbooks
              </h4>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                    d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0 1 16 16v288a16 16 0 0 1-16 16c-128 0-177.45 25.81-208 64c-30.37-38-80-64-208-64c-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0 1 16-16c131.57.59 192 32.84 208 96m0 0v288"
                  />
                </svg>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <p
                class="text-sm text-base-content leading-3 font-poppins flex items-center gap-1"
              >
                <span
                  class="font-medium text-4xl leading-[30px]"
                  :class="
                    flipbookLimit !== null && flipbooksLength > flipbookLimit
                      ? 'text-error'
                      : 'text-primary'
                  "
                >
                  {{ flipbooksLength }}
                </span>
                <span class="text-neutral text-lg leading-4">
                  <template v-if="flipbookLimit !== null"
                    >/{{ flipbookLimit }}</template
                  >
                  <div v-else class="flex items-center gap-1">
                    /
                    <Icon
                      name="mynaui:infinity-solid"
                      class="text-neutral"
                      :size="28"
                    />
                  </div>
                </span>
              </p>
              <p class="text-xs leading-3 text-neutral">
                {{
                  flipbookLimit === null
                    ? "Unlimited"
                    : remainingCount && remainingCount > 0
                      ? `${remainingCount} remaining`
                      : "Limit reached"
                }}
              </p>
            </div>
          </div>
        </section>
      </div>

      <nav class="flex flex-col md:flex-row items-center gap-2">
        <ActionButton @click="navigateToSettings" text="Account" class="w-full">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="#000" fill-rule="evenodd" clip-rule="evenodd">
                <path
                  d="M12 8.25a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5M9.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0"
                />
                <path
                  d="M11.975 1.25c-.445 0-.816 0-1.12.02a2.8 2.8 0 0 0-.907.19a2.75 2.75 0 0 0-1.489 1.488c-.145.35-.184.72-.2 1.122a.87.87 0 0 1-.415.731a.87.87 0 0 1-.841-.005c-.356-.188-.696-.339-1.072-.389a2.75 2.75 0 0 0-2.033.545a2.8 2.8 0 0 0-.617.691c-.17.254-.356.575-.578.96l-.025.044c-.223.385-.408.706-.542.98c-.14.286-.25.568-.29.88a2.75 2.75 0 0 0 .544 2.033c.231.301.532.52.872.734a.87.87 0 0 1 .426.726a.87.87 0 0 1-.426.726c-.34.214-.64.433-.872.734a2.75 2.75 0 0 0-.545 2.033c.041.312.15.594.29.88c.135.274.32.595.543.98l.025.044c.222.385.408.706.578.96c.177.263.367.5.617.69a2.75 2.75 0 0 0 2.033.546c.376-.05.716-.2 1.072-.389a.87.87 0 0 1 .84-.005a.86.86 0 0 1 .417.731c.015.402.054.772.2 1.122a2.75 2.75 0 0 0 1.488 1.489c.29.12.59.167.907.188c.304.021.675.021 1.12.021h.05c.445 0 .816 0 1.12-.02c.318-.022.617-.069.907-.19a2.75 2.75 0 0 0 1.489-1.488c.145-.35.184-.72.2-1.122a.87.87 0 0 1 .415-.732a.87.87 0 0 1 .841.006c.356.188.696.339 1.072.388a2.75 2.75 0 0 0 2.033-.544c.25-.192.44-.428.617-.691c.17-.254.356-.575.578-.96l.025-.044c.223-.385.408-.706.542-.98c.14-.286.25-.569.29-.88a2.75 2.75 0 0 0-.544-2.033c-.231-.301-.532-.52-.872-.734a.87.87 0 0 1-.426-.726c0-.278.152-.554.426-.726c.34-.214.64-.433.872-.734a2.75 2.75 0 0 0 .545-2.033a2.8 2.8 0 0 0-.29-.88a18 18 0 0 0-.543-.98l-.025-.044a18 18 0 0 0-.578-.96a2.8 2.8 0 0 0-.617-.69a2.75 2.75 0 0 0-2.033-.546c-.376.05-.716.2-1.072.389a.87.87 0 0 1-.84.005a.87.87 0 0 1-.417-.731c-.015-.402-.054-.772-.2-1.122a2.75 2.75 0 0 0-1.488-1.489c-.29-.12-.59-.167-.907-.188c-.304-.021-.675-.021-1.12-.021zm-1.453 1.595c.077-.032.194-.061.435-.078c.247-.017.567-.017 1.043-.017s.796 0 1.043.017c.241.017.358.046.435.078c.307.127.55.37.677.677c.04.096.073.247.086.604c.03.792.439 1.555 1.165 1.974s1.591.392 2.292.022c.316-.167.463-.214.567-.227a1.25 1.25 0 0 1 .924.247c.066.051.15.138.285.338c.139.206.299.483.537.895s.397.69.506.912c.107.217.14.333.15.416a1.25 1.25 0 0 1-.247.924c-.064.083-.178.187-.48.377c-.672.422-1.128 1.158-1.128 1.996s.456 1.574 1.128 1.996c.302.19.416.294.48.377c.202.263.29.595.247.924c-.01.083-.044.2-.15.416c-.109.223-.268.5-.506.912s-.399.689-.537.895c-.135.2-.219.287-.285.338a1.25 1.25 0 0 1-.924.247c-.104-.013-.25-.06-.567-.227c-.7-.37-1.566-.398-2.292.021s-1.135 1.183-1.165 1.975c-.013.357-.046.508-.086.604a1.25 1.25 0 0 1-.677.677c-.077.032-.194.061-.435.078c-.247.017-.567.017-1.043.017s-.796 0-1.043-.017c-.241-.017-.358-.046-.435-.078a1.25 1.25 0 0 1-.677-.677c-.04-.096-.073-.247-.086-.604c-.03-.792-.439-1.555-1.165-1.974s-1.591-.392-2.292-.022c-.316.167-.463.214-.567.227a1.25 1.25 0 0 1-.924-.247c-.066-.051-.15-.138-.285-.338a17 17 0 0 1-.537-.895c-.238-.412-.397-.69-.506-.912c-.107-.217-.14-.333-.15-.416a1.25 1.25 0 0 1 .247-.924c.064-.083.178-.187.48-.377c.672-.422 1.128-1.158 1.128-1.996s-.456-1.574-1.128-1.996c-.302-.19-.416-.294-.48-.377a1.25 1.25 0 0 1-.247-.924c.01-.083.044-.2.15-.416c.109-.223.268-.5.506-.912s.399-.689.537-.895c.135-.2.219-.287.285-.338a1.25 1.25 0 0 1 .924-.247c.104.013.25.06.567.227c.7.37 1.566.398 2.292-.022c.726-.419 1.135-1.182 1.165-1.974c.013-.357.046-.508.086-.604c.127-.307.37-.55.677-.677"
                />
              </g>
            </svg>
          </template>
        </ActionButton>

        <ActionButton
          @click="navigateToAnalytics"
          text="Analytics"
          class="w-full"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
            >
              <path fill="#000" d="M4 2H2v26a2 2 0 0 0 2 2h26v-2H4Z" />
              <path
                fill="#000"
                d="M30 9h-7v2h3.59L19 18.59l-4.29-4.3a1 1 0 0 0-1.42 0L6 21.59L7.41 23L14 16.41l4.29 4.3a1 1 0 0 0 1.42 0l8.29-8.3V16h2Z"
              />
            </svg>
          </template>
        </ActionButton>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFlipbookStore } from "~/stores/useFlipbookStore";
import type { Flipbook } from "~/types";
import { useFileSize } from "~/composables/useFileSize";
import { useSubscriptionLimits } from "~/composables/useSubscriptionLimits";

const { formatFileSize, calculateTotalStorageSize } = useFileSize();
const { currentLimits, remainingFlipbooks } = useSubscriptionLimits();

const props = defineProps<{
  hasFlipbooks: boolean;
  flipbooksLength: number;
  currentPlan: string;
  subscriptionStatus: string;
  flipbooks: Flipbook[];
}>();

// Get flipbook limit for current plan
const flipbookLimit = computed(() => currentLimits.value.maxFlipbooks);

// Calculate remaining flipbooks
const remainingCount = computed(() =>
  remainingFlipbooks(props.flipbooksLength),
);

const user = useSupabaseUser();
const { isMobile } = useIsMobile();
const flipbookStore = useFlipbookStore();

const checkboxState = ref(false);

// Initialize collapsed state on mobile
onMounted(() => {
  checkboxState.value = !isMobile.value;
});

// Watch for screen size changes and update collapse state automatically
watch(isMobile, (newIsMobile) => {
  checkboxState.value = !newIsMobile;
});

// Subscription badge styling
const planBadgeClass = computed(() => {
  if (!props.currentPlan) return "badge-ghost";

  const plan = props.currentPlan;
  const status = props.subscriptionStatus;

  if (status === "active" && plan === "business") {
    return "badge-primary";
  } else if (status === "active" && plan === "standard") {
    return "badge-secondary";
  } else if (status === "past_due") {
    return "badge-warning";
  } else if (status === "canceled") {
    return "badge-neutral";
  }

  return "badge-neutral";
});

const planBadgeText = computed(() => {
  if (!props.currentPlan) {
    return "Free";
  }

  const plan = props.currentPlan;
  const status = props.subscriptionStatus;
  const displayName =
    plan === "business"
      ? "Business"
      : plan.charAt(0).toUpperCase() + plan.slice(1);

  if (status === "active") {
    return displayName;
  } else if (status === "canceled") {
    return "Free";
  } else if (status === "past_due") {
    return "Past Due";
  }

  return displayName;
});

const userFullName = computed(() => {
  // Show loading indicator when signing out to prevent "undefined" flash
  if (flipbookStore.isSigningOut) {
    return "";
  }

  const appMetadata = user.value?.app_metadata;
  const userMetadata = user.value?.user_metadata;

  if (!userMetadata) {
    return "";
  }

  if (appMetadata?.provider === "google") {
    return userMetadata?.full_name || "";
  } else {
    return `${userMetadata?.firstName || ""} ${
      userMetadata?.lastName || ""
    }`.trim();
  }
});

const navigateToSettings = () => {
  return navigateTo({ name: "settings" });
};

const navigateToAnalytics = () => {
  return navigateTo({ name: "stats" });
};

// Calculate total storage size
const totalStorageSize = computed(() => {
  return calculateTotalStorageSize(props.flipbooks);
});

// Split formatted file size into number and unit
const formattedStorageSize = computed(() => {
  const formatted = formatFileSize(totalStorageSize.value);
  const parts = formatted.split(" ");
  return {
    number: parts[0],
    unit: parts[1] || "",
  };
});
</script>

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-8%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.collapse-arrow {
  > .collapse-title:after {
    top: 50%;
  }
}

/* Custom styling for neutral badge */
.badge.badge-neutral {
  background-color: var(--color-base-content);
  color: var(--color-primary-content);
  border: none;
}

.badge.badge-secondary {
  color: var(--color-base-content) / 0.5;
}
</style>
