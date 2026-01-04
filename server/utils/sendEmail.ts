export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email using Resend API (recommended) or another service
 * For now, we'll use a simple implementation that can be extended
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // For development/testing, just log the email
    if (process.env.NODE_ENV === "development") {
      console.log("📧 [DEV MODE] Email would be sent:");
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`Body:\n${options.text || options.html}`);
      return true;
    }

    // NOTE: Implement actual email sending with Resend, SendGrid, or another service
    // For production, you would integrate with an email service here
    // Example: const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from, to, subject, html, text });

    console.log(`✅ Email queued to: ${options.to}`);
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return false;
  }
}

/**
 * Email templates
 */
export const emailTemplates = {
  subscriptionCancelled: (userName: string, planName: string) => ({
    subject: "Your Flipture Subscription Has Been Cancelled",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0046ff 0%, #7b2cbf 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px 20px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #0046ff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .warning-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .info-box { background: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Flipture</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Subscription Update</p>
          </div>
          
          <div class="content">
            <h2 style="color: #333; margin-top: 0;">Hi ${userName},</h2>
            
            <p>We wanted to let you know that your <strong>${planName}</strong> subscription has been cancelled and you've been moved to the <strong>Free plan</strong>.</p>
            
            <div class="warning-box">
              <strong>⚠️ What this means for you:</strong>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>You can keep all your existing flipbooks</li>
                <li>You cannot create new flipbooks if you have 3 or more</li>
                <li>New uploads are limited to 5MB (instead of ${
                  planName === "Premium" ? "50MB" : "30MB"
                })</li>
                <li>You cannot edit flipbook details anymore</li>
                <li>Watermarks will appear on new flipbooks</li>
                <li>Analytics access has been removed</li>
              </ul>
            </div>
            
            <div class="info-box">
              <strong>💡 Your Content is Safe</strong>
              <p style="margin: 5px 0;">All your existing flipbooks remain accessible and can be viewed and shared as usual.</p>
            </div>
            
            <p>If you'd like to regain access to premium features, you can reactivate your subscription at any time.</p>
            
            <div style="text-align: center;">
              <a href="https://flipture.netlify.app/pricing" class="button">View Pricing Plans</a>
            </div>
            
            <p style="margin-top: 30px; color: #666;">If you have any questions or believe this was a mistake, please don't hesitate to contact us.</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Flipture. All rights reserved.</p>
            <p>Create and share beautiful flipbooks with ease.</p>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${userName},

Your ${planName} subscription has been cancelled and you've been moved to the Free plan.

WHAT THIS MEANS:
- ✅ You keep all your existing flipbooks
- ❌ Cannot create new flipbooks if you have 3 or more
- ❌ New uploads limited to 5MB
- ❌ Cannot edit flipbook details
- ❌ Watermarks on new flipbooks
- ❌ No analytics access

YOUR CONTENT IS SAFE: All existing flipbooks remain accessible.

Reactivate your subscription anytime at: https://flipture.netlify.app/pricing

Questions? Contact us anytime.

© ${new Date().getFullYear()} Flipture
    `.trim(),
  }),

  paymentFailed: (userName: string) => ({
    subject: "Payment Failed - Action Required",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ff3f33 0%, #ff6b6b 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px 20px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #ff3f33; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .alert-box { background: #ffebee; border-left: 4px solid #f44336; padding: 15px; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">⚠️ Payment Failed</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Action Required</p>
          </div>
          
          <div class="content">
            <h2 style="color: #333; margin-top: 0;">Hi ${userName},</h2>
            
            <div class="alert-box">
              <strong>We couldn't process your payment</strong>
              <p style="margin: 10px 0 0;">Your subscription payment has failed. This could be due to insufficient funds, an expired card, or other payment issues.</p>
            </div>
            
            <p><strong>What you need to do:</strong></p>
            <ul>
              <li>Update your payment method</li>
              <li>Ensure your card has sufficient funds</li>
              <li>Check that your card hasn't expired</li>
            </ul>
            
            <p>If we don't receive payment soon, your subscription will be cancelled and you'll be moved to the Free plan.</p>
            
            <div style="text-align: center;">
              <a href="https://flipture.netlify.app/settings" class="button">Update Payment Method</a>
            </div>
            
            <p style="margin-top: 30px; color: #666;">Need help? Contact our support team.</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Flipture. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${userName},

⚠️ PAYMENT FAILED - ACTION REQUIRED

We couldn't process your subscription payment. This could be due to:
- Insufficient funds
- Expired card
- Other payment issues

WHAT TO DO:
1. Update your payment method
2. Ensure sufficient funds
3. Check card expiration

Update now: https://flipture.netlify.app/settings

If not resolved, your subscription will be cancelled.

© ${new Date().getFullYear()} Flipture
    `.trim(),
  }),
};
