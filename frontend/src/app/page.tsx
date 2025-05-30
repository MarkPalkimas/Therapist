"use client";
import { useState } from "react";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I’m MoodAI, your therapy companion. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setLoading(true);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const { reply } = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-background">
      <header className="flex w-full justify-between mb-8">
        <div className="font-bold text-2xl">MoodAI</div>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </header>
      <Card className="w-full max-w-xl flex flex-col gap-4 p-6 min-h-[60vh] shadow-2xl">
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-3 max-h-[60vh]">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl w-fit max-w-[85%] ${
                m.role === "user"
                  ? "self-end bg-primary text-background"
                  : "self-start bg-secondary"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="self-start text-muted-foreground text-sm animate-pulse">
              MoodAI is typing...
            </div>
          )}
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            className="flex-1 rounded-xl border border-muted px-4 py-2"
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className="bg-primary text-background px-4 py-2 rounded-xl disabled:opacity-60"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </Card>
    </main>
  );
}
