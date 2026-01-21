import { createClient } from "@supabase/supabase-js";

/**
 * Secure endpoint to update flipbook details
 * Follows soft limit strategy: users can always edit their existing flipbooks
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const body = await readBody(event);
    const { flipbookId, userId, title, company_name, description } = body;

    // Validate required fields
    if (!flipbookId || !userId) {
      throw createError({
        statusCode: 400,
        message: "Missing required fields: flipbookId and userId",
      });
    }

    if (!title || title.trim().length === 0) {
      throw createError({
        statusCode: 400,
        message: "Title is required",
      });
    }

    // Initialize Supabase with service role key to bypass RLS for validation
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      config.supabaseSecretKey!
    );

    // Verify the flipbook belongs to the user
    // NOTE: We DON'T check subscription status for editing existing flipbooks
    // This follows the "soft limit" strategy where users can always manage their existing content
    const { data: flipbook, error: flipbookError } = await supabase
      .from("flipbooks")
      .select("id, user_id")
      .eq("id", flipbookId)
      .eq("user_id", userId)
      .single();

    if (flipbookError || !flipbook) {
      console.error("Flipbook not found or unauthorized:", flipbookError);
      throw createError({
        statusCode: 404,
        message: "Flipbook not found or you don't have permission to edit it",
      });
    }

    // All validations passed - perform the update
    const { data: updatedFlipbook, error: updateError } = await supabase
      .from("flipbooks")
      .update({
        title: title.trim(),
        company_name: company_name?.trim() || null,
        description: description?.trim() || null,
      })
      .eq("id", flipbookId)
      .eq("user_id", userId)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating flipbook:", updateError);
      throw createError({
        statusCode: 500,
        message: "Failed to update flipbook",
      });
    }

    console.log(`✅ Flipbook ${flipbookId} updated by user ${userId}`);

    return {
      success: true,
      flipbook: updatedFlipbook,
    };
  } catch (error: any) {
    console.error("Update flipbook error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to update flipbook",
    });
  }
});
