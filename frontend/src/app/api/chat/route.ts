// Therapist/frontend/src/app/api/chat/route.ts

import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Retrieve Clerk session information from the incoming request
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await request.json();
    console.log("Processing chat for user:", userId, "message:", message);

    return NextResponse.json({
      reply: `Received your message, user ${userId}`,
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
