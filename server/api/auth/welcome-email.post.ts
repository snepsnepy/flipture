import { createClient } from "@supabase/supabase-js";

/**
 * Send welcome email to new users
 * This can be called manually or set up as a Supabase webhook
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { userId } = body;

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "User ID is required",
      });
    }

    // Initialize Supabase client
    const config = useRuntimeConfig();
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      config.supabaseSecretKey!
    );

    // Get user profile
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", userId)
      .single();

    if (error || !profile) {
      throw createError({
        statusCode: 404,
        message: "User profile not found",
      });
    }

    if (!profile.email) {
      throw createError({
        statusCode: 400,
        message: "User email not found",
      });
    }

    // Send welcome email
    const { sendEmail, emailTemplates } = await import("../../utils/sendEmail");
    const userName = profile.full_name || "there";
    const emailContent = emailTemplates.welcome(userName);

    const emailSent = await sendEmail({
      to: profile.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    if (emailSent) {
      console.log(`📧 Welcome email sent to ${profile.email}`);
      return { success: true, message: "Welcome email sent successfully" };
    } else {
      throw createError({
        statusCode: 500,
        message: "Failed to send welcome email",
      });
    }
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to send welcome email",
    });
  }
});

