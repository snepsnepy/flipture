<template>
  <section class="container mx-auto h-screen flex items-center justify-center">
    <div class="w-full max-w-md space-y-6 p-6 bg-base-200 rounded-3xl border-2 border-base-content">
      <div class="text-center">
        <h1 class="font-delight font-bold text-3xl mb-2">Reset Password</h1>
        <p class="text-sm text-base-content/80 font-poppins">
          Enter your new password below
        </p>
      </div>

      <!-- Loading: waiting for PKCE code exchange -->
      <div v-if="isCheckingSession" class="flex flex-col items-center gap-3 py-4">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <p class="text-sm text-base-content/60 font-poppins">Verifying reset link…</p>
      </div>

      <div v-else-if="!isValidSession" class="alert alert-error">
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
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
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
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
            </template>
          </Input>
        </div>

        <button
          type="button"
          class="w-full py-4 bg-primary rounded-3xl border border-primary-content text-primary-content hover:bg-primary/80 font-poppins font-medium text-base transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
          @click="handleResetPassword"
          :disabled="isLoading || !canSubmit"
        >
          <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
          {{ isLoading ? 'Resetting...' : 'Reset Password' }}
        </button>

        <div class="text-center">
          <NuxtLink
            to="/login"
            class="text-sm text-primary hover:underline font-poppins"
          >
            Back to Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Input from '~/components/Input.vue';
import { Toast } from '~/types';

definePageMeta({
  layout: 'auth',
});

const client = useSupabaseClient();
const router = useRouter();
const route = useRoute();
const { showToast } = useToast();

const newPassword = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const isLoading = ref(false);
const isValidSession = ref(false);
const isCheckingSession = ref(true);

const validatePassword = () => {
  passwordError.value = '';
  if (!newPassword.value) {
    passwordError.value = 'Password is required';
    return false;
  }
  if (newPassword.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters';
    return false;
  }
  return true;
};

const validateConfirmPassword = () => {
  confirmPasswordError.value = '';
  if (!confirmPassword.value) {
    confirmPasswordError.value = 'Please confirm your password';
    return false;
  }
  if (newPassword.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match';
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
      toastTitle: 'Password Reset Successful',
      description: 'Your password has been updated. Please login with your new password.',
      duration: 4000,
    });

    // Sign out the user after password reset
    await client.auth.signOut();

    // Redirect to login after a short delay
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  } catch (error: any) {
    console.error('Password reset error:', error);
    showToast(Toast.ERROR, {
      toastTitle: 'Password Reset Failed',
      description: error.message || 'Failed to reset password. Please try again.',
    });
  } finally {
    isLoading.value = false;
  }
};

const markInvalid = () => {
  isValidSession.value = false;
  isCheckingSession.value = false;
  showToast(Toast.ERROR, {
    toastTitle: 'Invalid Reset Link',
    description: 'This password reset link is invalid or has expired.',
  });
};

// Check if user has a valid session from the reset link.
// With PKCE flow, Supabase sends a `code` or `token_hash` in the URL which the
// client exchanges asynchronously for a session. We must wait for the
// PASSWORD_RECOVERY auth event instead of calling getSession() immediately,
// otherwise we race against the code exchange and always find no session.
onMounted(async () => {
  // Listen for PASSWORD_RECOVERY — fires once the code/token from the email
  // link has been successfully exchanged for a session.
  const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      isValidSession.value = true;
      isCheckingSession.value = false;
    } else if (event === 'INITIAL_SESSION') {
      if (session) {
        // Already has an active session (e.g. user refreshed after code exchange)
        isValidSession.value = true;
        isCheckingSession.value = false;
      } else if (!route.query.code && !route.query.token_hash) {
        // No session and no reset params in URL → definitely an invalid link
        markInvalid();
      }
      // If reset params exist, keep waiting for the PASSWORD_RECOVERY event
    }
  });

  onUnmounted(() => subscription.unsubscribe());

  // Safety timeout: if the auth state never resolves (e.g. expired/invalid code),
  // stop the spinner and show an error after 10 seconds.
  setTimeout(() => {
    if (isCheckingSession.value) {
      markInvalid();
    }
  }, 10000);
});
</script>
