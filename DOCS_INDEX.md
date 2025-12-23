# 📚 Documentation Index

Quick guide to all documentation files in this project.

## 📄 Documentation Files

### 🎯 Main Guides

#### **[STRIPE_INTEGRATION_GUIDE.md](./STRIPE_INTEGRATION_GUIDE.md)** ⭐ **START HERE**
**Complete guide for Stripe subscription integration**
- 📖 Overview and features
- 🔧 Development and production setup
- 🧪 Testing guide with test cards
- 🔍 Troubleshooting common issues
- 📁 File structure and code explanations
- 📝 Common tasks and recipes
- 🔐 Security best practices

**Who should read this:** Everyone implementing or maintaining Stripe subscriptions

---

#### **[STRIPE_SETUP_GUIDE.md](./STRIPE_SETUP_GUIDE.md)**
**Quick reference and checklist**
- ✅ Quick completion checklist
- 🔑 Environment variables reference
- 📋 Webhook configuration summary

**Who should read this:** Developers who need a quick reference after initial setup

---

#### **[ANALYTICS_STATS_IMPLEMENTATION.md](./ANALYTICS_STATS_IMPLEMENTATION.md)**
**Google Analytics 4 (GA4) integration guide**
- 📊 Analytics implementation details
- 🔧 GA4 setup instructions
- 📈 Stats page functionality

**Who should read this:** Developers working on analytics features

---

#### **[GA4_SETUP_GUIDE.md](./GA4_SETUP_GUIDE.md)**
**Detailed GA4 configuration**
- 🎯 Step-by-step GA4 setup
- 🔑 Service account configuration
- 📊 Dashboard integration

**Who should read this:** DevOps and developers setting up analytics

---

### 🗂️ Database Schema

#### **[schema/create-profiles-table.sql](./schema/create-profiles-table.sql)**
**Profiles table creation script**
- 👤 User profiles with subscription fields
- 🔒 Row Level Security policies
- 🔄 Automatic profile creation trigger

**Who should read this:** Database administrators and backend developers

---

#### **[schema/subscription.sql](./schema/subscription.sql)**
**Helper functions for subscriptions** (deprecated - use `create-profiles-table.sql` instead)
- 📊 Subscription views
- 🔍 Helper functions
- ⚠️ Note: Kept for reference only

---

### 📦 Configuration Files

#### **[nuxt.config.ts](./nuxt.config.ts)**
- Nuxt configuration
- Runtime config for Stripe and Supabase
- Module settings

#### **[package.json](./package.json)**
- Project dependencies
- Scripts for dev/build/deploy
- Stripe and Supabase packages

#### **[.env](./env)** (not committed to Git)
- Environment variables
- API keys and secrets
- **Important:** Never commit this file!

---

## 🚀 Quick Start

### For First-Time Setup

1. **Read:** [STRIPE_INTEGRATION_GUIDE.md](./STRIPE_INTEGRATION_GUIDE.md)
2. **Run:** SQL from `schema/create-profiles-table.sql`
3. **Configure:** Environment variables from setup guide
4. **Test:** Follow testing guide section

### For Troubleshooting

1. **Check:** [STRIPE_INTEGRATION_GUIDE.md](./STRIPE_INTEGRATION_GUIDE.md) → Troubleshooting section
2. **Verify:** Environment variables are correct
3. **Review:** Webhook logs in Stripe Dashboard
4. **Test:** Using Stripe CLI locally

### For Production Deployment

1. **Follow:** Production Setup in [STRIPE_INTEGRATION_GUIDE.md](./STRIPE_INTEGRATION_GUIDE.md)
2. **Add:** All environment variables to Netlify
3. **Configure:** Production webhooks in Stripe Dashboard
4. **Test:** With test cards before going live

---

## 📞 Support Resources

- **Stripe Documentation:** https://stripe.com/docs
- **Stripe Support:** https://support.stripe.com
- **Supabase Documentation:** https://supabase.com/docs
- **Nuxt 3 Documentation:** https://nuxt.com/docs

---

## 🔄 Documentation Updates

**Last Updated:** December 23, 2025

### Recent Changes:
- ✅ Added comprehensive Stripe integration guide
- ✅ Fixed subscription period end date tracking
- ✅ Updated to stable Stripe API version (2024-11-20.acacia)
- ✅ Documented troubleshooting solutions

---

## 📝 Notes

- All documentation assumes you're using **test mode** in Stripe unless specified
- Production deployment requires additional webhook configuration
- Keep `.env` file secure and never commit to Git
- Always test changes in development before deploying to production

---

**Happy coding! 🚀**

