import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const dynamic = 'force-dynamic';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-lg font-medium text-white/90 tracking-tight">Therapist</div>
          <div className="flex gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-5 py-2 text-white/60 hover:text-white/90 transition-colors text-sm font-medium">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-5 py-2 bg-white/10 hover:bg-white/15 text-white rounded-full transition-all text-sm font-medium backdrop-blur-sm">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/chat">
                <button className="px-5 py-2 bg-white/10 hover:bg-white/15 text-white rounded-full transition-all text-sm font-medium backdrop-blur-sm">
                  Open App
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section - Extremely Minimal */}
      <section className="pt-40 pb-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-light text-white/95 mb-8 tracking-tight leading-[1.1]">
            A calm space to
            <br />
            <span className="text-white/40">talk things through</span>
          </h1>
          <p className="text-lg text-white/50 mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Private AI conversations designed to help you reflect, process thoughts, and slow down.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="px-8 py-4 bg-white text-[#0f0f0f] rounded-full transition-all text-base font-medium hover:bg-white/90 shadow-lg shadow-white/10">
                Start Talking
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/chat">
              <button className="px-8 py-4 bg-white text-[#0f0f0f] rounded-full transition-all text-base font-medium hover:bg-white/90 shadow-lg shadow-white/10">
                Continue
              </button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="fixed bottom-0 w-full py-6 px-6 border-t border-white/5 bg-[#0f0f0f]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-xs text-white/30">
          <p>Not a replacement for professional care</p>
          <p>In crisis, call 988</p>
        </div>
      </footer>
    </div>
  );
}
