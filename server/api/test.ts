export default defineEventHandler(() => {
  return {
    message: "API routes are working!",
    timestamp: new Date().toISOString(),
  };
});
