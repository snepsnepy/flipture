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
                    class="h-5 opacity-50"
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
                    class="h-5 opacity-50"
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
                    class="h-5 opacity-50"
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

        <div class="flex flex-col gap-3">
          <label class="label flex items-start">
            <input
              type="checkbox"
              v-model="terms"
              class="checkbox rounded-[6px] checked:bg-primary checked:text-primary-content"
            />
            <span
              class="text-sm leading-4 text-base-content font-poppins whitespace-normal hover:cursor-default"
              >By creating an account, I agree to the
              <UnderlineLink
                @click="navigateToTerms"
                text-class="text-primary font-medium font-poppins"
              >
                Terms of Service
              </UnderlineLink>
              and acknowledge the
              <UnderlineLink
                @click="navigateToPrivacyPolicy"
                text-class="text-primary font-medium font-poppins"
              >
                Privacy Policy </UnderlineLink
              >.
            </span>
          </label>

          <label class="label flex items-start">
            <input
              type="checkbox"
              v-model="marketingOptIn"
              class="checkbox rounded-[6px] checked:bg-primary checked:text-primary-content"
            />
            <span
              class="text-sm leading-4 text-base-content font-poppins whitespace-normal hover:cursor-default"
            >
              I'd like to receive occasional product updates and special offers
              from Flipture.
              <span class="text-base-content/50">(Optional)</span>
            </span>
          </label>
        </div>

        <section
          class="bg-error/20 border-2 border-error p-2 rounded-2xl flex flex-row gap-2 items-center"
          v-if="errorMessage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                stroke="#ff3f33"
                stroke-linecap="round"
                stroke-width="1.5"
                d="M12 7v6"
              />
              <circle cx="12" cy="16" r="1" fill="#ff3f33" />
              <path
                stroke="#ff3f33"
                stroke-linecap="round"
                stroke-width="1.5"
                d="M9.216 3c1.18-.667 1.954-1 2.784-1c1.114 0 2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594s-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22s-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7C3.996 6.22 4.719 5.682 6 4.9"
              />
            </g>
          </svg>
          <span
            class="text-error text-base leading-4 font-semibold font-poppins"
            >{{ errorMessage }}</span
          >
        </section>

        <motion.button
          :disabled="isButtonDisabled"
          :whileHover="{ scale: 1.05 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
          type="button"
          class="w-full py-4 md:px-10 bg-primary rounded-3xl border border-primary-content text-primary-content hover:cursor-pointer hover:bg-primary/80 font-poppins font-medium text-base transition-[background-color,border-color,color,opacity] duration-200 disabled:opacity-50 disabled:pointer-events-none"
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
          <UnderlineLink
            @click="goToLogin"
            text-class="text-primary font-medium font-poppins"
          >
            Login
          </UnderlineLink>
        </footer>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useIsMobile } from "~/composables/useIsMobile";
import { createRegisterSchema } from "~~/schema/form.schema";
import { motion } from "motion-v";

definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();

const errorMessage = ref("");
const isLoading = ref(false);
const isAuthenticating = useState("isAuthenticating", () => false);
const terms = ref(false);
const marketingOptIn = ref(false);
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

onMounted(() => {
  // Reset authenticating state when landing on register page
  isAuthenticating.value = false;
});

const signUp = async () => {
  isLoading.value = true;
  isAuthenticating.value = true;

  const { data, error } = await client.auth.signUp({
    email: email.value as string,
    password: password.value as string,
    options: {
      data: {
        full_name: `${firstName.value} ${lastName.value}`,
        firstName: firstName.value as string,
        lastName: lastName.value as string,
        terms_accepted: true,
        terms_version: '2026-02-02',
        marketing_opt_in: marketingOptIn.value,
      },
    },
  });

  if (!error && data.user) {
    // NOTE: Welcome email will be sent AFTER email verification
    // See: server/api/auth/send-welcome-on-verify.ts
    // This ensures users only get ONE email at registration (the verification email)
    // and receive the welcome email AFTER they confirm their email address

    // Keep loading state visible for smooth transition
    await new Promise((resolve) => setTimeout(resolve, 300));
    await navigateTo({ name: "login" });
    // Reset after navigation completes
    isAuthenticating.value = false;
  } else if (error) {
    console.log(error.message);
    errorMessage.value = error.message;
    isLoading.value = false;
    isAuthenticating.value = false;
  }
};

const goToLogin = () => {
  return navigateTo({ name: "login" });
};

const navigateToTerms = () => {
  return navigateTo({ name: "terms" });
};

const navigateToPrivacyPolicy = () => {
  return navigateTo({ name: "privacy-policy" });
};
</script>
