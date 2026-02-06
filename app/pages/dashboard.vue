<template>
  <!-- Loading Spinner -->
  <div
    v-if="isPageLoading"
    class="flex justify-center flex-col items-center min-h-[calc(100vh-300px)]"
  >
    <LoadingSpinner />
  </div>

  <!-- Main Content -->
  <section v-else class="container mx-auto flex flex-col gap-6 md:gap-8">
    <!-- Show LimitReached when user has reached max flipbooks -->
    <DashboardLimitReached
      v-if="
        !userStore.isLoadingProfile &&
        !canCreateFlipbook(flipbooksLength) &&
        flipbooksLength > 0
      "
      :currentLimits="currentLimits"
      :currentCount="flipbooksLength"
    />

    <!-- Show InfoComponent for free users who haven't reached limit yet -->
    <DashboardInfoComponent
      v-else-if="!userStore.isLoadingProfile && userStore.isFreePlan && flipbooksLength > 0"
    />

    <header class="flex flex-col xl:flex-row gap-4 xl:h-[400px] w-full">
      <!-- Hero -->
      <DashboardHero v-if="!isMobile" />

      <!-- User Details -->
      <DashboardUserDetails
        :hasFlipbooks="hasFlipbooks"
        :flipbooksLength="flipbooksLength!"
        :flipbooks="flipbooks"
        :currentPlan="userStore.currentPlan"
        :subscriptionStatus="userStore.subscriptionStatus"
      />
    </header>

    <HorizontalDivider />

    <!-- Content -->
    <div class="flex flex-col gap-6">
      <header class="space-y-4 md:space-y-4">
        <div
          class="flex flex-col md:flex-row justify-between items-start gap-y-4 md:items-center"
        >
          <h4
            class="font-delight font-semibold text-4xl leading-6 md:leading-8 w-full text-center md:text-left md:pt-2"
          >
            YOUR FLIPBOOKS
          </h4>

          <Tooltip
            text="You've reached your flipbook limit. Upgrade to create more!"
            :hidden="canCreateFlipbook(flipbooksLength)"
            class="w-full md:w-fit"
          >
            <ActionButton
              text="Create New Flipbook"
              class="w-full md:w-fit"
              :class="
                canCreateFlipbook(flipbooksLength)
                  ? 'hover:cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              "
              @click="goToCreateFlipbook"
              type="primary"
              :disabled="!canCreateFlipbook(flipbooksLength)"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                    />
                    <path
                      fill="#000"
                      d="M11 20a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7z"
                    />
                  </g>
                </svg>
              </template>
            </ActionButton>
          </Tooltip>
        </div>
      </header>

      <HorizontalDivider />

      <!-- Search and Sort -->
      <section
        class="flex flex-col md:flex-row justify-between gap-2 items-center"
      >
        <SearchText v-if="hasFlipbooks" v-model="searchQuery" />
        <FilterDropdown
          v-if="hasFlipbooks"
          v-model="sortOption"
          :options="SORT_OPTIONS"
          class="w-full md:w-fit"
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
                d="m25 14l-9-9l-9 9m8.992 17V5M42 34l-9 9l-9-9m8.992-17v26"
              />
            </svg>
          </template>
        </FilterDropdown>
      </section>

      <!-- Content -->
      <section
        class="grid grid-cols-1 xl:grid-cols-2 w-full gap-4"
        v-if="paginatedFlipbooks.length > 0"
      >
        <DashboardFlipbook
          v-for="flipbook in paginatedFlipbooks"
          :key="flipbook.id"
          :flipbook="flipbook"
          @deleted="handleFlipbookDeleted"
          @updated="handleFlipbookUpdated"
        />
      </section>

      <!-- No Flipbooks -->
      <DashboardNoItems
        v-else-if="isSearchEmpty && filteredFlipbooks.length === 0"
      />

      <!-- No Search Results -->
      <div
        v-else-if="filteredFlipbooks.length === 0"
        class="flex flex-col items-center justify-center py-12"
      >
        <p class="font-poppins text-lg leading-5 text-base-content text-center">
          No flipbooks found matching "{{ searchQuery }}". <br />
          <span class="text-sm leadin-3 text-neutral"
            >Try again with a different search term.</span
          >
        </p>
      </div>

      <HorizontalDivider />

      <!-- Pagination -->
      <Pagination
        v-if="filteredFlipbooks.length > 0 && totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:current-page="currentPage = $event"
      />
    </div>
  </section>

  <!-- Create Flipbook Modal -->
  <CreateFlipbookModal
    :is-open="flipbookStore.isModalOpen"
    @close="flipbookStore.closeModal"
    @success="handleFlipbookCreated"
  />
</template>

<script setup lang="ts">
import type { Flipbook, SortOptionConfig, SortOption } from "~/types";
import { useFlipbookStore } from "~/stores/useFlipbookStore";

definePageMeta({
  layout: "base",
  middleware: "auth",
});

const SORT_OPTIONS: SortOptionConfig[] = [
  { value: "title-asc", label: "Title: A to Z" },
  { value: "title-desc", label: "Title: Z to A" },
  { value: "date-newest", label: "Date: Newest First" },
  { value: "date-oldest", label: "Date: Oldest First" },
];

const client = useSupabaseClient();
const user = useSupabaseUser();
const route = useRoute();
const router = useRouter();
const flipbookStore = useFlipbookStore();
const userStore = useUserStore();
const { canCreateFlipbook, currentLimits } = useSubscriptionLimits();
const hasFlipbooks = ref(false);
const flipbooksLength = ref(0);
const flipbooks = ref<Flipbook[]>([]);
const searchQuery = ref("");
const sortOption = ref<SortOption>("date-newest");
const isLoading = ref(true);
// Initialize currentPage from URL query parameter, default to 1
const currentPage = ref(Number.parseInt(route.query.page as string) || 1);
const itemsPerPage = ref(6); // Items per page
const { isMobile } = useIsMobile();

// Combined loading state - wait for both flipbooks and profile data
const isPageLoading = computed(() => isLoading.value || userStore.isLoadingProfile);

// Check if search query is empty
const isSearchEmpty = computed(() => !searchQuery.value.trim());

// Sort flipbooks based on selected sort option
const sortFlipbooks = (flipbooks: Flipbook[]): Flipbook[] => {
  const sorted = [...flipbooks];

  switch (sortOption.value) {
    case "date-newest":
      // Default: newest first (by created_at desc)
      return sorted.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      });

    case "title-asc":
      return sorted.sort((a, b) => {
        const titleA = (a.title || "").toLowerCase();
        const titleB = (b.title || "").toLowerCase();
        return titleA.localeCompare(titleB);
      });

    case "title-desc":
      return sorted.sort((a, b) => {
        const titleA = (a.title || "").toLowerCase();
        const titleB = (b.title || "").toLowerCase();
        return titleB.localeCompare(titleA);
      });

    case "date-oldest":
      return sorted.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateA - dateB;
      });

    default:
      return sorted;
  }
};

// Filter flipbooks based on search query
const filteredFlipbooks = computed(() => {
  let result = flipbooks.value;

  // Apply search filter
  if (!isSearchEmpty.value) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter((flipbook) => {
      const title = flipbook.title?.toLowerCase() || "";
      return title.includes(query);
    });
  }

  // Apply sorting
  return sortFlipbooks(result);
});

// Calculate total pages
const totalPages = computed(() => {
  return Math.ceil(filteredFlipbooks.value.length / itemsPerPage.value);
});

// Paginated flipbooks
const paginatedFlipbooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredFlipbooks.value.slice(start, end);
});

// Watch totalPages to ensure currentPage doesn't exceed it
watch(totalPages, (newTotalPages) => {
  if (currentPage.value > newTotalPages && newTotalPages > 0) {
    currentPage.value = newTotalPages;
  }
});

// Watch for search or sort changes to reset to page 1
watch([searchQuery, sortOption], () => {
  currentPage.value = 1;
});

// Watch for page changes to update URL query parameter
watch(currentPage, (newPage) => {
  // Update URL without triggering navigation
  router.replace({
    query: { ...route.query, page: newPage.toString() },
  });
});

// Fetch flipbooks from API
const fetchFlipbooks = async () => {
  if (!user.value) {
    return;
  }

  try {
    isLoading.value = true;

    // CRITICAL: Refresh profile first to get latest subscription data
    // This ensures we have fresh data after any subscription changes
    await userStore.fetchProfile();

    const { data: flipbooksData } = await client
      .from("flipbooks")
      .select("*")
      .eq("user_id", user.value.sub)
      .order("created_at", { ascending: false });

    let flipbooksList: Flipbook[] = flipbooksData || [];

    // Fetch and attach analytics data
    const { attachAnalyticsToFlipbooks } = useFlipbookAnalytics();
    flipbooksList = await attachAnalyticsToFlipbooks(flipbooksList);

    // Update local state
    flipbooks.value = flipbooksList;
    flipbooksLength.value = flipbooks.value.length;
    hasFlipbooks.value = flipbooksLength.value > 0;
  } catch (error) {
    console.error("Error fetching flipbooks:", error);
  } finally {
    // Wait for profile to load before hiding loading spinner
    if (userStore.isLoadingProfile) {
      const stopWatching = watch(
        () => userStore.isLoadingProfile,
        (loading) => {
          if (!loading) {
            isLoading.value = false;
            stopWatching();
          }
        },
        { immediate: true }
      );
    } else {
      isLoading.value = false;
    }
  }
};

onMounted(async () => {
  // Reset authentication states if user is present
  const isAuthenticating = useState('isAuthenticating', () => false);
  
  if (user.value) {
    flipbookStore.setSigningOut(false);
    // Reset authenticating state now that dashboard is loaded
    isAuthenticating.value = false;
  }

  // Watch for user changes and fetch data when user becomes available
  watch(
    () => user.value?.sub,
    async (newUserId, oldUserId) => {
      if (oldUserId !== null && newUserId !== oldUserId) {
        // User has changed - reset sign-out state
        flipbookStore.setSigningOut(false);
        flipbooks.value = [];
        flipbooksLength.value = 0;
        hasFlipbooks.value = false;
        searchQuery.value = "";
        await fetchFlipbooks();
      } else if (newUserId !== null && oldUserId === null) {
        // New user logged in - reset sign-out state and fetch data
        flipbookStore.setSigningOut(false);
        await fetchFlipbooks();
      } else if (oldUserId !== null && newUserId === null) {
        // User logged out - redirect to login
        navigateTo("/login");
      }
    },
    { immediate: false }
  );

  // If user is already loaded, fetch data immediately
  if (user.value?.sub) {
    await fetchFlipbooks();
  }
  // If user is not loaded yet, the watch will handle it when it becomes available
});

const handleFlipbookCreated = async () => {
  // Fetch fresh data
  await fetchFlipbooks();
  // Reset to page 1 to show the newly created flipbook
  currentPage.value = 1;
};

const handleFlipbookDeleted = (deletedFlipbookId: string) => {
  // Remove from local state
  flipbooks.value = flipbooks.value.filter(
    (flipbook) => flipbook.id !== deletedFlipbookId
  );

  // Update the computed values
  flipbooksLength.value = flipbooks.value.length;
  hasFlipbooks.value = flipbooksLength.value > 0;
  searchQuery.value = "";

  // Reset to page 1 if current page becomes empty
  if (paginatedFlipbooks.value.length === 0 && currentPage.value > 1) {
    currentPage.value = Math.max(1, totalPages.value);
  }
};

const handleFlipbookUpdated = (updatedFlipbook: Flipbook) => {
  // Update local state
  const index = flipbooks.value.findIndex(
    (flipbook) => flipbook.id === updatedFlipbook.id
  );
  if (index !== -1) {
    flipbooks.value[index] = updatedFlipbook;
  }
};

const goToCreateFlipbook = () => {
  // Verifică dacă utilizatorul poate crea mai multe flipbook-uri
  if (!canCreateFlipbook(flipbooksLength.value)) {
    // Button is already disabled, but prevent navigation just in case
    return;
  }

  return navigateTo({ name: "create-flipbook" });
};
</script>
