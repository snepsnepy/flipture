// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@pinia/nuxt",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@vee-validate/nuxt",
    "motion-v/nuxt",
    "@nuxt/icon",
  ],

  nitro: {
    preset: "netlify",
  },

  experimental: {
    payloadExtraction: false,
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@supabase/ssr",
        "@supabase/supabase-js",
        "@supabase/postgrest-js",
        "@supabase/storage-js",
        "@supabase/realtime-js",
        "@supabase/functions-js",
      ],
    },
  },
  app: {
    head: {
      title: "Flipture",
    },
  },
  ssr: true,
  typescript: {
    typeCheck: false,
  },
  build: {
    transpile: ["vee-validate"],
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
    types: "~/types/supabase.ts",
    cookieOptions: {
      maxAge: 60 * 60 * 8, // 8 hours
      sameSite: "lax",
      secure: true, // Always use secure cookies
    },
    clientOptions: {
      auth: {
        flowType: "pkce",
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  },
  runtimeConfig: {
    // Server-only runtime config (not exposed to client)
    ga4PropertyId: process.env.GA4_PROPERTY_ID,
    ga4ClientEmail: process.env.GA4_CLIENT_EMAIL,
    ga4PrivateKey: process.env.GA4_PRIVATE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    supabaseSecretKey: process.env.SUPABASE_SECRET_KEY,
    resendApiKey: process.env.RESEND_API_KEY,
    resendFromEmail: process.env.RESEND_FROM_EMAIL,
    sendEmails: process.env.SEND_EMAILS,
    public: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      stripeStandardPriceId: process.env.STRIPE_STANDARD_PRICE_ID,
      stripePremiumPriceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    },
  },
});
