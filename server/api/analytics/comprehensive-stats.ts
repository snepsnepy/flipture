import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { defineEventHandler, getQuery, createError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const flipbookIds = query.flipbookIds as string | string[];
    const dateRange = (query.dateRange as string) || "30"; // Default to 30 days

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

    // Calculate date range
    const daysAgo = parseInt(dateRange);
    const startDate = `${daysAgo}daysAgo`;
    const previousStartDate = `${daysAgo * 2}daysAgo`;
    const previousEndDate = `${daysAgo}daysAgo`;

    // Fetch current period analytics with country data
    const [currentResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: startDate,
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "customEvent:flipbook_id",
        },
        {
          name: "country",
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

    // Fetch previous period analytics for comparison
    const [previousResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: previousStartDate,
          endDate: previousEndDate,
        },
      ],
      dimensions: [
        {
          name: "customEvent:flipbook_id",
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

    // Fetch daily breakdown for charts
    const [dailyResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: startDate,
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "customEvent:flipbook_id",
        },
        {
          name: "date",
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
      orderBys: [
        {
          dimension: {
            dimensionName: "date",
          },
        },
      ],
    });

    // Parse current period data
    const analyticsMap: Record<
      string,
      {
        views: number;
        uniqueVisitors: number;
        countries: Record<string, { views: number; visitors: number }>;
        previousViews: number;
        previousVisitors: number;
        dailyData: Array<{ date: string; views: number; visitors: number }>;
      }
    > = {};

    // Initialize data structure
    ids.forEach((id) => {
      analyticsMap[id] = {
        views: 0,
        uniqueVisitors: 0,
        countries: {},
        previousViews: 0,
        previousVisitors: 0,
        dailyData: [],
      };
    });

    // Process current period data with countries
    currentResponse.rows?.forEach((row) => {
      const flipbookId = row.dimensionValues?.[0]?.value;
      const country = row.dimensionValues?.[1]?.value || "Unknown";
      const views = parseInt(row.metricValues?.[0]?.value || "0");
      const uniqueVisitors = parseInt(row.metricValues?.[1]?.value || "0");

      if (flipbookId && ids.includes(flipbookId)) {
        analyticsMap[flipbookId]!.views += views;
        analyticsMap[flipbookId]!.uniqueVisitors += uniqueVisitors;

        if (!analyticsMap[flipbookId]!.countries[country]) {
          analyticsMap[flipbookId]!.countries[country] = {
            views: 0,
            visitors: 0,
          };
        }
        analyticsMap[flipbookId]!.countries[country]!.views += views;
        analyticsMap[flipbookId]!.countries[country]!.visitors += uniqueVisitors;
      }
    });

    // Process previous period data
    previousResponse.rows?.forEach((row) => {
      const flipbookId = row.dimensionValues?.[0]?.value;
      const views = parseInt(row.metricValues?.[0]?.value || "0");
      const uniqueVisitors = parseInt(row.metricValues?.[1]?.value || "0");

      if (flipbookId && ids.includes(flipbookId)) {
        analyticsMap[flipbookId]!.previousViews = views;
        analyticsMap[flipbookId]!.previousVisitors = uniqueVisitors;
      }
    });

    // Process daily data
    const dailyDataMap: Record<string, Record<string, { views: number; visitors: number }>> = {};
    
    dailyResponse.rows?.forEach((row) => {
      const flipbookId = row.dimensionValues?.[0]?.value;
      const date = row.dimensionValues?.[1]?.value;
      const views = parseInt(row.metricValues?.[0]?.value || "0");
      const visitors = parseInt(row.metricValues?.[1]?.value || "0");

      if (flipbookId && ids.includes(flipbookId) && date) {
        if (!dailyDataMap[flipbookId]) {
          dailyDataMap[flipbookId] = {};
        }
        if (!dailyDataMap[flipbookId]![date]) {
          dailyDataMap[flipbookId]![date] = { views: 0, visitors: 0 };
        }
        dailyDataMap[flipbookId]![date]!.views += views;
        dailyDataMap[flipbookId]![date]!.visitors += visitors;
      }
    });

    // Convert daily data to arrays
    Object.keys(dailyDataMap).forEach((flipbookId) => {
      const dailyData = Object.entries(dailyDataMap[flipbookId]!).map(([date, data]) => ({
        date,
        views: data.views,
        visitors: data.visitors,
      }));
      analyticsMap[flipbookId]!.dailyData = dailyData.sort((a, b) => a.date.localeCompare(b.date));
    });

    return analyticsMap;
  } catch (error: any) {
    console.error("Error fetching comprehensive analytics data:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to fetch analytics data",
    });
  }
});

