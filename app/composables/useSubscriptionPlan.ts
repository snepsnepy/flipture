/**
 * @deprecated Use useUserStore() instead for better state management
 * This composable is kept for backward compatibility
 */
export const useSubscriptionPlan = () => {
  const userStore = useUserStore();

  return {
    isFreePlan: userStore.isFreePlan,
    currentPlan: userStore.currentPlan,
    subscriptionStatus: userStore.subscriptionStatus,
    hasActiveSubscription: userStore.hasActiveSubscription,
    isLoadingProfile: userStore.isLoadingProfile,
  };
};

