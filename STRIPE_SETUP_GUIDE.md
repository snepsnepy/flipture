# Stripe Payment Integration - Quick Reference

> ⚠️ **For complete documentation, see [STRIPE_INTEGRATION_GUIDE.md](./STRIPE_INTEGRATION_GUIDE.md)**

This file contains quick reference information. For detailed step-by-step instructions, architecture diagrams, troubleshooting, and best practices, please refer to the comprehensive integration guide.

## ✅ What We've Done

1. ✅ Installed Stripe dependencies (`stripe` and `@stripe/stripe-js`)
2. ✅ Updated `nuxt.config.ts` with Stripe runtime configuration
3. ✅ Created server API endpoints:
   - `/api/stripe/create-checkout-session` - Creates Stripe checkout sessions
   - `/api/stripe/webhook` - Handles Stripe webhook events
   - `/api/stripe/create-portal-session` - Creates customer portal sessions
4. ✅ Created `useStripe` composable for client-side Stripe operations
5. ✅ Created pricing page at `/pricing`

## 📋 What You Need to Do Next

### 1. Update Your Database Schema

You need to add subscription-related fields to your `users` table in Supabase. Run this SQL in your Supabase SQL Editor:

```sql
-- Add subscription columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_status TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_plan TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_current_period_end TIMESTAMP WITH TIME ZONE;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON users(subscription_status);
```

### 2. Configure Stripe Webhooks

This is the MOST IMPORTANT step! Webhooks allow Stripe to notify your app about subscription events.

#### For Development (Testing Locally):

1. **Install Stripe CLI**:
   ```bash
   # Windows (using Scoop)
   scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
   scoop install stripe
   
   # Or download from: https://github.com/stripe/stripe-cli/releases/latest
   ```

2. **Login to Stripe CLI**:
   ```bash
   stripe login
   ```

3. **Forward webhooks to your local server**:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   
   This will output a webhook signing secret starting with `whsec_...`
   Update your `.env` file with this secret:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

4. **Test webhook events**:
   ```bash
   stripe trigger checkout.session.completed
   ```

#### For Production (Netlify Deployment):

1. **Get your production URL** (e.g., `https://your-app.netlify.app`)

2. **Go to Stripe Dashboard**:
   - Navigate to: [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/test/webhooks)
   - Click "Add endpoint"

3. **Configure the endpoint**:
   - **Endpoint URL**: `https://your-app.netlify.app/api/stripe/webhook`
   - **Description**: "Flipture Production Webhook"
   - **Events to send**: Select these events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   
4. **Get the signing secret**:
   - After creating the endpoint, click on it
   - Click "Reveal" next to "Signing secret"
   - Copy the secret (starts with `whsec_...`)

5. **Add to Netlify Environment Variables**:
   - Go to your Netlify dashboard
   - Site settings → Environment variables
   - Add/Update: `STRIPE_WEBHOOK_SECRET` with your production webhook secret

### 3. Update Your Supabase Types (Optional but Recommended)

Update your `app/types/supabase.ts` to include the new subscription fields in the user type.

### 4. Add Navigation Link

Add a link to the pricing page in your navigation component:

```vue
<NuxtLink to="/pricing" class="btn btn-primary">
  Pricing
</NuxtLink>
```

### 5. Protect Premium Features

In your components/pages, check subscription status:

```typescript
// Example: Check if user has premium subscription
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const userProfile = ref<any>(null);

const checkSubscription = async () => {
  const { data } = await supabase
    .from('users')
    .select('subscription_status, subscription_plan')
    .eq('id', user.value.id)
    .single();
  
  userProfile.value = data;
};

const isPremium = computed(() => {
  return userProfile.value?.subscription_plan === 'premium' 
    && userProfile.value?.subscription_status === 'active';
});

const isStandard = computed(() => {
  return userProfile.value?.subscription_plan === 'standard' 
    && userProfile.value?.subscription_status === 'active';
});
```

### 6. Test the Integration

#### Test Checkout Flow:

1. Start your dev server: `yarn dev`
2. Start Stripe webhook forwarding: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
3. Navigate to `/pricing`
4. Click on a plan (Standard or Premium)
5. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
6. Complete the checkout
7. Verify in Supabase that user subscription fields are updated

#### Test Customer Portal:

1. After subscribing, click "Manage Subscription" button
2. You should be redirected to Stripe Customer Portal
3. Test canceling/updating subscription
4. Verify changes reflect in your database

### 7. Important Stripe Test Cards

```
Success: 4242 4242 4242 4242
Declined: 4000 0000 0000 0002
Requires Authentication: 4000 0025 0000 3155
```

## 🔒 Security Checklist

- ✅ `.env` file is in `.gitignore`
- ✅ Stripe secret keys are only in server runtime config
- ✅ Webhook signature verification is enabled
- ✅ User ID is stored in metadata for tracking

## 📊 Monitoring

To monitor your Stripe integration:

1. **Stripe Dashboard**: View all payments, subscriptions, and customers
2. **Webhook Logs**: Check webhook delivery status in Stripe Dashboard
3. **Server Logs**: Monitor your Netlify function logs for errors

## 🎯 Next Steps

1. Complete database schema update
2. Set up webhooks (development first, then production)
3. Test the complete flow locally
4. Deploy to Netlify
5. Configure production webhooks
6. Test in production with test mode
7. When ready, switch to live mode in Stripe

## 🆘 Troubleshooting

### Webhook not receiving events:
- Check webhook URL is correct
- Verify webhook signing secret matches
- Check Netlify function logs
- Ensure endpoint is publicly accessible

### Checkout session not creating:
- Verify price IDs in `.env` match Stripe Dashboard
- Check server logs for errors
- Ensure user email and ID are being passed correctly

### Database not updating:
- Verify Supabase credentials
- Check webhook is being triggered
- Review Netlify function logs
- Ensure database schema is updated

## 📚 Resources

- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Customer Portal](https://stripe.com/docs/billing/subscriptions/customer-portal)

