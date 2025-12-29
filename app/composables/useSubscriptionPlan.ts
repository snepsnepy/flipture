export const useSubscriptionPlan = () => {
  const { profile: userData, loading } = useUserProfile();

  // Check if user is on free plan
  const isFreePlan = computed(() => {
    if (
      !userData.value?.subscription_plan ||
      userData.value?.subscription_status !== "active"
    ) {
      return true;
    }
    return userData.value.subscription_plan === "free";
  });

  // Get current plan name
  const currentPlan = computed(() => {
    if (
      !userData.value?.subscription_plan ||
      userData.value?.subscription_status !== "active"
    ) {
      return "free";
    }
    return userData.value.subscription_plan;
  });

  // Get subscription status
  const subscriptionStatus = computed(() => {
    return userData.value?.subscription_status || "free";
  });

  // Check if user has active subscription
  const hasActiveSubscription = computed(() => {
    return (
      userData.value?.subscription_status === "active" &&
      userData.value?.subscription_plan !== "free"
    );
  });

  return {
    isFreePlan,
    currentPlan,
    subscriptionStatus,
    hasActiveSubscription,
    isLoadingProfile: loading,
  };
};

