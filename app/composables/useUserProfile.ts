export const useUserProfile = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const profile = ref<any>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProfile = async () => {
    const userId = (user.value as any)?.id || (user.value as any)?.sub;
    
    if (!userId) {
      error.value = "No user logged in";
      return null;
    }

    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchError) {
        // If profile doesn't exist, create it
        if (fetchError.code === "PGRST116") {
          console.log("Profile not found, creating...");
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            .insert([
              {
                id: userId,
                email: user.value.email,
              },
            ] as any)
            .select()
            .single();

          if (createError) {
            console.error("Error creating profile:", createError);
            error.value = "Failed to create profile";
            return null;
          }

          profile.value = newProfile;
          return newProfile;
        }

        console.error("Error fetching profile:", fetchError);
        error.value = fetchError.message;
        return null;
      }

      profile.value = data;
      return data;
    } catch (err: any) {
      console.error("Error in fetchProfile:", err);
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (updates: any) => {
    const userId = (user.value as any)?.id || (user.value as any)?.sub;
    
    if (!userId) return null;

    try {
      const { data, error: updateError } = await (
        supabase.from("profiles") as any
      )
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating profile:", updateError);
        return null;
      }

      profile.value = data;
      return data;
    } catch (err) {
      console.error("Error in updateProfile:", err);
      return null;
    }
  };

  // Auto-fetch when user changes
  watch(
    user,
    (newUser) => {
      const userId = (newUser as any)?.id || (newUser as any)?.sub;
      if (userId) {
        fetchProfile();
      } else {
        profile.value = null;
      }
    },
    { immediate: true }
  );

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
  };
};
