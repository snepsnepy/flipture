import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/supabase";

// Plan limits configuration
const PLAN_LIMITS = {
  free: {
    maxFlipbooks: 3,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
  standard: {
    maxFlipbooks: 100,
    maxFileSize: 30 * 1024 * 1024, // 30MB
  },
  premium: {
    maxFlipbooks: 100,
    maxFileSize: 50 * 1024 * 1024, // 50MB
  },
};

export default defineEventHandler(async (event) => {
  try {
    // Get request body
    const body = await readBody(event);
    const { userId, fileSize } = body;

    if (!userId || fileSize === undefined) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: userId or fileSize",
      });
    }

    // Initialize Supabase admin client
    const config = useRuntimeConfig();
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = config.supabaseSecretKey;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw createError({
        statusCode: 500,
        statusMessage: "Server configuration error",
      });
    }

    const supabaseAdmin = createClient<Database>(
      supabaseUrl,
      supabaseServiceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Get user's profile to check subscription status
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("subscription_plan, subscription_status")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      throw createError({
        statusCode: 404,
        statusMessage: "User profile not found",
      });
    }

    // Determine user's plan - explicitly type the profile data
    const profileData = profile as {
      subscription_status: string | null;
      subscription_plan: string | null;
    };

    const isActivePlan =
      profileData.subscription_status === "active" &&
      profileData.subscription_plan;
    const userPlan = isActivePlan
      ? (profileData.subscription_plan as keyof typeof PLAN_LIMITS)
      : "free";

    const limits = PLAN_LIMITS[userPlan] || PLAN_LIMITS.free;

    // Check file size
    if (fileSize > limits.maxFileSize) {
      return {
        success: false,
        error: "file_size_exceeded",
        message: `File size exceeds the ${
          limits.maxFileSize / (1024 * 1024)
        }MB limit for your ${userPlan} plan`,
        limit: limits.maxFileSize,
        currentValue: fileSize,
      };
    }

    // Check flipbook count
    const { count, error: countError } = await supabaseAdmin
      .from("flipbooks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (countError) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error checking flipbook count",
      });
    }

    const currentCount = count || 0;

    if (currentCount >= limits.maxFlipbooks) {
      return {
        success: false,
        error: "flipbook_limit_reached",
        message: `You've reached the maximum of ${limits.maxFlipbooks} flipbooks for your ${userPlan} plan`,
        limit: limits.maxFlipbooks,
        currentValue: currentCount,
      };
    }

    // All validations passed
    return {
      success: true,
      plan: userPlan,
      limits: {
        maxFlipbooks: limits.maxFlipbooks,
        maxFileSize: limits.maxFileSize,
        currentFlipbooks: currentCount,
        remainingFlipbooks: limits.maxFlipbooks - currentCount,
      },
    };
  } catch (error: any) {
    console.error("Validation error:", error);

    // If it's already a createError, rethrow it
    if (error.statusCode) {
      throw error;
    }

    // Otherwise, create a generic error
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Internal server error",
    });
  }
});
