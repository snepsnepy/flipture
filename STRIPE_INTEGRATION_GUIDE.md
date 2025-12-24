# 💳 Stripe Subscription Integration Guide

Complete guide for the Stripe subscription system integrated into Flipture.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [How It Works](#how-it-works)
- [Setup Guide](#setup-guide)
  - [Development Setup](#development-setup)
  - [Production Setup](#production-setup)
- [File Structure](#file-structure)
- [Testing Guide](#testing-guide)
- [Troubleshooting](#troubleshooting)
- [Common Tasks](#common-tasks)

---

## 🎯 Overview

This integration allows users to subscribe to monthly plans (Standard and Premium) using Stripe's secure payment processing. All subscription data is automatically synced with your Supabase database.

### Plans Available

- **Standard Plan**: $9/month

  - Up to 10 flipbooks
  - Basic analytics
  - Standard support

- **Premium Plan**: $19/month
  - Unlimited flipbooks
  - Advanced analytics
  - Priority support
  - Custom branding
  - Export options

---

## ✨ Features

### ✅ Implemented Features

1. **Secure Payment Processing** - Stripe handles all payment details
2. **Subscription Management** - Users can upgrade, downgrade, or cancel
3. **Customer Portal** - Self-service subscription management
4. **Webhook Integration** - Real-time sync with database
5. **Database Sync** - Automatic updates to user profiles
6. **Status Tracking** - Track subscription status and renewal dates
7. **Plan Display** - Show current plan in dashboard badge

---

## 🔧 How It Works

### Payment Flow

```
1. User clicks "Get Started" on pricing page
   ↓
2. Server creates Stripe Checkout Session
   ↓
3. User redirected to Stripe's secure payment page
   ↓
4. User enters payment details
   ↓
5. Stripe processes payment
   ↓
6. Webhook notifies your server
   ↓
7. Server updates user profile in Supabase
   ↓
8. User redirected back to dashboard
   ↓
9. Dashboard shows active subscription
```

### Architecture

```
┌─────────────────┐
│  User Browser   │
│  (Client-Side)  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐      ┌──────────────┐
│  Nuxt Server    │ ←──→ │   Stripe     │
│  (API Routes)   │      │   API        │
└────────┬────────┘      └──────┬───────┘
         │                      │
         ↓                      ↓ (webhooks)
┌─────────────────┐      ┌──────────────┐
│   Supabase      │ ←──→ │  Your Server │
│   Database      │      │  (webhooks)  │
└─────────────────┘      └──────────────┘
```

---

## 🚀 Setup Guide

### Prerequisites

- Stripe account (free to create at [stripe.com](https://stripe.com))
- Supabase project with authentication enabled
- Node.js and Yarn installed

### Development Setup

#### Step 1: Install Dependencies

Already completed during initial setup:

```bash
yarn add stripe @stripe/stripe-js
```

#### Step 2: Get Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

#### Step 3: Create Products and Prices

1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/test/products)
2. Click **"Add product"**
3. Create two products:

**Standard Plan:**

- Name: `Standard Plan`
- Price: `$9.00`
- Billing: `Monthly`
- Copy the **Price ID** (starts with `price_`)

**Premium Plan:**

- Name: `Premium Plan`
- Price: `$19.00`
- Billing: `Monthly`
- Copy the **Price ID** (starts with `price_`)

#### Step 4: Get Supabase Secret Key (Service Role)

1. Go to [Supabase Dashboard → Settings → API](https://supabase.com/dashboard/project/_/settings/api)
2. Copy the **`service_role`** key (starts with `sb_secret_`) (⚠️ Keep this secret!)

#### Step 5: Configure Environment Variables

Your `.env` file should have:

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_STANDARD_PRICE_ID=price_...
STRIPE_PREMIUM_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_... (set in Step 7)

# Other config...
```

#### Step 6: Set Up Database

Run this SQL in your Supabase SQL Editor:

```sql
-- Create profiles table with subscription fields
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Stripe subscription fields
  subscription_status TEXT,
  subscription_plan TEXT,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  subscription_current_period_end TIMESTAMP WITH TIME ZONE
);

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON profiles(subscription_status);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

#### Step 7: Set Up Stripe Webhooks (Local Testing)

**Install Stripe CLI:**

```bash
# Windows (using Scoop)
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe

# Or download from: https://github.com/stripe/stripe-cli/releases/latest
```

**Login and Forward Webhooks:**

```bash
# Login to Stripe CLI
stripe login

# Forward webhooks to local server (keep this running)
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This will output a webhook signing secret like `whsec_...` - **copy it and add to your `.env` file**:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_secret_from_cli
```

**Restart your dev server** to pick up the new secret.

#### Step 8: Start Development

```bash
# Terminal 1: Start dev server
yarn dev

# Terminal 2: Forward Stripe webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

✅ **You're ready to test!**

---

### Production Setup

#### Step 1: Deploy to Netlify

```bash
git add .
git commit -m "Add Stripe subscription integration"
git push
```

#### Step 2: Add Environment Variables to Netlify

Go to Netlify Dashboard → Site settings → Environment variables and add all variables from your `.env`:

```
SUPABASE_URL=...
SUPABASE_KEY=...
SUPABASE_SECRET_KEY=... (⚠️ Important!)
STRIPE_SECRET_KEY=sk_test_... (or sk_live_... for production)
STRIPE_PUBLISHABLE_KEY=pk_test_... (or pk_live_... for production)
STRIPE_STANDARD_PRICE_ID=price_...
STRIPE_PREMIUM_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=... (from Step 3)
GA4_PROPERTY_ID=...
GA4_CLIENT_EMAIL=...
GA4_PRIVATE_KEY=...
```

#### Step 3: Configure Production Webhooks

1. **Get your production URL** (e.g., `https://your-app.netlify.app`)

2. **Go to Stripe Dashboard**:

   - Navigate to: [Developers → Webhooks](https://dashboard.stripe.com/test/webhooks)
   - Click **"Add endpoint"**

3. **Configure the endpoint**:

   - **Endpoint URL**: `https://your-app.netlify.app/api/stripe/webhook`
   - **Description**: `Flipture Production Webhook`
   - **Events to send**: Select these events:
     - ✅ `checkout.session.completed`
     - ✅ `customer.subscription.updated`
     - ✅ `customer.subscription.deleted`
     - ✅ `invoice.payment_succeeded`
     - ✅ `invoice.payment_failed`

4. **Get the signing secret**:

   - After creating the endpoint, click on it
   - Click **"Reveal"** next to "Signing secret"
   - Copy the secret (starts with `whsec_...`)

5. **Update Netlify Environment Variables**:
   - Add/Update: `STRIPE_WEBHOOK_SECRET` with your production webhook secret
   - Redeploy your site

#### Step 4: Test in Production

Use Stripe test cards:

- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Requires Authentication: `4000 0025 0000 3155`

#### Step 5: Go Live (When Ready)

1. Switch from test mode to live mode in Stripe Dashboard
2. Create live products and get live price IDs
3. Update Netlify variables with live keys (`sk_live_...`, `pk_live_...`)
4. Set up live webhook endpoint
5. Test with real card (use small amount first!)

---

## 📁 File Structure

### Backend API Routes

```
server/api/stripe/
├── create-checkout-session.post.ts  # Creates Stripe checkout session
├── webhook.post.ts                  # Handles Stripe webhook events
└── create-portal-session.post.ts    # Creates customer portal session
```

**`create-checkout-session.post.ts`**

- Creates a Stripe checkout session
- Validates user and price data
- Returns session URL for redirect

**`webhook.post.ts`**

- Receives webhook events from Stripe
- Verifies webhook signatures
- Updates Supabase database with subscription data
- Handles: checkout complete, subscription updates, cancellations

**`create-portal-session.post.ts`**

- Creates Stripe customer portal session
- Allows users to manage subscriptions

### Frontend Components

```
app/
├── composables/
│   ├── useStripe.ts              # Stripe integration composable
│   └── useUserProfile.ts         # User profile & subscription data
├── components/
│   └── Dashboard/
│       └── SubscriptionBadge.vue # Shows current subscription plan
└── pages/
    └── pricing.vue               # Pricing page with plan selection
```

**`useStripe.ts`**

- Loads Stripe.js library
- Creates checkout sessions
- Redirects to checkout
- Opens customer portal

**`useUserProfile.ts`**

- Fetches user profile from database
- Automatically creates profile if missing
- Returns subscription data

**`SubscriptionBadge.vue`**

- Displays current subscription plan
- Shows badge color based on plan
- Provides "Manage Subscription" button

**`pricing.vue`**

- Displays pricing cards
- Handles plan selection
- Initiates checkout process

### Database Schema

```
profiles table:
├── id (UUID, PK)                          # References auth.users
├── email (TEXT)
├── full_name (TEXT)
├── avatar_url (TEXT)
├── created_at (TIMESTAMPTZ)
├── updated_at (TIMESTAMPTZ)
├── subscription_status (TEXT)             # 'active', 'canceled', etc.
├── subscription_plan (TEXT)               # 'standard', 'premium', null
├── stripe_customer_id (TEXT, UNIQUE)      # Stripe customer ID
├── stripe_subscription_id (TEXT, UNIQUE)  # Stripe subscription ID
└── subscription_current_period_end (TIMESTAMPTZ) # Renewal date
```

---

## 🧪 Testing Guide

### Local Testing Checklist

1. ✅ Start dev server (`yarn dev`)
2. ✅ Start Stripe CLI (`stripe listen --forward-to localhost:3000/api/stripe/webhook`)
3. ✅ Navigate to `/pricing`
4. ✅ Click "Get Started" on a plan
5. ✅ Complete checkout with test card `4242 4242 4242 4242`
6. ✅ Check terminal for webhook events
7. ✅ Verify database: Supabase → profiles table
8. ✅ Check dashboard badge shows correct plan

### Test Cards

```
Success: 4242 4242 4242 4242
Declined: 4000 0000 0000 0002
Requires Authentication: 4000 0025 0000 3155
Expired Card: 4000 0000 0000 0069
```

**Details for all test cards:**

- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

### Testing Customer Portal

1. Complete a test subscription
2. Go to dashboard
3. Click "Manage Subscription" (on SubscriptionBadge or pricing page)
4. Verify Stripe Customer Portal opens
5. Test canceling subscription
6. Check webhook logs for `customer.subscription.deleted`
7. Verify database updated to `canceled` status

### Verifying Webhooks

**Expected webhook events for new subscription:**

```
✅ checkout.session.completed
✅ customer.created
✅ customer.subscription.created
✅ invoice.created
✅ invoice.finalized
✅ invoice.paid
✅ payment_intent.created
✅ payment_intent.succeeded
```

**What to check:**

- Terminal logs show: `✅ Subscription created for user [id]: [plan] plan`
- Supabase profiles table shows:
  - `subscription_status`: `active`
  - `subscription_plan`: `standard` or `premium`
  - `stripe_customer_id`: populated
  - `stripe_subscription_id`: populated
  - `subscription_current_period_end`: future date

---

## 🔧 Troubleshooting

### Issue: Database not updating after payment

**Symptoms:**

- Payment succeeds
- Webhook says success
- Database still shows `subscription_status`: `null`

**Solution:**

- Check you're using `SUPABASE_SECRET_KEY` (not `SUPABASE_KEY`)
- Verify key is in both `.env` and `nuxt.config.ts`
- Restart dev server after adding key

### Issue: "Missing required fields" error

**Symptoms:**

- Error when clicking "Get Started"
- Toast notification appears empty

**Solution:**

- Check user is logged in
- Verify user has email in auth object
- Check browser console for errors
- Ensure price IDs are correct in `.env`

### Issue: Webhook signature verification failed

**Symptoms:**

- Error in terminal: `Webhook signature verification failed`
- Webhooks not processing

**Solution:**

- Check `STRIPE_WEBHOOK_SECRET` matches CLI output
- Restart dev server after updating secret
- For production: verify secret matches Stripe Dashboard

### Issue: `current_period_end` is null

**Symptoms:**

- Subscription created
- But `subscription_current_period_end` is `null`

**Solution:**

- **Already fixed!** We're using API version `2024-11-20.acacia`
- If issue persists, check Stripe API version in webhook handler
- Verify subscription object has `current_period_end` in logs

### Issue: Stripe CLI not forwarding webhooks

**Symptoms:**

- No webhook events in terminal
- Stripe CLI shows connection but no events

**Solution:**

```bash
# Stop the CLI (Ctrl+C)
# Login again
stripe login

# Forward with verbose logging
stripe listen --forward-to localhost:3000/api/stripe/webhook --log-level debug
```

### Issue: User object missing `id` field

**Symptoms:**

- Error: "No user ID found"
- User is logged in but subscription fails

**Solution:**

- User ID is in `sub` field for Supabase users
- **Already handled!** Code checks both `user.id` and `user.sub`
- If issue persists, check `useSupabaseUser()` composable

---

## 📝 Common Tasks

### Adding a New Plan

1. **Create product in Stripe Dashboard**:

   - Go to Products → Add product
   - Set name and price
   - Copy Price ID

2. **Add to environment variables**:

   ```env
   STRIPE_ENTERPRISE_PRICE_ID=price_...
   ```

3. **Update `nuxt.config.ts`**:

   ```typescript
   public: {
     stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
     stripeStandardPriceId: process.env.STRIPE_STANDARD_PRICE_ID,
     stripePremiumPriceId: process.env.STRIPE_PREMIUM_PRICE_ID,
     stripeEnterprisePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID, // New
   },
   ```

4. **Add to pricing page**:

   ```vue
   <!-- Add new pricing card in app/pages/pricing.vue -->
   <div class="card bg-base-100 shadow-xl">
     <!-- ... card content -->
     <button @click="handleSubscribe('enterprise')">
       Get Started
     </button>
   </div>
   ```

5. **Update webhook handler** to recognize new plan type

### Changing Plan Prices

1. **Create new price in Stripe** (don't modify existing)
2. **Update environment variables** with new price ID
3. **Existing subscriptions** continue at old price
4. **New subscriptions** use new price

### Canceling a Subscription (As Admin)

```bash
# Using Stripe CLI
stripe subscriptions list --customer cus_xxxxx
stripe subscriptions cancel sub_xxxxx

# Or via Stripe Dashboard:
# Customers → Select customer → Cancel subscription
```

### Testing Webhook Events

```bash
# Trigger specific events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.deleted
stripe trigger invoice.payment_failed
```

### Checking Webhook Logs

**Local:**

- Check dev server terminal
- Look for: `✅ Subscription created/updated/canceled`

**Production:**

- Netlify Dashboard → Functions → Select webhook function
- View logs for errors and success messages

**Stripe Dashboard:**

- Developers → Webhooks → Select endpoint
- View webhook attempts and responses

### Refunding a Payment

```bash
# Using Stripe CLI
stripe refunds create --charge ch_xxxxx

# Or via Stripe Dashboard:
# Payments → Select payment → Refund
```

---

## 🔐 Security Best Practices

1. **Never expose secret keys**:

   - ✅ `STRIPE_SECRET_KEY` only in server-side code
   - ✅ `SUPABASE_SECRET_KEY` only in server-side code
   - ❌ Never commit `.env` to Git

2. **Always verify webhook signatures**:

   - ✅ Already implemented in `webhook.post.ts`
   - Uses `stripe.webhooks.constructEvent()`

3. **Use Row Level Security (RLS)**:

   - ✅ Already enabled on profiles table
   - Users can only read/update their own profile

4. **Validate user input**:
   - ✅ Server validates priceId, userId, userEmail
   - ✅ Rejects requests with missing data

---

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Customer Portal](https://stripe.com/docs/billing/subscriptions/customer-portal)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

## 🎉 Success Indicators

Your integration is working correctly when:

- ✅ Users can subscribe via `/pricing` page
- ✅ Payments process successfully
- ✅ Webhooks receive and process events
- ✅ Database updates with subscription data
- ✅ Dashboard shows correct subscription badge
- ✅ Customer portal opens and works
- ✅ Subscription cancellations update database
- ✅ `subscription_current_period_end` has a date value

---

## 💡 Tips

1. **Always test in test mode first** before going live
2. **Monitor webhook logs** regularly for errors
3. **Set up Stripe email notifications** for failed payments
4. **Keep Stripe CLI running** during local development
5. **Use descriptive metadata** when creating checkout sessions
6. **Test edge cases**: expired cards, declined payments, cancellations
7. **Check Stripe Dashboard** for customer disputes and chargebacks

---

## 🆘 Need Help?

If you encounter issues not covered in this guide:

1. Check Stripe Dashboard → Developers → Logs
2. Check Netlify function logs (production)
3. Review webhook event data in Stripe Dashboard
4. Test with Stripe CLI locally
5. Consult Stripe documentation for specific API questions

---

**Last Updated**: December 23, 2025  
**Stripe API Version**: 2024-11-20.acacia  
**Integration Status**: ✅ Fully Functional
