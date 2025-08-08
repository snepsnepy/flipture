// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: "Flipture",
    },
  },
  ssr: false,
  modules: ["@pinia/nuxt", "@nuxt/fonts", "@vueuse/nuxt"],
  typescript: {
    typeCheck: true,
  },
});
