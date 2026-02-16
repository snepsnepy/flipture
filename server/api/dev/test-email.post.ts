import { createClient } from "@supabase/supabase-js";

/**
 * DEVELOPMENT ONLY: Send test emails to the current user
 * This endpoint allows testing different email templates
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { userId, emailType } = body;

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "User ID is required",
      });
    }

    if (!emailType) {
      throw createError({
        statusCode: 400,
        message: "Email type is required",
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

    // Import email utilities
    const { sendEmail, emailTemplates } = await import("../../utils/sendEmail");
    const userName = profile.full_name || "there";

    // Get the appropriate email template
    let emailContent;
    
    switch (emailType) {
      case "welcome":
        emailContent = emailTemplates.welcome(userName);
        break;
      
      case "subscriptionSuccess":
        emailContent = emailTemplates.subscriptionSuccess(
          userName,
          "Premium",
          "$9.99/month"
        );
        break;
      
      case "subscriptionCancelled":
        emailContent = emailTemplates.subscriptionCancelled(
          userName,
          "Premium"
        );
        break;
      
      case "paymentFailed":
        emailContent = emailTemplates.paymentFailed(userName);
        break;
      
      case "renewalReminder":
        const renewalDate = new Date();
        renewalDate.setDate(renewalDate.getDate() + 7);
        emailContent = emailTemplates.renewalReminder(
          userName,
          "Premium",
          renewalDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          "$9.99/month"
        );
        break;
      
      default:
        throw createError({
          statusCode: 400,
          message: `Invalid email type: ${emailType}`,
        });
    }

    // Send the email
    const emailSent = await sendEmail({
      to: profile.email,
      subject: `[TEST] ${emailContent.subject}`,
      html: emailContent.html,
      text: emailContent.text,
    });

    if (emailSent) {
      console.log(`📧 Test email (${emailType}) sent to ${profile.email}`);
      return { 
        success: true, 
        message: `Test ${emailType} email sent to ${profile.email}`,
        emailType
      };
    } else {
      throw createError({
        statusCode: 500,
        message: "Failed to send test email",
      });
    }
  } catch (error: any) {
    console.error("Error sending test email:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to send test email",
    });
  }
});
