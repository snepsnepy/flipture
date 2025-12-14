<template>
  <section>
    <div
      v-if="isMobile"
      class="collapse bg-base-200 border-2 border-base-content rounded-3xl h-fit w-full"
    >
      <input type="checkbox" v-model="checkboxState" />
      <div class="collapse-title font-semibold !p-4 md:!p-6">
        <!-- HEADER -->
        <header class="flex flex-row items-center justify-between">
          <section class="flex flex-col gap-2 w-full h-full justify-between">
            <div class="space-y-4 w-full">
              <p
                class="font-delight font-extrabold text-2xl leading-6 md:text-4xl md:leading-8"
                :class="titleHasSpaces ? 'break-words' : 'break-all'"
              >
                {{ flipbook.title }}
              </p>
            </div>

            <p class="font-poppins text-xs leading-3 text-neutral">
              Created
              <span class="text-neutral" v-if="flipbook.company_name"
                >for
              </span>
              <span class="font-semibold text-primary">{{
                flipbook.company_name
              }}</span>
              <span class="text-neutral"> on </span>
              <span class="font-semibold text-base-content">{{
                dayjs(flipbook.created_at).format("DD-MM-YYYY")
              }}</span>
            </p>

            <!-- Analytics Stats -->
            <div
              v-if="flipbook.analytics"
              class="flex flex-row gap-4 mt-2 text-xs"
            >
              <div class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span class="font-semibold text-base-content"
                  >{{ flipbook.analytics.views }} views</span
                >
              </div>
              <div class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span class="font-semibold text-base-content"
                  >{{ flipbook.analytics.uniqueVisitors }} visitors</span
                >
              </div>
            </div>
          </section>

          <div class="p-2 bg-base-100 border border-base-content rounded-full">
            <svg
              :class="[
                'w-4 h-4 transition-transform duration-300',
                checkboxState ? 'rotate-180' : 'rotate-0',
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </header>
      </div>

      <!-- CONTENT -->
      <div class="collapse-content text-sm !px-4 md:!px-6 flex flex-col gap-4">
        <HorizontalDivider />

        <!-- Actions -->
        <footer
          class="flex flex-col-reverse md:flex-row w-full justify-between gap-y-4"
        >
          <ActionButton
            text="Delete"
            type="error"
            @click="openDeleteModal"
            class="w-full md:w-fit"
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
                  d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
                />
              </svg>
            </template>
          </ActionButton>

          <ActionButton
            class="w-full md:w-fit"
            text="View & Share"
            type="primary"
            @click="openPreviewModal"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M28 6h14v14m0 9.474V39a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h9m7.8 16.2L41.1 6.9"
                />
              </svg>
            </template>
          </ActionButton>
        </footer>
      </div>
    </div>

    <section
      v-else
      class="border-2 border-base-content flex flex-row gap-x-10 bg-base-200 p-4 rounded-3xl overflow-hidden !h-full"
    >
      <section class="relative z-10 w-full flex flex-col gap-4">
        <div
          class="flex flex-col-reverse md:flex-row w-full items-start rounded-2xl gap-4 h-full"
        >
          <!-- Thumbnail -->
          <div
            class="w-full rounded-2xl shadow-md h-full justify-center bg-base-100 p-1 flex items-center"
          >
            <PDFThumbnail :pdf-url="flipbook.pdf_file_url!" />
          </div>

          <!-- Details -->
          <header
            class="flex flex-col gap-4 p-4 w-full bg-base-100 rounded-2xl h-full shadow-md justify-between"
          >
            <div class="space-y-4 w-full text-center">
              <p
                class="font-delight font-extrabold text-2xl leading-6 md:text-4xl md:leading-8"
                :class="titleHasSpaces ? 'break-words' : 'break-all'"
              >
                {{ flipbook.title }}
              </p>
            </div>

            <p class="font-poppins text-xs leading-3 text-neutral text-center">
              Created
              <span class="text-neutral" v-if="flipbook.company_name"
                >for
              </span>
              <span class="font-semibold text-primary">{{
                flipbook.company_name
              }}</span>
              <span class="text-neutral"> on </span>
              <span class="font-semibold text-base-content">{{
                dayjs(flipbook.created_at).format("DD-MM-YYYY")
              }}</span>
            </p>

            <!-- Analytics Stats -->
            <div
              v-if="flipbook.analytics"
              class="flex flex-row gap-4 justify-center text-xs mt-2"
            >
              <div class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span class="font-semibold text-base-content">{{
                  flipbook.analytics.views
                }}</span>
              </div>
              <div class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span class="font-semibold text-base-content">{{
                  flipbook.analytics.uniqueVisitors
                }}</span>
              </div>
            </div>
          </header>
        </div>

        <!-- Actions -->
        <footer
          class="flex flex-col md:flex-row w-full justify-between gap-y-4"
        >
          <ActionButton type="error" @click="openDeleteModal">
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
                />
              </svg>
            </template>
          </ActionButton>

          <ActionButton
            class="w-full md:w-fit"
            text="View & Share"
            type="primary"
            @click="openPreviewModal"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M28 6h14v14m0 9.474V39a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h9m7.8 16.2L41.1 6.9"
                />
              </svg>
            </template>
          </ActionButton>
        </footer>
      </section>
    </section>

    <!-- Delete Confirmation Modal -->
    <DeleteModal
      ref="deleteModal"
      :title="flipbook.title"
      @confirm="handleDelete"
    />
  </section>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import type { Flipbook } from "~/types";
import type { Database } from "~/types/supabase";
import DeleteModal from "~/components/DeleteModal.vue";

const props = defineProps<{
  flipbook: Flipbook;
}>();

const emit = defineEmits<{
  deleted: [flipbookId: string];
  updated: [flipbook: Flipbook];
}>();

// Smart text breaking: break by spaces if available, otherwise break-all
const titleHasSpaces = computed(() => {
  return props.flipbook.title.includes(" ");
});

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const route = useRoute();
const { showToast } = useToast();
const deleteModal = ref<InstanceType<typeof DeleteModal>>();
const { isMobile } = useIsMobile();
const checkboxState = ref(false);

const openDeleteModal = () => {
  deleteModal.value?.openModal();
};

const openPreviewModal = () => {
  // Preserve the current page query parameter when navigating to preview
  navigateTo({
    path: `/preview/${props.flipbook.id}`,
    query: { page: route.query.page || "1" },
  });
};

const handleDelete = async () => {
  try {
    // Delete the flipbook from the database
    const { error } = await client
      .from("flipbooks")
      .delete()
      .eq("id", props.flipbook.id)
      .eq("user_id", user.value!.sub);

    if (error) {
      console.error("Error deleting flipbook:", error);
      alert("Failed to delete flipbook. Please try again.");
      return;
    }

    // Optionally delete the PDF file from storage
    if (props.flipbook.pdf_file_url) {
      try {
        // Extract the file path from the URL
        const url = new URL(props.flipbook.pdf_file_url);
        const pathSegments = url.pathname.split("/");
        const fileName = pathSegments.at(-1);
        const filePath = `${user.value!.sub}/${fileName}`;

        await client.storage.from("uploads").remove([filePath]);
      } catch (storageError) {
        console.error("Error deleting file from storage:", storageError);
        // Don't show error to user as the main deletion succeeded
      }
    }

    // Emit the deleted event to parent component
    emit("deleted", props.flipbook.id);
  } catch (error) {
    console.error("Error during deletion:", error);
    alert("Failed to delete flipbook. Please try again.");
  }
};
</script>
