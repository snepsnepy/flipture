import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/supabase";

const PLAN_LIMITS = {
  free: { maxFlipbooks: 3 },
  standard: { maxFlipbooks: 100 },
  premium: { maxFlipbooks: 100 },
};

// Authoritative server-side lists — must stay in sync with DesignOptionsStep.vue
const PREMIUM_COVER_OPTIONS = new Set(["first-page", "first-last-page"]);
const PREMIUM_GRADIENTS = new Set([
  "royal-blue",
  "purple-dream",
  "sunset-orange",
  "fire-red",
  "spring-green",
  "arctic-blue",
]);

function validatePremiumFeatures(
  userPlan: string,
  coverOption: string | undefined,
  backgroundGradient: string | undefined
): string | null {
  if (userPlan !== "free") return null;
  if (coverOption && PREMIUM_COVER_OPTIONS.has(coverOption)) {
    return "The selected cover option requires a Standard or Premium plan";
  }
  if (backgroundGradient && PREMIUM_GRADIENTS.has(backgroundGradient)) {
    return "The selected background gradient requires a Standard or Premium plan";
  }
  return null;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const body = await readBody(event);
    const {
      userId,
      title,
      company,
      description,
      pdfFileUrl,
      pdfFileName,
      pdfFileSize,
      coverOption,
      backgroundGradient,
    } = body;

    if (!userId || !title?.trim() || !pdfFileUrl) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: userId, title, or pdfFileUrl",
      });
    }

    const supabaseAdmin = createClient<Database>(
      process.env.SUPABASE_URL!,
      config.supabaseSecretKey!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Resolve the user's actual plan from the database — never trust the client
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

    // Enforce plan-gated features server-side
    const featureError = validatePremiumFeatures(
      userPlan,
      coverOption,
      backgroundGradient
    );
    if (featureError) {
      throw createError({ statusCode: 403, statusMessage: featureError });
    }

    // Enforce flipbook count limit
    const limits = PLAN_LIMITS[userPlan] ?? PLAN_LIMITS.free;
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

    if ((count ?? 0) >= limits.maxFlipbooks) {
      throw createError({
        statusCode: 403,
        statusMessage: `You've reached the maximum of ${limits.maxFlipbooks} flipbooks for your ${userPlan} plan`,
      });
    }

    // All checks passed — perform the INSERT with the service role key
    const { data: flipbook, error: insertError } = await supabaseAdmin
      .from("flipbooks")
      .insert({
        title: title.trim(),
        company_name: company?.trim() || null,
        description: description?.trim() || null,
        user_id: userId,
        pdf_file_url: pdfFileUrl,
        pdf_file_name: pdfFileName,
        pdf_file_size: pdfFileSize,
        cover_options: coverOption || "default",
        background_gradient: backgroundGradient || "deep-white",
      } as unknown as never)
      .select()
      .single();

    if (insertError) {
      throw createError({
        statusCode: 500,
        statusMessage: `Database error: ${insertError.message}`,
      });
    }

    return { success: true, flipbook };
  } catch (error: any) {
    console.error("Create flipbook error:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Internal server error",
    });
  }
});
