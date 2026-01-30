<template>
  <div class="modal" :class="{ 'modal-open': isOpen }">
    <div class="fixed inset-0 bg-base-content/60 z-40"></div>
    <div
      class="modal-box max-w-full rounded-3xl relative z-50 flex flex-col gap-y-6"
    >
      <!-- Modal Header -->
      <div class="flex justify-between items-center">
        <div class="flex items-end gap-2">
          <h3 class="font-delight font-medium text-xl leading-5 md:text-3xl">
            {{ flipbook?.title }}
          </h3>
          <div class="flex items-end gap-1 text-sm leading-3 text-neutral">
            <span>by</span>
            <span class="font-semibold text-primary">{{
              flipbook?.company_name
            }}</span>
          </div>
        </div>
        <button
          class="btn btn-sm btn-circle btn-ghost p-1 border border-base-content"
          @click="closeModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#000"
              stroke-dasharray="16"
              stroke-dashoffset="16"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M7 7l10 10">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.4s"
                  values="16;0"
                />
              </path>
              <path d="M17 7l-10 10">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.4s"
                  dur="0.4s"
                  values="16;0"
                />
              </path>
            </g>
          </svg>
        </button>
      </div>

      <!-- Border separator -->
      <div class="border-t border-base-300"></div>

      <!-- Content -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Preview Section -->
        <div class="flex-1 flex flex-col">
          <div
            class="bg-base-200 rounded-3xl flex-1 min-h-[400px] lg:min-h-[700px] border-2 border-base-content shadow-md flex flex-col"
          >
            <iframe
              src="https://flipture-view.netlify.app/?id=c01cea85-f49c-456a-ada2-30111e867ff0"
              class="w-full flex-1 rounded-2xl"
              title="Flipbook Preview"
              width="100%"
              height="100%"
            ></iframe>
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
            </div>

            <!-- Flipbook Info -->
            <div class="space-y-3 pt-4 border-t border-base-content/20">
              <h4 class="font-medium text-base-content">Flipbook Details</h4>
              <div class="space-y-2 text-sm">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Flipbook } from "~/types";
import { Toast } from "~/types";
import dayjs from "dayjs";

interface Props {
  flipbook: Flipbook | null;
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const { showToast } = useToast();
const isCopying = ref(false);

// Computed properties
const shareUrl = computed(() => {
  if (!props.flipbook) return "";
  return `https://flipture-view.netlify.app/?id=${props.flipbook.id}`;
});

const previewUrl = computed(() => {
  if (!props.flipbook) return "";
  return `https://flipture-view.netlify.app/?id=${props.flipbook.id}`;
});

// Methods
const closeModal = () => {
  emit("close");
};

const copyShareLink = async () => {
  if (!props.flipbook) return;

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
  if (!props.flipbook) return;

  const text = `Check out my flipbook "${props.flipbook.title}" created with Flipture!`;
  const url = shareUrl.value;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}`;

  globalThis.open(twitterUrl, "_blank", "width=600,height=400");
};

const shareOnLinkedIn = () => {
  if (!props.flipbook) return;

  const text = `Check out my flipbook "${props.flipbook.title}" created with Flipture!`;
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

// Close modal on Escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.isOpen) {
      closeModal();
    }
  };

  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
  });
});
</script>
