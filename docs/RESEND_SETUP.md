# Resend Email Setup Guide

## 🎉 Integration Complete!

Your Flipture app is now configured to send professional emails using Resend. Here's what has been set up:

### ✅ What's Been Implemented

1. **Resend Package Installed** ✅
2. **Email Utility Updated** (`server/utils/sendEmail.ts`) ✅
3. **Email Templates Added**:
   - ✉️ Welcome Email (when users sign up)
   - 🎊 Subscription Success (when users purchase a plan)
   - ❌ Subscription Cancelled
   - ⚠️ Payment Failed
   - 🔔 Renewal Reminder
4. **Webhook Integration** (Stripe events trigger emails) ✅
5. **Registration Flow** (sends welcome email on signup) ✅

---

## 🚀 Quick Start: Get Your Resend API Key

### Step 1: Create Resend Account (2 minutes)

1. Go to **[resend.com](https://resend.com)**
2. Click **"Sign Up"** (NO credit card required!)
3. Sign up with your email or GitHub account
4. Verify your email address

### Step 2: Get Your API Key (1 minute)

1. Once logged in, go to **[API Keys](https://resend.com/api-keys)**
2. Click **"Create API Key"**
3. Name it: `Flipture Production` (or whatever you prefer)
4. Select permissions: **Full Access** (or "Sending access" at minimum)
5. Click **Create**
6. **COPY THE KEY** - you won't see it again! It looks like: `re_123abc...`

### Step 3: Add to Your .env File (30 seconds)

Replace the placeholder in your `.env` file:

```env
# Before:
RESEND_API_KEY=re_your_api_key_here

# After (with your actual key):
RESEND_API_KEY=re_123abc_your_actual_key_here
```

### Step 4: Configure Sender Email

**Option A: Use Resend's Test Domain (Quick Start)**

Keep the default test email in your `.env`:
```env
RESEND_FROM_EMAIL=Flipture <onboarding@resend.dev>
```

✅ Works immediately  
✅ Good for testing  
⚠️ Says "via resend.dev" in recipient's inbox

**Option B: Use Your Own Domain (Recommended for Production)**

1. Go to **[Domains](https://resend.com/domains)** in Resend
2. Click **"Add Domain"**
3. Enter your domain: `flipture.com`
4. Add the DNS records Resend provides to your domain provider
5. Wait for verification (usually 5-30 minutes)
6. Update your `.env`:
```env
RESEND_FROM_EMAIL=Flipture <noreply@flipture.com>
```

---

## 🧪 Testing Your Email Setup

### Test in Development Mode

Your app is currently set to **development mode**, which means emails are **logged to console** instead of being sent:

```bash
# Start your dev server (if not already running)
yarn dev

# Try registering a new user
# Check the terminal - you'll see:
📧 [DEV MODE] Email would be sent:
To: user@example.com
Subject: Welcome to Flipture! 🎉
Body: ...
```

### Test Real Email Sending

1. Make sure your Resend API key is in `.env`
2. Temporarily change `NODE_ENV` in `.env`:
   ```env
   NODE_ENV=production
   ```
3. Restart your dev server: `yarn dev`
4. Register a test user with YOUR email address
5. Check your inbox! 📬

**Don't forget to change it back:**
```env
NODE_ENV=development
```

---

## 📧 Email Templates & Events

Here's when each email is sent:

| Email Template | Trigger | Recipient |
|----------------|---------|-----------|
| **Welcome** | User creates account | New user |
| **Subscription Success** | User buys Standard/Premium | Customer |
| **Subscription Cancelled** | Subscription is cancelled | Customer |
| **Payment Failed** | Payment fails | Customer |
| **Renewal Reminder** | 3-7 days before renewal* | Customer |

*Renewal reminders need to be set up separately (see Advanced section)

---

## 🔍 Monitoring & Debugging

### Check Resend Dashboard

1. Go to **[Resend Dashboard](https://resend.com/emails)**
2. See all sent emails, delivery status, and any errors
3. View open rates, clicks (if tracking enabled)

### Check Your Application Logs

Look for these messages:

✅ **Success:**
```
✅ Email sent to: customer@example.com
📧 Welcome email sent to customer@example.com
```

❌ **Errors:**
```
❌ Error sending email: ...
❌ RESEND_API_KEY not configured
```

---

## 📊 Resend Free Tier Details

Perfect for testing and launching! 🎉

| Feature | Free Tier | Paid Plan |
|---------|-----------|-----------|
| **Emails/month** | 3,000 | 50,000+ |
| **Daily limit** | 100 | Custom |
| **Credit card** | ❌ Not required | Required |
| **Custom domains** | ✅ Yes | ✅ Yes |
| **Email logs** | ✅ 7 days | ✅ 90+ days |
| **API access** | ✅ Full access | ✅ Full access |
| **Support** | Email | Priority |

**Pricing when you grow:**
- $20/month for 50,000 emails
- $80/month for 250,000 emails

---

## 🎨 Customizing Email Templates

Edit templates in `server/utils/sendEmail.ts`:

```typescript
export const emailTemplates = {
  welcome: (userName: string) => ({
    subject: "Welcome to Flipture! 🎉",  // ← Change this
    html: `...your custom HTML...`,       // ← Customize design
    text: `...your plain text version...` // ← Plain text fallback
  }),
  // ... other templates
};
```

### Design Tips:
- Use inline CSS (email clients don't support `<style>` well)
- Test on multiple email clients (Gmail, Outlook, Apple Mail)
- Always include a plain text version
- Keep it mobile-friendly
- Use web-safe fonts

---

## 🚨 Troubleshooting

### Problem: "RESEND_API_KEY not configured"

**Solution:** 
1. Check your `.env` file has `RESEND_API_KEY=re_...`
2. Restart your dev server: `Ctrl+C` then `yarn dev`
3. Make sure the key is valid (no extra spaces)

### Problem: Emails not being sent

**Check:**
1. Is `NODE_ENV=development`? (Emails are only logged in dev mode)
2. Is your Resend API key valid?
3. Check Resend dashboard for errors
4. Look at your application logs

### Problem: Emails going to spam

**Solutions:**
1. Verify your custom domain in Resend
2. Set up SPF, DKIM, and DMARC records
3. Avoid spam trigger words in subject lines
4. Start with low volume to build reputation
5. Ask recipients to whitelist your email

### Problem: "Domain not verified"

**Solution:**
1. Go to [Resend Domains](https://resend.com/domains)
2. Copy the DNS records provided
3. Add them to your domain provider (Namecheap, GoDaddy, etc.)
4. Wait 5-30 minutes for DNS propagation
5. Click "Verify" in Resend dashboard

---

## 🔐 Security Best Practices

1. ✅ **Never commit your API key to Git**
   - It's already in `.env` which is in `.gitignore`
   
2. ✅ **Use environment variables**
   - API key is only accessible server-side
   
3. ✅ **Rotate keys regularly**
   - Create new keys every 3-6 months
   
4. ✅ **Use separate keys for dev/prod**
   - Different keys for different environments

5. ✅ **Monitor usage**
   - Watch for unusual sending patterns

---

## 📚 Additional Features to Implement

### 1. Renewal Reminders (Scheduled Emails)

You'll need to set up a cron job or scheduled function:

```typescript
// server/api/cron/renewal-reminders.ts
export default defineEventHandler(async (event) => {
  // Find subscriptions expiring in 3 days
  // Send renewal reminder emails
});
```

Use Netlify Scheduled Functions or Vercel Cron Jobs.

### 2. Email Preferences

Let users control which emails they receive:

```typescript
// Add to profiles table:
email_preferences: {
  marketing: boolean,
  transactional: boolean,
  product_updates: boolean
}
```

### 3. Email Analytics

Track opens and clicks:
```typescript
// In email templates, add tracking parameters
<a href="https://flipture.com?utm_source=email&utm_campaign=welcome">
```

### 4. Batch Emails

For announcements to all users:
```typescript
// server/api/admin/send-announcement.ts
```

### 5. Email Queue

For high volume, use a queue system:
- Bull/BullMQ
- AWS SQS
- Redis Queue

---

## 🎓 Resources

- **Resend Docs**: [resend.com/docs](https://resend.com/docs)
- **Email Best Practices**: [resend.com/docs/best-practices](https://resend.com/docs/best-practices)
- **React Email** (for beautiful templates): [react.email](https://react.email)
- **Can I Email**: [caniemail.com](https://caniemail.com) (check CSS support)
- **Email on Acid**: [emailonacid.com](https://emailonacid.com) (testing tool)

---

## ✨ Quick Reference

### Files Modified/Created:
- ✅ `server/utils/sendEmail.ts` - Email sending logic & templates
- ✅ `server/api/stripe/webhook.post.ts` - Stripe event handlers
- ✅ `server/api/auth/welcome-email.post.ts` - Welcome email endpoint
- ✅ `app/pages/register.vue` - Calls welcome email
- ✅ `.env` - Resend configuration
- ✅ `nuxt.config.ts` - Runtime config
- ✅ `package.json` - Resend dependency

### Environment Variables:
```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=Flipture <noreply@flipture.com>
NODE_ENV=development
```

### Commands:
```bash
# Install Resend (already done)
yarn add resend

# Start dev server
yarn dev

# Check logs for email output
# Watch terminal for 📧 messages
```

---

## 🎯 Next Steps

1. ✅ Get your Resend API key from [resend.com/api-keys](https://resend.com/api-keys)
2. ✅ Add it to your `.env` file
3. ✅ Test in development mode (check console logs)
4. ✅ (Optional) Verify your custom domain
5. ✅ Test real email sending with `NODE_ENV=production`
6. ✅ Deploy to production
7. ✅ Monitor your Resend dashboard

---

## 💬 Need Help?

- Check the [Resend Documentation](https://resend.com/docs)
- Join the [Resend Discord](https://resend.com/discord)
- Contact Resend support: [support@resend.com](mailto:support@resend.com)

---

**That's it! You're all set up!** 🎉

Your customers will now receive beautiful, professional emails for all important events. Happy sending! 📧✨

