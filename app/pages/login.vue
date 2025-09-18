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
          Flip the ordinary <br />
          into extraordinary.
        </p>
      </div>

      <!-- Right Side -->
      <div class="w-full flex flex-col gap-8 md:gap-10 lg:max-w-[500px]">
        <header class="flex flex-col gap-4">
          <h1
            class="text-[40px] leading-10 font-black font-poppins text-base-content -tracking-[0.2%]"
          >
            Welcome back
          </h1>
          <p class="text-base-content text-base leading-4 font-poppins">
            New to Flipture?
            <span
              class="text-primary font-semibold hover:cursor-pointer"
              @click="goToRegister"
              >Sign Up</span
            >
          </p>
        </header>

        <section class="flex flex-col gap-6 md:gap-8">
          <div class="flex flex-col gap-4">
            <!-- Email & Password -->
            <div class="flex flex-col gap-4">
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
                    name="email"
                    type="text"
                    v-model="email"
                    placeholder="Type your email"
                    class="w-full font-poppins text-base leading-4 placeholder:text-sm"
                  />
                </label>
                <span
                  class="text-error text-xs leading-3 font-poppins"
                  v-if="emailErrors"
                  >{{ emailErrors }}</span
                >
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
                    name="password"
                    type="password"
                    v-model="password"
                    placeholder="Password"
                    class="font-poppins text-base leading-4 placeholder:text-sm"
                  />
                </label>
                <span
                  class="text-error text-xs leading-3 font-poppins"
                  v-if="passwordErrors"
                  >{{ passwordErrors }}</span
                >
              </fieldset>
            </div>

            <span
              class="text-sm leading-4 text-primary font-semibold font-poppins hover:cursor-pointer"
              >Forget password</span
            >
          </div>

          <button
            type="button"
            :disabled="isButtonDisabled"
            class="'w-full py-2 md:px-10 rounded-full font-poppins font-bold border border-primary-content text-base transition-all duration-300 bg-primary text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content disabled:pointer-events-none disabled:opacity-50"
            @click="signUp"
          >
            Sign In
            <span
              v-if="isLoading"
              class="loading loading-spinner loading-md"
            ></span>
          </button>

          <span
            class="text-base-content text-base leading-4 text-center font-poppins"
            >or</span
          >
          <button
            @click="signInWithGoogle"
            class="btn bg-transparent border border-neutral shadow-none rounded-lg text-base-content py-4 font-poppins"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 48 48"
            >
              <path
                fill="#ffc107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
              />
              <path
                fill="#ff3d00"
                d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
              />
              <path
                fill="#4caf50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
              />
              <path
                fill="#1976d2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
              />
            </svg>
            Sign In with Google
          </button>
        </section>

        <footer
          class="flex gap-2 text-sm leading-4 justify-center font-poppins"
        >
          <a href="#" class="hover:text-primary whitespace-nowrap"
            >Customer Support</a
          >
          <a href="#" class="hover:text-primary whitespace-nowrap"
            >Terms of Service</a
          >
        </footer>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useIsMobile } from "~/composables/useIsMobile";
import { useForm, useField } from "vee-validate";
import { createLoginSchema } from "~~/schema/form.schema";

definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser();

const { isMobile } = useIsMobile();

const validationSchema = createLoginSchema();

const { errors } = useForm({
  validationSchema,
});

const { value: email, errorMessage: emailErrors } = useField("email");
const { value: password, errorMessage: passwordErrors } = useField("password");

const isLoading = ref(false);

onMounted(() => {
  watchEffect(() => {
    if (user.value) {
      return navigateTo("/");
    }
  });
});

const isButtonDisabled = computed(() => !isFormValid.value || isLoading.value);

// Computed property to check if form is valid and has values
const isFormValid = computed(() => {
  return (
    Object.keys(errors.value).length === 0 && email.value && password.value
  );
});

const signUp = async () => {
  isLoading.value = true;
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value as string,
    password: password.value as string,
  });

  if (!error) {
    return navigateTo({ name: "dashboard" });
  } else {
    console.log(error.message);
    isLoading.value = false;
  }
};

const signInWithGoogle = async () => {
  await client.auth.signInWithOAuth({
    provider: "google",
  });
};

const goToRegister = () => navigateTo({ name: "register" });
</script>
