import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";
import { Heart } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ChatPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--background))] transition-colors duration-300">
      {/* Header */}
      <header className="bg-[rgb(var(--card))] border-b border-[rgb(var(--border))] sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgb(var(--primary))] flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 text-[rgb(var(--primary-foreground))]" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[rgb(var(--foreground))]">Therapist</h1>
              <p className="text-xs text-[rgb(var(--muted-foreground))]">Your safe space</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 rounded-xl shadow-sm",
                  userButtonPopoverCard: "bg-[rgb(var(--card))] rounded-2xl shadow-xl border border-[rgb(var(--border))]",
                  userButtonPopoverActionButton: "hover:bg-[rgb(var(--secondary))] rounded-xl transition-colors",
                  userButtonPopoverActionButtonText: "text-[rgb(var(--foreground))]",
                  userButtonPopoverFooter: "hidden",
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col w-full overflow-hidden">
        <ChatInterface />
      </main>

      {/* Footer Disclaimer */}
      <footer className="bg-[rgb(var(--card))] border-t border-[rgb(var(--border))] py-3">
        <p className="text-center text-xs text-[rgb(var(--muted-foreground))] px-4">
          Not a licensed therapist • In crisis, call <span className="font-semibold text-[rgb(var(--foreground))]">988</span> or emergency services
        </p>
      </footer>
    </div>
  );
}
