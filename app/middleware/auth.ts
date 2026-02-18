export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();
  const isRecoverySession = useState("isRecoverySession", () => false);

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/settings", "/create-flipbook"];

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) =>
    to.path.startsWith(route)
  );

  if (!isProtectedRoute) {
    return;
  }

  // If user is in a password recovery session, they should not access protected routes
  if (isRecoverySession.value) {
    return navigateTo("/reset-password");
  }

  // Check if there's an active session
  try {
    const {
      data: { session },
      error: sessionError,
    } = await client.auth.getSession();

    // If no session exists or there's an error, redirect to login
    if (!session || sessionError) {
      console.log("No valid session found, redirecting to login");
      return navigateTo("/login");
    }

    // Verify the user still exists in Supabase Auth
    const {
      data: { user: authUser },
      error: userError,
    } = await client.auth.getUser();

    if (userError || !authUser) {
      // User doesn't exist anymore in Supabase Auth, sign them out
      console.log("User no longer exists in auth, logging out");
      await client.auth.signOut();
      return navigateTo("/login");
    }

    // Check if the user's profile exists in the database
    const { data: profile, error: profileError } = await client
      .from("profiles")
      .select("id")
      .eq("id", authUser.id)
      .single();

    if (profileError || !profile) {
      // Profile doesn't exist, user was likely deleted from the database
      console.log("User profile no longer exists, logging out");
      await client.auth.signOut();
      return navigateTo("/login");
    }

    // All checks passed, allow navigation
  } catch (error) {
    console.error("Auth middleware error:", error);
    // On any error, sign out and redirect to login
    await client.auth.signOut();
    return navigateTo("/login");
  }
});
