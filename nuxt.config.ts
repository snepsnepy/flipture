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
    cookieOptions: {
      maxAge: 60 * 60 * 8, // 8 hours
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // Only secure in production
    },
  },
  runtimeConfig: {
    // Server-only runtime config (not exposed to client)
    ga4PropertyId: process.env.GA4_PROPERTY_ID,
    ga4ClientEmail: process.env.GA4_CLIENT_EMAIL,
    ga4PrivateKey: process.env.GA4_PRIVATE_KEY,
  },
});
