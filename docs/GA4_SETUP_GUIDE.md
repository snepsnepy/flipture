# Google Analytics 4 Integration Setup Guide

This guide will help you set up Google Analytics 4 integration to display visitor statistics for each flipbook in your dashboard.

## Prerequisites

- Google Analytics 4 property set up (Measurement ID: `G-DSLR4ELNXK`)
- Access to Google Cloud Console
- Node.js environment with access to environment variables

## Step 1: Create a Google Cloud Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **IAM & Admin** → **Service Accounts**
4. Click **Create Service Account**
5. Fill in the details:
   - **Name**: `flipture-analytics` (or any name you prefer)
   - **Description**: `Service account for accessing GA4 Analytics Data API`
6. Click **Create and Continue**
7. Skip the optional steps and click **Done**

## Step 2: Download Service Account Credentials

1. In the Service Accounts list, find the account you just created
2. Click on the **Actions** menu (three dots) → **Manage keys**
3. Click **Add Key** → **Create new key**
4. Select **JSON** format
5. Click **Create** - a JSON file will be downloaded
6. Open the JSON file and extract these values:
   - `client_email` → This goes in `GA4_CLIENT_EMAIL`
   - `private_key` → This goes in `GA4_PRIVATE_KEY`

## Step 3: Grant Service Account Access to GA4

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon at bottom left)
3. In the **Property** column, click **Property Access Management**
4. Click **Add users** (+ button)
5. Enter the service account email (from `client_email` in the JSON file)
6. Select **Viewer** role
7. Click **Add**

## Step 4: Get Your GA4 Property ID

1. In Google Analytics, go to **Admin**
2. In the **Property** column, click **Property Settings**
3. Copy the **Property ID** (it's a number like `123456789`)
4. This goes in `GA4_PROPERTY_ID` environment variable

## Step 5: Configure Environment Variables

Create a `.env` file in your project root (or add to your existing `.env`):

```env
# Google Analytics 4 Configuration
GA4_PROPERTY_ID=123456789
GA4_CLIENT_EMAIL=flipture-analytics@your-project.iam.gserviceaccount.com
GA4_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

**Important Notes:**

- The `GA4_PRIVATE_KEY` should be wrapped in quotes
- Keep the `\n` characters in the private key (they represent newlines)
- In production environments (like Netlify, Vercel, etc.), add these as environment variables in your hosting platform

## Step 6: Enable the Analytics Data API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Library**
3. Search for **"Google Analytics Data API"**
4. Click on it and click **Enable**

## Step 7: Verify the Setup

1. Start your development server: `yarn dev`
2. Log in to your dashboard
3. You should see visitor statistics displayed under each flipbook card

## Troubleshooting

### "Analytics Data API has not been used in project"

- Make sure you've enabled the Google Analytics Data API (Step 6)

### "Permission denied"

- Verify that the service account email has been added to your GA4 property with Viewer permissions
- Check that you're using the correct Property ID

### "Invalid credentials"

- Double-check that the `client_email` and `private_key` are correctly copied from the JSON file
- Ensure the private key includes the `\n` characters and is wrapped in quotes

### No analytics data showing

- Make sure you have the custom dimension `flipbook_id` registered in GA4
- Wait 5-10 minutes after registering the custom dimension for data to start appearing
- Verify that your viewer app is sending `flipbook_view` events with the `flipbook_id` parameter

## Data Displayed

The integration shows the following metrics for each flipbook:

- **Views**: Total number of `flipbook_view` events since the flipbook was created
- **Unique Visitors**: Number of unique users who viewed the flipbook since creation

**Note:** The date range automatically adjusts based on when your flipbooks were created. Analytics are tracked from the earliest flipbook's creation date to today.

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- In production, use your hosting platform's environment variable management
- Rotate service account keys periodically for security
