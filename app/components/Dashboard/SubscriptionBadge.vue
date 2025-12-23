<template>
  <div v-if="loading" class="skeleton h-8 w-32"></div>

  <div v-else-if="subscriptionData" class="flex items-center gap-3">
    <!-- Badge -->
    <div class="badge badge-lg font-semibold" :class="badgeClass">
      {{ badgeText }}
    </div>

    <!-- Manage Button -->
    <button
      v-if="subscriptionData.stripe_customer_id"
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
        !subscriptionData.subscription_plan ||
        subscriptionData.subscription_plan === 'standard'
      "
      to="/pricing"
      class="btn btn-sm btn-primary"
    >
      {{
        subscriptionData.subscription_plan === "standard"
          ? "Upgrade"
          : "Subscribe"
      }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { profile: subscriptionData, loading } = useUserProfile();
const { redirectToCustomerPortal } = useStripe();
const { showToast } = useToast();

const portalLoading = ref(false);

const badgeClass = computed(() => {
  if (!subscriptionData.value) return "badge-ghost";

  const plan = subscriptionData.value.subscription_plan;
  const status = subscriptionData.value.subscription_status;

  if (status === "active" && plan === "premium") {
    return "badge-primary";
  } else if (status === "active" && plan === "standard") {
    return "badge-secondary";
  } else if (status === "canceled" || status === "past_due") {
    return "badge-warning";
  }

  return "badge-ghost";
});

const badgeText = computed(() => {
  if (!subscriptionData.value?.subscription_plan) {
    return "Free";
  }

  const plan = subscriptionData.value.subscription_plan;
  const status = subscriptionData.value.subscription_status;

  if (status === "active") {
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  } else if (status === "canceled") {
    return "Canceled";
  } else if (status === "past_due") {
    return "Past Due";
  }

  return plan.charAt(0).toUpperCase() + plan.slice(1);
});

const handleManageSubscription = async () => {
  if (!subscriptionData.value?.stripe_customer_id) {
    showToast("No subscription found", "error");
    return;
  }

  portalLoading.value = true;

  try {
    await redirectToCustomerPortal(subscriptionData.value.stripe_customer_id);
  } catch (error: any) {
    console.error("Portal error:", error);
    showToast("Failed to open subscription management", "error");
    portalLoading.value = false;
  }
};
</script>
