<template>
  <div class="container mx-auto py-8">
    <!-- Loading Spinner -->
    <div
      v-if="isLoading"
      class="flex justify-center flex-col items-center min-h-[calc(100vh-300px)]"
    >
      <div class="loading loading-spinner loading-lg"></div>
      <span
        class="text-base-content text-2xl leading-8 font-semibold font-poppins"
      >
        Loading...
      </span>
    </div>

    <!-- Main Content -->
    <section v-else class="flex flex-col gap-8">
      <!-- Header -->
      <header class="flex flex-col gap-4">
        <h1 class="font-delight font-bold text-4xl leading-8 text-base-content">
          Settings
        </h1>
        <p class="text-base-content text-lg font-poppins">
          Manage your account settings
        </p>
        <div class="border-t border-base-300"></div>
      </header>

      <!-- Settings Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Profile Information -->
        <section class="bg-base-200 rounded-3xl p-6 md:p-8">
          <header class="flex items-center gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="text-primary"
            >
              <g fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </g>
            </svg>
            <h2 class="font-poppins font-bold text-xl text-base-content">
              Profile Information
            </h2>
          </header>

          <div class="space-y-4">
            <!-- Full Name -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-base-content"
                >Full Name</label
              >
              <div class="flex gap-2">
                <input
                  v-model="firstName"
                  placeholder="First Name"
                  class="flex-1 input input-bordered rounded-2xl"
                />
                <input
                  v-model="lastName"
                  placeholder="Last Name"
                  class="flex-1 input input-bordered rounded-2xl"
                />
              </div>
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-base-content"
                >Email</label
              >
              <input
                v-model="email"
                type="email"
                placeholder="Email"
                disabled
                class="w-full input input-bordered rounded-2xl"
              />
              <p class="text-xs text-base-content/70">
                Email cannot be changed
              </p>
            </div>

            <!-- Account Info -->
            <div class="bg-base-100 rounded-2xl p-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-base-content/70">Account Type:</span>
                <span class="text-sm font-semibold text-base-content">
                  {{
                    userProvider === "google"
                      ? "Google Account"
                      : "Email Account"
                  }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-base-content/70">Member Since:</span>
                <span class="text-sm font-semibold text-base-content">
                  {{ formatDate(userCreatedAt) }}
                </span>
              </div>
            </div>

            <!-- Save Button -->
            <button
              @click="updateProfile"
              :disabled="!canSaveProfile || isUpdating"
              class="w-full py-3 px-6 bg-primary border border-primary-content rounded-3xl text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content font-poppins font-bold text-base transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
            >
              {{ isUpdating ? "Saving..." : "Save Changes" }}
            </button>
          </div>
        </section>

        <!-- Security -->
        <section class="bg-base-200 rounded-3xl p-6 md:p-8">
          <header class="flex items-center gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="text-primary"
            >
              <g fill="none" stroke="currentColor" stroke-width="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </g>
            </svg>
            <h2 class="font-poppins font-bold text-xl text-base-content">
              Security
            </h2>
          </header>

          <div class="space-y-6">
            <!-- Password Change -->
            <div class="space-y-4">
              <h3 class="font-poppins font-semibold text-lg text-base-content">
                Change Password
              </h3>

              <div class="space-y-3">
                <input
                  v-model="currentPassword"
                  type="password"
                  placeholder="Current Password"
                  class="w-full input input-bordered rounded-2xl"
                />
                <input
                  v-model="newPassword"
                  type="password"
                  placeholder="New Password"
                  class="w-full input input-bordered rounded-2xl"
                />
                <input
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Confirm New Password"
                  class="w-full input input-bordered rounded-2xl"
                />
              </div>

              <button
                @click="changePassword"
                :disabled="!canChangePassword || isChangingPassword"
                class="w-full py-3 px-6 bg-primary border border-primary-content rounded-3xl text-primary-content hover:cursor-pointer hover:bg-primary-content hover:border hover:border-base-content hover:text-base-content font-poppins font-bold text-base transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg
                  v-if="isChangingPassword"
                  class="animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97-.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                  />
                </svg>
                {{ isChangingPassword ? "Changing..." : "Change Password" }}
              </button>
            </div>

            <div class="border-t border-base-300"></div>

            <!-- Sign Out -->
            <div class="space-y-4">
              <h3 class="font-poppins font-semibold text-lg text-base-content">
                Account Actions
              </h3>

              <button
                @click="signOut"
                :disabled="isSigningOut"
                class="w-full bg-error border-error-content text-error-content hover:bg-error-content hover:text-error"
              >
                <svg
                  v-if="isSigningOut"
                  class="animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01-.25-1.97-.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                  />
                </svg>
                {{ isSigningOut ? "Signing Out..." : "Sign Out" }}
              </button>
            </div>
          </div>
        </section>
      </div>

      <!-- Account Statistics -->
      <section class="bg-base-200 rounded-3xl p-6 md:p-8">
        <header class="flex items-center gap-3 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="text-primary"
          >
            <g fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </g>
          </svg>
          <h2 class="font-poppins font-bold text-xl text-base-content">
            Account Statistics
          </h2>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-base-100 rounded-2xl p-4 text-center">
            <div class="text-2xl font-bold text-primary mb-1">
              {{ flipbooksCount }}
            </div>
            <div class="text-sm text-base-content/70">Flipbooks Created</div>
          </div>
          <div class="bg-base-100 rounded-2xl p-4 text-center">
            <div class="text-2xl font-bold text-primary mb-1">
              {{ totalViews }}
            </div>
            <div class="text-sm text-base-content/70">Total Views</div>
          </div>
          <div class="bg-base-100 rounded-2xl p-4 text-center">
            <div class="text-2xl font-bold text-primary mb-1">
              {{ storageUsed }}
            </div>
            <div class="text-sm text-base-content/70">Storage Used</div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Toast } from "~/types";

definePageMeta({
  layout: "base",
  middleware: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const { showToast } = useToast();

// Loading states
const isLoading = ref(true);
const isUpdating = ref(false);
const isChangingPassword = ref(false);
const isSigningOut = ref(false);

// Statistics
const flipbooksCount = ref(0);
const totalViews = ref(100); // Placeholder
const storageUsed = ref("0 MB");

// Form data
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

// Computed properties
const userProvider = computed(
  () => user.value?.app_metadata?.provider || "email"
);
const userCreatedAt = computed(() => user.value?.created_at || "");

const canSaveProfile = computed(() => {
  return firstName.value.trim() && lastName.value.trim();
});

const canChangePassword = computed(() => {
  return (
    currentPassword.value.trim() &&
    newPassword.value.trim() &&
    confirmPassword.value.trim() &&
    newPassword.value === confirmPassword.value &&
    newPassword.value.length >= 6
  );
});

// Methods
const formatDate = (dateString: string) => {
  if (!dateString) return "Unknown";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const loadUserData = async () => {
  try {
    isLoading.value = true;

    // Load user profile data
    if (user.value) {
      const userMetadata = user.value.user_metadata;
      firstName.value = userMetadata?.firstName || "";
      lastName.value = userMetadata?.lastName || "";
      email.value = user.value.email || "";
    }

    // Load flipbooks count
    const { data: flipbooksData } = await client
      .from("flipbooks")
      .select("id")
      .eq("user_id", user.value?.id!);

    flipbooksCount.value = flipbooksData?.length || 0;

    // Calculate storage
    const { data: flipbooksWithSize } = await client
      .from("flipbooks")
      .select("pdf_file_size")
      .eq("user_id", user.value?.id!);

    const totalSize =
      flipbooksWithSize?.reduce(
        (sum, flipbook) => sum + ((flipbook as any).pdf_file_size || 0),
        0
      ) || 0;

    storageUsed.value = `${Math.round(totalSize / 1024 / 1024)} MB`;
  } catch (error) {
    console.error("Error loading user data:", error);
    showToast(Toast.ERROR, {
      toastTitle: "Error loading account data",
    });
  } finally {
    isLoading.value = false;
  }
};

const updateProfile = async () => {
  try {
    isUpdating.value = true;

    const { error } = await client.auth.updateUser({
      data: {
        firstName: firstName.value,
        lastName: lastName.value,
      },
    });

    if (error) {
      throw error;
    }

    showToast(Toast.SUCCESS, {
      toastTitle: "Profile updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    showToast(Toast.ERROR, {
      toastTitle: "Failed to update profile",
      description: error.message,
    });
  } finally {
    isUpdating.value = false;
  }
};

const changePassword = async () => {
  try {
    isChangingPassword.value = true;

    const { error } = await client.auth.updateUser({
      password: newPassword.value,
    });

    if (error) {
      throw error;
    }

    // Clear password form
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";

    showToast(Toast.SUCCESS, {
      toastTitle: "Password changed successfully",
    });
  } catch (error: any) {
    console.error("Error changing password:", error);
    showToast(Toast.ERROR, {
      toastTitle: "Failed to change password",
      description: error.message,
    });
  } finally {
    isChangingPassword.value = false;
  }
};

const signOut = async () => {
  try {
    isSigningOut.value = true;

    const { error } = await client.auth.signOut();

    if (error) {
      throw error;
    }

    await navigateTo("/login");
  } catch (error: any) {
    console.error("Error signing out:", error);
    showToast(Toast.ERROR, {
      toastTitle: "Failed to sign out",
      description: error.message,
    });
  } finally {
    isSigningOut.value = false;
  }
};

onMounted(async () => {
  await loadUserData();
});
</script>
