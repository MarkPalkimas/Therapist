import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import { UserButton } from "@clerk/nextjs";

export const dynamic = 'force-dynamic';

export default async function ChatPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      {/* Minimal Header */}
      <header className="border-b border-white/5 bg-[#0f0f0f]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-medium text-white/90 tracking-tight">Therapist</h1>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-9 h-9",
                userButtonPopoverCard: "bg-neutral-900 border border-white/10",
                userButtonPopoverActionButton: "hover:bg-white/10",
              }
            }}
          />
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col w-full">
        <ChatInterface />
      </main>

      {/* Minimal Footer Disclaimer */}
      <footer className="border-t border-white/5 bg-[#0f0f0f]/80 backdrop-blur-md py-3">
        <p className="text-center text-xs text-white/30 px-4 font-light">
          Not a licensed therapist • In crisis, call 988 or emergency services
        </p>
      </footer>
    </div>
  );
}
