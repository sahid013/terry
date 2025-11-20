import { NextRequest, NextResponse } from "next/server";
import { subscribeUser } from "@/lib/onesignal";

/**
 * POST /api/subscribe
 * Handles user subscription to OneSignal notifications
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, company, jobTitle } = body;

    // Validate input
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email is required" },
        { status: 400 }
      );
    }

    // Subscribe user to OneSignal
    const result = await subscribeUser({ email, firstName, lastName, company, jobTitle });

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: result.message,
          playerId: result.playerId,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Subscription API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
