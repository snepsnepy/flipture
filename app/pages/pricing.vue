<template>
  <section>
    <div class="container mx-auto flex flex-col py-0 gap-6 md:gap-8">
      <!-- Header -->
      <header>
        <div class="flex flex-row items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#0046ff"
              fill-rule="evenodd"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-.47-13.53a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72H16a.75.75 0 0 0 0-1.5H9.81l1.72-1.72a.75.75 0 0 0 0-1.06"
              clip-rule="evenodd"
            />
          </svg>
          <button
            @click="navigateToDashboard"
            class="text-base-content text-sm md:text-base leading-4 font-poppins font-medium hover:cursor-pointer hover:text-primary"
          >
            Back
          </button>
        </div>
      </header>

      <!-- Title and Description -->
      <section class="flex flex-col gap-y-6 items-center text-center">
        <h2
          class="font-poppins font-bold text-3xl md:text-5xl text-base-content"
        >
          Choose the perfect plan <br />for your needs
        </h2>
        <p
          class="text-base-content text-sm md:text-base text-center font-poppins max-w-[600px] font-medium"
        >
          Transform your PDFs into stunning 3D flipbooks with our flexible
          pricing plans. Start free and scale as you grow —
          <b class="text-primary"> no hidden fees, cancel anytime.</b>
        </p>
      </section>

      <!-- Content -->
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

      <!-- Manage Subscription -->
      <footer
        v-if="
          userStore.profile?.stripe_customer_id &&
          userStore.profile?.subscription_status === 'active'
        "
        class="text-center relative z-10"
      >
        <p class="mb-4 text-base-content/90 font-poppins">
          Already subscribed? Manage your subscription
        </p>
        <button
          @click="handleManageSubscription"
          :disabled="portalLoading"
          class="btn btn-outline text-base-content border-base-content hover:bg-primary-content hover:text-base-content"
        >
          <span v-if="portalLoading" class="loading loading-spinner"></span>
          <span v-else>Manage Subscription</span>
        </button>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "base",
  middleware: "auth",
});

const user = useSupabaseUser();
const userStore = useUserStore();
const { redirectToCheckout, redirectToCustomerPortal } = useStripe();
const config = useRuntimeConfig();

const loading = ref(false);
const portalLoading = ref(false);
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
    !userStore.profile?.subscription_plan ||
    userStore.profile?.subscription_status !== "active";

  return {
    text: isFree ? "Current Plan" : "Included in Your Plan",
    disabled: true,
    loading: false,
  };
});

const standardButtonState = computed(() => {
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

const handleManageSubscription = async () => {
  if (!userStore.profile?.stripe_customer_id) {
    return;
  }

  portalLoading.value = true;

  try {
    await redirectToCustomerPortal(userStore.profile.stripe_customer_id);
  } catch (error: any) {
    console.error("Portal error:", error);

    portalLoading.value = false;
  }
};

const navigateToDashboard = () => {
  return navigateTo({ name: "dashboard" });
};
</script>
