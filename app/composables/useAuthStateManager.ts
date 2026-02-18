/**
 * Composable to manage authentication state changes and user verification
 * Handles auth state changes, periodic user existence checks, and cleanup
 */
export function useAuthStateManager() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useSupabaseUser();
  const isRecoverySession = useState("isRecoverySession", () => false);

  /**
   * Protected routes that require authentication
   */
  const protectedRoutes = ["/dashboard", "/settings", "/create-flipbook"];

  /**
   * Check if the current path is a protected route
   */
  const isProtectedRoute = (path: string): boolean => {
    return protectedRoutes.some((route) => path.startsWith(route));
  };

  /**
   * Verify if user profile still exists in the database
   */
  const verifyUserProfile = async (userId: string): Promise<boolean> => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .single();

      return !error && !!profile;
    } catch (err) {
      console.error("Error verifying user profile:", err);
      return false;
    }
  };

  /**
   * Handle sign out and redirect to login if on protected route
   */
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    const currentPath = router.currentRoute.value.path;
    if (isProtectedRoute(currentPath)) {
      await router.push("/login");
    }
  };

  /**
   * Set up auth state change listener
   */
  const setupAuthListener = () => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Handle password recovery - user clicked reset link in email
        if (event === "PASSWORD_RECOVERY") {
          isRecoverySession.value = true;
          await router.push("/reset-password");
          return;
        }

        // Handle sign out event
        if (event === "SIGNED_OUT") {
          isRecoverySession.value = false;
          const currentPath = router.currentRoute.value.path;
          if (isProtectedRoute(currentPath)) {
            await router.push("/login");
          }
        }

        // Handle token refresh - verify user still exists
        if (event === "TOKEN_REFRESHED" && session?.user) {
          const profileExists = await verifyUserProfile(session.user.id);
          
          if (!profileExists) {
            console.log("User no longer exists, signing out");
            await handleSignOut();
          }
        }
      }
    );

    return authListener;
  };

  /**
   * Set up periodic user existence check
   * Runs every 30 seconds to ensure user and profile still exist
   */
  const setupPeriodicCheck = () => {
    const checkInterval = setInterval(async () => {
      if (!user.value) {
        return;
      }

      try {
        // Check if user still exists in auth
        const {
          data: { user: authUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !authUser) {
          console.log("User no longer exists in auth, logging out");
          await supabase.auth.signOut();
          clearInterval(checkInterval);
          return;
        }

        // Check if profile still exists
        const profileExists = await verifyUserProfile(authUser.id);

        if (!profileExists) {
          console.log("User profile deleted, signing out");
          await supabase.auth.signOut();
          clearInterval(checkInterval);
        }
      } catch (err) {
        console.error("Error in periodic user check:", err);
      }
    }, 30000); // Check every 30 seconds

    return checkInterval;
  };

  /**
   * Initialize auth state management
   * Returns cleanup function to unsubscribe listeners
   */
  const initialize = () => {
    const authListener = setupAuthListener();
    const checkInterval = setupPeriodicCheck();

    // Return cleanup function
    return () => {
      authListener?.subscription.unsubscribe();
      clearInterval(checkInterval);
    };
  };

  return {
    initialize,
    isRecoverySession,
  };
}
