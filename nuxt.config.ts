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
  modules: [
    "@pinia/nuxt",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@vee-validate/nuxt",
  ],
  typescript: {
    typeCheck: true,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },
});
