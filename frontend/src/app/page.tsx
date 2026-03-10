import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { MessageCircle, Shield, Clock, Heart } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(250,248,245)] to-[rgb(248,244,238)]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[rgb(255,253,250)]/80 backdrop-blur-sm border-b border-[rgb(230,224,216)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[rgb(139,116,95)] flex items-center justify-center">
              <Heart className="w-5 h-5 text-[rgb(255,253,250)]" />
            </div>
            <span className="text-xl font-medium text-[rgb(62,56,48)]">Therapist</span>
          </div>
          <div className="flex gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-5 py-2.5 text-[rgb(139,116,95)] hover:text-[rgb(168,145,122)] transition-colors font-medium">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="soft-button">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/chat">
                <button className="soft-button">
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
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-semibold text-[rgb(62,56,48)] mb-6 leading-tight">
              A quiet place to talk
              <br />
              things through
            </h1>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-xl text-[rgb(139,116,95)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Private AI conversations designed to help you slow down, reflect, and make sense of what you&apos;re feeling.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="soft-button text-lg px-8 py-4">
                  Start a Conversation
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/chat">
                <button className="soft-button text-lg px-8 py-4">
                  Continue
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[rgb(62,56,48)] mb-4">
              Why reflection helps
            </h2>
            <p className="text-lg text-[rgb(139,116,95)] max-w-2xl mx-auto">
              A safe space designed with your wellbeing in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-7 h-7" />}
              title="Private & Safe"
              description="Your conversations are completely private. A secure space just for you."
            />
            <FeatureCard
              icon={<Clock className="w-7 h-7" />}
              title="Always Here"
              description="Available whenever you need to talk. No appointments, no waiting."
            />
            <FeatureCard
              icon={<MessageCircle className="w-7 h-7" />}
              title="Thoughtful Listening"
              description="Designed to help you process emotions and find clarity through reflection."
            />
          </div>
        </div>
      </section>

      {/* How Conversations Work */}
      <section className="py-20 px-6 bg-[rgb(248,244,238)]/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[rgb(62,56,48)] mb-4">
              How conversations work
            </h2>
          </div>
          
          <div className="space-y-6">
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
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="cozy-card rounded-3xl p-10 text-center">
            <div className="w-16 h-16 bg-[rgb(184,134,98)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-[rgb(255,253,250)]" />
            </div>
            <h2 className="text-2xl font-semibold text-[rgb(62,56,48)] mb-4">
              Important to know
            </h2>
            <p className="text-[rgb(139,116,95)] leading-relaxed">
              This is a supportive space for reflection, but it&apos;s not a replacement for professional mental health care. 
              This AI cannot diagnose conditions or provide medical advice. 
              If you&apos;re experiencing a crisis, please reach out to a professional immediately.
            </p>
            <div className="mt-8 pt-8 border-t border-[rgb(230,224,216)]">
              <p className="text-sm text-[rgb(156,148,138)]">
                <strong className="text-[rgb(139,116,95)]">In crisis?</strong> Call 988 (US) • Text HELLO to 741741 • Contact emergency services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-[rgb(62,56,48)] mb-6">
            Ready to begin?
          </h2>
          <p className="text-xl text-[rgb(139,116,95)] mb-10">
            Take a moment for yourself
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="soft-button text-lg px-10 py-4">
                Start a Conversation
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/chat">
              <button className="soft-button text-lg px-10 py-4">
                Continue
              </button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[rgb(230,224,216)] bg-[rgb(255,253,250)]/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[rgb(139,116,95)] flex items-center justify-center">
              <Heart className="w-4 h-4 text-[rgb(255,253,250)]" />
            </div>
            <span className="text-lg font-medium text-[rgb(62,56,48)]">Therapist</span>
          </div>
          <p className="text-sm text-[rgb(156,148,138)]">
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
    <div className="cozy-card rounded-2xl p-8 text-center">
      <div className="w-14 h-14 bg-[rgb(248,244,238)] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[rgb(139,116,95)]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[rgb(62,56,48)] mb-3">{title}</h3>
      <p className="text-[rgb(139,116,95)] leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { 
  number: string; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-12 h-12 bg-[rgb(139,116,95)] rounded-2xl flex items-center justify-center text-[rgb(255,253,250)] font-semibold text-lg">
        {number}
      </div>
      <div className="flex-1 cozy-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-[rgb(62,56,48)] mb-2">{title}</h3>
        <p className="text-[rgb(139,116,95)]">{description}</p>
      </div>
    </div>
  );
}
