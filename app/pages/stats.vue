<template>
  <!-- No Access Message for Free Plan -->
  <section
    v-if="!currentLimits.hasAnalytics && !userStore.isLoadingProfile"
    class="container mx-auto py-0 flex flex-col gap-6 md:gap-8"
  >
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
        Back to Dashboard
      </button>
    </div>

    <div class="flex flex-col items-center justify-center gap-6">
      <div class="rounded-full bg-primary/20 p-6 border-2 border-base-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 32 32"
        >
          <path fill="#000" d="M4 2H2v26a2 2 0 0 0 2 2h26v-2H4Z" />
          <path
            fill="#000"
            d="M30 9h-7v2h3.59L19 18.59l-4.29-4.3a1 1 0 0 0-1.42 0L6 21.59L7.41 23L14 16.41l4.29 4.3a1 1 0 0 0 1.42 0l8.29-8.3V16h2Z"
          />
        </svg>
      </div>

      <div class="text-center space-y-4 max-w-lg">
        <h3
          class="text-3xl font-bold text-base-content font-delight tracking-wide"
        >
          Analytics Not Available
        </h3>
        <p class="text-base text-neutral font-poppins leading-relaxed px-4">
          Analytics and insights are available on
          <strong class="text-primary">Standard</strong> and
          <strong class="text-primary">Premium</strong> plans. Upgrade now to
          unlock detailed analytics, visitor tracking, and geographic insights
          for all your flipbooks.
        </p>
      </div>

      <ActionButton text="View Pricing" type="primary" @click="goToPricing">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <defs><path id="SVGS9q3IkIf" d="M21.5 11v10h-19V11z" /></defs>
            <g fill="none">
              <use href="#SVGS9q3IkIf" />
              <path
                d="M12 13.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m5.136-7.209L19 5.67l1.824 5.333H3.002L3 11.004L14.146 2.1z"
              />
              <path
                stroke="#000"
                stroke-linecap="square"
                stroke-width="2"
                d="M21 11.003h-.176L19.001 5.67L3.354 11.003L3 11m-.5.004H3L14.146 2.1l2.817 3.95"
              />
              <g stroke="#000" stroke-linecap="square" stroke-width="2">
                <path d="M14.5 16a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" />
                <use href="#SVGS9q3IkIf" />
                <path
                  d="M2.5 11h2a2 2 0 0 1-2 2zm19 0h-2a2 2 0 0 0 2 2zm-19 10h2.002A2 2 0 0 0 2.5 18.998zm19 0h-2a2 2 0 0 1 2-2z"
                />
              </g>
            </g>
          </svg>
        </template>
      </ActionButton>

      <!-- Feature Preview -->
      <div
        class="mt-4 p-6 bg-base-200 rounded-2xl border-2 flex flex-col border-base-content max-w-2xl gap-4"
      >
        <h4 class="font-delight font-bold text-xl text-center">
          What you'll get with Analytics:
        </h4>
        <ul class="space-y-2 text-left font-poppins">
          <li
            v-for="(feature, index) in analyticsFeatures"
            :key="index"
            class="flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              class="text-primary shrink-0"
            >
              <path
                fill="currentColor"
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
              />
            </svg>
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Loading Spinner -->
  <div
    v-else-if="isLoading"
    class="flex justify-center flex-col items-center min-h-[calc(100vh-300px)]"
  >
    <LoadingSpinner />
  </div>

  <!-- Main Content -->
  <section v-else class="container mx-auto py-0 flex flex-col gap-6 md:gap-8">
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
          class="text-base-content text-sm md:text-base leading-4 font-poppins font-medium hover:cursor-pointer hover:text-primary"
        >
          Back
        </button>
      </div>

      <div class="flex flex-col xl:flex-row justify-between gap-y-4">
        <div class="w-full items-center xl:items-start flex flex-col">
          <h4
            class="font-delight font-bold text-4xl leading-8 md:leading-8 text-center md:text-left md:pt-2"
          >
            ANALYTICS DASHBOARD
          </h4>
          <p
            class="text-sm text-gray-600 mt-2 font-poppins text-center md:text-left"
          >
            Comprehensive analytics for all your flipbooks
          </p>
        </div>

        <!-- Filters -->
        <div
          class="flex flex-col md:flex-row gap-3 w-full justify-end items-center"
        >
          <!-- Flipbook Filter -->
          <FilterDropdown
            v-model="selectedFlipbookId"
            :options="flipbookOptions"
            :button-label="`Flipbook: ${selectedFlipbookLabel}`"
            @update:model-value="updateFilteredAnalytics"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m6 10l6 6l6-6"
                />
              </svg>
            </template>
          </FilterDropdown>

          <!-- Date Range Filter -->
          <FilterDropdown
            v-model="selectedDateRange"
            :options="dateRangeOptions"
            :button-label="`Period: ${selectedDateRangeLabel}`"
            @update:model-value="fetchData"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m6 10l6 6l6-6"
                />
              </svg>
            </template>
          </FilterDropdown>
        </div>
      </div>
    </header>

    <HorizontalDivider />

    <!-- No Flipbooks Message -->
    <div
      v-if="!hasFlipbooks"
      class="flex flex-col items-center justify-center py-16"
    >
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 font-poppins">
          No analytics data
        </h3>
        <p class="mt-1 text-sm text-gray-500 font-poppins">
          Create your first flipbook to see analytics.
        </p>
        <div class="mt-6">
          <ActionButton
            text="Create New Flipbook"
            class="mx-auto"
            @click="goToCreateFlipbook"
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
        </div>
      </div>
    </div>

    <!-- Analytics Content -->
    <div v-else class="flex flex-col gap-6">
      <!-- Summary Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsStatCard
          title="Total Views"
          :value="aggregatedData.views"
          :show-change="false"
        />
        <StatsStatCard
          title="Unique Visitors"
          :value="aggregatedData.uniqueVisitors"
          :show-change="false"
        />
        <StatsStatCard
          :title="
            selectedFlipbookId === 'all'
              ? 'Total Flipbooks'
              : 'Selected Flipbook'
          "
          :value="selectedFlipbookId === 'all' ? flipbooks.length : 1"
          :show-change="false"
        />
        <StatsStatCard
          title="Countries Reached"
          :value="Object.keys(aggregatedData.countries).length"
          :show-change="false"
        />
      </div>

      <HorizontalDivider />

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Views Over Time -->
        <div class="rounded-2xl shadow-md p-6 border-2 border-base-content">
          <h5 class="font-delight font-bold text-xl mb-4">Views Over Time</h5>
          <div class="h-[300px]">
            <StatsLineChart
              v-if="dailyChartData.labels.length > 0"
              :labels="dailyChartData.labels"
              :datasets="[
                {
                  label: 'Views',
                  data: dailyChartData.views,
                  borderColor: 'oklch(0.5096 0.274811 263.5831)',
                  backgroundColor: 'oklch(0.5096 0.274811 263.5831 / 0.1)',
                  fill: true,
                },
                {
                  label: 'Unique Visitors',
                  data: dailyChartData.visitors,
                  borderColor: 'rgb(250, 204, 21)',
                  backgroundColor: 'rgba(250, 204, 21, 0.1)',
                  fill: true,
                },
              ]"
            />
            <div
              v-else
              class="flex items-center justify-center h-full text-gray-500 font-poppins"
            >
              No data available for this period
            </div>
          </div>
        </div>

        <!-- Top Countries -->
        <div class="rounded-2xl shadow-md p-6 border-2 border-base-content">
          <h5 class="font-delight font-bold text-xl mb-4">
            Top Countries by Views
          </h5>
          <div class="h-[300px]">
            <StatsBarChart
              v-if="countryChartData.labels.length > 0"
              :labels="countryChartData.labels"
              :datasets="[
                {
                  label: 'Views',
                  data: countryChartData.views,
                  backgroundColor: generateCountryColors(
                    countryChartData.labels.length
                  ),
                  borderWidth: 1,
                },
              ]"
              :horizontal="true"
            />
            <div
              v-else
              class="flex items-center justify-center h-full text-gray-500 font-poppins"
            >
              No country data available
            </div>
          </div>
        </div>
      </div>

      <HorizontalDivider />

      <!-- Detailed Country Table -->
      <div
        class="rounded-2xl shadow-md border-2 border-base-content overflow-hidden"
      >
        <div class="p-6 border-b border-gray-100">
          <h5 class="font-delight font-bold text-xl">Geographic Breakdown</h5>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-neutral/10">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider font-poppins"
                >
                  Country
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider font-poppins"
                >
                  Views
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider font-poppins"
                >
                  Unique Visitors
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider font-poppins"
                >
                  % of Total Views
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(country, index) in sortedCountries"
                :key="country.name"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap font-poppins text-sm font-medium text-gray-900"
                >
                  {{ country.name }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap font-poppins text-sm text-gray-700"
                >
                  {{ country.views.toLocaleString() }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap font-poppins text-sm text-gray-700"
                >
                  {{ country.visitors.toLocaleString() }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap font-poppins text-sm text-gray-700"
                >
                  <div class="flex items-center">
                    <div class="w-16 mr-2">
                      {{ country.percentage.toFixed(1) }}%
                    </div>
                    <div
                      class="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]"
                    >
                      <div
                        class="bg-primary h-2 rounded-full"
                        :style="{ width: `${country.percentage}%` }"
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {
  Flipbook,
  DateRangeOption,
  ComprehensiveAnalytics,
} from "~/types";
import { useComprehensiveAnalytics } from "~/composables/useComprehensiveAnalytics";

definePageMeta({
  layout: "base",
  middleware: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const { currentLimits } = useSubscriptionLimits();
const userStore = useUserStore();

const isLoading = ref(true);
const flipbooks = ref<Flipbook[]>([]);
const analyticsData = ref<Record<string, ComprehensiveAnalytics>>({});
const selectedDateRange = ref<DateRangeOption>("30");
const selectedFlipbookId = ref<string>("all");

const { fetchComprehensiveAnalytics, aggregateAnalytics } =
  useComprehensiveAnalytics();

const dateRangeOptions = [
  { value: "30", label: "Last 30 Days" },
  { value: "60", label: "Last 60 Days" },
  { value: "180", label: "Last 6 Months" },
  { value: "365", label: "Last 12 Months" },
];

const analyticsFeatures = [
  "Track views and unique visitors for each flipbook",
  "View engagement trends over time with interactive charts",
  "Geographic breakdown showing where your audience is from",
  "Filter by date range and individual flipbooks",
];

const hasFlipbooks = computed(() => flipbooks.value.length > 0);

const flipbookOptions = computed(() => {
  const options = [{ value: "all", label: "All Flipbooks" }];
  flipbooks.value.forEach((flipbook) => {
    options.push({
      value: flipbook.id,
      label: flipbook.title,
    });
  });
  return options;
});

const selectedFlipbookLabel = computed(() => {
  const option = flipbookOptions.value.find(
    (opt) => opt.value === selectedFlipbookId.value
  );
  return option?.label || "All Flipbooks";
});

const selectedDateRangeLabel = computed(() => {
  const option = dateRangeOptions.find(
    (opt) => opt.value === selectedDateRange.value
  );
  return option?.label || "Last 30 Days";
});

const filteredAnalyticsData = computed(() => {
  if (selectedFlipbookId.value === "all") {
    return analyticsData.value;
  }

  // Return only the selected flipbook's analytics
  const selectedData = analyticsData.value[selectedFlipbookId.value];
  return selectedData ? { [selectedFlipbookId.value]: selectedData } : {};
});

const aggregatedData = computed(() => {
  return aggregateAnalytics(filteredAnalyticsData.value);
});

// Daily chart data
const dailyChartData = computed(() => {
  const data = aggregatedData.value.dailyData;

  // Format dates nicely
  const labels = data.map((d) => {
    const date = d.date;
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    const dateObj = new Date(`${year}-${month}-${day}`);
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  });

  return {
    labels,
    views: data.map((d) => d.views),
    visitors: data.map((d) => d.visitors),
  };
});

// Country chart data (top 10)
const countryChartData = computed(() => {
  const countries = Object.entries(aggregatedData.value.countries)
    .map(([name, stats]) => ({
      name,
      views: stats.views,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  return {
    labels: countries.map((c) => c.name),
    views: countries.map((c) => c.views),
  };
});

// Sorted countries for table
const sortedCountries = computed(() => {
  const totalViews = aggregatedData.value.views;

  return Object.entries(aggregatedData.value.countries)
    .map(([name, stats]) => ({
      name,
      views: stats.views,
      visitors: stats.visitors,
      percentage: totalViews > 0 ? (stats.views / totalViews) * 100 : 0,
    }))
    .sort((a, b) => b.views - a.views);
});

// Generate colors for country bars
const generateCountryColors = (count: number): string[] => {
  const colors = [
    "oklch(0.5096 0.274811 263.5831)", // blue
    "rgb(163, 230, 53, 0.8)", // green
    "rgba(249, 115, 22, 0.8)", // orange
    "rgba(236, 72, 153, 0.8)", // pink
    "rgba(139, 92, 246, 0.8)", // purple
    "rgba(245, 158, 11, 0.8)", // amber
    "rgba(20, 184, 166, 0.8)", // teal
    "rgba(239, 68, 68, 0.8)", // red
    "rgba(99, 102, 241, 0.8)", // indigo
    "rgba(168, 85, 247, 0.8)", // violet
  ];

  return new Array(count).fill(0).map((_, i) => colors[i % colors.length]!);
};

const fetchData = async () => {
  if (!user.value) return;

  try {
    isLoading.value = true;

    // Fetch flipbooks
    const { data: flipbooksData } = await client
      .from("flipbooks")
      .select("*")
      .eq("user_id", user.value.sub)
      .order("created_at", { ascending: false });

    flipbooks.value = flipbooksData || [];

    if (flipbooks.value.length > 0) {
      // Fetch comprehensive analytics
      const flipbookIds = flipbooks.value.map((f) => f.id);
      analyticsData.value = await fetchComprehensiveAnalytics(
        flipbookIds,
        selectedDateRange.value
      );
    } else {
      // Reset analytics if no flipbooks
      analyticsData.value = {};
    }

    // Reset to "all" when fetching new data
    selectedFlipbookId.value = "all";
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
};

const updateFilteredAnalytics = () => {
  // This function is called when flipbook selection changes
  // The computed properties will automatically update based on selectedFlipbookId
};

const navigateToDashboard = () => {
  return navigateTo({ name: "dashboard" });
};

const goToCreateFlipbook = () => {
  return navigateTo({ name: "create-flipbook" });
};

const goToPricing = () => {
  return navigateTo({ name: "pricing" });
};

onMounted(async () => {
  // Watch for user changes
  watch(
    () => user.value?.sub,
    async (newUserId, oldUserId) => {
      if (oldUserId !== null && newUserId !== oldUserId) {
        flipbooks.value = [];
        analyticsData.value = {};
        await fetchData();
      } else if (newUserId !== null && oldUserId === null) {
        await fetchData();
      } else if (oldUserId !== null && newUserId === null) {
        navigateTo("/login");
      }
    },
    { immediate: false }
  );

  // Fetch initial data if user is already loaded
  if (user.value) {
    await fetchData();
  }
});
</script>
