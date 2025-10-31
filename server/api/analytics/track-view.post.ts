import { createClient } from "@supabase/supabase-js";

/**
 * PUBLIC API Endpoint - Track Flipbook View
 * Called by flipture-view app when someone views a flipbook
 *
 * Expected body:
 * {
 *   flipbook_id: string,
 *   session_id: string,
 *   device_type?: 'mobile' | 'tablet' | 'desktop',
 *   referrer?: string
 * }
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { flipbook_id, session_id, device_type, referrer } = body;

    // Validate required fields
    if (!flipbook_id || !session_id) {
      throw createError({
        statusCode: 400,
        message: "Missing required fields: flipbook_id and session_id",
      });
    }

    // Initialize Supabase client with service role key for write access
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw createError({
        statusCode: 500,
        message: "Supabase configuration missing",
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // First, verify the flipbook exists
    const { data: flipbookExists, error: flipbookError } = await supabase
      .from("flipbooks")
      .select("id")
      .eq("id", flipbook_id)
      .single();

    if (flipbookError || !flipbookExists) {
      throw createError({
        statusCode: 404,
        message: "Flipbook not found",
      });
    }

    // Insert the view record
    const { error: insertError } = await supabase
      .from("flipbook_views")
      .insert({
        flipbook_id,
        session_id,
        device_type: device_type || null,
        referrer: referrer || null,
        viewed_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error("Error inserting view:", insertError);
      throw createError({
        statusCode: 500,
        message: "Failed to track view",
      });
    }

    // Update or create analytics aggregate
    const { data: existingAnalytics } = await supabase
      .from("flipbook_analytics")
      .select("id, total_views")
      .eq("flipbook_id", flipbook_id)
      .single();

    if (existingAnalytics) {
      // Update existing analytics - increment total views
      await supabase
        .from("flipbook_analytics")
        .update({
          total_views: existingAnalytics.total_views + 1,
          last_viewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("flipbook_id", flipbook_id);

      // Calculate unique visitors (count distinct session_ids)
      const { data: distinctSessions } = await supabase
        .from("flipbook_views")
        .select("session_id")
        .eq("flipbook_id", flipbook_id);

      const uniqueCount = distinctSessions
        ? new Set(distinctSessions.map((v) => v.session_id)).size
        : 1;

      // Update unique visitors count
      await supabase
        .from("flipbook_analytics")
        .update({
          unique_visitors: uniqueCount,
        })
        .eq("flipbook_id", flipbook_id);
    } else {
      // Create new analytics record
      await supabase.from("flipbook_analytics").insert({
        flipbook_id,
        total_views: 1,
        unique_visitors: 1,
        last_viewed_at: new Date().toISOString(),
      });
    }

    return { success: true, message: "View tracked successfully" };
  } catch (error: any) {
    console.error("Error in track-view endpoint:", error);

    // Return appropriate error
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: "Failed to track view",
    });
  }
});
