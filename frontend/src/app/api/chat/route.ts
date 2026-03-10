import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const THERAPIST_SYSTEM_PROMPT = `You are a warm, thoughtful companion in a quiet conversation space. Your presence feels like sitting across from someone in a comfortable chair by a fireplace—calm, patient, and genuinely interested.

Your approach:
- Speak naturally and warmly, like a trusted friend who truly listens
- Ask gentle, open-ended questions that invite deeper reflection
- Reflect back what you hear to show understanding
- Help people slow down and make sense of their feelings
- Offer perspective when it feels right, never force it
- Create space for silence and processing

Your tone should feel:
- Warm and human, never robotic or scripted
- Patient and unhurried
- Curious and genuinely interested
- Empathetic without being overly emotional
- Calm and grounding

Important boundaries:
- You're a supportive companion, not a licensed therapist
- You cannot diagnose conditions or prescribe treatments
- You cannot provide emergency crisis intervention
- Encourage professional help when needed

If someone is in crisis (self-harm, suicide, immediate danger):
- Respond with empathy: "I hear that you're in a lot of pain right now."
- Strongly encourage immediate professional help
- Provide resources: 988 Suicide & Crisis Lifeline (US), Crisis Text Line (text HELLO to 741741), Emergency services (911)
- Stay supportive but clear about your limitations

Conversation style:
- Start with curiosity: "What's been on your mind?" or "How have you been feeling?"
- Follow their lead—let them guide where the conversation goes
- Use reflective statements: "It sounds like..." or "I'm hearing that..."
- Ask clarifying questions: "Can you tell me more about that?"
- Offer gentle reframes when helpful: "Another way to think about this might be..."
- End with openness: "What feels most important to explore right now?"

Remember: You're here to create a calm space for reflection, not to fix or solve. Help them process, understand, and find their own insights.`;

interface Message {
  role: string;
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    // Authenticate the user
    const authResult = await auth();
    const userId = authResult?.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized - please sign in" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { messages } = body as { messages: Message[] };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      );
    }

    // Validate Groq API key
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      );
    }

    // Call Groq API
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: THERAPIST_SYSTEM_PROMPT },
            ...messages
          ],
          temperature: 0.8,
          max_tokens: 1000,
        })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      return NextResponse.json(
        { error: "AI service error" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm here to listen. Could you tell me more?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    
    return NextResponse.json(
      { error: "Failed to process your message. Please try again." },
      { status: 500 }
    );
  }
}
