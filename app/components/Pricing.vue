<template>
  <section class="bg-base-content">
    <div class="container mx-auto py-32 flex flex-col gap-y-8">
      <!-- Header -->
      <header class="flex flex-col gap-y-6 items-center text-center">
        <h2
          class="font-poppins font-bold text-3xl md:text-5xl text-primary-content"
        >
          Choose the perfect plan <br />for your needs
        </h2>
        <p
          class="text-primary-content text-sm md:text-base text-center font-poppins max-w-[600px] font-medium"
        >
          Transform your PDFs into stunning 3D flipbooks with our flexible
          pricing plans. Start free and scale as you grow —
          <b class="text-primary"> no hidden fees, cancel anytime.</b>
        </p>
      </header>

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
const { profile: userData } = useUserProfile();
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
  const isFree =
    !userData.value?.subscription_plan ||
    userData.value?.subscription_status !== "active";

  return {
    text: isFree ? "Current Plan" : "Included in Your Plan",
    disabled: true,
    loading: false,
  };
});

const standardButtonState = computed(() => {
  const isStandardActive =
    userData.value?.subscription_plan === "standard" &&
    userData.value?.subscription_status === "active";
  const isPremiumActive =
    userData.value?.subscription_plan === "premium" &&
    userData.value?.subscription_status === "active";
  const isStandardCanceled =
    userData.value?.subscription_plan === "standard" &&
    userData.value?.subscription_status === "canceled";

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
  const isPremiumActive =
    userData.value?.subscription_plan === "premium" &&
    userData.value?.subscription_status === "active";
  const isPremiumCanceled =
    userData.value?.subscription_plan === "premium" &&
    userData.value?.subscription_status === "canceled";
  const isStandardActive =
    userData.value?.subscription_plan === "standard" &&
    userData.value?.subscription_status === "active";

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
  if (plan === "free") {
    // Free plan doesn't need subscription
    return;
  }

  console.log("handleSubscribe called", { plan, user: user.value });

  if (!user.value) {
    console.error("No user found");
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
