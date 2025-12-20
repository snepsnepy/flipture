import type { ComprehensiveAnalytics } from "~/types";

export const useComprehensiveAnalytics = () => {
  const isLoadingAnalytics = ref(false);
  const analyticsError = ref<string | null>(null);

  /**
   * Fetch comprehensive analytics data for multiple flipbooks
   */
  const fetchComprehensiveAnalytics = async (
    flipbookIds: string[],
    dateRange: string = "30"
  ): Promise<Record<string, ComprehensiveAnalytics>> => {
    if (flipbookIds.length === 0) {
      return {};
    }

    isLoadingAnalytics.value = true;
    analyticsError.value = null;

    try {
      const response = await $fetch<Record<string, ComprehensiveAnalytics>>(
        "/api/analytics/comprehensive-stats",
        {
          params: {
            flipbookIds: flipbookIds.join(","),
            dateRange: dateRange,
          },
        }
      );

      return response;
    } catch (error: any) {
      console.error("Error fetching comprehensive analytics:", error);
      analyticsError.value =
        error.message || "Failed to fetch comprehensive analytics data";
      return {};
    } finally {
      isLoadingAnalytics.value = false;
    }
  };

  /**
   * Calculate percentage change
   */
  const calculatePercentageChange = (
    current: number,
    previous: number
  ): number => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return ((current - previous) / previous) * 100;
  };

  /**
   * Aggregate analytics data from all flipbooks
   */
  const aggregateAnalytics = (
    analyticsData: Record<string, ComprehensiveAnalytics>
  ) => {
    const totals = {
      views: 0,
      uniqueVisitors: 0,
      previousViews: 0,
      previousVisitors: 0,
      countries: {} as Record<string, { views: number; visitors: number }>,
      dailyData: [] as Array<{ date: string; views: number; visitors: number }>,
    };

    const dailyMap: Record<string, { views: number; visitors: number }> = {};

    Object.values(analyticsData).forEach((data) => {
      totals.views += data.views;
      totals.uniqueVisitors += data.uniqueVisitors;
      totals.previousViews += data.previousViews;
      totals.previousVisitors += data.previousVisitors;

      // Aggregate countries
      Object.entries(data.countries).forEach(([country, stats]) => {
        totals.countries[country] ??= { views: 0, visitors: 0 };
        totals.countries[country].views += stats.views;
        totals.countries[country].visitors += stats.visitors;
      });

      // Aggregate daily data
      data.dailyData.forEach((day) => {
        if (!dailyMap[day.date]) {
          dailyMap[day.date] = { views: 0, visitors: 0 };
        }
        dailyMap[day.date]!.views += day.views;
        dailyMap[day.date]!.visitors += day.visitors;
      });
    });

    // Convert daily map to sorted array
    totals.dailyData = Object.entries(dailyMap)
      .map(([date, data]) => ({
        date,
        views: data.views,
        visitors: data.visitors,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return totals;
  };

  return {
    isLoadingAnalytics: readonly(isLoadingAnalytics),
    analyticsError: readonly(analyticsError),
    fetchComprehensiveAnalytics,
    calculatePercentageChange,
    aggregateAnalytics,
  };
};
