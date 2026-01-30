<template>
  <section class="bg-base-content">
    <div class="container mx-auto flex flex-col gap-y-6 md:gap-y-10 py-40">
      <div class="flex flex-col md:flex-row-reverse w-full gap-4 md:gap-6 lg:gap-0">
        <p class="whitespace-nowrap font-poppins font-medium text-primary-content/80 text-sm md:text-base order-first md:order-0">(Pricing plans)</p>
        <!-- Header -->
        <header class="flex flex-col w-full gap-y-4 md:gap-y-6 items-start text-start">
          <h2
            class="font-poppins font-medium text-3xl md:text-4xl lg:text-5xl text-primary-content leading-tight"
          >
            Choose the perfect plan <br class="hidden md:block" />for your needs
          </h2>
          <p
            class="text-primary-content text-sm md:text-base font-poppins max-w-full md:max-w-[600px] leading-relaxed"
          >
            Transform your PDFs into stunning 3D flipbooks with our flexible
            pricing plans. Start free and scale as you grow —
            <b class="text-secondary font-medium"> no hidden fees, cancel anytime.</b>
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
          description="Unlock unlimited flipbooks with full analytics."
          price="€5.99"
          period="/Month"
          :features="standardPlan"
          background-type="animated"
          border-class="border-base-content"
          :badge="{ text: 'Popular', variant: 'popular' }"
          :button-state="standardButtonState"
          button-variant="secondary"
          @subscribe="handleSubscribe"
        />

        <!-- Premium Plan -->
        <PricingCard
          plan-type="premium"
          title="PREMIUM"
          description="Best value for regular publishing."
          price="€59.99"
          period="/Year"
          :features="premiumPlan"
          background-type="primary"
          border-class="border-base-content"
          :button-state="premiumButtonState"
          button-variant="primary"
          @subscribe="handleSubscribe"
        />
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const userStore = useUserStore();
const { redirectToCheckout } = useStripe();
const config = useRuntimeConfig();

const loading = ref(false);
const selectedPlan = ref<"standard" | "premium" | null>(null);

const freePlan = [
  "Up to 3 flipbooks",
  "5MB per flipbook limit",
  "Watermark on flipbooks",
  "No analytics",
  "Auto-remove after 30 days of no visits",
];

const standardPlan = [
  "Up to 100 flipbooks",
  "30MB per flipbook limit",
  "No watermark",
  "Full analytics & insights",
  "Full customization options",
  "Cancel anytime",
];

const premiumPlan = [
  "Up to 100 flipbooks",
  "50MB per flipbook limit",
  "No watermark",
  "Full analytics & insights",
  "Cancel anytime",
  "Save 2 months with annual billing",
  "One simple annual invoice",
];

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
