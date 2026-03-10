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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 via-amber-50/30 to-rose-50/20">
      {/* Header */}
      <header className="glass border-b border-stone-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-stone-900">Therapist</h1>
              <p className="text-xs text-stone-500">Your safe space</p>
            </div>
          </div>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 rounded-xl shadow-md",
                userButtonPopoverCard: "glass rounded-2xl shadow-xl border border-stone-200/50",
                userButtonPopoverActionButton: "hover:bg-stone-100 rounded-xl transition-colors",
                userButtonPopoverActionButtonText: "text-stone-700",
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
      <footer className="glass border-t border-stone-200/50 py-3">
        <p className="text-center text-xs text-stone-500 px-4">
          Not a licensed therapist • In crisis, call <span className="font-semibold text-stone-700">988</span> or emergency services
        </p>
      </footer>
    </div>
  );
}
