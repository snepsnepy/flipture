<template>
  <nav
    class="container mx-auto py-0 pt-6"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="navbar p-0 flex flex-row justify-between">
      <div class="navbar-start w-full lg:w-fit justify-between">
        <a
          href="https://flipture.netlify.app"
          class="font-poppins font-bold text-3xl md:text-5xl text-base-content tracking-tighter"
          aria-label="Flipture - Home"
        >
          Flipture.
        </a>
        <div class="dropdown dropdown-end" v-if="!isLoginPage">
          <button
            type="button"
            tabindex="0"
            class="btn btn-ghost lg:hidden py-4 px-2 border border-base-content rounded-full"
            aria-label="Toggle navigation menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            id="mobile-menu"
            class="menu menu-lg dropdown-content bg-white border border-base-300 shadow-md rounded-box z-1 mt-2 w-52 p-2 drop-shadow-md font-poppins font-bold text-sm"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <li role="none">
              <NuxtLink
                class="hover:text-primary hover:cursor-pointer text-base-content"
                to="/"
                role="menuitem"
                >Home</NuxtLink
              >
            </li>
            <li role="none">
              <NuxtLink
                class="hover:text-primary hover:cursor-pointer text-base-content"
                role="menuitem"
                >Features</NuxtLink
              >
            </li>
            <li role="none">
              <NuxtLink
                class="hover:text-primary hover:cursor-pointer text-base-content"
                role="menuitem"
                >Pricing</NuxtLink
              >
            </li>
            <li role="none">
              <NuxtLink
                class="hover:text-primary hover:cursor-pointer text-base-content"
                role="menuitem"
                >FAQs</NuxtLink
              >
            </li>
            <li role="none">
              <NuxtLink
                class="hover:text-primary hover:cursor-pointer text-base-content"
                role="menuitem"
                >Contact</NuxtLink
              >
            </li>
            <HorizontalDivider />
            <li class="pt-4" role="none">
              <button
                type="button"
                class="w-full py-2 px-4 md:px-10 text-center justify-center items-center bg-primary rounded-full text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content font-poppins font-bold text-sm md:text-lg"
                role="menuitem"
              >
                Sign In
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-center hidden lg:flex" v-if="!isLoginPage">
        <ul
          class="menu menu-horizontal px-1 font-poppins font-bold text-lg"
          role="menubar"
          aria-label="Desktop navigation menu"
        >
          <li role="none">
            <NuxtLink
              class="hover:text-primary hover:cursor-pointer text-base-content hover:bg-transparent"
              to="/"
              role="menuitem"
              >Home</NuxtLink
            >
          </li>
          <li role="none">
            <NuxtLink
              class="hover:text-primary hover:cursor-pointer text-base-content hover:bg-transparent"
              role="menuitem"
              >Features</NuxtLink
            >
          </li>
          <li role="none">
            <NuxtLink
              class="hover:text-primary hover:cursor-pointer text-base-content hover:bg-transparent"
              role="menuitem"
              >Pricing</NuxtLink
            >
          </li>
          <li role="none">
            <NuxtLink
              class="hover:text-primary hover:cursor-pointer text-base-content hover:bg-transparent"
              role="menuitem"
              >FAQs</NuxtLink
            >
          </li>
          <li role="none">
            <NuxtLink
              class="hover:text-primary hover:cursor-pointer text-base-content hover:bg-transparent"
              role="menuitem"
              >Contact</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div class="navbar-end hidden w-fit lg:flex" v-if="!isLoginPage">
        <button
          @click="navigateTo('/login')"
          type="button"
          class="w-fit py-3 px-6 md:px-10 bg-primary rounded-full text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content font-poppins font-bold text-sm md:text-lg hover:scale-105 transition-all duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const route = useRoute();

const isLoginPage = computed(
  () => route.path === "/login" || route.path === "/register"
);
</script>
