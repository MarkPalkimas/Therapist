import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Sparkles, Shield, Clock, Heart, ArrowRight, MessageCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-stone-600 to-stone-700 flex items-center justify-center">
              <Heart className="w-4 h-4 text-amber-50" />
            </div>
            <span className="text-lg font-semibold text-stone-800">Therapist</span>
          </div>
          <div className="flex gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-5 py-2 text-stone-600 hover:text-stone-800 transition-colors text-sm font-medium">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-2.5 bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-amber-50 rounded-xl transition-all text-sm font-medium shadow-lg shadow-stone-700/20 hover-lift">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/chat">
                <button className="px-6 py-2.5 bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-amber-50 rounded-xl transition-all text-sm font-medium shadow-lg shadow-stone-700/20 hover-lift">
                  Open App
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/15 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-stone-300/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-200/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-stone-200/50 mb-8 animate-slide-up">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-stone-600 font-medium">A quiet space for reflection</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-stone-900 mb-6 leading-tight tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A calm place to
            <br />
            <span className="gradient-text">talk things through</span>
          </h1>
          
          <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Private conversations with an AI companion designed to help you process emotions, reflect deeply, and find clarity in your thoughts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="px-8 py-4 bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-amber-50 rounded-xl transition-all text-base font-semibold shadow-xl shadow-stone-700/25 hover-lift flex items-center gap-2">
                  Start a Conversation
                  <ArrowRight className="w-5 h-5" />
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/chat">
                <button className="px-8 py-4 bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-amber-50 rounded-xl transition-all text-base font-semibold shadow-xl shadow-stone-700/25 hover-lift flex items-center gap-2">
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </SignedIn>
            <button className="px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-stone-700 rounded-xl transition-all text-base font-semibold border border-stone-200/50 hover-lift">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Why reflection helps</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              A safe, supportive space designed with your wellbeing in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Private & Safe"
              description="Your conversations are completely private. A secure space just for you."
              gradient="from-amber-600 to-orange-600"
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="Always Here"
              description="Available whenever you need to talk. No appointments, no waiting."
              gradient="from-stone-600 to-stone-700"
            />
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="Thoughtful Listening"
              description="Designed to help you process emotions and find clarity through reflection."
              gradient="from-amber-700 to-amber-800"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-50/30 to-stone-50/50 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">How it works</h2>
            <p className="text-lg text-stone-600">Simple, supportive, designed for you</p>
          </div>
          
          <div className="space-y-8">
            <StepCard
              number="1"
              title="Create your space"
              description="Sign up in seconds and enter your private reflection space"
            />
            <StepCard
              number="2"
              title="Share what's on your mind"
              description="Talk about anything, or choose from thoughtful prompts to get started"
            />
            <StepCard
              number="3"
              title="Reflect and find clarity"
              description="Process emotions, gain insights, and understand yourself better through supportive dialogue"
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-12 text-center soft-shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Important to know
            </h2>
            <p className="text-stone-600 leading-relaxed max-w-2xl mx-auto">
              This is a supportive space for reflection, but it&apos;s not a replacement for professional mental health care. 
              This AI cannot diagnose conditions or provide medical advice. 
              If you&apos;re experiencing a crisis, please reach out to a professional immediately.
            </p>
            <div className="mt-8 pt-8 border-t border-stone-200">
              <p className="text-sm text-stone-500">
                <strong className="text-stone-700">In crisis?</strong> Call 988 (US) • Text HELLO to 741741 • Contact emergency services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-100/40 via-stone-100/30 to-orange-100/40"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-stone-900 mb-6">
            Ready to begin?
          </h2>
          <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto">
            Take a moment for yourself. Start your journey toward clarity and understanding.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="px-10 py-5 bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-amber-50 rounded-xl transition-all text-lg font-semibold shadow-2xl shadow-stone-700/25 hover-lift">
                Start Your First Conversation
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/chat">
              <button className="px-10 py-5 bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-amber-50 rounded-xl transition-all text-lg font-semibold shadow-2xl shadow-stone-700/25 hover-lift">
                Continue Your Journey
              </button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-stone-200/50 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-stone-600 to-stone-700 flex items-center justify-center">
              <Heart className="w-4 h-4 text-amber-50" />
            </div>
            <span className="text-lg font-semibold text-stone-900">Therapist</span>
          </div>
          <p className="text-sm text-stone-500">
            © 2026 Therapist AI. A calm space for reflection and understanding.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  gradient: string;
}) {
  return (
    <div className="glass rounded-2xl p-8 hover-lift transition-smooth group">
      <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-stone-900 mb-3">{title}</h3>
      <p className="text-stone-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { 
  number: string; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-stone-700 to-stone-800 rounded-2xl flex items-center justify-center text-amber-50 font-bold text-xl shadow-lg shadow-stone-700/20 group-hover:scale-110 transition-transform">
        {number}
      </div>
      <div className="flex-1 glass rounded-2xl p-6 hover-lift transition-smooth">
        <h3 className="text-xl font-semibold text-stone-900 mb-2">{title}</h3>
        <p className="text-stone-600">{description}</p>
      </div>
    </div>
  );
}
