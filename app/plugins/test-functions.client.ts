export default defineNuxtPlugin(() => {
  // Only add test functions in development
  if (process.dev) {
    // Make test functions available globally in browser console
    if (process.client) {
      const { $supabase } = useNuxtApp();

      // Add test functions to window object for easy console access
      (window as any).testFlipbooks = {
        create: async () => {
          const { testCreateFlipbook } = useFlipbooksTest();
          return await testCreateFlipbook();
        },

        getAll: async () => {
          const { testGetFlipbooks } = useFlipbooksTest();
          return await testGetFlipbooks();
        },

        delete: async (id: string) => {
          const { testDeleteFlipbook } = useFlipbooksTest();
          return await testDeleteFlipbook(id);
        },

        cleanup: async () => {
          const { cleanupTestFiles } = useFlipbooksTest();
          return await cleanupTestFiles();
        },
      };

      console.log("🧪 Test functions loaded! Try these in console:");
      console.log("  testFlipbooks.create() - Create a test flipbook");
      console.log("  testFlipbooks.getAll() - Get all your flipbooks");
      console.log('  testFlipbooks.delete("flipbook-id") - Delete a flipbook');
      console.log("  testFlipbooks.cleanup() - Clean up all test files");
    }
  }
});
