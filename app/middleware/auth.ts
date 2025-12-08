export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/settings", "/create-flipbook"];

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) =>
    to.path.startsWith(route)
  );

  if (!isProtectedRoute) {
    return;
  }

  // If user is not loaded yet, check the session directly from Supabase
  if (!user.value) {
    try {
      // Check if there's an active session in Supabase
      const {
        data: { session },
        error,
      } = await client.auth.getSession();

      // If no session exists or there's an error, redirect to login
      if (!session || error) {
        return navigateTo("/login");
      }
      // If session exists, allow navigation - useSupabaseUser will populate shortly
    } catch (error) {
      console.error("Auth middleware error:", error);
      return navigateTo("/login");
    }
  }
});
