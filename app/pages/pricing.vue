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
      <section class="flex flex-col lg:flex-row gap-6 lg:gap-5 gap-y-5">
        <!-- Free Plan -->
        <div
          class="w-full relative overflow-hidden border-2 border-base-content/50 rounded-4xl"
        >
          <div
            class="relative bg-base-200 rounded-3xl p-6 py-8 overflow-hidden h-full"
          >
            <!-- Container -->
            <section class="flex flex-col gap-y-8 md:gap-y-10">
              <!-- Badges -->
              <div
                class="flex flex-col gap-2 items-left md:flex-row md:items-center justify-between z-10 relative"
              >
                <span
                  class="w-fit font-poppins font-bold text-sm leading-3 text-base-content p-3 border border-base-content rounded-full hover:cursor-default"
                  >FREE</span
                >
                <!-- Empty spacer to match other cards height -->
                <span class="invisible w-fit py-1.5 px-5">Spacer</span>
              </div>

              <!-- Content -->
              <section class="flex flex-col gap-4 md:gap-5 z-10 relative">
                <p class="font-poppins font-medium text-base text-base-content">
                  Try it out with essential features at no cost.
                </p>
                <div class="flex flex-row gap-2 items-start">
                  <h4
                    class="font-poppins font-bold text-2xl md:text-5xl leading-[104%] text-base-content"
                  >
                    €0
                  </h4>
                  <span
                    class="text-base-content/80 text-sm leading-4 pt-2.5 font-poppins"
                    >/Forever</span
                  >
                </div>
                <button
                  type="button"
                  @click="navigateToDashboard"
                  :disabled="
                    userData?.subscription_plan &&
                    userData?.subscription_status === 'active'
                  "
                  class="w-full py-3 px-6 md:px-10 bg-base-content rounded-full text-base-100 hover:cursor-pointer font-poppins font-bold text-sm md:text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span
                    v-if="
                      !userData?.subscription_plan ||
                      userData?.subscription_status !== 'active'
                    "
                    >Start Free</span
                  >
                  <span v-else>Current Plan</span>
                </button>
              </section>
              <HorizontalDivider class="relative z-10" />

              <!-- Bullet Points -->
              <section class="flex flex-col gap-y-4 z-10 relative">
                <div
                  class="flex flex-row gap-2"
                  v-for="feature in freePlan"
                  :key="feature"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span
                    class="font-poppins text-sm md:text-base text-base-content"
                    >{{ feature }}</span
                  >
                </div>
              </section>
            </section>
          </div>
        </div>

        <!-- Monthly/Standard Plan -->
        <div
          class="w-full relative overflow-hidden border-2 border-base-content rounded-4xl"
        >
          <VueBitsSilk
            :speed="3"
            :scale="1"
            color="#0046ff"
            :noise-intensity="0.5"
            :rotation="0"
            class="relative rounded-3xl p-6 py-8 overflow-hidden"
          >
            <!-- Container -->
            <section class="flex flex-col gap-y-8 md:gap-y-10">
              <!-- Badges -->
              <div
                class="flex flex-col gap-2 items-left md:flex-row md:items-center justify-between z-10 relative"
              >
                <span
                  class="w-fit font-poppins font-bold text-sm leading-3 text-primary-content p-3 border border-primary-content rounded-full hover:cursor-default"
                  >STANDARD</span
                >
                <span
                  class="w-fit flex flex-row items-center gap-1 font-poppins font-bold text-sm leading-3 text-base-content py-1.5 px-3 bg-secondary rounded-full hover:cursor-default"
                >
                  <svg
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
                  Popular
                </span>
              </div>

              <!-- Content -->
              <section class="flex flex-col gap-4 md:gap-5 z-10 relative">
                <p
                  class="font-poppins font-medium text-base text-primary-content"
                >
                  Unlock unlimited flipbooks with full analytics.
                </p>
                <div class="flex flex-row gap-2 items-start">
                  <h4
                    class="font-poppins font-bold text-2xl md:text-5xl leading-[104%] text-primary-content"
                  >
                    €5.99
                  </h4>
                  <span
                    class="text-primary-content/80 text-sm leading-4 pt-2.5 font-poppins"
                    >/Month</span
                  >
                </div>
                <button
                  type="button"
                  @click="handleSubscribe('standard')"
                  :disabled="
                    loading ||
                    (userData?.subscription_plan === 'standard' &&
                      userData?.subscription_status === 'active')
                  "
                  class="w-full py-3 px-6 md:px-10 bg-secondary rounded-full text-base-content hover:cursor-pointer hover:bg-primary-content font-poppins font-bold text-sm md:text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span
                    v-if="loading && selectedPlan === 'standard'"
                    class="loading loading-spinner"
                  ></span>
                  <span
                    v-else-if="
                      userData?.subscription_plan === 'standard' &&
                      userData?.subscription_status === 'active'
                    "
                    >Current Plan</span
                  >
                  <span
                    v-else-if="
                      userData?.subscription_plan === 'standard' &&
                      userData?.subscription_status === 'canceled'
                    "
                    >Reactivate</span
                  >
                  <span v-else>Get started</span>
                </button>
              </section>
              <HorizontalDivider class="relative z-10" />

              <!-- Bullet Points -->
              <section class="flex flex-col gap-y-4 z-10 relative">
                <div
                  class="flex flex-row gap-2"
                  v-for="feature in standardPlan"
                  :key="feature"
                >
                  <svg
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
                  <span
                    class="font-poppins text-sm md:text-base text-primary-content"
                    >{{ feature }}</span
                  >
                </div>
              </section>
            </section>
          </VueBitsSilk>
        </div>

        <!-- Yearly/Premium Plan -->
        <div
          class="w-full relative overflow-hidden border-2 border-base-content rounded-4xl"
        >
          <div
            class="relative bg-primary-content rounded-3xl p-6 py-8 overflow-hidden"
          >
            <!-- Container -->
            <section class="flex flex-col gap-y-8 md:gap-y-10">
              <!-- Badges -->
              <div
                class="flex flex-col gap-2 items-left md:flex-row md:items-center justify-between z-10 relative"
              >
                <span
                  class="font-poppins font-bold text-sm leading-3 text-base-content p-3 border border-base-content rounded-full hover:cursor-default"
                  >PREMIUM</span
                >
                <!-- Empty spacer to match Standard card height -->
                <span class="invisible w-fit py-1.5 px-5">Spacer</span>
              </div>

              <!-- Content -->
              <section class="flex flex-col gap-4 md:gap-5 z-10 relative">
                <p class="font-poppins font-medium text-base text-base-content">
                  Best value for regular publishing. Save two months.
                </p>
                <div class="flex flex-row gap-2 items-start">
                  <h4
                    class="font-poppins font-bold text-2xl md:text-5xl leading-[104%] text-base-content"
                  >
                    €59.99
                  </h4>
                  <span
                    class="text-base-content/80 text-sm leading-4 pt-2.5 font-poppins"
                    >/Year</span
                  >
                </div>
                <button
                  type="button"
                  @click="handleSubscribe('premium')"
                  :disabled="
                    loading ||
                    (userData?.subscription_plan === 'premium' &&
                      userData?.subscription_status === 'active')
                  "
                  class="w-full py-3 px-6 md:px-10 bg-primary rounded-full text-primary-content hover:cursor-pointer font-poppins font-bold text-sm md:text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span
                    v-if="loading && selectedPlan === 'premium'"
                    class="loading loading-spinner"
                  ></span>
                  <span
                    v-else-if="
                      userData?.subscription_plan === 'premium' &&
                      userData?.subscription_status === 'active'
                    "
                    >Current Plan</span
                  >
                  <span
                    v-else-if="
                      userData?.subscription_plan === 'premium' &&
                      userData?.subscription_status === 'canceled'
                    "
                    >Reactivate</span
                  >
                  <span v-else>Get started</span>
                </button>
              </section>
              <HorizontalDivider class="relative z-10" />

              <!-- Bullet Points -->
              <section class="flex flex-col gap-y-4 z-10 relative">
                <div
                  class="flex flex-row gap-2"
                  v-for="feature in premiumPlan"
                  :key="feature"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      fill-rule="evenodd"
                      d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span
                    class="font-poppins text-sm md:text-base text-base-content"
                    >{{ feature }}</span
                  >
                </div>
              </section>
            </section>
          </div>
        </div>
      </section>

      <!-- Manage Subscription -->
      <footer
        v-if="
          userData?.stripe_customer_id &&
          userData?.subscription_status === 'active'
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
const { profile: userData } = useUserProfile();
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
  "Unlimited flipbooks",
  "No file size limits",
  "No watermark",
  "Full analytics & insights",
  "Cancel anytime",
  "Friendly email support",
];

const premiumPlan = [
  "Unlimited flipbooks",
  "No file size limits",
  "No watermark",
  "Full analytics & insights",
  "Cancel anytime",
  "Friendly email support",
  "Save 2 months with annual billing",
  "One simple annual invoice",
];

const handleSubscribe = async (plan: "standard" | "premium") => {
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
  selectedPlan.value = plan;

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
  if (!userData.value?.stripe_customer_id) {
    return;
  }

  portalLoading.value = true;

  try {
    await redirectToCustomerPortal(userData.value.stripe_customer_id);
  } catch (error: any) {
    console.error("Portal error:", error);

    portalLoading.value = false;
  }
};

const navigateToDashboard = () => {
  return navigateTo({ name: "dashboard" });
};
</script>
