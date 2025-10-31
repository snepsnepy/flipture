import type { Database } from "~/types/supabase";
import type { FlipbookAnalytics } from "~/types/analytics";

/**
 * Composable for reading analytics data
 * Used in dashboard to display flipbook statistics
 */
export const useAnalytics = () => {
  const client = useSupabaseClient<Database>();

  /**
   * Fetch analytics for a specific flipbook
   * Only accessible by the flipbook owner (RLS enforced)
   */
  const getFlipbookAnalytics = async (
    flipbookId: string
  ): Promise<FlipbookAnalytics | null> => {
    try {
      const { data, error } = await client
        .from("flipbook_analytics")
        .select("*")
        .eq("flipbook_id", flipbookId)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned (flipbook has no analytics yet)
        console.error("Error fetching analytics:", error);
        return null;
      }

      return data as FlipbookAnalytics;
    } catch (error) {
      console.error("Error in getFlipbookAnalytics:", error);
      return null;
    }
  };

  /**
   * Fetch analytics for multiple flipbooks at once
   * Returns a map of flipbookId -> analytics
   * Useful for displaying analytics in dashboard list
   */
  const getBulkFlipbookAnalytics = async (
    flipbookIds: string[]
  ): Promise<Map<string, FlipbookAnalytics>> => {
    try {
      if (flipbookIds.length === 0) {
        return new Map();
      }

      const { data, error } = await client
        .from("flipbook_analytics")
        .select("*")
        .in("flipbook_id", flipbookIds);

      if (error) {
        console.error("Error fetching bulk analytics:", error);
        return new Map();
      }

      const analyticsMap = new Map<string, FlipbookAnalytics>();
      data?.forEach((analytics) => {
        analyticsMap.set(analytics.flipbook_id, analytics as FlipbookAnalytics);
      });

      return analyticsMap;
    } catch (error) {
      console.error("Error in getBulkFlipbookAnalytics:", error);
      return new Map();
    }
  };

  /**
   * Format numbers for display
   */
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("ro-RO").format(num);
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString("ro-RO", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return {
    getFlipbookAnalytics,
    getBulkFlipbookAnalytics,
    formatNumber,
    formatDate,
  };
};
