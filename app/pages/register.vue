<template>
  <section class="container mx-auto">
    <section
      class="flex flex-col md:flex-row gap-8 md:gap-20 justify-center items-center"
    >
      <!-- Left Side -->
      <div
        v-if="!isMobile"
        class="flex w-full flex-row bg-[url('@/assets/img/magazines.jpg')] bg-cover bg-center bg-no-repeat rounded-3xl items-end h-[750px] relative border-2 border-base-content"
      >
        <!-- Dark overlay mask -->
        <div class="absolute inset-0 bg-base-content/70 rounded-2xl"></div>
        <p
          class="text-primary-content text-2xl leading-6 md:text-6xl md:leading-16 font-poppins font-medium p-6 pb-8 relative z-10"
        >
          Your documents. <br />
          Reimagined.
        </p>
      </div>

      <!-- Right Side -->
      <div class="w-full flex flex-col gap-8 md:gap-10 lg:max-w-[500px]">
        <header class="flex flex-col gap-4">
          <div class="flex gap-2 items-center">
            <h1
              class="text-[40px] leading-10 font-medium font-poppins text-base-content -tracking-[0.2%]"
            >
              Sign Up 
            </h1>
            <Icon name="noto-v1:handshake" :size="48" />
          </div>
          <p class="text-base-content text-base leading-4 font-poppins">
            Let's get you started so you can access your account.
          </p>
        </header>

        <section class="flex flex-col gap-6 md:gap-8">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
              <!-- First Name and Last Name -->
              <div class="flex flex-col md:flex-row gap-4 w-full">
                <!-- First Name -->
                <Input
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="Type your first name"
                  v-model:model-value="firstName"
                  :error-message="firstNameErrors"
                  fieldset-class="w-full"
                />

                <!-- Last Name -->
                <Input
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Type your last name"
                  v-model:model-value="lastName"
                  :error-message="lastNameErrors"
                  fieldset-class="w-full"
                />
              </div>

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Type your email"
                v-model:model-value="email"
                :error-message="emailErrors"
              >
                <template #icon>
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
                </template>
              </Input>

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                v-model:model-value="password"
                :error-message="passwordErrors"
              >
                <template #icon>
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
                </template>
              </Input>

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                v-model:model-value="confirmPassword"
                :error-message="confirmPasswordErrors"
              >
                <template #icon>
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
                </template>
              </Input>
            </div>
          </div>
        </section>

        <label class="label flex items-start">
          <input
            type="checkbox"
            v-model="terms"
            class="checkbox rounded-[6px] checked:bg-primary checked:text-primary-content"
          />
          <span
            class="text-sm leading-4 text-base-content font-poppins whitespace-normal hover:cursor-default"
            >By creating an account, I agree to the
            <NuxtLink
              @click="navigateToTerms"
              class="text-primary font-medium underline hover:cursor-pointer"
              >Terms of Service</NuxtLink
            >
            and acknowledge the
            <NuxtLink
              @click="navigateToPrivacyPolicy"
              class="text-primary font-medium underline hover:cursor-pointer"
              >Privacy Policy</NuxtLink
            >.
          </span>
        </label>

        <motion.button
          :disabled="isButtonDisabled"
          :whileHover="{ scale: 1.05 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
          type="button"
          class="w-full py-4 md:px-10 bg-primary rounded-3xl border border-primary-content text-primary-content hover:cursor-pointer hover:bg-primary/80 font-poppins font-medium text-base transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
          @click="signUp"
        >
          Create Account
          <span
            v-if="isLoading"
            class="loading loading-spinner loading-md"
          ></span>
        </motion.button>

        <footer
          class="flex gap-1 text-sm leading-4 justify-center font-poppins"
        >
          Already have an account?
          <span
            @click="goToLogin"
            class="whitespace-nowrap font-medium text-primary hover:cursor-pointer hover:underline"
            >Login</span
          >
        </footer>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useIsMobile } from "~/composables/useIsMobile";
import { createRegisterSchema } from "~~/schema/form.schema";
import { motion } from "motion-v"

definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();

const isLoading = ref(false);
const terms = ref(false);
const { isMobile } = useIsMobile();
const validationSchema = createRegisterSchema();

const { errors } = useForm({
  validationSchema,
});

const { value: firstName, errorMessage: firstNameErrors } =
  useField<string>("firstName");
const { value: lastName, errorMessage: lastNameErrors } =
  useField<string>("lastName");
const { value: email, errorMessage: emailErrors } = useField<string>("email");
const { value: password, errorMessage: passwordErrors } =
  useField<string>("password");
const { value: confirmPassword, errorMessage: confirmPasswordErrors } =
  useField<string>("confirmPassword");

const isFormValid = computed(() => {
  return (
    Object.keys(errors.value).length === 0 &&
    firstName.value &&
    lastName.value &&
    email.value &&
    password.value &&
    confirmPassword.value &&
    terms.value
  );
});

const isButtonDisabled = computed(() => !isFormValid.value || isLoading.value);

const signUp = async () => {
  isLoading.value = true;
  const { data, error } = await client.auth.signUp({
    email: email.value as string,
    password: password.value as string,
    options: {
      data: {
        firstName: firstName.value as string,
        lastName: lastName.value as string,
      },
    },
  });

  if (!error) {
    return navigateTo({ name: "login" });
  } else {
    console.log(error.message);
    isLoading.value = false;
  }
};

const goToLogin = () => {
  return navigateTo({ name: "login" });
} 

const navigateToTerms = () => {
  return navigateTo({ name: "terms" });
};

const navigateToPrivacyPolicy = () => {
  return navigateTo({ name: "privacy-policy" });
};
</script>
