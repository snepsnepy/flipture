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
          class="text-primary-content text-2xl leading-6 md:text-6xl md:leading-16 font-poppins font-medium p-6 pb-8 relative z-10"
        >
          Flip the ordinary <br />
          into extraordinary.
        </p>
      </div>

      <!-- Right Side -->
      <div class="w-full flex flex-col gap-8 md:gap-10 lg:max-w-[500px]">
        <header class="flex flex-col gap-4">
          <h1
            class="text-[40px] leading-10 font-medium font-poppins text-base-content -tracking-[0.2%]"
          >
            Welcome back <Icon name="noto-v1:waving-hand" />
          </h1>
          <p class="text-base-content text-base leading-4 font-poppins">
            New to Flipture?
            <UnderlineLink
              @click="goToRegister"
              text-class="text-base leading-4 text-primary font-medium font-poppins"
            >
              Sign Up
            </UnderlineLink>
          </p>
        </header>

        <section class="flex flex-col gap-6 md:gap-8">
          <div class="flex flex-col gap-4">
            <!-- Email & Password -->
            <div class="flex flex-col gap-4">
              <Input
                label="Email"
                name="email"
                type="text"
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
                v-model="password"
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
            </div>

            <UnderlineLink
              @click="openForgotPasswordModal"
              text-class="text-sm leading-4 text-primary font-medium font-poppins"
            >
              Forgot your password?
            </UnderlineLink>
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
            type="button"
            :disabled="isButtonDisabled"
            :whileHover="{ scale: 1.05 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
            class="w-full py-3 md:py-4 md:px-10 rounded-3xl font-poppins font-medium border border-primary-content text-base transition-[background-color,border-color,color,opacity] duration-200 bg-primary text-primary-content hover:cursor-pointer hover:bg-primary/80 disabled:pointer-events-none disabled:opacity-50"
            @click="signUp"
          >
            Sign In
            <span
              v-if="isLoading"
              class="loading loading-spinner loading-md"
            ></span>
          </motion.button>

          <span
            class="text-base-content text-base leading-4 text-center font-poppins"
            >or</span
          >

          <motion.button
            @click="signInWithGoogle"
            :whileHover="{ scale: 1.05 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
            class="btn bg-transparent border border-base-content shadow-none rounded-2xl text-base-content font-medium font-poppins py-6 hover:bg-base-300"
          >
            <Icon name="flat-color-icons:google" :size="24" />
            Sign In with Google
          </motion.button>
        </section>

        <footer
          class="flex gap-4 text-sm leading-4 justify-center font-poppins"
        >
          <a
            href="mailto:contact@flipture.io"
            class="hover:text-primary whitespace-nowrap"
            >Customer Support</a
          >
          <NuxtLink
            @click="navigateToTerms"
            class="hover:text-primary whitespace-nowrap hover:cursor-pointer"
          >
            Terms of Service
          </NuxtLink>
        </footer>
      </div>
    </section>

    <!-- Forgot Password Modal -->
    <ForgotPasswordModal ref="forgotPasswordModal" />
  </section>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import { useIsMobile } from "~/composables/useIsMobile";
import { useForm, useField } from "vee-validate";
import { createLoginSchema } from "~~/schema/form.schema";
import ForgotPasswordModal from "~/components/ForgotPasswordModal.vue";
import { useGtm } from "~/composables/useGtm";

definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const { trackLogin, trackLoginFailed, trackPasswordResetRequested } = useGtm();

const errorMessage = ref("");
const { isMobile } = useIsMobile();
const forgotPasswordModal = ref<InstanceType<typeof ForgotPasswordModal>>();
const validationSchema = createLoginSchema();

const { errors } = useForm({
  validationSchema,
});

const { value: email, errorMessage: emailErrors } = useField<string>("email");
const { value: password, errorMessage: passwordErrors } =
  useField<string>("password");

const isLoading = ref(false);
const isAuthenticating = useState("isAuthenticating", () => false);

onMounted(() => {
  // Reset sign-out state when login page loads
  const flipbookStore = useFlipbookStore();
  flipbookStore.setSigningOut(false);

  // Reset authenticating state when landing on login page
  isAuthenticating.value = false;

  // Only redirect if user is already authenticated when landing on login page
  // This prevents redirect loops during page refresh
  if (user.value) {
    navigateTo("/dashboard");
  }
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
  isAuthenticating.value = true;

  const { data, error } = await client.auth.signInWithPassword({
    email: email.value as string,
    password: password.value as string,
  });

  if (!error && data.user) {
    trackLogin('email');

    // Send welcome email on first login after verification
    try {
      $fetch("/api/auth/check-and-send-welcome", {
        method: "POST",
        body: { userId: data.user.id },
      }).catch((err) => {
        console.error("Welcome email check error:", err);
      });
    } catch (emailError) {
      console.error("Welcome email error:", emailError);
    }

    // Keep loading state visible for smooth transition
    await new Promise((resolve) => setTimeout(resolve, 300));
    await navigateTo({ name: "dashboard" });
    // Reset after navigation completes
    isAuthenticating.value = false;
  } else if (error) {
    trackLoginFailed('email', error.message);
    console.error(error.message);
    errorMessage.value = error.message;
    isLoading.value = false;
    isAuthenticating.value = false;
  }
};

const signInWithGoogle = async () => {
  trackLogin('google');
  await client.auth.signInWithOAuth({
    provider: "google",
  });
};

const goToRegister = () => navigateTo({ name: "register" });

const openForgotPasswordModal = () => {
  trackPasswordResetRequested();
  forgotPasswordModal.value?.openModal();
};

const navigateToTerms = () => {
  return navigateTo({ name: "terms" });
};
</script>
