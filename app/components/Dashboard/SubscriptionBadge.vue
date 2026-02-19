<template>
  <div v-if="userStore.isLoadingProfile" class="skeleton h-8 w-32"></div>

  <div v-else-if="userStore.profile" class="flex items-center gap-3">
    <!-- Badge -->
    <div class="badge badge-lg font-semibold" :class="badgeClass">
      {{ badgeText }}
    </div>

    <!-- Manage Button - Only show for active or past_due subscriptions -->
    <button
      v-if="
        userStore.profile.stripe_customer_id &&
        (userStore.profile.subscription_status === 'active' ||
          userStore.profile.subscription_status === 'past_due')
      "
      @click="handleManageSubscription"
      :disabled="portalLoading"
      class="btn btn-sm btn-ghost"
      title="Manage Subscription"
    >
      <svg
        v-if="!portalLoading"
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <span v-else class="loading loading-spinner loading-xs"></span>
    </button>

    <!-- Upgrade Button for Free/Standard users -->
    <NuxtLink
      v-if="
        !userStore.profile.subscription_plan ||
        userStore.profile.subscription_plan === 'standard'
      "
      to="/pricing"
      class="btn btn-sm btn-primary"
    >
      {{
        userStore.profile.subscription_plan === "standard"
          ? "Upgrade"
          : "Subscribe"
      }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { Toast } from "~/types";

const userStore = useUserStore();
const { redirectToCustomerPortal } = useStripe();
const { showToast } = useToast();

const portalLoading = ref(false);

const badgeClass = computed(() => {
  if (!userStore.profile) return "badge-ghost";

  const plan = userStore.profile.subscription_plan;
  const status = userStore.profile.subscription_status;

  if (status === "active" && plan === "business") {
    return "badge-primary";
  } else if (status === "active" && plan === "standard") {
    return "badge-secondary";
  } else if (status === "past_due") {
    return "badge-warning"; // Warning for payment issues
  } else if (status === "canceled") {
    return "badge-ghost"; // Back to free tier
  }

  return "badge-ghost";
});

const badgeText = computed(() => {
  if (!userStore.profile?.subscription_plan) {
    return "Free";
  }

  const plan = userStore.profile.subscription_plan;
  const status = userStore.profile.subscription_status;

  const displayName = plan === "business" ? "Business" : plan.charAt(0).toUpperCase() + plan.slice(1);

  if (status === "active") {
    return displayName;
  } else if (status === "canceled") {
    return "Free";
  } else if (status === "past_due") {
    return "Past Due";
  }

  return displayName;
});

const handleManageSubscription = async () => {
  if (!userStore.profile?.stripe_customer_id) {
    showToast(Toast.ERROR, {
      toastTitle: "No subscription found",
      description: "You don't have an active subscription.",
    });
    return;
  }

  portalLoading.value = true;

  try {
    await redirectToCustomerPortal(userStore.profile.stripe_customer_id);
  } catch (error: any) {
    console.error("Portal error:", error);

    // Handle deleted customer error
    if (error.message?.includes("No such customer")) {
      showToast(Toast.ERROR, {
        toastTitle: "Subscription not found",
        description: "Please subscribe to a new plan.",
      });
    } else {
      showToast(Toast.ERROR, {
        toastTitle: "Failed to open subscription management",
        description: "Please try again later.",
      });
    }

    portalLoading.value = false;
  }
};
</script>
