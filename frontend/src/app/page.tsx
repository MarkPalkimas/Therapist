import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

// Force dynamic rendering to avoid build-time Clerk validation
export const dynamic = 'force-dynamic';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold text-neutral-100">Therapist AI</div>
          <div className="flex gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-neutral-300 hover:text-neutral-100 transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/chat">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                  Open App
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-6 leading-tight">
            A Safe Space for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              Your Thoughts
            </span>
          </h1>
          <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
            Talk through your emotions with an AI companion designed to listen, reflect, and support you through life&apos;s challenges.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg transition shadow-lg shadow-blue-600/20">
                Start Your Journey
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/chat">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg transition shadow-lg shadow-blue-600/20">
                Continue to App
              </button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-neutral-100 mb-16">
            Why Choose Therapist AI
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Private & Secure"
              description="Your conversations are encrypted and never shared. Complete privacy guaranteed."
            />
            <FeatureCard
              title="Always Available"
              description="24/7 support whenever you need someone to talk to, no appointments needed."
            />
            <FeatureCard
              title="Emotionally Intelligent"
              description="Trained to understand, reflect, and help you process complex emotions."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-neutral-100 mb-16">
            How It Works
          </h2>
          <div className="space-y-8">
            <Step number="1" title="Sign Up" description="Create your private account in seconds" />
            <Step number="2" title="Start Talking" description="Share what's on your mind in a judgment-free space" />
            <Step number="3" title="Reflect & Grow" description="Gain insights and process emotions with AI support" />
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="py-20 px-6 bg-neutral-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-neutral-100 mb-6">
            Important Safety Information
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            Therapist AI provides supportive conversation but is not a replacement for professional mental health care. 
            This AI is not a licensed therapist and cannot diagnose conditions or provide medical advice. 
            If you&apos;re experiencing a mental health crisis, please contact a crisis helpline or emergency services immediately.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto text-center text-neutral-500 text-sm">
          <p>© 2026 Therapist AI. Built with care for emotional wellbeing.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-neutral-800/50 rounded-xl border border-neutral-700 hover:border-neutral-600 transition">
      <h3 className="text-xl font-semibold text-neutral-100 mb-3">{title}</h3>
      <p className="text-neutral-400">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-neutral-100 mb-2">{title}</h3>
        <p className="text-neutral-400">{description}</p>
      </div>
    </div>
  );
}
