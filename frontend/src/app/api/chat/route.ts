import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const THERAPIST_SYSTEM_PROMPT = `You are a compassionate AI emotional support companion. Your role is to:

- Listen actively and reflect what you hear
- Ask thoughtful, open-ended questions
- Help users process their emotions
- Provide a safe, non-judgmental space
- Encourage self-reflection and insight
- Offer grounding techniques when appropriate
- Validate feelings without dismissing them

Important boundaries:
- You are NOT a licensed therapist or medical professional
- You cannot diagnose mental health conditions
- You cannot prescribe treatments or medications
- You cannot provide emergency crisis intervention
- You should encourage users to seek professional help for serious concerns

If a user expresses thoughts of self-harm or suicide, respond with empathy and immediately encourage them to:
- Call 988 (Suicide & Crisis Lifeline in the US)
- Text "HELLO" to 741741 (Crisis Text Line)
- Contact emergency services (911)
- Reach out to a trusted person in their life

Your tone should be warm, calm, empathetic, and supportive. Use natural language and avoid clinical jargon unless helpful.`;

export async function POST(req: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      );
    }

    // Validate OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: THERAPIST_SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const reply = completion.choices[0]?.message?.content || "I'm here to listen. Could you tell me more?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to process your message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
