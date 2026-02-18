<template>
  <section class="container mx-auto h-screen flex items-center justify-center">
    <div
      class="w-full max-w-md space-y-6 p-6 bg-base-200 rounded-3xl border-2 border-base-content"
    >
      <div class="text-center">
        <h1 class="font-delight font-bold text-3xl mb-2">Reset Password</h1>
        <p class="text-sm text-base-content/80 font-poppins">
          Enter your new password below
        </p>
      </div>

      <div
        v-if="!isValidSession"
        class="flex items-start gap-2 font-poppins text-base leading-4 bg-error p-3 rounded-2xl text-primary-content"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Invalid or expired reset link. Please request a new one.</span>
      </div>

      <div v-else class="space-y-4">
        <div>
          <Input
            v-model="newPassword"
            label=""
            name="new-password"
            type="password"
            placeholder="New password"
            :error-message="passwordError"
            @blur="validatePassword"
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

        <div>
          <Input
            v-model="confirmPassword"
            label=""
            name="confirm-password"
            type="password"
            placeholder="Confirm new password"
            :error-message="confirmPasswordError"
            @blur="validateConfirmPassword"
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

        <motion.button
          type="button"
          :disabled="isLoading || !canSubmit"
          :whileHover="{ scale: 1.05 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
          class="w-full py-3 md:py-4 md:px-10 rounded-3xl font-poppins font-medium border border-primary-content text-base transition-[background-color,border-color,color,opacity] duration-200 bg-primary text-primary-content hover:cursor-pointer hover:bg-primary/80 disabled:pointer-events-none disabled:opacity-50"
          @click="handleResetPassword"
        >
          Reset Password
          <span
            v-if="isLoading"
            class="loading loading-spinner loading-md"
          ></span>
        </motion.button>

        <div class="text-center">
          <UnderlineLink
            @click="navigateToLogin"
            text-class="text-sm leading-4 text-primary font-medium font-poppins"
            :thickness="'h-0.25'"
          >
            Back to Login
          </UnderlineLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import Input from "~/components/Input.vue";
import { Toast } from "~/types";

definePageMeta({
  layout: "base",
});

const client = useSupabaseClient();
const router = useRouter();
const { showToast } = useToast();

const newPassword = ref("");
const confirmPassword = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const isLoading = ref(false);
const isValidSession = ref<boolean | null>(null);

const validatePassword = () => {
  passwordError.value = "";
  if (!newPassword.value) {
    passwordError.value = "Password is required";
    return false;
  }
  if (newPassword.value.length < 8) {
    passwordError.value = "Password must be at least 8 characters";
    return false;
  }
  return true;
};

const validateConfirmPassword = () => {
  confirmPasswordError.value = "";
  if (!confirmPassword.value) {
    confirmPasswordError.value = "Please confirm your password";
    return false;
  }
  if (newPassword.value !== confirmPassword.value) {
    confirmPasswordError.value = "Passwords do not match";
    return false;
  }
  return true;
};

const canSubmit = computed(() => {
  return (
    newPassword.value &&
    confirmPassword.value &&
    !passwordError.value &&
    !confirmPasswordError.value &&
    newPassword.value === confirmPassword.value
  );
});

const handleResetPassword = async () => {
  if (!validatePassword() || !validateConfirmPassword()) return;

  isLoading.value = true;

  try {
    const { error } = await client.auth.updateUser({
      password: newPassword.value,
    });

    if (error) {
      throw error;
    }

    showToast(Toast.SUCCESS, {
      toastTitle: "Password Reset Successful",
      description:
        "Your password has been updated. Please login with your new password.",
      duration: 4000,
    });

    // Sign out the user after password reset
    await client.auth.signOut();

    // Redirect to login after a short delay
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (error: any) {
    console.error("Password reset error:", error);
    showToast(Toast.ERROR, {
      toastTitle: "Password Reset Failed",
      description:
        error.message || "Failed to reset password. Please try again.",
    });
  } finally {
    isLoading.value = false;
  }
};

// Only grant access when Supabase fires the PASSWORD_RECOVERY event,
// which exclusively happens when the user arrives via a reset-password email link.
// A regular logged-in user navigating here directly will not trigger this event.
let recoveryDetected = false;

const {
  data: { subscription },
} = client.auth.onAuthStateChange((event) => {
  if (event === "PASSWORD_RECOVERY") {
    recoveryDetected = true;
    isValidSession.value = true;
  }
});

onMounted(async () => {
  // Give Supabase enough time to process the token in the URL and fire onAuthStateChange.
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (recoveryDetected) return;

  // No PASSWORD_RECOVERY event — determine why and respond accordingly.
  try {
    const {
      data: { session },
    } = await client.auth.getSession();

    if (session) {
      // Regular logged-in user who typed the URL manually — send them away.
      await navigateTo("/dashboard");
    } else {
      // No session at all — link is invalid or already expired.
      isValidSession.value = false;
      showToast(Toast.ERROR, {
        toastTitle: "Invalid Reset Link",
        description: "This password reset link is invalid or has expired.",
      });
    }
  } catch (error) {
    console.error("Session check error:", error);
    isValidSession.value = false;
  }
});

onUnmounted(() => {
  subscription.unsubscribe();
});

const navigateToLogin = () => {
  return navigateTo({ name: "login" });
};
</script>
