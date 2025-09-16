<template>
  <section class="container mx-auto">
    <section
      class="flex flex-col md:flex-row gap-8 md:gap-20 justify-center items-center"
    >
      <!-- Left Side -->
      <div
        v-if="!isMobile"
        class="flex w-full flex-row bg-[url('@/assets/img/magazines.jpg')] bg-cover bg-center bg-no-repeat rounded-3xl items-end h-[750px] relative"
      >
        <!-- Dark overlay mask -->
        <div class="absolute inset-0 bg-base-content/70 rounded-3xl"></div>
        <p
          class="text-primary-content text-2xl leading-6 md:text-6xl md:leading-12 font-medium p-6 pb-8 relative z-10"
        >
          Your documents. <br />
          Reimagined.
        </p>
      </div>

      <!-- Right Side -->
      <div class="w-full flex flex-col gap-8 md:gap-10 lg:max-w-[500px]">
        <header class="flex flex-col gap-4">
          <h1
            class="text-[40px] leading-10 font-black font-poppins text-base-content"
          >
            Sign Up
          </h1>
          <p class="text-base-content text-base leading-4 font-poppins">
            Let's get you started so you can access your account.
          </p>
        </header>

        <section class="flex flex-col gap-6 md:gap-8">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
              <!-- First Name and Last Name -->
              <div class="flex gap-4 w-full">
                <!-- Fisrt Name -->
                <fieldset class="fieldset p-0 w-full">
                  <legend class="fieldset-legend pb-2 !pt-0 font-poppins">
                    First Name
                  </legend>
                  <label
                    class="input validator bg-base-300/20 border-neutral rounded-lg h-10 !outline-none !shadow-none w-full"
                  >
                    <input
                      type="text"
                      placeholder="Type your first name"
                      class="w-full font-poppins text-base leading-4 placeholder:text-sm"
                    />
                  </label>
                </fieldset>

                <!-- LastName -->
                <fieldset class="fieldset p-0 w-full">
                  <legend class="fieldset-legend pb-2 !pt-0 font-poppins">
                    Last Name
                  </legend>
                  <label
                    class="input validator bg-base-300/20 border-neutral rounded-lg h-10 !outline-none !shadow-none w-full"
                  >
                    <input
                      type="text"
                      required
                      placeholder="Type your last name"
                      class="font-poppins text-base leading-4 placeholder:text-sm"
                    />
                  </label>
                </fieldset>
              </div>

              <fieldset class="fieldset p-0">
                <legend class="fieldset-legend pb-2 !pt-0 font-poppins">
                  Email
                </legend>
                <label
                  class="input validator bg-base-300/20 border-neutral rounded-lg h-10 !outline-none !shadow-none w-full"
                >
                  <svg
                    class="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path
                        d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                      ></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="Type your email"
                    class="w-full font-poppins text-base leading-4 placeholder:text-sm"
                  />
                </label>
              </fieldset>

              <fieldset class="fieldset p-0">
                <legend class="fieldset-legend pb-2 !pt-0 font-poppins">
                  Password
                </legend>
                <label
                  class="input validator bg-base-300/20 border-neutral rounded-lg h-10 !outline-none !shadow-none w-full"
                >
                  <svg
                    class="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                      ></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    minlength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    class="font-poppins text-base leading-4 placeholder:text-sm"
                  />
                </label>
              </fieldset>

              <fieldset class="fieldset p-0">
                <legend class="fieldset-legend pb-2 !pt-0 font-poppins">
                  Confirm Password
                </legend>
                <label
                  class="input validator bg-base-300/20 border-neutral rounded-lg h-10 !outline-none !shadow-none w-full"
                >
                  <svg
                    class="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                      ></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    required
                    placeholder="Confirm Password"
                    minlength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    class="font-poppins text-base leading-4 placeholder:text-sm"
                  />
                </label>
              </fieldset>
            </div>
          </div>
        </section>

        <label class="label">
          <input
            type="checkbox"
            :checked="false"
            class="checkbox rounded-[6px] checked:bg-primary checked:text-primary-content"
          />
          <span
            class="text-sm leading-4 text-base-content font-semibold font-poppins whitespace-normal"
            >I agree to all the <a href="#" class="text-primary">Terms</a> and
            <a href="#" class="text-primary">Privacy Policies</a>
          </span>
        </label>

        <button
          type="button"
          class="w-full py-2 md:px-10 bg-primary rounded-full text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content font-poppins font-bold text-base hover:scale-105 transition-all duration-300"
        >
          Create Account
        </button>

        <footer
          class="flex gap-1 text-sm leading-4 justify-center font-poppins"
        >
          Already have an account?
          <span
            @click="goToLogin"
            class="whitespace-nowrap font-medium text-primary hover:cursor-pointer"
            >Login</span
          >
        </footer>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useIsMobile } from "~/composables/useIsMobile";

definePageMeta({
  layout: "auth",
});

const { isMobile } = useIsMobile();

const goToLogin = () => navigateTo("/login");
</script>

<style scoped></style>
