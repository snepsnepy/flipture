<template>
  <div class="container mx-auto py-0">
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
      <header class="flex flex-col gap-8">
        <div class="flex flex-row items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#0046ff"
              fill-rule="evenodd"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-.47-13.53a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72H16a.75.75 0 0 0 0-1.5H9.81l1.72-1.72a.75.75 0 0 0 0-1.06"
              clip-rule="evenodd"
            />
          </svg>
          <button
            @click="navigateToDashboard"
            class="text-base-content text-base leading-4 font-poppins font-medium hover:cursor-pointer hover:text-primary"
          >
            Back To Dashboard
          </button>
        </div>

        <div
          class="flex flex-col md:flex-row w-full justify-between gap-4 md:items-end border-b border-base-300 pb-4"
        >
          <h1
            class="font-delight font-bold text-4xl leading-6 w-full text-base-content"
          >
            Settings
          </h1>
          <p
            class="text-base-content text-base md:text-lg leading-4 font-poppins whitespace-nowrap"
          >
            Manage your account settings
          </p>
          <div class="border-t border-base-300"></div>
        </div>
      </header>

      <!-- Settings Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Profile Information -->
        <section
          class="bg-base-200 rounded-3xl p-6 md:p-8 border-2 border-base-content shadow-md flex flex-col justify-between gap-y-6"
        >
          <section class="flex flex-col gap-6">
            <header class="flex items-center gap-2">
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

            <div class="flex flex-col gap-4">
              <!-- Full Name -->
              <div class="flex flex-col gap-4">
                <fieldset class="fieldset p-0">
                  <legend
                    class="fieldset-legend pb-2 md:pb-4 !pt-0 font-poppins text-sm md:text-base md:leading-4 text-base-content"
                  >
                    <p>First Name</p>
                  </legend>
                  <label
                    class="input validator border-2 bg-base-100 h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content"
                  >
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
                      v-model="firstName"
                    />
                  </label>
                </fieldset>

                <fieldset class="fieldset p-0">
                  <legend
                    class="fieldset-legend pb-2 md:pb-4 !pt-0 font-poppins text-sm md:text-base md:leading-4 text-base-content"
                  >
                    <p>Last Name</p>
                  </legend>
                  <label
                    class="input validator border-2 bg-base-100 h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content"
                  >
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
                      v-model="lastName"
                    />
                  </label>
                </fieldset>
              </div>

              <!-- Email -->
              <div class="flex flex-col gap-2">
                <fieldset class="fieldset p-0">
                  <legend
                    class="fieldset-legend pb-2 md:pb-4 !pt-0 font-poppins text-sm md:text-base md:leading-4 text-base-content"
                  >
                    <p>Email</p>
                  </legend>
                  <label
                    class="input validator border-2 bg-base-100 h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content pointer-events-none cursor-not-allowed opacity-50"
                  >
                    <input
                      name="email"
                      type="text"
                      placeholder="Email"
                      class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
                      v-model="email"
                    />
                  </label>
                </fieldset>
                <p class="text-xs text-primary">Email cannot be changed</p>
              </div>

              <!-- Account Info -->
              <div class="bg-base-100 rounded-2xl p-4 space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm text-base-content/70"
                    >Account Type:</span
                  >
                  <span class="text-sm font-semibold text-base-content">
                    {{
                      userProvider === "google"
                        ? "Google Account"
                        : "Email Account"
                    }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-base-content/70"
                    >Member Since:</span
                  >
                  <span class="text-sm font-semibold text-base-content">
                    {{ formatDate(userCreatedAt) }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- Save Button -->
          <ActionButton
            type="primary"
            :text="isUpdating ? 'Saving...' : 'Save Changes'"
            class="w-full md:w-1/2"
            @click="updateProfile"
            :disabled="!canSaveProfile || isUpdating"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zM19 7.85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10M5 7.85V19V5z"
                />
              </svg> </template
          ></ActionButton>
        </section>

        <!-- Security -->
        <section
          class="bg-base-200 rounded-3xl p-6 md:p-8 border-2 border-base-content shadow-md"
        >
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
            <div class="space-y-10">
              <div class="flex flex-col gap-10">
                <fieldset class="fieldset p-0">
                  <legend
                    class="fieldset-legend pb-2 md:pb-4 !pt-0 font-poppins text-sm md:text-base md:leading-4 text-base-content"
                  >
                    <p>Change Password</p>
                  </legend>
                  <label
                    class="input validator border-2 bg-base-100 h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content"
                  >
                    <input
                      name="currentPassword"
                      type="text"
                      placeholder="Current Password"
                      class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
                      v-model="currentPassword"
                    />
                  </label>
                </fieldset>
                <label
                  class="input validator border-2 bg-base-100 h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content"
                >
                  <input
                    name="newPassword"
                    type="text"
                    placeholder="New Password"
                    class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
                    v-model="newPassword"
                  />
                </label>
                <label
                  class="input validator border-2 bg-base-100 h-14 !outline-none !shadow-none w-full rounded-2xl border-base-content"
                >
                  <input
                    name="confirmPassword"
                    type="text"
                    placeholder="Confirm Password"
                    class="w-full font-poppins text-xl leading-4 placeholder:text-xl"
                    v-model="confirmPassword"
                  />
                </label>
              </div>

              <ActionButton
                type="primary"
                :text="isChangingPassword ? 'Changing...' : 'Change Password'"
                @click="changePassword"
                class="w-full md:w-1/2"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zM19 7.85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10M5 7.85V19V5z"
                    />
                  </svg>
                </template>
              </ActionButton>
            </div>

            <div class="border-t border-base-300"></div>

            <!-- Sign Out -->
            <div class="flex flex-col gap-2">
              <h3 class="font-poppins font-semibold text-lg text-base-content">
                Account Actions
              </h3>

              <ActionButton
                type="confirmation"
                text="Sign Out"
                @click="signOut"
                class="w-full md:w-1/2"
                :disabled="isSigningOut"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      d="M4 12a1 1 0 0 0 1 1h7.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H5a1 1 0 0 0-1 1M17 2H7a3 3 0 0 0-3 3v3a1 1 0 0 0 2 0V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a1 1 0 0 0-2 0v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3"
                    />
                  </svg>
                </template>
              </ActionButton>
            </div>
          </div>
        </section>
      </div>

      <!-- Account Statistics -->
      <section
        class="bg-base-200 rounded-3xl p-6 md:p-8 border-2 border-base-content shadow-md"
      >
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
          <div
            class="bg-base-100 rounded-2xl p-2 md:p-4 text-center border-2 border-base-content shadow-md"
          >
            <div class="text-2xl font-bold text-primary mb-1">
              {{ flipbooksCount }}
            </div>
            <div class="text-sm text-base-content/70">Flipbooks Created</div>
          </div>
          <div
            class="bg-base-100 rounded-2xl p-2 md:p-4 text-center border-2 border-base-content shadow-md"
          >
            <div class="text-2xl font-bold text-primary mb-1">
              {{ totalViews }}
            </div>
            <div class="text-sm text-base-content/70">Total Views</div>
          </div>
          <div
            class="bg-base-100 rounded-2xl p-2 md:p-4 text-center border-2 border-base-content shadow-md"
          >
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

const navigateToDashboard = () => {
  return navigateTo({ name: "dashboard" });
};

onMounted(async () => {
  await loadUserData();
});
</script>
