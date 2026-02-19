<template>
  <section class="bg-base-content">
    <div class="container mx-auto flex flex-col gap-y-6 md:gap-y-10 py-40">
      <div
        class="flex flex-col md:flex-row-reverse w-full gap-4 md:gap-6 lg:gap-0"
      >
        <p
          class="whitespace-nowrap font-poppins font-medium text-primary-content/70 text-sm md:text-base order-first md:order-0"
        >
          (Pricing plans)
        </p>
        <!-- Header -->
        <header
          class="flex flex-col w-full gap-y-4 md:gap-y-6 items-start text-start"
        >
          <h2
            ref="titleRef"
            class="font-poppins font-medium text-3xl md:text-4xl lg:text-5xl text-primary-content leading-tight overflow-hidden"
          >
            <motion.span
              v-for="(word, index) in titleWords"
              :key="index"
              :initial="{ opacity: 0, y: 20 }"
              :animate="isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }"
              :transition="{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }"
              class="inline-block mr-2"
            >
              {{ word }}
            </motion.span>
            <br class="hidden md:block" />
            <motion.span
              v-for="(word, index) in titleWordsLine2"
              :key="'line2-' + index"
              :initial="{ opacity: 0, y: 20 }"
              :animate="isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }"
              :transition="{
                duration: 0.5,
                delay: (titleWords.length + index) * 0.1,
                ease: 'easeOut',
              }"
              class="inline-block mr-2"
            >
              {{ word }}
            </motion.span>
          </h2>
          <p
            class="text-primary-content text-sm md:text-base font-poppins max-w-full md:max-w-[600px] leading-relaxed"
          >
            Transform your PDFs into stunning 3D flipbooks with our flexible
            pricing plans. Start free and scale as you grow —
            <b class="text-secondary font-medium">
              no hidden fees, cancel anytime.</b
            >
          </p>
        </header>
      </div>

      <section class="flex flex-col xl:flex-row gap-6 lg:gap-5 gap-y-5">
        <!-- Free Plan -->
        <PricingCard
          plan-type="free"
          title="FREE"
          description="Try it out with essential features at no cost."
          price="€0"
          period="/Forever"
          :features="freePlan"
          background-type="solid"
          border-class="border-base-content/50"
          :button-state="freeButtonState"
          button-variant="default"
          @subscribe="handleSubscribe"
        />

        <!-- Standard Plan -->
        <PricingCard
          plan-type="standard"
          title="STANDARD"
          description="More flipbooks, no watermark and full analytics."
          price="€7.99"
          period="/Month"
          :features="standardPlan"
          background-type="animated"
          border-class="border-base-content"
          :badge="{ text: 'Popular', variant: 'popular' }"
          :button-state="standardButtonState"
          button-variant="secondary"
          @subscribe="handleSubscribe"
        />

        <!-- Business Plan -->
        <PricingCard
          plan-type="premium"
          title="BUSINESS"
          description="Unlimited flipbooks and tailored customization for your brand."
          price="€12.99"
          period="/Month"
          :features="premiumPlan"
          background-type="primary"
          border-class="border-base-content"
          :button-state="premiumButtonState"
          button-variant="primary"
          @subscribe="handleSubscribe"
        />
      </section>

      <p class="text-center text-primary-content text-sm font-poppins">
        Need a custom solution?
        <a
          href="mailto:support@flipture.io"
          class="text-secondary hover:text-secondary/80 transition-colors font-medium"
        >
          Reach out to us at contact@flipture.io
        </a>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import { useElementVisibility } from "@vueuse/core";

// Split the title into words for animation
const titleWords = ref(["Choose", "the", "perfect", "plan"]);
const titleWordsLine2 = ref(["for", "your", "needs"]);
const titleRef = useTemplateRef("titleRef");

// Track if the title is visible in viewport
const elementIsVisible = useElementVisibility(titleRef);

// Track if animation has already been triggered (play only once)
const hasAnimated = ref(false);

// Compute animation state - only trigger once
const isInView = computed(() => {
  if (elementIsVisible.value && !hasAnimated.value) {
    hasAnimated.value = true;
    return true;
  }
  return hasAnimated.value;
});

const user = useSupabaseUser();
const userStore = useUserStore();
const { redirectToCheckout } = useStripe();
const config = useRuntimeConfig();

const loading = ref(false);
const selectedPlan = ref<"standard" | "premium" | null>(null);

const {
  free: freePlan,
  standard: standardPlan,
  premium: premiumPlan,
} = PLAN_FEATURES;

// Computed button states
const freeButtonState = computed(() => {
  // If user is not logged in, show "Get Started"
  if (!user.value) {
    return {
      text: "Get Started",
      disabled: false,
      loading: false,
    };
  }

  // If user is logged in, check their subscription status
  const isFree =
    !userStore.profile?.subscription_plan ||
    userStore.profile?.subscription_status !== "active";

  return {
    text: isFree ? "Current Plan" : "Included in Your Plan",
    disabled: true,
    loading: false,
  };
});

const standardButtonState = computed(() => {
  // If user is not logged in, show "Get Started"
  if (!user.value) {
    return {
      text: "Get Started",
      disabled: false,
      loading: false,
    };
  }

  const isStandardActive =
    userStore.profile?.subscription_plan === "standard" &&
    userStore.profile?.subscription_status === "active";
  const isPremiumActive =
    userStore.profile?.subscription_plan === "premium" &&
    userStore.profile?.subscription_status === "active";
  const isStandardCanceled =
    userStore.profile?.subscription_plan === "standard" &&
    userStore.profile?.subscription_status === "canceled";

  let text = "Subscribe Now";
  if (loading.value && selectedPlan.value === "standard") {
    text = "";
  } else if (isStandardActive) {
    text = "Current Plan";
  } else if (isPremiumActive) {
    text = "Included in Your Plan";
  } else if (isStandardCanceled) {
    text = "Reactivate";
  }

  return {
    text,
    disabled: loading.value || isStandardActive || isPremiumActive,
    loading: loading.value && selectedPlan.value === "standard",
  };
});

const premiumButtonState = computed(() => {
  // If user is not logged in, show "Get Started"
  if (!user.value) {
    return {
      text: "Get Started",
      disabled: false,
      loading: false,
    };
  }

  const isPremiumActive =
    userStore.profile?.subscription_plan === "premium" &&
    userStore.profile?.subscription_status === "active";
  const isPremiumCanceled =
    userStore.profile?.subscription_plan === "premium" &&
    userStore.profile?.subscription_status === "canceled";
  const isStandardActive =
    userStore.profile?.subscription_plan === "standard" &&
    userStore.profile?.subscription_status === "active";

  let text = "Subscribe Now";
  if (loading.value && selectedPlan.value === "premium") {
    text = "";
  } else if (isPremiumActive) {
    text = "Current Plan";
  } else if (isPremiumCanceled) {
    text = "Reactivate";
  } else if (isStandardActive) {
    text = "Upgrade";
  }

  return {
    text,
    disabled: loading.value || isPremiumActive,
    loading: loading.value && selectedPlan.value === "premium",
  };
});

const handleSubscribe = async (plan: string) => {
  console.log("handleSubscribe called", { plan, user: user.value });

  // If user is not logged in, redirect to register page
  if (!user.value) {
    return navigateTo({ name: "register" });
  }

  // If free plan and user is logged in, no action needed
  if (plan === "free") {
    return;
  }

  // Get user ID from either id or sub field
  const userId = (user.value as any).id || (user.value as any).sub;
  const userEmail = user.value.email;

  // Validate required fields
  if (!userId) {
    console.error("No user ID found");
    return;
  }

  if (!userEmail) {
    console.error("No user email found");
    return;
  }

  loading.value = true;
  selectedPlan.value = plan as "standard" | "premium";

  try {
    const priceId =
      plan === "standard"
        ? config.public.stripeStandardPriceId
        : config.public.stripePremiumPriceId;

    console.log("Checkout details:", {
      priceId,
      userId,
      userEmail,
    });

    await redirectToCheckout(priceId, userId, userEmail);
  } catch (error: any) {
    console.error("Subscription error:", error);
    loading.value = false;
    selectedPlan.value = null;
  }
};
</script>
