import type { Flipbook, FlipbookAnalytics } from "~/types";

export const useFlipbookAnalytics = () => {
  const isLoadingAnalytics = ref(false);
  const analyticsError = ref<string | null>(null);

  /**
   * Fetch analytics data for multiple flipbooks
   */
  const fetchAnalytics = async (
    flipbookIds: string[]
  ): Promise<Record<string, FlipbookAnalytics>> => {
    if (flipbookIds.length === 0) {
      return {};
    }

    isLoadingAnalytics.value = true;
    analyticsError.value = null;

    try {
      const response = await $fetch<Record<string, FlipbookAnalytics>>(
        "/api/analytics/flipbook-stats",
        {
          params: {
            flipbookIds: flipbookIds.join(","),
          },
        }
      );

      return response;
    } catch (error: any) {
      console.error("Error fetching analytics:", error);
      analyticsError.value = error.message || "Failed to fetch analytics data";
      return {};
    } finally {
      isLoadingAnalytics.value = false;
    }
  };

  /**
   * Attach analytics data to flipbooks
   */
  const attachAnalyticsToFlipbooks = async (
    flipbooks: Flipbook[]
  ): Promise<Flipbook[]> => {
    if (flipbooks.length === 0) {
      return [];
    }

    const flipbookIds = flipbooks.map((f) => f.id);

    // Find the earliest creation date to query from
    const earliestDate = flipbooks.reduce((earliest, flipbook) => {
      const createdAt = new Date(flipbook.created_at);
      return createdAt < earliest ? createdAt : earliest;
    }, new Date(flipbooks[0]!.created_at));

    // Format date as YYYY-MM-DD for GA4
    const startDate: string = earliestDate.toISOString().split("T")[0]!;

    const analyticsData = await fetchAnalyticsWithDateRange(
      flipbookIds,
      startDate
    );

    return flipbooks.map((flipbook) => ({
      ...flipbook,
      analytics: analyticsData[flipbook.id] || {
        views: 0,
        uniqueVisitors: 0,
      },
    }));
  };

  /**
   * Fetch analytics with a custom date range
   */
  const fetchAnalyticsWithDateRange = async (
    flipbookIds: string[],
    startDate: string
  ): Promise<Record<string, FlipbookAnalytics>> => {
    if (flipbookIds.length === 0) {
      return {};
    }

    isLoadingAnalytics.value = true;
    analyticsError.value = null;

    try {
      const response = await $fetch<Record<string, FlipbookAnalytics>>(
        "/api/analytics/flipbook-stats",
        {
          params: {
            flipbookIds: flipbookIds.join(","),
            startDate: startDate,
          },
        }
      );

      return response;
    } catch (error: any) {
      console.error("Error fetching analytics:", error);
      analyticsError.value = error.message || "Failed to fetch analytics data";
      return {};
    } finally {
      isLoadingAnalytics.value = false;
    }
  };

  return {
    isLoadingAnalytics: readonly(isLoadingAnalytics),
    analyticsError: readonly(analyticsError),
    fetchAnalytics,
    fetchAnalyticsWithDateRange,
    attachAnalyticsToFlipbooks,
  };
};
