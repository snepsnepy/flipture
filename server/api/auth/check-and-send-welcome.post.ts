import { createClient } from "@supabase/supabase-js";

/**
 * Check if welcome email was sent, and send it if not
 * This is called on first login after email verification
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { userId } = body;

    if (!userId) {
      return { success: false, message: "User ID required" };
    }

    const config = useRuntimeConfig();
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      config.supabaseSecretKey!
    );

    // Get profile and check if welcome email was already sent
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("welcome_email_sent, email, full_name")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      console.error("Profile not found:", profileError);
      return { success: false, message: "Profile not found" };
    }

    // If already sent, skip
    if (profile.welcome_email_sent) {
      return { success: true, message: "Welcome email already sent", skipped: true };
    }

    // Check if user's email is verified
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(userId);
    
    if (authError || !authUser) {
      console.error("Auth user not found:", authError);
      return { success: false, message: "Auth user not found" };
    }

    // Only send if email is confirmed
    if (!authUser.user.email_confirmed_at) {
      console.log(`Email not verified yet for user ${userId}, skipping welcome email`);
      return { success: true, message: "Email not verified yet", skipped: true };
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
      // Mark as sent in database
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ welcome_email_sent: true })
        .eq("id", userId);

      if (updateError) {
        console.error("Failed to update welcome_email_sent flag:", updateError);
        // Don't fail the request - email was sent successfully
      }

      console.log(`📧 Welcome email sent to ${profile.email} on first login`);
      return { success: true, message: "Welcome email sent" };
    }

    return { success: false, message: "Failed to send email" };
  } catch (error: any) {
    console.error("Error in check-and-send-welcome:", error);
    return { success: false, message: error.message };
  }
});

