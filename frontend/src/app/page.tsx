import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { MessageCircle, Shield, Clock, Heart } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7A6A58] flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-medium text-[#2F2A25]">Therapist</span>
          </div>
          <div className="flex gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-5 py-2.5 text-[#7A6A58] hover:text-[#645747] transition-colors font-medium">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-3 rounded-xl bg-[#7A6A58] text-white font-medium hover:bg-[#645747] transition-colors">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/chat">
                <button className="px-6 py-3 rounded-xl bg-[#7A6A58] text-white font-medium hover:bg-[#645747] transition-colors">
                  Open App
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-semibold leading-tight text-[#2F2A25] mb-6">
            A quiet place to talk
            <br />
            things through
          </h1>
          
          <p className="text-lg text-neutral-600 mt-6 max-w-2xl mx-auto">
            Private AI conversations designed to help you slow down, reflect, and make sense of what you&apos;re feeling.
          </p>
          
          <div className="mt-8">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="px-6 py-3 rounded-xl bg-[#7A6A58] text-white font-medium hover:bg-[#645747] transition-colors">
                  Start a Conversation
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/chat">
                <button className="px-6 py-3 rounded-xl bg-[#7A6A58] text-white font-medium hover:bg-[#645747] transition-colors">
                  Continue
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[#2F2A25] mb-4">
              Why reflection helps
            </h2>
            <p className="text-base text-neutral-600 max-w-2xl mx-auto">
              A safe space designed with your wellbeing in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Private & Safe"
              description="Your conversations are completely private. A secure space just for you."
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="Always Here"
              description="Available whenever you need to talk. No appointments, no waiting."
            />
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="Thoughtful Listening"
              description="Designed to help you process emotions and find clarity through reflection."
            />
          </div>
        </div>
      </section>

      {/* How Conversations Work */}
      <section className="py-24 px-6 bg-[#F9F6F2]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[#2F2A25] mb-4">
              How conversations work
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <StepCard
              number="1"
              title="Sit down and start"
              description="Create your account and enter your private space"
            />
            <StepCard
              number="2"
              title="Share what's on your mind"
              description="Talk about anything—there's no judgment here"
            />
            <StepCard
              number="3"
              title="Reflect and understand"
              description="Gain insights and clarity through supportive dialogue"
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-10 text-center">
            <div className="w-12 h-12 bg-[#EFE8DE] rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-6 h-6 text-[#7A6A58]" />
            </div>
            <h2 className="text-2xl font-semibold text-[#2F2A25] mb-4">
              Important to know
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              This is a supportive space for reflection, but it&apos;s not a replacement for professional mental health care. 
              This AI cannot diagnose conditions or provide medical advice. 
              If you&apos;re experiencing a crisis, please reach out to a professional immediately.
            </p>
            <div className="mt-8 pt-8 border-t border-neutral-200">
              <p className="text-sm text-neutral-500">
                <strong className="text-[#7A6A58]">In crisis?</strong> Call 988 (US) • Text HELLO to 741741 • Contact emergency services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#2F2A25] mb-6">
            Ready to begin?
          </h2>
          <p className="text-base text-neutral-600 mb-10">
            Take a moment for yourself
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="px-6 py-3 rounded-xl bg-[#7A6A58] text-white font-medium hover:bg-[#645747] transition-colors">
                Start a Conversation
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/chat">
              <button className="px-6 py-3 rounded-xl bg-[#7A6A58] text-white font-medium hover:bg-[#645747] transition-colors">
                Continue
              </button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#7A6A58] flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-medium text-[#2F2A25]">Therapist</span>
          </div>
          <p className="text-sm text-neutral-500">
            A calm space for reflection and understanding
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
      <div className="w-10 h-10 rounded-full bg-[#EFE8DE] flex items-center justify-center mx-auto mb-6 text-[#7A6A58]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#2F2A25] mb-3">{title}</h3>
      <p className="text-base text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { 
  number: string; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <div className="w-8 h-8 bg-[#7A6A58] rounded-full flex items-center justify-center text-white font-semibold text-sm mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-[#2F2A25] mb-2">{title}</h3>
      <p className="text-base text-neutral-600">{description}</p>
    </div>
  );
}
