# Email Notifications Setup Guide

This guide explains how to set up email notifications for subscription events in your Flipture application.

## Overview

The application now sends email notifications for:
- **Subscription Cancellations** - When a user's subscription is cancelled (manually or due to payment failure)
- **Payment Failures** - When a payment fails and action is required

## Current Implementation

### Development Mode
In development (`NODE_ENV=development`), emails are **logged to the console** instead of being sent. This allows you to test the email flow without actually sending emails.

### Production Mode
For production, you need to integrate with an email service provider (ESP).

## Files Created/Modified

### 1. Email Utility (`server/utils/sendEmail.ts`)
- `sendEmail()` - Main function to send emails
- `emailTemplates` - Pre-built email templates for different scenarios
  - `subscriptionCancelled` - Sent when subscription is cancelled
  - `paymentFailed` - Sent when payment fails

### 2. Webhook Handler (`server/api/stripe/webhook.post.ts`)
Updated to send emails for:
- `customer.subscription.deleted` - Subscription cancelled
- `invoice.payment_failed` - Payment failed

## Setting Up Email Service (Production)

### Option 1: Resend (Recommended)

Resend is modern, developer-friendly, and has a generous free tier.

#### Step 1: Install Resend
```bash
yarn add resend
```

#### Step 2: Get API Key
1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Verify your sending domain (or use their test domain)

#### Step 3: Add to `.env`
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

#### Step 4: Update `server/utils/sendEmail.ts`
```typescript
import { Resend } from 'resend';

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Development mode - log only
    if (process.env.NODE_ENV === "development") {
      console.log("📧 [DEV MODE] Email would be sent:");
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      return true;
    }

    // Production - send via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Flipture <noreply@flipture.app>',
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
```

### Option 2: SendGrid

SendGrid is a popular choice with robust features.

#### Step 1: Install SendGrid
```bash
yarn add @sendgrid/mail
```

#### Step 2: Get API Key
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Verify your sender email

#### Step 3: Add to `.env`
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

#### Step 4: Update `server/utils/sendEmail.ts`
```typescript
import sgMail from '@sendgrid/mail';

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (process.env.NODE_ENV === "development") {
      console.log("📧 [DEV MODE] Email would be sent:");
      console.log(`To: ${options.to}`);
      return true;
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    
    await sgMail.send({
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@flipture.app',
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
```

### Option 3: AWS SES (Simple Email Service)

Cost-effective for high volume.

#### Step 1: Install AWS SDK
```bash
yarn add @aws-sdk/client-ses
```

#### Step 2: Configure AWS
1. Set up AWS SES in your AWS account
2. Verify your domain/email
3. Create IAM credentials with SES permissions

#### Step 3: Add to `.env`
```env
AWS_SES_REGION=us-east-1
AWS_SES_ACCESS_KEY_ID=xxxxxxxxxxxx
AWS_SES_SECRET_ACCESS_KEY=xxxxxxxxxxxx
AWS_SES_FROM_EMAIL=noreply@yourdomain.com
```

## Email Templates

### Subscription Cancelled Email
- **Trigger**: When `customer.subscription.deleted` webhook is received
- **Content**: 
  - Informs user their subscription is cancelled
  - Lists what they lose (editing, analytics, higher limits)
  - Reassures them their existing flipbooks are safe
  - Provides link to pricing page to resubscribe

### Payment Failed Email
- **Trigger**: When `invoice.payment_failed` webhook is received
- **Content**:
  - Alerts user of payment failure
  - Lists possible reasons (expired card, insufficient funds)
  - Provides action steps
  - Link to settings page to update payment method

## Testing

### Testing in Development

1. Start your dev server:
```bash
yarn dev
```

2. Trigger a test webhook using Stripe CLI or your test environment

3. Check console logs for email output:
```
📧 [DEV MODE] Email would be sent:
To: user@example.com
Subject: Your Flipture Subscription Has Been Cancelled
Body: ...
```

### Testing in Production

1. Use Stripe's test mode to trigger webhooks
2. Monitor Netlify logs to see email sending status
3. Check your email service provider's dashboard for delivery status

## Customizing Email Templates

Edit templates in `server/utils/sendEmail.ts`:

```typescript
export const emailTemplates = {
  subscriptionCancelled: (userName: string, planName: string) => ({
    subject: "Your Custom Subject",
    html: `...your HTML template...`,
    text: `...your plain text version...`,
  }),
};
```

### Best Practices:
- Always provide both HTML and text versions
- Keep designs simple and mobile-friendly
- Include clear call-to-action buttons
- Use inline CSS for email compatibility
- Test across different email clients

## Email Deliverability Tips

1. **Verify Your Domain**: Use a custom domain with proper SPF, DKIM, and DMARC records
2. **Avoid Spam Triggers**: Don't use all caps, excessive exclamation marks, or spam words
3. **Monitor Bounce Rates**: Keep bounce rates under 5%
4. **Include Unsubscribe Option**: Required by law in many jurisdictions
5. **Use Transactional Email Service**: Don't use personal Gmail/Outlook for production

## Monitoring

### Check Email Sending Success
Monitor your application logs:
```
✅ Email sent to: user@example.com
📧 Cancellation email sent to user@example.com
```

### Check Email Service Dashboard
Most ESPs provide:
- Delivery rates
- Open rates (if tracked)
- Bounce rates
- Spam complaints

## Troubleshooting

### Emails Not Sending
1. Check environment variables are set correctly
2. Verify API keys are valid
3. Check email service provider status
4. Review application logs for errors

### Emails Going to Spam
1. Verify your domain with SPF/DKIM
2. Review email content for spam triggers
3. Start with small volumes to build reputation
4. Use a dedicated IP (for high volume)

### Webhook Not Triggering Emails
1. Verify webhook is reaching your server (check Stripe dashboard)
2. Ensure webhook secret is correct
3. Check that user profile has email address
4. Review server logs for errors

## Security Considerations

1. **Never expose API keys**: Keep them in environment variables
2. **Verify webhook signatures**: Always validate Stripe webhook signatures (already implemented)
3. **Rate limiting**: Implement rate limiting to prevent abuse
4. **PII handling**: Be careful with user data in emails
5. **Secure endpoints**: Ensure webhook endpoints are properly secured

## Next Steps

1. Choose an email service provider (Resend recommended)
2. Sign up and get API keys
3. Add API keys to environment variables
4. Update `server/utils/sendEmail.ts` with your chosen provider
5. Test in development
6. Deploy and test in production
7. Monitor delivery rates and adjust as needed

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [SendGrid Documentation](https://docs.sendgrid.com)
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Email Design Best Practices](https://www.smashingmagazine.com/2021/04/complete-guide-html-email-templates-tools/)

