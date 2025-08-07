/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    fontFamily: {
      inter: "Inter",
      anton: "Anton",
    },
    screens: {
      sm: "768px",
      // => @media (min-width: 576px) { ... }

      md: "1024px",
      // => @media (min-width: 960px) { ... }

      lg: "1360px",
      // => @media (min-width: 1360px) { ... }
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1rem",
        lg: "60px",
      },
    },
    extend: {
      backgroundImage: {
        "custom-bg": "url('@/assets/img/hero-bg.svg')",
      },
    },
  },
  plugins: [],
};
