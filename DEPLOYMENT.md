# Deployment Guide for Vercel

This guide will help you deploy the Terry application to Vercel.

## Prerequisites

- A Vercel account (free at https://vercel.com)
- Your GitHub repository (can be private)
- OneSignal credentials ready

## Step 1: Authorize Vercel to Access Your Private Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. If you don't see your repository:
   - Click **"Adjust GitHub App Permissions"** or **"Configure GitHub App"**
   - Select **"Only select repositories"** or **"All repositories"**
   - If using "Only select repositories", add `sahid013/terry`
   - Click **"Save"**

## Step 2: Import Your Project

1. After authorizing, you should see your `terry` repository
2. Click **"Import"** next to the terry repository
3. Vercel will automatically detect it's a Next.js project

## Step 3: Configure Environment Variables

**IMPORTANT**: Add your OneSignal credentials before deploying!

1. In the project setup screen, scroll to **"Environment Variables"**
2. Add these variables:

   ```
   Name: NEXT_PUBLIC_ONESIGNAL_APP_ID
   Value: your_actual_app_id_here
   ```

   ```
   Name: ONESIGNAL_REST_API_KEY
   Value: your_actual_rest_api_key_here
   ```

3. Make sure both are set for **"Production"**, **"Preview"**, and **"Development"**

## Step 4: Deploy

1. Leave all other settings as default (Vercel auto-detects Next.js)
2. Click **"Deploy"**
3. Wait 2-3 minutes for the build to complete
4. You'll get a URL like `https://terry-xxxx.vercel.app`

## Troubleshooting

### Error: 404 NOT_FOUND

This usually means:
- **Repository not found**: Make sure Vercel has access to your private repo
- **Branch not found**: Verify your default branch is `main`
- **Solution**: Re-authorize GitHub integration and re-import the project

### Build Fails

1. Check the build logs in Vercel dashboard
2. Common issues:
   - Missing environment variables
   - TypeScript errors
   - Dependency issues

### Environment Variables Not Working

- Make sure variables start with `NEXT_PUBLIC_` for client-side access
- `ONESIGNAL_REST_API_KEY` should NOT have `NEXT_PUBLIC_` prefix (server-only)
- Redeploy after adding environment variables

## Step 5: Test Your Deployment

1. Visit your deployed URL
2. Test the subscription form
3. Check OneSignal dashboard to see if subscriptions are working

## Updating Your Deployment

Every time you push to GitHub, Vercel will automatically redeploy:

```bash
git add .
git commit -m "your changes"
git push origin main
```

## Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

## Local Development vs Production

- **Local**: Uses `.env.local` file
- **Production**: Uses Vercel environment variables
- Make sure both have the same OneSignal credentials

## Support

If you continue having issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Ensure all environment variables are set correctly
