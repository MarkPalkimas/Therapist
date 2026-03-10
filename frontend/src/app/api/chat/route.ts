import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

interface Message {
  role: string;
  content: string;
}

export async function POST(req: NextRequest) {
  console.log("=== Chat API called ===");
  
  try {
    // Authenticate the user
    console.log("Step 1: Authenticating user...");
    let userId: string | null = null;
    
    try {
      const authResult = await auth();
      userId = authResult?.userId || null;
      console.log("Auth result:", { userId, hasAuth: !!authResult });
    } catch (authError) {
      console.error("Auth error:", authError);
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }
    
    if (!userId) {
      console.error("No user ID found after auth");
      return NextResponse.json(
        { error: "Unauthorized - please sign in" },
        { status: 401 }
      );
    }

    // Parse request body
    console.log("Step 2: Parsing request body...");
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    
    const { messages } = body as { messages: Message[] };
    console.log("Messages received:", messages?.length, "messages");

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format:", typeof messages);
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      );
    }

    // Validate Gemini API key
    console.log("Step 3: Validating Gemini API key...");
    console.log("Environment variables available:", Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('API')));
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("API key exists:", !!apiKey);
    console.log("API key length:", apiKey?.length);
    console.log("API key type:", typeof apiKey);
    
    if (!apiKey || apiKey === 'undefined' || apiKey === 'null') {
      console.error("GEMINI_API_KEY is not configured in environment");
      console.error("All env keys:", Object.keys(process.env).join(', '));
      return NextResponse.json(
        { error: "Service configuration error - API key missing" },
        { status: 500 }
      );
    }

    // Initialize Gemini client
    console.log("Step 4: Initializing Gemini client...");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      systemInstruction: THERAPIST_SYSTEM_PROMPT,
    });

    // Convert messages to Gemini format
    console.log("Step 5: Converting messages to Gemini format...");
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1];
    
    // Start chat with history
    console.log("Step 6: Starting Gemini chat with", history.length, "history messages...");
    const chat = model.startChat({
      history,
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1000,
      },
    });

    // Send the latest message
    console.log("Step 7: Sending message to Gemini...");
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response;
    const reply = response.text() || "I'm here to listen. Could you tell me more?";

    console.log("Step 8: Gemini response received successfully");
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("=== CHAT API ERROR ===");
    console.error("Error caught in main try/catch:", error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error type:", error.constructor.name);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    return NextResponse.json(
      { error: "Failed to process your message. Please try again." },
      { status: 500 }
    );
  }
}
