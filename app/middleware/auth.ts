export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/settings", "/create-flipbook"];

  // If navigating to a protected route and user is not loaded yet,
  // check the session directly from Supabase
  if (!user.value && protectedRoutes.includes(to.path)) {
    // Check if there's an active session in Supabase
    const { data: { session } } = await client.auth.getSession();
    
    // If no session exists, redirect to login
    if (!session) {
      return navigateTo("/login");
    }
    // If session exists, allow navigation - useSupabaseUser will populate shortly
  }
});
