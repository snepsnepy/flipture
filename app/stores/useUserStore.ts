import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // State
  const profile = ref<any>(null);
  const isLoadingProfile = ref(false);
  const error = ref<string | null>(null);

  // Computed - Subscription info
  const isFreePlan = computed(() => {
    if (!profile.value?.subscription_plan || profile.value?.subscription_status !== 'active') {
      return true;
    }
    return profile.value.subscription_plan === 'free';
  });

  const currentPlan = computed(() => {
    if (!profile.value?.subscription_plan || profile.value?.subscription_status !== 'active') {
      return 'free';
    }
    return profile.value.subscription_plan;
  });

  const subscriptionStatus = computed(() => {
    return profile.value?.subscription_status || 'free';
  });

  const hasActiveSubscription = computed(() => {
    return (
      profile.value?.subscription_status === 'active' &&
      profile.value?.subscription_plan !== 'free'
    );
  });

  // Actions
  const fetchProfile = async () => {
    const userId = (user.value as any)?.id || (user.value as any)?.sub;
    
    if (!userId) {
      error.value = 'No user logged in';
      return null;
    }

    isLoadingProfile.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (fetchError) {
        // Profile should exist due to database trigger on user registration
        // If it doesn't exist, this is an error that needs investigation
        if (fetchError.code === 'PGRST116') {
          console.error('Profile not found for user - user may have been deleted');
          error.value = 'Profile not found. Please contact support.';
          
          // User was likely deleted, sign them out
          await supabase.auth.signOut();
          return null;
        }

        console.error('Error fetching profile:', fetchError);
        error.value = fetchError.message;
        return null;
      }

      profile.value = data;
      return data;
    } catch (err: any) {
      console.error('Error in fetchProfile:', err);
      error.value = err.message;
      return null;
    } finally {
      isLoadingProfile.value = false;
    }
  };

  const updateProfile = async (updates: any) => {
    const userId = (user.value as any)?.id || (user.value as any)?.sub;
    
    if (!userId) return null;

    try {
      const { data, error: updateError } = await (supabase.from('profiles') as any)
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating profile:', updateError);
        return null;
      }

      profile.value = data;
      return data;
    } catch (err) {
      console.error('Error in updateProfile:', err);
      return null;
    }
  };

  const resetProfile = () => {
    profile.value = null;
    isLoadingProfile.value = false;
    error.value = null;
  };

  // Auto-fetch when user changes
  watch(
    user,
    (newUser) => {
      const userId = (newUser as any)?.id || (newUser as any)?.sub;
      if (userId) {
        fetchProfile();
      } else {
        resetProfile();
      }
    },
    { immediate: true }
  );

  return {
    // State
    profile,
    isLoadingProfile,
    error,
    // Computed
    isFreePlan,
    currentPlan,
    subscriptionStatus,
    hasActiveSubscription,
    // Actions
    fetchProfile,
    updateProfile,
    resetProfile,
  };
});
