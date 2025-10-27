export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/settings"];

  if (!user.value && protectedRoutes.includes(to.path)) {
    return navigateTo("/login");
  }
});
