// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Flipture",
    },
  },
  ssr: false,
  modules: ["@pinia/nuxt", "@nuxt/fonts", "@nuxtjs/tailwindcss"],
  typescript: {
    typeCheck: true,
  },
});
