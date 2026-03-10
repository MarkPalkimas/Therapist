import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import { UserButton } from "@clerk/nextjs";
import { Heart } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ChatPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1EA]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7A6A58] flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#2F2A25]">Therapist</h1>
              <p className="text-xs text-neutral-500">Your quiet space</p>
            </div>
          </div>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 rounded-full",
                userButtonPopoverCard: "bg-white rounded-xl shadow-xl border border-neutral-200",
                userButtonPopoverActionButton: "hover:bg-[#F9F6F2] rounded-xl transition-colors",
                userButtonPopoverActionButtonText: "text-[#2F2A25]",
                userButtonPopoverFooter: "hidden",
              }
            }}
          />
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col w-full overflow-hidden">
        <ChatInterface />
      </main>

      {/* Footer Disclaimer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-neutral-200 py-3">
        <p className="text-center text-xs text-neutral-500 px-4">
          Not a licensed therapist • In crisis, call <span className="font-semibold text-[#7A6A58]">988</span> or emergency services
        </p>
      </footer>
    </div>
  );
}
