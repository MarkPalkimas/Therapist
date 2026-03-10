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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[rgb(250,248,245)] to-[rgb(248,244,238)]">
      {/* Header */}
      <header className="bg-[rgb(255,253,250)]/80 backdrop-blur-sm border-b border-[rgb(230,224,216)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[rgb(139,116,95)] flex items-center justify-center">
              <Heart className="w-5 h-5 text-[rgb(255,253,250)]" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[rgb(62,56,48)]">Therapist</h1>
              <p className="text-xs text-[rgb(156,148,138)]">Your quiet space</p>
            </div>
          </div>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 rounded-2xl",
                userButtonPopoverCard: "cozy-card rounded-2xl shadow-xl",
                userButtonPopoverActionButton: "hover:bg-[rgb(248,244,238)] rounded-xl transition-colors",
                userButtonPopoverActionButtonText: "text-[rgb(62,56,48)]",
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
      <footer className="bg-[rgb(255,253,250)]/80 backdrop-blur-sm border-t border-[rgb(230,224,216)] py-3">
        <p className="text-center text-xs text-[rgb(156,148,138)] px-4">
          Not a licensed therapist • In crisis, call <span className="font-semibold text-[rgb(139,116,95)]">988</span> or emergency services
        </p>
      </footer>
    </div>
  );
}
