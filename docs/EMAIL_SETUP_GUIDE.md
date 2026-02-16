# 📧 Flipture Email Setup Guide

Complete guide for your email notification system with Resend.

---

## 🎉 What's Configured

Your app sends professional emails for these events:

| Event | When | Recipient |
|-------|------|-----------|
| **Welcome** 👋 | User logs in after email verification | New users |
| **Subscription Success** 🎊 | User purchases Standard/Premium plan | Paying customers |
| **Subscription Cancelled** ❌ | Subscription is cancelled | Former customers |
| **Payment Failed** ⚠️ | Payment fails | Customers with issues |
| **Renewal Reminder** 🔔 | Before subscription renews | Subscribers |

---

## 🏗️ How It Works

### **Email Verification Flow (Current Setup)**

```
1. User registers at /register
   ↓
2. Supabase sends verification email (automatic)
   ↓
3. User clicks verification link
   ↓
4. User logs in at /login
   ↓
5. Welcome email sent on first login ✅
```

**Why this flow?**
- Email verification is **always ON** in your Supabase settings
- Users get **one email** on registration (verification only)
- Welcome email arrives **after** they're verified
- Professional UX - no email spam

---

## 📦 What's Been Set Up

### **Files Modified:**

1. **`server/utils/sendEmail.ts`**
   - Resend integration
   - 5 email templates (Welcome, Subscription Success, etc.)
   - Development mode (logs to console)
   - Production mode (sends via Resend)

2. **`server/api/stripe/webhook.post.ts`**
   - Sends subscription success email on purchase
   - Sends cancellation email when subscription ends
   - Sends payment failed alert

3. **`app/pages/register.vue`**
   - **Removed** immediate welcome email
   - Comment explains email sent after verification

4. **`app/pages/login.vue`**
   - **Added** welcome email check on first login
   - Calls `/api/auth/check-and-send-welcome`

5. **`.env`**
   - `RESEND_API_KEY` - Your Resend API key
   - `RESEND_FROM_EMAIL` - Sender email address
   - `SEND_EMAILS=true` - Enable real email sending

### **Files Created:**

1. **`server/api/auth/welcome-email.post.ts`**
   - Sends welcome email to a specific user
   - Manual endpoint (can call anytime)

2. **`server/api/auth/check-and-send-welcome.post.ts`**
   - Checks if welcome email was sent
   - Sends only once per user
   - Called on login

---

## 🔧 Configuration

### **Environment Variables (`.env`)**

```env
# Resend Email Service
RESEND_API_KEY=re_Nv9GSKth_...
RESEND_FROM_EMAIL=Flipture <noreply@flipture.io>
SEND_EMAILS=true

# Controls email sending
NODE_ENV=development  # Logs to console
NODE_ENV=production   # Sends real emails
```

### **How to Get Resend API Key:**

1. Go to **[resend.com](https://resend.com)** (no credit card required!)
2. Sign up with email or GitHub
3. Navigate to **[API Keys](https://resend.com/api-keys)**
4. Click **"Create API Key"**
5. Copy key (starts with `re_...`)
6. Add to `.env` file

**Free Tier:** 3,000 emails/month (100/day)

---

## ⚠️ IMPORTANT: Prevent Duplicate Welcome Emails

**Current Issue:** Welcome emails are sent **every time** a user logs in (see your terminal logs lines 89, 92, 94).

**Solution:** Add one database column to track if welcome email was sent.

### **Run This SQL in Supabase Dashboard → SQL Editor:**

```sql
-- Add column to track welcome email status
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS welcome_email_sent BOOLEAN DEFAULT FALSE;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_profiles_welcome_email_sent 
ON profiles(welcome_email_sent);
```

**This takes 10 seconds and prevents duplicate emails!**

---

## 🧪 Testing

### **Development Mode (Current):**

```env
SEND_EMAILS=true
NODE_ENV=development
```

- Emails **logged to terminal** (not sent)
- Check console for output:
  ```
  📧 [DEV MODE] Email would be sent:
  To: user@example.com
  Subject: Welcome to Flipture! 🎉
  ```

### **Production Mode (Real Emails):**

```env
SEND_EMAILS=true
NODE_ENV=production
RESEND_API_KEY=re_your_real_key
```

- Real emails sent via Resend
- Check [Resend Dashboard](https://resend.com/emails) for status

### **Test Flow:**

1. **Register new user** at `http://localhost:3000/register`
2. **Get verification link:**
   - Supabase Dashboard → Authentication → Users
   - Click user → Copy confirmation URL
   - Open in browser
3. **Login** at `http://localhost:3000/login`
4. **Check terminal** for welcome email log
5. **Login again** - no duplicate email (if SQL migration run)

---

## 📧 Email Templates

### **1. Welcome Email**

**Sent:** First login after verification

**Content:**
- Greeting with user's name
- List of features (Upload PDFs, 3D flipping, share, analytics)
- Call-to-action button: "Create Your First Flipbook"
- Pro tip about free plan limits

**Customization:** Edit in `server/utils/sendEmail.ts` → `emailTemplates.welcome()`

---

### **2. Subscription Success**

**Sent:** Stripe checkout complete

**Content:**
- Payment confirmation (plan + amount)
- List of premium features unlocked
- Call-to-action button: "Go to Dashboard"

**Triggered by:** Stripe webhook `checkout.session.completed`

---

### **3. Subscription Cancelled**

**Sent:** Stripe subscription deleted

**Content:**
- Confirmation of cancellation
- What they lose (editing, analytics, higher limits)
- What they keep (existing flipbooks still accessible)
- Call-to-action button: "View Pricing Plans"

**Triggered by:** Stripe webhook `customer.subscription.deleted`

---

### **4. Payment Failed**

**Sent:** Invoice payment fails

**Content:**
- Alert about failed payment
- Possible reasons (expired card, insufficient funds)
- Action steps to fix
- Call-to-action button: "Update Payment Method"

**Triggered by:** Stripe webhook `invoice.payment_failed`

---

### **5. Renewal Reminder**

**Template ready but not automated**

**To Use:** Need to set up cron job/scheduled function

**Content:**
- Notice of upcoming renewal
- Renewal details (date, amount)
- Option to manage subscription

---

## 🎨 Customizing Email Templates

Edit `server/utils/sendEmail.ts`:

```typescript
export const emailTemplates = {
  welcome: (userName: string) => ({
    subject: "Welcome to Flipture! 🎉",  // ← Change subject
    html: `...your HTML template...`,     // ← Customize design
    text: `...plain text version...`      // ← Plain text fallback
  }),
  // ... other templates
};
```

**Tips:**
- Use inline CSS (email clients need it)
- Always include plain text version
- Test across different email clients
- Keep mobile-friendly
- Clear call-to-action buttons

---

## 📊 Monitoring

### **Check Terminal Logs:**

**Success:**
```
✅ Email sent to: customer@example.com
📧 Welcome email sent to customer@example.com
```

**Errors:**
```
❌ Error sending email: ...
❌ RESEND_API_KEY not configured
```

### **Resend Dashboard:**

Go to **[resend.com/emails](https://resend.com/emails)** to see:
- All sent emails
- Delivery status
- Open rates (if tracking enabled)
- Error logs

### **Check Database:**

```sql
-- See users who haven't received welcome email yet
SELECT id, email, full_name, welcome_email_sent
FROM profiles
WHERE welcome_email_sent = FALSE
ORDER BY created_at DESC;
```

---

## 🚨 Troubleshooting

### **Emails Not Appearing in Terminal?**

✅ Check `SEND_EMAILS=true` in `.env`  
✅ Restart dev server  
✅ Check you're in development mode

### **Duplicate Welcome Emails?**

✅ **Run the SQL migration above!** (Add `welcome_email_sent` column)  
✅ Check endpoint sets flag to `TRUE` after sending

### **Real Emails Not Sending?**

✅ Check Resend API key is correct  
✅ Check `NODE_ENV=production`  
✅ Check Resend dashboard for errors  
✅ Verify sender domain (if using custom domain)

### **Emails Going to Spam?**

✅ Verify custom domain in Resend  
✅ Set up SPF/DKIM/DMARC records  
✅ Start with low volume  
✅ Ask recipients to whitelist

---

## 🔐 Security

**Best Practices:**
- ✅ API key is server-side only (not exposed to client)
- ✅ `.env` file in `.gitignore` (never committed)
- ✅ Stripe webhook signature verified
- ✅ Rate limiting on email endpoints (recommended)
- ✅ Email sending wrapped in try-catch (won't break app)

---

## 🎯 Production Checklist

Before deploying:

- [ ] Run SQL migration to add `welcome_email_sent` column
- [ ] Add Resend API key to production environment variables
- [ ] Set `NODE_ENV=production`
- [ ] Set `SEND_EMAILS=true`
- [ ] (Optional) Verify custom domain in Resend
- [ ] Test registration → verification → login flow
- [ ] Test Stripe webhooks with test mode
- [ ] Check Resend dashboard for delivery
- [ ] Set up monitoring/alerts

---

## 📈 Resend Pricing

| Tier | Emails/Month | Price | Best For |
|------|--------------|-------|----------|
| **Free** | 3,000 | $0 | Testing & Launch |
| **Pro** | 50,000 | $20 | Growing business |
| **Business** | 250,000 | $80 | Scale |

**Your current usage:** Check [Resend Dashboard](https://resend.com/overview)

---

## 🛠️ Advanced: Custom Domain Setup

**Why?** Emails from `noreply@flipture.com` instead of `onboarding@resend.dev`

**Steps:**
1. Go to [Resend Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter: `flipture.com` or `flipture.io`
4. Add DNS records to your domain provider
5. Wait for verification (5-30 minutes)
6. Update `.env`:
   ```env
   RESEND_FROM_EMAIL=Flipture <noreply@flipture.com>
   ```

---

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `server/utils/sendEmail.ts` | Email sending logic & templates |
| `server/api/auth/welcome-email.post.ts` | Manual welcome email endpoint |
| `server/api/auth/check-and-send-welcome.post.ts` | First-login welcome check |
| `server/api/stripe/webhook.post.ts` | Stripe event handlers |
| `app/pages/register.vue` | Registration (no email) |
| `app/pages/login.vue` | Login (welcome email trigger) |
| `.env` | Configuration (API keys, settings) |

---

## 🎉 Summary

**What You Have:**
- ✅ Complete email notification system
- ✅ 5 professional email templates
- ✅ Resend integration (free tier)
- ✅ Development & production modes
- ✅ Stripe webhook integration
- ✅ Welcome email after verification

**What You Need to Do:**
1. **Run SQL migration** (prevent duplicate emails)
2. **Test the flow** (register → verify → login)
3. **Monitor in production**

**Resources:**
- Resend Docs: [resend.com/docs](https://resend.com/docs)
- Resend Dashboard: [resend.com/emails](https://resend.com/emails)
- Supabase Auth: [supabase.com/docs/guides/auth](https://supabase.com/docs/guides/auth)

---

**Need help?** Check the troubleshooting section or reach out! 😊

**Happy emailing!** 📧✨

