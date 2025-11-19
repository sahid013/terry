# OneSignal Integration Setup Guide

This guide will help you set up OneSignal push notifications for the Terry application.

## Prerequisites

- A OneSignal account (free at https://onesignal.com)
- Your Next.js application (already set up in this project)

## Step 1: Create a OneSignal Account

1. Go to [OneSignal](https://onesignal.com) and sign up for a free account
2. Click "New App/Website" to create a new application
3. Give your app a name (e.g., "Terry")
4. Select "Web Push" as the platform

## Step 2: Get Your API Credentials

1. In your OneSignal dashboard, go to **Settings** → **Keys & IDs**
2. You'll need two values:
   - **App ID** (OneSignal App ID)
   - **REST API Key** (found under "Keys & IDs")

## Step 3: Configure Environment Variables

1. In the root of your project, copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your OneSignal credentials:
   ```env
   NEXT_PUBLIC_ONESIGNAL_APP_ID=your_actual_app_id_here
   ONESIGNAL_REST_API_KEY=your_actual_rest_api_key_here
   ```

3. **Important**: Never commit `.env.local` to git. It's already in `.gitignore`

## Step 4: Configure OneSignal for Email

Since we're collecting emails through the form, configure OneSignal for email notifications:

1. In OneSignal dashboard, go to **Settings** → **Platforms**
2. Click **Email** and configure your email settings
3. You can use:
   - OneSignal's free email service (limited)
   - Your own SMTP server
   - SendGrid, Mailgun, or other email providers

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000 in your browser

3. Fill out the subscription form with:
   - Your name
   - A valid email address

4. Click "Free Download"

5. Check the OneSignal dashboard under **Audience** → **All Users** to see if the subscriber was added

## How It Works

### Form Submission Flow

1. User fills out the form in `src/components/features/SubscriptionForm.tsx`
2. Form submits to `/api/subscribe` endpoint
3. API route (`src/app/api/subscribe/route.ts`) validates the data
4. OneSignal API is called via `src/lib/onesignal.ts`
5. User is subscribed and can receive notifications

### File Structure

```
src/
├── app/
│   └── api/
│       └── subscribe/
│           └── route.ts          # API endpoint for subscriptions
├── components/
│   ├── features/
│   │   ├── SubscriptionForm.tsx  # The form component
│   │   └── Hero.tsx              # Hero section with form
│   └── ui/
│       ├── Input.tsx             # Reusable input component
│       └── Button.tsx            # Reusable button component
└── lib/
    └── onesignal.ts              # OneSignal API integration
```

## Sending Notifications

### Manual Notifications

1. Go to OneSignal dashboard
2. Click **Messages** → **New Push**
3. Select **Email** as the channel
4. Compose your message
5. Select your audience (all users or specific segments)
6. Send!

### Programmatic Notifications

You can send notifications programmatically using the `sendTestNotification` function in `src/lib/onesignal.ts`:

```typescript
import { sendTestNotification } from "@/lib/onesignal";

// Send a test notification
const result = await sendTestNotification(
  "player_id_from_subscription",
  "Hello! This is a test notification."
);
```

## Testing Tips

1. **Use a real email address** - Test with your own email first
2. **Check spam folder** - Initial emails might go to spam
3. **Monitor the console** - Check browser and server console for errors
4. **Use OneSignal's test mode** - OneSignal dashboard has testing tools

## Troubleshooting

### "OneSignal is not configured" error

- Make sure `.env.local` exists and contains valid credentials
- Restart your development server after adding environment variables

### Form submits but user doesn't appear in dashboard

- Check that your App ID is correct
- Verify your REST API Key has proper permissions
- Check the browser console and server logs for errors

### Email notifications not arriving

- Configure email settings in OneSignal dashboard
- Verify email provider is set up correctly
- Check spam folder
- Ensure email is verified in OneSignal

## Next Steps

1. **Customize the form** - Modify `SubscriptionForm.tsx` to match your design
2. **Add more fields** - Collect additional user data if needed
3. **Create segments** - Use OneSignal's segmentation features
4. **Set up automation** - Create automated notification campaigns
5. **Analytics** - Track notification performance in OneSignal dashboard

## Security Notes

- **Never expose your REST API Key** in client-side code
- Always use environment variables for sensitive data
- The REST API Key should only be used in server-side code (API routes)
- The App ID can be public (prefixed with `NEXT_PUBLIC_`)

## Resources

- [OneSignal Documentation](https://documentation.onesignal.com/)
- [OneSignal REST API](https://documentation.onesignal.com/reference/create-notification)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## Support

If you encounter issues:

1. Check OneSignal's status page: https://status.onesignal.com/
2. Visit OneSignal community: https://community.onesignal.com/
3. Review OneSignal documentation
4. Check the project's GitHub issues
