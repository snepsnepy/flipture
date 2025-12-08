export default defineNuxtRouteMiddleware(async (to, from) => {
  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/settings", "/create-flipbook"];

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) =>
    to.path.startsWith(route)
  );

  if (!isProtectedRoute) {
    return;
  }

  const user = useSupabaseUser();
  const client = useSupabaseClient();

  // Check session from Supabase (works on both server and client)
  // The @nuxtjs/supabase module automatically handles cookies on the server
  if (!user.value) {
    try {
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
