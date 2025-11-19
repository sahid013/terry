/**
 * OneSignal API Integration
 *
 * This module handles all OneSignal API interactions for push notifications
 * and user subscriptions.
 *
 * Setup Instructions:
 * 1. Create a OneSignal account at https://onesignal.com
 * 2. Create a new app in OneSignal dashboard
 * 3. Get your App ID and REST API Key
 * 4. Add them to your .env.local file:
 *    NEXT_PUBLIC_ONESIGNAL_APP_ID=your_app_id
 *    ONESIGNAL_REST_API_KEY=your_rest_api_key
 */

interface SubscribeUserParams {
  email: string;
  name?: string;
}

interface OneSignalResponse {
  success: boolean;
  message: string;
  playerId?: string;
}

/**
 * Subscribe a user to OneSignal push notifications
 * @param params - User subscription data (email, name)
 * @returns Promise with subscription result
 */
export async function subscribeUser(
  params: SubscribeUserParams
): Promise<OneSignalResponse> {
  const { email, name } = params;

  // Check if environment variables are configured
  const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;

  if (!appId || !apiKey) {
    console.error("OneSignal credentials not configured");
    return {
      success: false,
      message: "OneSignal is not configured. Please add credentials to .env.local",
    };
  }

  try {
    // OneSignal API endpoint for creating a device/user
    const response = await fetch("https://onesignal.com/api/v1/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${apiKey}`,
      },
      body: JSON.stringify({
        app_id: appId,
        device_type: 11, // Email device type
        identifier: email,
        tags: {
          name: name || "",
          subscribed_via: "website_form",
          subscription_date: new Date().toISOString(),
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "Successfully subscribed to notifications!",
        playerId: data.id,
      };
    } else {
      return {
        success: false,
        message: data.errors?.[0] || "Failed to subscribe",
      };
    }
  } catch (error) {
    console.error("OneSignal subscription error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}

/**
 * Send a test notification to a user
 * @param playerId - OneSignal player ID
 * @param message - Notification message
 */
export async function sendTestNotification(
  playerId: string,
  message: string
): Promise<OneSignalResponse> {
  const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;

  if (!appId || !apiKey) {
    return {
      success: false,
      message: "OneSignal is not configured",
    };
  }

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${apiKey}`,
      },
      body: JSON.stringify({
        app_id: appId,
        include_player_ids: [playerId],
        contents: {
          en: message,
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "Notification sent successfully!",
      };
    } else {
      return {
        success: false,
        message: data.errors?.[0] || "Failed to send notification",
      };
    }
  } catch (error) {
    console.error("OneSignal notification error:", error);
    return {
      success: false,
      message: "Failed to send notification",
    };
  }
}
