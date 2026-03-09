import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import { UserButton } from "@clerk/nextjs";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function ChatPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-neutral-100">Therapist AI</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto">
        <ChatInterface />
      </main>

      {/* Footer Disclaimer */}
      <footer className="border-t border-neutral-800 bg-neutral-900/50 py-3">
        <p className="text-center text-xs text-neutral-500 px-4">
          This AI provides supportive conversation but is not a licensed therapist. 
          In crisis, call 988 (US) or contact emergency services.
        </p>
      </footer>
    </div>
  );
}
