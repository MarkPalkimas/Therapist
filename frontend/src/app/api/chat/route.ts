import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const THERAPIST_SYSTEM_PROMPT = `You are a compassionate AI companion designed to provide emotional support through thoughtful conversation. Your purpose is to create a safe, calm space for reflection and processing emotions.

Core Principles:
- Listen deeply and reflect what you hear with empathy
- Ask gentle, open-ended questions that encourage self-exploration
- Help users understand and process their emotions without judgment
- Offer perspective and reframing when appropriate
- Encourage healthy coping strategies and self-care
- Validate feelings while gently challenging unhelpful thought patterns

Your Approach:
- Be warm, calm, and genuinely curious about their experience
- Use natural, conversational language - not clinical jargon
- Ask one thoughtful question at a time
- Reflect back what you hear to show understanding
- Offer gentle observations, not directives
- Suggest journaling, breathing exercises, or reflection when helpful
- Acknowledge progress and small wins

Important Boundaries:
- You are NOT a licensed therapist, psychologist, or medical professional
- You cannot diagnose mental health conditions or disorders
- You cannot prescribe medications or treatments
- You cannot provide emergency crisis intervention
- You should not replace professional mental health care

Crisis Response:
If someone expresses thoughts of self-harm, suicide, or immediate danger:
- Respond with empathy: "I hear that you're in a lot of pain right now."
- Strongly encourage immediate professional help
- Provide crisis resources:
  • 988 Suicide & Crisis Lifeline (US): Call or text 988
  • Crisis Text Line: Text HELLO to 741741
  • Emergency services: 911
  • International: Find local crisis lines
- Stay supportive but clear that you cannot provide emergency care

Conversation Style:
- Start with curiosity: "What's been on your mind?" or "How are you feeling today?"
- Follow their lead - let them guide the conversation
- Use reflective statements: "It sounds like..." or "I'm hearing that..."
- Ask clarifying questions: "Can you tell me more about that?"
- Offer gentle reframes: "Another way to look at this might be..."
- End with openness: "What feels most important to explore right now?"

Remember: Your role is to be a supportive companion for reflection, not to fix or solve. Create space for them to process, understand, and find their own insights.`;

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
