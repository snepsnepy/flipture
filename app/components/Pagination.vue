<template>
  <nav
    v-if="totalPages > 1"
    class="flex items-center justify-center gap-2 flex-wrap"
    aria-label="Pagination"
  >
    <!-- Previous Button -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="btn text-base-content bg-base-100 border-2 px-3 md:px-3 md:pl-1.5 py-2 md:py-3 border-base-content rounded-2xl hover:bg-secondary font-poppins text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-base-100 flex items-center transition-colors"
      aria-label="Previous page"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m15 18l-6-6l6-6" />
      </svg>
      <span v-if="!isMobile">Prev</span>
    </button>

    <!-- Page Numbers -->
    <div class="flex items-center gap-1 flex-wrap justify-center">
      <!-- When we have many pages (>maxVisiblePages), show: 1 ... current ... last -->
      <template v-if="totalPages > maxVisiblePages">
        <!-- First Page -->
        <button
          @click="goToPage(1)"
          :class="[
            'btn text-base-content bg-base-100 border-2 px-3 md:px-4 py-2 md:py-3 border-base-content rounded-2xl font-poppins text-sm md:text-base transition-colors min-w-[40px] md:min-w-[48px]',
            currentPage === 1
              ? 'bg-primary text-primary-content hover:bg-primary'
              : 'hover:bg-secondary',
          ]"
          aria-label="Go to page 1"
          :aria-current="currentPage === 1 ? 'page' : undefined"
        >
          1
        </button>

        <!-- Left Ellipsis -->
        <span
          v-if="showLeftEllipsis"
          class="text-base-content font-poppins text-sm md:text-base px-1"
        >
          ...
        </span>

        <!-- Current Page (if not first or last) -->
        <button
          v-if="currentPage !== 1 && currentPage !== totalPages"
          @click="goToPage(currentPage)"
          :class="[
            'btn text-base-content bg-base-100 border-2 px-3 md:px-4 py-2 md:py-3 border-base-content rounded-2xl font-poppins text-sm md:text-base transition-colors min-w-[40px] md:min-w-[48px]',
            'bg-primary text-primary-content hover:bg-primary',
          ]"
          :aria-label="`Go to page ${currentPage}`"
          aria-current="page"
        >
          {{ currentPage }}
        </button>

        <!-- Right Ellipsis -->
        <span
          v-if="showRightEllipsis"
          class="text-base-content font-poppins text-sm md:text-base px-1"
        >
          ...
        </span>

        <!-- Last Page -->
        <button
          @click="goToPage(totalPages)"
          :class="[
            'btn text-base-content bg-base-100 border-2 px-3 md:px-4 py-2 md:py-3 border-base-content rounded-2xl font-poppins text-sm md:text-base transition-colors min-w-[40px] md:min-w-[48px]',
            currentPage === totalPages
              ? 'bg-primary text-primary-content hover:bg-primary'
              : 'hover:bg-secondary',
          ]"
          :aria-label="`Go to page ${totalPages}`"
          :aria-current="currentPage === totalPages ? 'page' : undefined"
        >
          {{ totalPages }}
        </button>
      </template>

      <!-- When we have few pages (<=maxVisiblePages), show all pages -->
      <template v-else>
        <button
          v-for="page in paginationItems"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'btn text-base-content bg-base-100 border-2 px-3 md:px-4 py-2 md:py-3 border-base-content rounded-2xl font-poppins text-sm md:text-base transition-colors min-w-[40px] md:min-w-[48px]',
            currentPage === page
              ? 'bg-primary text-primary-content hover:bg-primary'
              : 'hover:bg-secondary',
          ]"
          :aria-label="`Go to page ${page}`"
          :aria-current="currentPage === page ? 'page' : undefined"
        >
          {{ page }}
        </button>
      </template>
    </div>

    <!-- Next Button -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="btn text-base-content bg-base-100 border-2 px-3 md:px-3 md:pr-1.5 py-2 md:py-3 border-base-content rounded-2xl hover:bg-secondary font-poppins text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-base-100 flex items-center transition-colors"
      aria-label="Next page"
    >
      <span v-if="!isMobile">Next</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m9 18l6-6l-6-6" />
      </svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 3,
});

const emit = defineEmits<{
  "update:currentPage": [page: number];
}>();

const { isMobile } = useIsMobile();

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("update:currentPage", page);
  }
};

/**
 * Pagination logic that shows:
 * - For few pages: [1] [2] [3] [4] [5]
 * - For many pages with patterns like:
 *   - Page 1: [1] ... 10
 *   - Page 2: [1] [2] ... 10
 *   - Page 5: 1 ... [5] ... 10
 *   - Page 9: 1 ... [9] [10]
 *   - Page 10: 1 ... [10]
 */
const paginationItems = computed(() => {
  const { currentPage, totalPages, maxVisiblePages } = props;

  // If we have few pages, show them all
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // For many pages, show first, last, and current
  const items: number[] = [];

  // Always show first page
  items.push(1);

  // Show current page if it's not first or last
  if (currentPage !== 1 && currentPage !== totalPages) {
    items.push(currentPage);
  }

  // Always show last page
  if (totalPages > 1) {
    items.push(totalPages);
  }

  return items;
});

// Show ellipsis between first page and current page
const showLeftEllipsis = computed(() => {
  if (props.totalPages <= props.maxVisiblePages) return false;
  // Show "..." if current page is more than 2 (meaning there's a gap)
  return props.currentPage > 2;
});

// Show ellipsis between current page and last page
const showRightEllipsis = computed(() => {
  if (props.totalPages <= props.maxVisiblePages) return false;
  // Show "..." if current page is before the second-to-last page (meaning there's a gap)
  return props.currentPage < props.totalPages - 1;
});
</script>
