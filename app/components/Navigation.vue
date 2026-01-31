<template>
  <nav
    class="container mx-auto py-0 pt-3 md:pt-6"
    role="navigation"
    aria-label="Main navigation"
  >
    <div
        class="navbar p-0 flex flex-row justify-between border-b border-base-300 pb-3 md:pb-6 "
      >
      <div class="w-full justify-between items-center flex flex-row">
        <!-- Logo -->
        <NuxtLink
          class="font-poppins font-medium text-3xl md:text-5xl text-base-content tracking-tighter"
          aria-label="Flipture - Home"
          to="/"
        >
          Flipture
        </NuxtLink>

        <section v-if="isLoggedIn">
          <!-- Menu -->
          <div class="dropdown dropdown-end z-9999">
            <ActionButton
              aria-label="Toggle navigation menu"
              aria-controls="mobile-menu"
              tabindex="0"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
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
              </template>
            </ActionButton>

            <ul
              id="mobile-menu"
              class="menu menu-lg dropdown-content bg-white border border-base-300 shadow-md rounded-box z-1 mt-2 w-52 p-2 drop-shadow-md font-poppins font-medium text-sm"
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <li>
                <NuxtLink
                  class="hover:cursor-pointer hover:bg-base-300 text-base-content active:!text-primary active:!bg-base-300"
                  to="/dashboard"
                  @click="close"
                  >Dashboard</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  class="hover:cursor-pointer hover:bg-base-300 text-base-content active:!text-primary active:!bg-base-300"
                  to="/settings"
                  @click="close"
                  >Account</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  class="hover:cursor-pointer hover:bg-base-300 text-base-content active:!text-primary active:!bg-base-300"
                  to="/stats"
                  @click="close"
                  >Analytics</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  class="hover:cursor-pointer hover:bg-base-300 text-base-content active:!text-primary active:!bg-base-300"
                  to="/pricing"
                  @click="close"
                  >Pricing</NuxtLink
                >
              </li>
              <li role="none">
                <a
                  class="hover:cursor-pointer hover:bg-base-300 text-base-content active:!text-primary active:!bg-base-300"
                  role="menuitem"
                  >FAQs</a
                >
              </li>
              <HorizontalDivider class="pt-2 pb-1"/>
              <li class="pt-2" role="none">
                <button
                  @click="handleAuthAction"
                  type="button"
                  class="w-full py-2 px-4 text-center border border-primary-content justify-center items-center bg-primary rounded-full text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content font-poppins font-medium text-base leading-4 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300"
                  role="menuitem"
                  :disabled="isLoading"
                >
                  {{ isLoggedIn ? "Sign Out" : "Sign In" }}
                  <span
                    v-if="isLoading"
                    class="loading loading-spinner loading-md"
                  ></span>
                </button>
              </li>
            </ul>
          </div>
        </section>

        <section v-else class="flex flex-row gap-2 relative z-20">
          <button
            @click="navigateToLogin"
            type="button"
            class="w-fit py-2 md:py-4 px-3 md:px-8 bg-base-100 border border-base-content rounded-full text-base-content hover:cursor-pointer hover:bg-base-300 hover:border hover:border-base-content hover:text-base-content font-poppins font-medium text-sm md:text-lg leading-4 transition-all duration-300"
          >
            Sign In
          </button>
          <button
            @click="navigateToRegister"
            type="button"
            class="w-fit py-2 md:py-4 px-3 md:px-8 bg-primary border border-primary rounded-full text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content font-poppins font-medium text-sm md:text-lg leading-4 transition-all duration-300"
          >
            Sign Up
          </button>
        </section>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useFlipbookStore } from "~/stores/useFlipbookStore";

const route = useRoute();
const client = useSupabaseClient();
const user = useSupabaseUser();
const flipbookStore = useFlipbookStore();

const isLoading = ref(false);

const isLoggedIn = computed(() => user.value);

const handleAuthAction = async () => {
  if (isLoggedIn.value) {
    await signOut();
  } else {
    await navigateTo({ name: "login" });
  }
};

const signOut = async () => {
  isLoading.value = true;
  flipbookStore.setSigningOut(true);
  const { error } = await client.auth.signOut();

  // Even if there's an error (e.g., session already expired/deleted),
  // we should still clear local data and redirect to login
  // Common error: "Session from session_id claim in JWT does not exist"
  if (!error || error.message?.includes("session") || error.status === 403) {
    // Clear flipbook cache on logout
    flipbookStore.invalidateCache();
    isLoading.value = false;
    await navigateTo({ name: "login" });
    // Keep isSigningOut true until navigation completes
  } else {
    // Only keep user logged in for unexpected errors
    console.error("Unexpected sign out error:", error);
    flipbookStore.setSigningOut(false);
    isLoading.value = false;
  }
};

const close = () => {
  // Close dropdown by removing focus from the dropdown button
  if (typeof document !== "undefined" && document.activeElement) {
    (document.activeElement as HTMLElement).blur();
  }
};

const navigateToLogin = () => {
  return navigateTo({ name: "login" });
};

const navigateToRegister = () => {
  return navigateTo({ name: "register" });
};
</script>
