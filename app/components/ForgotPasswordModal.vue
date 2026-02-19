<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box bg-base-100 border-2 border-base-content rounded-3xl">
      <h3 class="font-delight font-bold text-2xl mb-4">Reset Password</h3>

      <div class="space-y-4">
        <p class="text-sm text-base-content/80 font-poppins">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <Input
          v-model="email"
          label=""
          name="reset-email"
          type="email"
          placeholder="Enter your email"
          :error-message="emailError"
          @blur="validateEmail"
        >
          <template #icon>
            <svg
              class="h-5 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"
              />
            </svg>
          </template>
        </Input>

        <div
          v-if="successMessage"
          class="flex items-center gap-2 font-poppins text-base leading-4 bg-success p-3 rounded-2xl text-success-content"
        >
          <Icon name="cuida:check-circle-outline" size="24" />
          <span>{{ successMessage }}</span>
        </div>

        <div v-if="errorMessage" class="alert alert-error">
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
          <span>{{ errorMessage }}</span>
        </div>

        <div class="modal-action">
          <motion.button
            @click="closeModal"
            :disabled="isLoading"
            type="button"
            :whileHover="{ scale: 1.05 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
            class="w-fit py-2 md:py-4 px-3 md:px-8 bg-base-100 border border-base-content rounded-full text-base-content hover:cursor-pointer hover:bg-base-300 hover:border hover:border-base-content hover:text-base-content font-poppins font-medium text-sm md:text-lg leading-4 transition-[background-color,border-color,color] duration-200"
          >
            Cancel
          </motion.button>
          <motion.button
            @click="handleResetPassword"
            :disabled="isLoading || !email || !!emailError"
            :whileHover="{ scale: 1.05 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
            type="button"
            class="w-fit py-2 md:py-4 px-3 md:px-8 bg-primary border border-primary rounded-full text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content font-poppins font-medium text-sm md:text-lg leading-4 transition-[background-color,border-color,color] duration-200"
          >
            <span
              v-if="isLoading"
              class="loading loading-spinner loading-sm"
            ></span>
            {{ isLoading ? "Sending..." : "Send Reset Link" }}
          </motion.button>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import Input from "./Input.vue";

const modal = ref<HTMLDialogElement | null>(null);
const email = ref("");
const emailError = ref("");
const successMessage = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const client = useSupabaseClient();
const config = useRuntimeConfig();

const validateEmail = () => {
  emailError.value = "";
  if (!email.value) {
    emailError.value = "Email is required";
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = "Please enter a valid email";
    return false;
  }
  return true;
};

const handleResetPassword = async () => {
  if (!validateEmail()) return;

  isLoading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    // Get the current origin for the redirect URL
    const origin = globalThis.location.origin;

    const { error } = await client.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${origin}/reset-password`,
    });

    if (error) {
      throw error;
    }

    successMessage.value = "Password reset link sent! Check your email.";

    // Clear form after 3 seconds and close modal
    // setTimeout(() => {
    //   email.value = "";
    //   successMessage.value = "";
    //   closeModal();
    // }, 3000);
  } catch (error: any) {
    console.error("Password reset error:", error);
    errorMessage.value =
      error.message || "Failed to send reset link. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const openModal = () => {
  modal.value?.showModal();
  // Reset state when opening
  email.value = "";
  emailError.value = "";
  successMessage.value = "";
  errorMessage.value = "";
};

const closeModal = () => {
  modal.value?.close();
};

defineExpose({
  openModal,
  closeModal,
});
</script>
