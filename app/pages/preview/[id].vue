<template>
  <div class="container mx-auto py-0 flex flex-col gap-6">
    <!-- Navigation Header -->
    <header class="flex flex-col gap-6 items-start">
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
          class="text-base-content text-sm md:text-base leading-4 font-poppins font-medium hover:cursor-pointer hover:text-primary"
        >
          Back
        </button>
      </div>

      <div class="flex flex-col justify-center items-center gap-2 w-full">
        <h1 class="font-delight font-bold text-2xl leading-6 md:text-4xl">
          {{ flipbook?.title }}
        </h1>
        <div class="flex items-end gap-1 text-sm leading-3 text-neutral">
          <span v-if="flipbook?.company_name">by</span>
          <span class="font-semibold text-primary">{{
            flipbook?.company_name
          }}</span>
        </div>
      </div>
    </header>

    <HorizontalDivider />

    <!-- Main Content -->
    <section>
      <div class="flex flex-col-reverse lg:flex-row gap-6">
        <!-- Preview Section -->
        <div class="flex-1 flex flex-col">
          <div
            class="bg-base-200 rounded-[18px] flex-1 min-h-[500px] lg:min-h-[700px] border-2 border-base-content shadow-md flex flex-col"
          >
            <iframe
              v-if="previewUrl"
              :key="iframeKey"
              :src="previewUrl"
              class="w-full flex-1 rounded-2xl"
              title="Flipbook Preview"
              width="100%"
              height="100%"
            ></iframe>
            <div v-else class="flex items-center justify-center h-full">
              <div class="loading loading-spinner loading-lg"></div>
            </div>
          </div>
        </div>

        <!-- Share Section -->
        <div
          class="w-full lg:w-80 border-2 border-base-content rounded-2xl shadow-md bg-base-200 p-6"
        >
          <div class="space-y-6">
            <!-- Share Actions -->
            <div class="space-y-4">
              <h3 class="font-delight font-semibold text-xl">
                Share Your Flipbook
              </h3>

              <!-- Copy Link Button -->
              <ActionButton
                text="Copy Share Link"
                type="primary"
                class="w-full"
                :disabled="isCopying"
                @click="copyShareLink"
              >
                <template #icon>
                  <svg
                    v-if="!isCopying"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="currentColor"
                      d="M768 256H353.6a32 32 0 1 1 0-64H800a32 32 0 0 1 32 32v448a32 32 0 0 1-64 0z"
                    />
                    <path
                      fill="currentColor"
                      d="M777.344 201.344a32 32 0 0 1 45.312 45.312l-544 544a32 32 0 0 1-45.312-45.312z"
                    />
                  </svg>
                  <div v-else class="loading loading-spinner loading-sm"></div>
                </template>
              </ActionButton>

              <!-- Social Share Buttons -->
              <div class="grid grid-cols-2 gap-3">
                <ActionButton
                  text="Twitter"
                  type="secondary"
                  class="w-full"
                  @click="shareOnTwitter"
                >
                  <template #icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M18.244 2.25h3.308l-7.227 8.26l8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      />
                    </svg>
                  </template>
                </ActionButton>

                <ActionButton
                  text="LinkedIn"
                  type="secondary"
                  class="w-full"
                  @click="shareOnLinkedIn"
                >
                  <template #icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065c0-1.138.92-2.063 2.063-2.063c1.14 0 2.064.925 2.064 2.063c0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      />
                    </svg>
                  </template>
                </ActionButton>
              </div>

              <!-- Edit Button -->
              <ActionButton
                text="Edit Details"
                type="secondary"
                class="w-full"
                :class="
                  !hasActiveSubscription ? 'opacity-50 cursor-not-allowed' : ''
                "
                :disabled="!hasActiveSubscription"
                @click="openEditModal"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    >
                      <path
                        d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                      />
                      <path
                        d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
                      />
                    </g>
                  </svg>
                </template>
              </ActionButton>

              <!-- Subscription Warning -->
              <div
                v-if="!hasActiveSubscription"
                class="text-xs text-warning bg-warning/5 p-3 rounded-lg text-center border border-neutral"
              >
                <p
                  class="font-semibold font-poppins text-warning text-sm leading-3"
                >
                  Active subscription required
                </p>
                <p class="text-base-content/60 mt-1">
                  Upgrade to edit your flipbook details
                </p>
              </div>
            </div>

            <!-- Flipbook Info -->
            <div class="space-y-2 pt-4 border-t border-base-content/20">
              <h4 class="font-medium text-base-content">Flipbook Details</h4>
              <div class="space-y-2 text-sm leading-4">
                <div class="flex justify-between">
                  <span class="text-neutral">Created:</span>
                  <span class="text-base-content">{{
                    formatDate(flipbook?.created_at)
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral">File:</span>
                  <span
                    class="text-base-content truncate max-w-[150px]"
                    :title="flipbook?.pdf_file_name || 'Unknown'"
                  >
                    {{ flipbook?.pdf_file_name || "Unknown" }}
                  </span>
                </div>
                <div v-if="flipbook?.description" class="mt-3">
                  <span class="text-neutral text-xs">Description:</span>
                  <p class="text-sm text-base-content mt-1">
                    {{ flipbook.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Edit Modal -->
    <EditModal
      v-if="flipbook"
      ref="editModal"
      :flipbook="flipbook"
      @confirm="handleEdit"
    />
  </div>
</template>

<script setup lang="ts">
import type { Flipbook } from "~/types";
import type { Database } from "~/types/supabase";
import { Toast } from "~/types";
import dayjs from "dayjs";
import EditModal from "~/components/EditModal.vue";

definePageMeta({
  layout: "base",
  middleware: "auth",
});

const route = useRoute();
const router = useRouter();
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const { showToast } = useToast();
const { hasActiveSubscription } = useSubscriptionPlan();

const flipbookId = route.params.id as string;
const flipbook = ref<Flipbook | null>(null);
const isCopying = ref(false);
const isLoading = ref(true);
const editModal = ref<InstanceType<typeof EditModal>>();
const iframeKey = ref(0);

// Computed properties
const shareUrl = computed(() => {
  if (!flipbook.value) return "";
  return `https://flipture-view.netlify.app/?id=${flipbook.value.id}`;
});

const previewUrl = computed(() => {
  if (!flipbook.value) return "";
  return `https://flipture-view.netlify.app/?id=${flipbook.value.id}&preview=true`;
});

const navigateToDashboard = () => {
  // Navigate back to dashboard with the page query parameter
  const page = route.query.page || "1";
  return navigateTo({
    path: "/dashboard",
    query: { page },
  });
};

const copyShareLink = async () => {
  if (!flipbook.value) return;

  isCopying.value = true;

  try {
    const url = shareUrl.value;

    // Check if the Clipboard API is available
    if (navigator.clipboard && globalThis.isSecureContext) {
      await navigator.clipboard.writeText(url);
      showToast(Toast.SUCCESS, {
        toastTitle: "Link copied!",
        description: "Share link has been copied to your clipboard.",
        duration: 3000,
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();

      showToast(Toast.SUCCESS, {
        toastTitle: "Link copied!",
        description: "Share link has been copied to your clipboard.",
        duration: 3000,
      });
    }
  } catch (error) {
    console.error("Failed to copy link:", error);
    showToast(Toast.ERROR, {
      toastTitle: "Copy failed",
      description: "Unable to copy the link. Please try again.",
    });
  } finally {
    isCopying.value = false;
  }
};

const shareOnTwitter = () => {
  if (!flipbook.value) return;

  const text = `Check out my flipbook "${flipbook.value.title}" created with Flipture!`;
  const url = shareUrl.value;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}`;

  globalThis.open(twitterUrl, "_blank", "width=600,height=400");
};

const shareOnLinkedIn = () => {
  if (!flipbook.value) return;

  const text = `Check out my flipbook "${flipbook.value.title}" created with Flipture!`;
  const url = shareUrl.value;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}&summary=${encodeURIComponent(text)}`;

  globalThis.open(linkedInUrl, "_blank", "width=600,height=400");
};

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "Unknown";
  return dayjs(dateString).format("MMM DD, YYYY");
};

const openEditModal = () => {
  editModal.value?.openModal();
};

const handleEdit = async (data: {
  title: string;
  company_name: string | null;
  description: string | null;
}) => {
  try {
    // Use secure server endpoint that validates subscription
    const response = (await $fetch("/api/flipbooks/update", {
      method: "POST",
      body: {
        flipbookId: flipbookId,
        userId: user.value!.sub,
        title: data.title,
        company_name: data.company_name,
        description: data.description,
      },
    })) as { success: boolean; flipbook?: Flipbook };

    if (response.success && response.flipbook) {
      // Update the local flipbook data
      flipbook.value = response.flipbook;
      // Force iframe reload by changing its key
      iframeKey.value++;
    }
  } catch (error: any) {
    console.error("Error during update:", error);

    // Handle specific error cases
    if (error.statusCode === 403) {
      showToast(Toast.WARNING, {
        toastTitle: "Subscription Required",
        description:
          error.data?.message ||
          "Active subscription required to edit flipbooks",
        duration: 5000,
      });
    } else {
      showToast(Toast.ERROR, {
        toastTitle: "Update Failed",
        description: "Failed to update flipbook. Please try again.",
      });
    }
  }
};

// Fetch flipbook data
onMounted(async () => {
  try {
    isLoading.value = true;

    const { data, error } = await client
      .from("flipbooks")
      .select("*")
      .eq("id", flipbookId)
      .eq("user_id", user.value?.sub!)
      .single();

    if (error) {
      console.error("Error fetching flipbook:", error);
      showToast(Toast.ERROR, {
        toastTitle: "Error",
        description:
          "Flipbook not found or you don't have permission to view it.",
      });
      router.push("/dashboard");
      return;
    }

    flipbook.value = data as Flipbook;
  } catch (error) {
    console.error("Error loading flipbook:", error);
    showToast(Toast.ERROR, {
      toastTitle: "Error",
      description: "Failed to load flipbook. Please try again.",
    });
    router.push("/dashboard");
  } finally {
    isLoading.value = false;
  }
});
</script>
