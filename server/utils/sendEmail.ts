import { Resend } from "resend";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email using Resend API
 * In development mode, emails are logged to console
 * In production, emails are sent via Resend
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Check if email sending is enabled
    const shouldSendEmails = process.env.SEND_EMAILS === "true";

    // For development/testing, just log the email
    if (!shouldSendEmails) {
      console.log("📧 [DEV MODE] Email would be sent:");
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(
        `Body:\n${options.text || options.html.substring(0, 200)}...`
      );
      return true;
    }

    // Send via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Flipture <onboarding@resend.dev>";

    if (!resendApiKey) {
      console.error("❌ RESEND_API_KEY not configured");
      return false;
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    console.log(`✅ Email sent to: ${options.to}`);
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
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #ffffff;
    "
  >
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      width="100%"
      style="margin: 0; padding: 0"
    >
      <tr>
        <td align="center" style="padding: 20px">
          <table
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            width="600"
            style="max-width: 600px; width: 100%"
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: #0046ff;
                  color: white;
                  padding: 40px 20px;
                  text-align: center;
                  border-radius: 16px 16px 0 0;
                "
              >
                <h1 style="margin: 0; font-size: 32px; font-weight: 700">
                  Subscription Update
                </h1>
                <p style="margin: 15px 0 0; opacity: 1; font-size: 16px">
                  Your subscription has been cancelled
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td
                style="
                  background: #f9f9f9;
                  padding: 30px 20px;
                  border-radius: 0 0 16px 16px;
                "
              >
                <h2 style="color: #333; margin-top: 0; font-weight: 600">
                  Hi ${userName},
                </h2>

                <p style="font-size: 16px; margin: 15px 0">
                  We wanted to let you know that your <strong>${planName}</strong> subscription has been cancelled and you've been moved to the <strong>Free plan</strong>.
                </p>

                <!-- Warning Box -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background: rgba(255, 128, 64, 0.05);
                    margin: 20px 0;
                    border-radius: 8px;
                    border: 1px solid rgba(255, 128, 64, 1);
                  "
                >
                  <tr>
                    <td style="padding: 20px">
                      <h3
                        style="
                          margin: 0 0 10px 0;
                          color: rgba(255, 128, 64, 1);
                          font-weight: 600;
                        "
                      >
                        ⚠️ What this means for you:
                      </h3>
                      <ul style="margin: 10px 0; padding-left: 20px">
                        <li style="margin: 5px 0">You can keep all your existing flipbooks</li>
                        <li style="margin: 5px 0">You cannot create new flipbooks if you have 3 or more</li>
                        <li style="margin: 5px 0">New uploads are limited to 5MB (instead of ${
                          planName === "Premium" ? "50MB" : "30MB"
                        })</li>
                        <li style="margin: 5px 0">You cannot edit flipbook details anymore</li>
                        <li style="margin: 5px 0">Watermarks will appear on new flipbooks</li>
                        <li style="margin: 5px 0">Analytics access has been removed</li>
                      </ul>
                    </td>
                  </tr>
                </table>

                <!-- Info Box -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background: rgba(28, 76, 191, 0.05);
                    margin: 20px 0;
                    border-radius: 8px;
                    border: 1px solid #1c4cbf;
                  "
                >
                  <tr>
                    <td style="padding: 20px">
                      <h3
                        style="
                          margin: 0 0 5px 0;
                          color: #1c4cbf;
                          font-weight: 600;
                        "
                      >
                        💡 Your Content is Safe
                      </h3>
                      <p style="margin: 5px 0; color: #1c4cbf">
                        All your existing flipbooks remain accessible and can be viewed and shared as usual.
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="font-size: 16px; margin: 20px 0">
                  If you'd like to regain access to premium features, you can reactivate your subscription at any time.
                </p>

                <!-- Button -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                >
                  <tr>
                    <td align="center" style="padding-top: 10px">
                      <a
                        href="https://flipture.io/pricing"
                        style="
                          display: inline-block;
                          background: #0046ff;
                          color: #ffffff;
                          padding: 14px 35px;
                          text-decoration: none;
                          border-radius: 8px;
                          margin: 0;
                          font-weight: 600;
                        "
                        >View Pricing Plans</a
                      >
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    color: #666;
                    font-size: 14px;
                    margin-top: 30px;
                    text-align: center;
                  "
                >
                  If you have any questions or believe this was a mistake, please contact us at <a href="mailto:support@flipture.io">support@flipture.io</a>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  text-align: center;
                  padding: 30px 20px 0 20px;
                  color: #666;
                  font-size: 12px;
                "
              >
                <p style="margin: 5px 0">
                  © ${new Date().getFullYear()} Flipture. All rights reserved.
                </p>
                <p style="margin: 5px 0">
                  Create and share beautiful flipbooks with ease.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
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
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #ffffff;
    "
  >
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      width="100%"
      style="margin: 0; padding: 0"
    >
      <tr>
        <td align="center" style="padding: 20px">
          <table
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            width="600"
            style="max-width: 600px; width: 100%"
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: #ff3f33;
                  color: white;
                  padding: 40px 20px;
                  text-align: center;
                  border-radius: 16px 16px 0 0;
                "
              >
                <h1 style="margin: 0; font-size: 32px; font-weight: 700">
                  Payment Failed
                </h1>
                <p style="margin: 15px 0 0; opacity: 1; font-size: 16px">
                  Action Required
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td
                style="
                  background: #f9f9f9;
                  padding: 30px 20px;
                  border-radius: 0 0 16px 16px;
                "
              >
                <h2 style="color: #333; margin-top: 0; font-weight: 600">
                  Hi ${userName},
                </h2>

                <!-- Alert Box -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background: rgba(255, 63, 51, 0.05);
                    margin: 20px 0;
                    border-radius: 8px;
                    border: 1px solid #ff3f33;
                  "
                >
                  <tr>
                    <td style="padding: 20px">
                      <h3
                        style="
                          margin: 0 0 10px 0;
                          color: #ff3f33;
                          font-weight: 600;
                        "
                      >
                        We couldn't process your payment
                      </h3>
                      <p style="margin: 5px 0; font-size: 16px">
                        Your subscription payment has failed. This could be due
                        to insufficient funds, an expired card, or other payment
                        issues.
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="font-size: 16px; margin: 20px 0 10px 0">
                  <strong>What you need to do:</strong>
                </p>
                <ul style="margin: 10px 0; padding-left: 30px">
                  <li style="margin: 5px 0">Update your payment method</li>
                  <li style="margin: 5px 0">
                    Ensure your card has sufficient funds
                  </li>
                  <li style="margin: 5px 0">
                    Check that your card hasn't expired
                  </li>
                </ul>

                <p style="font-size: 16px; margin: 15px 0">
                  If we don't receive payment soon, your subscription will be
                  cancelled and you'll be moved to the Free plan.
                </p>

                <!-- Button -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                >
                  <tr>
                    <td align="center" style="padding-top: 20px">
                      <a
                        href="https://flipture.io/settings"
                        style="
                          display: inline-block;
                          background: #ff3f33;
                          color: #ffffff;
                          padding: 14px 35px;
                          text-decoration: none;
                          border-radius: 8px;
                          margin: 0;
                          font-weight: 600;
                        "
                        >Update Payment Method</a
                      >
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    color: #666;
                    font-size: 14px;
                    margin-top: 30px;
                    text-align: center;
                  "
                >
                  Need help? Contact our support team at
                  <a href="mailto:support@flipture.io">support@flipture.io</a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  text-align: center;
                  padding: 30px 20px 0 20px;
                  color: #666;
                  font-size: 12px;
                "
              >
                <p style="margin: 5px 0">
                  © ${new Date().getFullYear()} Flipture. All rights reserved.
                </p>
                <p style="margin: 5px 0">
                  Create and share beautiful flipbooks with ease.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
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

  welcome: (userName: string) => ({
    subject: "Welcome to Flipture! 🎉",
    html: `
      <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #ffffff;
    "
  >
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      width="100%"
      style="margin: 0; padding: 0"
    >
      <tr>
        <td align="center" style="padding: 20px">
          <table
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            width="600"
            style="max-width: 600px; width: 100%"
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: #0046ff;
                  color: white;
                  padding: 40px 20px;
                  text-align: center;
                  border-radius: 16px 16px 0 0;
                "
              >
                <h1 style="margin: 0; font-size: 32px; font-weight: 700">
                  Welcome to Flipture!
                </h1>
                <p style="margin: 10px 0 0; opacity: 1; font-size: 16px">
                  Transform your PDFs into stunning 3D flipbooks
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td
                style="
                  background: #f9f9f9;
                  padding: 30px 20px;
                  border-radius: 0 0 16px 16px;
                "
              >
                <h2 style="color: #333; margin-top: 0; font-weight: 600">
                  Hi ${userName}! 👋
                </h2>

                <p style="font-size: 16px; margin: 15px 0">
                  Thank you for joining Flipture! We're excited to help you
                  create beautiful, interactive flipbooks that engage your
                  audience.
                </p>

                <!-- Feature Box -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background: white;
                    margin: 15px 0;
                    border-radius: 8px;
                    border: 1px solid #8d8d8d;
                  "
                >
                  <tr>
                    <td style="padding: 15px">
                      <h3
                        style="
                          margin: 0 0 10px 0;
                          color: #0046ff;
                          font-weight: 600;
                        "
                      >
                        ✨ What you can do with Flipture:
                      </h3>
                      <ul style="margin: 10px 0; padding-left: 30px">
                        <li style="margin: 5px 0">
                          <strong>Upload PDFs</strong> - Drag and drop your
                          documents
                        </li>
                        <li style="margin: 5px 0">
                          <strong>3D Page Flipping</strong> - Realistic
                          page-turning animations
                        </li>
                        <li style="margin: 5px 0">
                          <strong>Share Instantly</strong> - Get shareable links
                          in seconds
                        </li>
                        <li style="margin: 5px 0">
                          <strong>Mobile Friendly</strong> - Perfect on all
                          devices
                        </li>
                        <li style="margin: 5px 0">
                          <strong>Track Performance</strong> - See views and
                          engagement
                        </li>
                      </ul>
                    </td>
                  </tr>
                </table>

                <p style="font-size: 16px; margin: 25px 0 20px 0">
                  Ready to create your first flipbook? It only takes a few
                  minutes!
                </p>

                <!-- Button -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                >
                  <tr>
                    <td align="center">
                      <a
                        href="https://flipture.io/dashboard"
                        style="
                          display: inline-block;
                          background: #0046ff;
                          color: #ffffff;
                          padding: 14px 35px;
                          text-decoration: none;
                          border-radius: 8px;
                          margin: 20px 0;
                          font-weight: 600;
                        "
                        >Create Your First Flipbook</a
                      >
                    </td>
                  </tr>
                </table>

                <!-- Pro Tip Box -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background: #0044ff07;
                    margin: 25px 0;
                    border-radius: 8px;
                    border: 1px solid #0044ff;
                  "
                >
                  <tr>
                    <td style="padding: 16px">
                      <strong>💡 Pro Tip:</strong> Free accounts can create up
                      to 3 flipbooks. Upgrade anytime for unlimited flipbooks
                      and premium features!
                    </td>
                  </tr>
                </table>

                <p style="color: #666; font-size: 14px; margin: 25px 0 0 0">
                  Questions? Need help? Contact our support team at
                  <a href="mailto:support@flipture.io">support@flipture.io</a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  text-align: center;
                  padding: 30px 20px 0 20px;
                  color: #666;
                  font-size: 12px;
                "
              >
                <p style="margin: 5px 0">
                  © ${new Date().getFullYear()} Flipture. All rights reserved.
                </p>
                <p style="margin: 5px 0">
                  Create and share beautiful flipbooks with ease.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `,
    text: `
Welcome to Flipture! 🎉

Hi ${userName}! 👋

Thank you for joining Flipture! We're excited to help you create beautiful, interactive flipbooks.

WHAT YOU CAN DO:
✨ Upload PDFs - Drag and drop your documents
📖 3D Page Flipping - Realistic animations
🔗 Share Instantly - Get shareable links
📱 Mobile Friendly - Perfect on all devices
📊 Track Performance - See views and engagement

Ready to create your first flipbook?
👉 https://flipture.netlify.app/dashboard

💡 Free accounts can create up to 3 flipbooks. Upgrade anytime for unlimited flipbooks!

Questions? Just reply to this email!

© ${new Date().getFullYear()} Flipture
    `.trim(),
  }),

  subscriptionSuccess: (
    userName: string,
    planName: string,
    amount: string
  ) => ({
    subject: "🎉 Welcome to Flipture Premium!",
    html: `
      <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #ffffff;
    "
  >
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      width="100%"
      style="margin: 0; padding: 0"
    >
      <tr>
        <td align="center" style="padding: 20px">
          <table
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            width="600"
            style="max-width: 600px; width: 100%"
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: #5cb338;
                  color: white;
                  padding: 40px 20px;
                  text-align: center;
                  border-radius: 16px 16px 0 0;
                "
              >
                <h1 style="margin: 0; font-size: 32px; font-weight: 700">
                  You're Now Premium!
                </h1>
                <p style="margin: 15px 0 0; opacity: 1; font-size: 16px">
                  Thank you for upgrading
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td
                style="
                  background: #f9f9f9;
                  padding: 30px 20px;
                  border-radius: 0 0 16px 16px;
                "
              >
                <h2 style="color: #333; margin-top: 0; font-weight: 600">
                  Hi ${userName}!
                </h2>

                <!-- Success Box -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background: white;
                    margin: 20px 0;
                    border-radius: 8px;
                    border: 1px solid #5cb338;
                  "
                >
                  <tr>
                    <td style="padding: 20px">
                      <h3
                        style="
                          margin: 0 0 10px 0;
                          color: #5cb338;
                          font-weight: 600;
                        "
                      >
                        ✅ Payment Successful
                      </h3>
                      <p style="margin: 5px 0; font-size: 16px">
                        <strong>${planName} Plan</strong> - ${amount}
                      </p>
                      <p style="margin: 5px 0; color: #666; font-size: 14px">
                        Your subscription is now active!
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="font-size: 16px; margin: 15px 0">
                  Welcome to Flipture ${planName}! You now have access to all
                  premium features:
                </p>

                <!-- Feature 1 -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background: white;
                    margin: 10px 0;
                    border-radius: 6px;
                  "
                >
                  <tr>
                    <td style="padding: 12px 15px">
                      <table
                        role="presentation"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tr>
                          <td
                            style="
                              font-size: 20px;
                              padding-right: 12px;
                              vertical-align: top;
                            "
                          >
                            🚀
                          </td>
                          <td style="vertical-align: top">
                            <strong>Unlimited Flipbooks</strong>
                            <p
                              style="
                                margin: 2px 0;
                                color: #666;
                                font-size: 14px;
                              "
                            >
                              Create as many flipbooks as you need
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Feature 2 -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background: white;
                    margin: 10px 0;
                    border-radius: 6px;
                  "
                >
                  <tr>
                    <td style="padding: 12px 15px">
                      <table
                        role="presentation"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tr>
                          <td
                            style="
                              font-size: 20px;
                              padding-right: 12px;
                              vertical-align: top;
                            "
                          >
                            📊
                          </td>
                          <td style="vertical-align: top">
                            <strong>Advanced Analytics</strong>
                            <p
                              style="
                                margin: 2px 0;
                                color: #666;
                                font-size: 14px;
                              "
                            >
                              Track views, visitors, and engagement
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Feature 3 -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background: white;
                    margin: 10px 0;
                    border-radius: 6px;
                  "
                >
                  <tr>
                    <td style="padding: 12px 15px">
                      <table
                        role="presentation"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tr>
                          <td
                            style="
                              font-size: 20px;
                              padding-right: 12px;
                              vertical-align: top;
                            "
                          >
                            ✏️
                          </td>
                          <td style="vertical-align: top">
                            <strong>Edit Anytime</strong>
                            <p
                              style="
                                margin: 2px 0;
                                color: #666;
                                font-size: 14px;
                              "
                            >
                              Update flipbook details whenever you want
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Feature 4 -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background: white;
                    margin: 10px 0;
                    border-radius: 6px;
                  "
                >
                  <tr>
                    <td style="padding: 12px 15px">
                      <table
                        role="presentation"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tr>
                          <td
                            style="
                              font-size: 20px;
                              padding-right: 12px;
                              vertical-align: top;
                            "
                          >
                            ⬆️
                          </td>
                          <td style="vertical-align: top">
                            <strong>Higher Upload Limits</strong>
                            <p
                              style="
                                margin: 2px 0;
                                color: #666;
                                font-size: 14px;
                              "
                            >
                              ${
                                planName === "Premium"
                                  ? "Up to 50MB"
                                  : "Up to 30MB"
                              } per PDF
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Feature 5 -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background: white;
                    margin: 10px 0;
                    border-radius: 6px;
                  "
                >
                  <tr>
                    <td style="padding: 12px 15px">
                      <table
                        role="presentation"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tr>
                          <td
                            style="
                              font-size: 20px;
                              padding-right: 12px;
                              vertical-align: top;
                            "
                          >
                            🎨
                          </td>
                          <td style="vertical-align: top">
                            <strong>No Watermarks</strong>
                            <p
                              style="
                                margin: 2px 0;
                                color: #666;
                                font-size: 14px;
                              "
                            >
                              Clean, professional flipbooks
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Button -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                >
                  <tr>
                    <td align="center" style="padding-top: 30px">
                      <a
                        href="https://flipture.io/dashboard"
                        style="
                          display: inline-block;
                          background: #5cb338;
                          color: #ffffff;
                          padding: 14px 35px;
                          text-decoration: none;
                          border-radius: 8px;
                          margin: 0;
                          font-weight: 600;
                        "
                        >Go to Dashboard</a
                      >
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    color: #666;
                    font-size: 14px;
                    margin-top: 30px;
                    text-align: center;
                  "
                >
                  You can manage your subscription anytime from your settings
                  page.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  text-align: center;
                  padding: 30px 20px 0 20px;
                  color: #666;
                  font-size: 12px;
                "
              >
                <p style="margin: 5px 0">
                  © ${new Date().getFullYear()} Flipture. All rights reserved.
                </p>
                <p style="margin: 5px 0">
                  Questions? Reply to this email anytime.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `,
    text: `
🎉 You're Now Premium!

Hi ${userName}! 🎊

✅ PAYMENT SUCCESSFUL
${planName} Plan - ${amount}
Your subscription is now active!

YOUR PREMIUM FEATURES:
🚀 Unlimited Flipbooks - Create as many as you need
📊 Advanced Analytics - Track views and engagement
✏️ Edit Anytime - Update flipbook details
⬆️ Higher Upload Limits - ${
      planName === "Premium" ? "Up to 50MB" : "Up to 30MB"
    } per PDF
🎨 No Watermarks - Clean, professional flipbooks

👉 Go to Dashboard: https://flipture.netlify.app/dashboard

Manage your subscription anytime from settings.

© ${new Date().getFullYear()} Flipture
    `.trim(),
  }),

  renewalReminder: (
    userName: string,
    planName: string,
    renewalDate: string,
    amount: string
  ) => ({
    subject: "Your Flipture Subscription Renews Soon",
    html: `
      <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #ffffff;
    "
  >
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      width="100%"
      style="margin: 0; padding: 0"
    >
      <tr>
        <td align="center" style="padding: 20px">
          <table
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            width="600"
            style="max-width: 600px; width: 100%"
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: #0046ff;
                  color: white;
                  padding: 40px 20px;
                  text-align: center;
                  border-radius: 16px 16px 0 0;
                "
              >
                <h1 style="margin: 0; font-size: 32px; font-weight: 700">
                  Subscription Renewal Notice
                </h1>
                <p style="margin: 15px 0 0; opacity: 1; font-size: 16px">
                  Your ${planName} plan renews soon
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td
                style="
                  background: #f9f9f9;
                  padding: 30px 20px;
                  border-radius: 0 0 16px 16px;
                "
              >
                <h2 style="color: #333; margin-top: 0; font-weight: 600">
                  Hi ${userName},
                </h2>

                <p style="font-size: 16px; margin: 15px 0">
                  This is a friendly reminder that your
                  <strong>${planName}</strong> subscription will automatically
                  renew on <strong>${renewalDate}</strong>.
                </p>

                <!-- Info Box -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background: rgba(0, 70, 255, 0.05);
                    margin: 20px 0;
                    border-radius: 8px;
                    border: 1px solid #0046ff;
                  "
                >
                  <tr>
                    <td style="padding: 20px">
                      <p
                        style="
                          margin: 0 0 10px 0;
                          font-size: 16px;
                          font-weight: 600;
                        "
                      >
                        <strong>Renewal Details:</strong>
                      </p>
                      <p style="margin: 5px 0">
                        Plan: <strong>${planName}</strong>
                      </p>
                      <p style="margin: 5px 0">
                        Amount: <strong>${amount}</strong>
                      </p>
                      <p style="margin: 5px 0">
                        Date: <strong>${renewalDate}</strong>
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="font-size: 16px; margin: 15px 0">
                  <strong>No action needed!</strong> Your payment method will be
                  charged automatically and you'll continue enjoying all premium
                  features.
                </p>

                <p style="font-size: 16px; margin: 15px 0">
                  If you need to update your payment method or make changes to
                  your subscription, you can do so anytime from your settings.
                </p>

                <!-- Button -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                >
                  <tr>
                    <td align="center" style="padding-top: 10px">
                      <a
                        href="https://flipture.io/settings"
                        style="
                          display: inline-block;
                          background: #0046ff;
                          color: #ffffff;
                          padding: 14px 35px;
                          text-decoration: none;
                          border-radius: 8px;
                          margin: 0;
                          font-weight: 600;
                        "
                        >Manage Subscription</a
                      >
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    color: #666;
                    font-size: 14px;
                    margin-top: 30px;
                    text-align: center;
                  "
                >
                  If you wish to cancel, you can do so before the renewal date
                  to avoid being charged.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  text-align: center;
                  padding: 30px 20px 0 20px;
                  color: #666;
                  font-size: 12px;
                "
              >
                <p style="margin: 5px 0">
                  © ${new Date().getFullYear()} Flipture. All rights reserved.
                </p>
                <p style="margin: 5px 0">
                  Create and share beautiful flipbooks with ease.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

    `,
    text: `
Hi ${userName},

SUBSCRIPTION RENEWAL REMINDER

Your ${planName} subscription will automatically renew on ${renewalDate}.

RENEWAL DETAILS:
Plan: ${planName}
Amount: ${amount}
Date: ${renewalDate}

NO ACTION NEEDED! Your payment method will be charged automatically.

Need to make changes? Visit: https://flipture.netlify.app/settings

© ${new Date().getFullYear()} Flipture
    `.trim(),
  }),
};
