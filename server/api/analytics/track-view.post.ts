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
    console.log("🔍 [Analytics] Track view endpoint called");

    const body = await readBody(event);
    console.log("📦 [Analytics] Request body:", body);

    const { flipbook_id, session_id, device_type, referrer } = body;

    // Validate required fields
    if (!flipbook_id || !session_id) {
      console.error("❌ [Analytics] Missing required fields");
      throw createError({
        statusCode: 400,
        message: "Missing required fields: flipbook_id and session_id",
      });
    }

    // Initialize Supabase client with service role key for write access
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

    console.log("🔑 [Analytics] Supabase URL:", supabaseUrl);
    console.log("🔑 [Analytics] Has Key:", !!supabaseServiceKey);

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("❌ [Analytics] Supabase configuration missing");
      throw createError({
        statusCode: 500,
        message: "Supabase configuration missing",
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log("✅ [Analytics] Supabase client created");

    // First, verify the flipbook exists
    console.log("🔍 [Analytics] Checking if flipbook exists:", flipbook_id);

    const { data: flipbookExists, error: flipbookError } = await supabase
      .from("flipbooks")
      .select("id")
      .eq("id", flipbook_id)
      .single();

    if (flipbookError) {
      console.error("❌ [Analytics] Error checking flipbook:", flipbookError);
    }

    if (flipbookError || !flipbookExists) {
      throw createError({
        statusCode: 404,
        message: "Flipbook not found",
      });
    }

    console.log("✅ [Analytics] Flipbook exists");

    // Insert the view record
    console.log("📝 [Analytics] Inserting view record...");

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
      console.error("❌ [Analytics] Error inserting view:", insertError);
      throw createError({
        statusCode: 500,
        message: "Failed to track view",
      });
    }

    console.log("✅ [Analytics] View record inserted");

    // Calculate metrics from flipbook_views table (source of truth)
    console.log("📊 [Analytics] Calculating metrics...");

    // Get total views count
    const { count: totalViews } = await supabase
      .from("flipbook_views")
      .select("*", { count: "exact", head: true })
      .eq("flipbook_id", flipbook_id);

    // Get distinct sessions for unique visitors
    const { data: distinctSessions } = await supabase
      .from("flipbook_views")
      .select("session_id")
      .eq("flipbook_id", flipbook_id);

    const uniqueCount = distinctSessions
      ? new Set(distinctSessions.map((v) => v.session_id)).size
      : 1;

    console.log("📊 [Analytics] Metrics:", {
      totalViews,
      uniqueCount,
    });

    // UPSERT (insert or update) analytics - thread-safe!
    const { error: upsertError } = await supabase
      .from("flipbook_analytics")
      .upsert(
        {
          flipbook_id,
          total_views: totalViews || 1,
          unique_visitors: uniqueCount,
          last_viewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "flipbook_id",
        }
      );

    if (upsertError) {
      console.error("❌ [Analytics] Error upserting analytics:", upsertError);
      // Don't throw error - view was already tracked
    } else {
      console.log("✅ [Analytics] Analytics updated");
    }

    console.log("🎉 [Analytics] View tracked successfully!");
    return { success: true, message: "View tracked successfully" };
  } catch (error: any) {
    console.error("❌ [Analytics] Error in track-view endpoint:", error);
    console.error("❌ [Analytics] Error details:", {
      message: error.message,
      statusCode: error.statusCode,
      stack: error.stack,
    });

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
