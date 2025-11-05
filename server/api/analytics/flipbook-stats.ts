import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { defineEventHandler, getQuery, createError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const flipbookIds = query.flipbookIds as string | string[];
    const startDate = query.startDate as string | undefined;

    if (!flipbookIds) {
      throw createError({
        statusCode: 400,
        statusMessage: "flipbookIds parameter is required",
      });
    }

    // Parse flipbook IDs
    const ids = Array.isArray(flipbookIds)
      ? flipbookIds
      : flipbookIds.split(",");

    // Get runtime config
    const config = useRuntimeConfig();
    const propertyId = config.ga4PropertyId;
    const clientEmail = config.ga4ClientEmail;
    const privateKey = config.ga4PrivateKey?.replace(/\\n/g, "\n");

    if (!propertyId || !clientEmail || !privateKey) {
      throw createError({
        statusCode: 500,
        statusMessage: "Google Analytics credentials not configured",
      });
    }

    // Initialize the Analytics Data API client
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });

    // Fetch analytics data for all flipbooks
    // Use provided startDate or default to when the oldest flipbook might have been created
    const analyticsStartDate = startDate || "2024-01-01"; // Or use earliest flipbook creation date

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: analyticsStartDate,
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "customEvent:flipbook_id", // Custom event parameter
        },
      ],
      metrics: [
        {
          name: "eventCount",
        },
        {
          name: "totalUsers",
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: {
            matchType: "EXACT",
            value: "flipbook_view",
          },
        },
      },
    });

    // Debug: Log the raw response
    console.log("=== GA4 Analytics Debug ===");
    console.log("Query Date Range:", analyticsStartDate, "to today");
    console.log("Requested Flipbook IDs:", ids);
    console.log("Total rows returned:", response.rows?.length || 0);
    console.log("Raw response:", JSON.stringify(response, null, 2));
    console.log("===========================");

    // Parse the response into a map
    const analyticsMap: Record<
      string,
      { views: number; uniqueVisitors: number }
    > = {};

    response.rows?.forEach((row) => {
      const flipbookId = row.dimensionValues?.[0]?.value;
      const views = parseInt(row.metricValues?.[0]?.value || "0");
      const uniqueVisitors = parseInt(row.metricValues?.[1]?.value || "0");

      if (flipbookId && ids.includes(flipbookId)) {
        analyticsMap[flipbookId] = {
          views,
          uniqueVisitors,
        };
      }
    });

    // Debug: Log parsed analytics map
    console.log("Parsed Analytics Map:", analyticsMap);

    // Ensure all requested flipbook IDs have an entry (even if 0)
    ids.forEach((id) => {
      if (!analyticsMap[id]) {
        analyticsMap[id] = {
          views: 0,
          uniqueVisitors: 0,
        };
      }
    });

    console.log("Final Analytics Map (with zeros):", analyticsMap);
    console.log("=== End GA4 Debug ===\n");

    return analyticsMap;
  } catch (error: any) {
    console.error("Error fetching analytics data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to fetch analytics data",
    });
  }
});
