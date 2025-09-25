<template>
  <nav
    class="container mx-auto py-0 pt-6"
    role="navigation"
    aria-label="Main navigation"
  >
    <div
      class="navbar p-0 flex flex-row justify-between border-b border-base-300 pb-5"
    >
      <div class="w-full justify-between items-center flex flex-row">
        <!-- Logo -->
        <NuxtLink
          class="font-poppins font-bold text-3xl md:text-5xl text-base-content tracking-tighter"
          aria-label="Flipture - Home"
          to="/"
        >
          Flipture.
        </NuxtLink>

        <section v-if="isLoggedIn">
          <!-- Menu -->
          <div class="dropdown dropdown-end">
            <button
              type="button"
              tabindex="0"
              class="btn btn-ghost py-4 px-2 border border-base-content rounded-full hover:bg-secondary hover:shadow-none"
              aria-label="Toggle navigation menu"
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
              <li>
                <a
                  class="hover:cursor-pointer hover:bg-base-300 text-base-content active:!text-primary active:!bg-base-300"
                  href="/dashboard"
                  >Dashboard</a
                >
              </li>
              <li role="none">
                <a
                  class="hover:cursor-pointer hover:bg-base-300 text-base-content active:!text-primary active:!bg-base-300"
                  role="menuitem"
                  >Features</a
                >
              </li>
              <li role="none">
                <a
                  class="hover:cursor-pointer hover:bg-base-300 text-base-content active:!text-primary active:!bg-base-300"
                  role="menuitem"
                  >Pricing</a
                >
              </li>
              <li role="none">
                <a
                  class="hover:cursor-pointer hover:bg-base-300 text-base-content active:!text-primary active:!bg-base-300"
                  role="menuitem"
                  >FAQs</a
                >
              </li>
              <li role="none" class="pb-2">
                <a
                  class="hover:cursor-pointer hover:bg-base-300 text-base-content active:!text-primary active:!bg-base-300"
                  role="menuitem"
                  >Contact</a
                >
              </li>
              <HorizontalDivider />
              <li class="pt-2" role="none">
                <button
                  @click="handleAuthAction"
                  type="button"
                  class="w-full py-2 px-4 text-center border border-primary-content justify-center items-center bg-primary rounded-full text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content font-poppins font-bold text-base leading-4 disabled:opacity-50 disabled:pointer-events-none"
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
        <button
          v-else
          @click="isLoginPage ? navigateTo('/register') : navigateTo('/login')"
          type="button"
          class="w-fit py-2 px-6 bg-primary border border-primary-content rounded-full text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content font-poppins font-semibold text-base"
        >
          {{ isLoginPage ? "Sign Up" : "Sign In" }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const route = useRoute();
const client = useSupabaseClient();
const user = useSupabaseUser();

const isLoading = ref(false);

const isLoginPage = computed(
  () => route.path === "/login" || route.path === "/register"
);

const isLoggedIn = computed(() => user.value);

const handleAuthAction = async () => {
  if (isLoggedIn.value) {
    await signOut();
  } else {
    await navigateTo("/login");
  }
};

const signOut = async () => {
  isLoading.value = true;
  const { error } = await client.auth.signOut();
  if (!error) {
    isLoading.value = false;
  }
};
</script>
