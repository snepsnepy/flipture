<template>
  <div
    :class="[
      'w-full relative overflow-hidden border-2 rounded-4xl flex flex-col',
      borderClass,
    ]"
  >
    <!-- Background wrapper -->
    <component
      :is="backgroundType === 'animated' ? VueBitsSilk : 'div'"
      v-bind="backgroundType === 'animated' ? silkProps : {}"
      :class="[
        'relative rounded-3xl p-6 py-8 overflow-hidden flex-1 flex flex-col',
        backgroundType === 'solid' ? 'bg-base-200' : '',
        backgroundType === 'primary' ? 'bg-primary-content' : '',
      ]"
    >
      <!-- Container -->
      <section class="flex flex-col gap-y-8 md:gap-y-10 h-full">
        <!-- Badges -->
        <div
          class="flex flex-col gap-2 items-left md:flex-row md:items-center justify-between z-10 relative min-h-[40px]"
        >
          <span
            :class="[
              'w-fit font-poppins font-bold text-sm leading-3 p-3 border rounded-full hover:cursor-default',
              badgeClass,
            ]"
            >{{ title }}</span
          >
          <span
            v-if="badge"
            :class="[
              'w-fit flex flex-row items-center gap-1 font-poppins font-bold text-sm leading-3 py-1.5 px-3 rounded-full hover:cursor-default',
              badge.variant === 'popular'
                ? 'text-base-content bg-secondary'
                : 'text-primary-content bg-primary',
            ]"
          >
            <svg
              v-if="badge.variant === 'popular'"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000"
                d="M12 19.875q-.425 0-.825-.187t-.7-.538L2.825 10q-.225-.275-.337-.6t-.113-.675q0-.225.038-.462t.162-.438L4.45 4.1q.275-.5.738-.8T6.225 3h11.55q.575 0 1.038.3t.737.8l1.875 3.725q.125.2.163.437t.037.463q0 .35-.112.675t-.338.6l-7.65 9.15q-.3.35-.7.538t-.825.187M9.625 8h4.75l-1.5-3h-1.75zM11 16.675V10H5.45zm2 0L18.55 10H13zM16.6 8h2.65l-1.5-3H15.1zM4.75 8H7.4l1.5-3H6.25z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                fill-rule="evenodd"
                d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                clip-rule="evenodd"
              />
            </svg>
            {{ badge.text }}
          </span>
        </div>

        <!-- Content -->
        <section class="flex flex-col gap-4 md:gap-5 z-10 relative shrink-0">
          <p
            :class="[
              'font-poppins font-medium text-base min-h-[48px]',
              descriptionClass,
            ]"
          >
            {{ description }}
          </p>
          <div
            class="flex flex-row gap-2 items-start min-h-[60px] md:min-h-[80px]"
          >
            <h4
              :class="[
                'font-poppins font-bold text-2xl md:text-5xl leading-[104%]',
                priceClass,
              ]"
            >
              {{ price }}
            </h4>
            <span
              :class="['text-sm leading-4 pt-2.5 font-poppins', periodClass]"
              >{{ period }}</span
            >
          </div>
          <button
            type="button"
            :disabled="buttonState.disabled"
            @click="handleClick"
            :class="[
              'w-full py-3 px-6 md:px-10 rounded-full font-poppins font-bold text-sm md:text-lg transition-all duration-300 min-h-[48px] md:min-h-[56px]',
              buttonClass,
              buttonState.disabled
                ? 'disabled:cursor-not-allowed disabled:pointer-events-none'
                : 'hover:cursor-pointer hover:scale-105',
            ]"
          >
            <span
              v-if="buttonState.loading"
              class="loading loading-spinner"
            ></span>
            <span v-else>{{ buttonState.text }}</span>
          </button>
        </section>
        <HorizontalDivider class="relative z-10 shrink-0" />

        <!-- Bullet Points -->
        <section class="flex flex-col gap-y-2 z-10 relative flex-1">
          <div
            class="flex flex-row gap-2 items-start"
            v-for="feature in features"
            :key="feature"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="shrink-0 mt-0.5"
            >
              <path
                :fill="checkmarkColor"
                fill-rule="evenodd"
                d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                clip-rule="evenodd"
              />
            </svg>
            <span
              :class="[
                'font-poppins text-sm md:text-base flex-1',
                featureClass,
              ]"
              >{{ feature }}</span
            >
          </div>
        </section>
      </section>
    </component>
  </div>
</template>

<script setup lang="ts">
import VueBitsSilk from "@/components/VueBits/Silk/Silk.vue";

interface Badge {
  text: string;
  variant: "popular" | "current";
}

interface ButtonState {
  text: string;
  disabled: boolean;
  loading: boolean;
}

interface Props {
  // Plan identification
  planType: "free" | "standard" | "premium";
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];

  // Visual customization
  backgroundType: "solid" | "animated" | "primary";
  borderClass?: string;
  badge?: Badge;

  // Button state
  buttonState: ButtonState;
  buttonVariant: "primary" | "secondary" | "default";

  // Loading state
  loading?: boolean;
  selectedPlan?: string;
}

const props = withDefaults(defineProps<Props>(), {
  borderClass: "border-base-content/50",
  loading: false,
  selectedPlan: "",
});

const emit = defineEmits<{
  subscribe: [planType: string];
}>();

// Computed classes based on background type
const badgeClass = computed(() => {
  if (props.backgroundType === "animated") {
    return "text-primary-content border-primary-content";
  }
  return "text-base-content border-base-content";
});

const descriptionClass = computed(() => {
  if (props.backgroundType === "animated") {
    return "text-primary-content";
  }
  return "text-base-content";
});

const priceClass = computed(() => {
  if (props.backgroundType === "animated") {
    return "text-primary-content";
  }
  return "text-base-content";
});

const periodClass = computed(() => {
  if (props.backgroundType === "animated") {
    return "text-primary-content/80";
  }
  return "text-base-content/80";
});

const featureClass = computed(() => {
  if (props.backgroundType === "animated") {
    return "text-primary-content";
  }
  return "text-base-content";
});

const checkmarkColor = computed(() => {
  return "#5cb338";
});

const buttonClass = computed(() => {
  if (props.buttonVariant === "secondary") {
    return "bg-secondary text-base-content hover:bg-primary-content disabled:opacity-80 disabled:scale-100";
  }
  if (props.buttonVariant === "primary") {
    return "bg-primary text-primary-content disabled:opacity-50 disabled:scale-100";
  }
  return "bg-base-content text-base-100 disabled:opacity-50";
});

const silkProps = computed(() => ({
  speed: 3,
  scale: 1,
  color: "#0046ff",
  noiseIntensity: 0.5,
  rotation: 0,
}));

const handleClick = () => {
  if (!props.buttonState.disabled && !props.buttonState.loading) {
    emit("subscribe", props.planType);
  }
};
</script>
