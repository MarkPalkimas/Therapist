"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STARTER_PROMPTS = [
  { text: "I feel overwhelmed today", emoji: "😔" },
  { text: "I need help processing something", emoji: "💭" },
  { text: "I want to reflect on my day", emoji: "✨" },
  { text: "I feel anxious about something", emoji: "😰" },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [input]);

  const handleSubmit = async (messageText?: string) => {
    const userMessage = messageText || input.trim();
    
    if (!userMessage || isLoading) return;

    setInput("");
    setError(null);

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();
      
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleStarterPrompt = (prompt: string) => {
    handleSubmit(prompt);
  };

  return (
    <div className="flex-1 flex flex-col h-full relative bg-[rgb(var(--background))] transition-colors duration-300">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-[rgb(var(--primary))] rounded-3xl flex items-center justify-center shadow-lg animate-scale-in">
                  <Sparkles className="w-10 h-10 text-[rgb(var(--primary-foreground))]" />
                </div>
                <h2 className="text-3xl font-bold text-[rgb(var(--foreground))]">How are you feeling today?</h2>
                <p className="text-[rgb(var(--muted-foreground))] text-lg max-w-md">
                  Share what&apos;s on your mind, or choose a prompt below to get started
                </p>
              </div>
              
              {/* Starter Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {STARTER_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleStarterPrompt(prompt.text)}
                    className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] px-6 py-5 rounded-2xl text-left hover:bg-[rgb(var(--secondary))] hover:shadow-md transition-all group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <span className="text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--foreground))] font-medium">
                        {prompt.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-slide-in-right`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div
                    className={`max-w-[85%] rounded-3xl px-6 py-4 shadow-sm ${
                      message.role === "user"
                        ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                        : "bg-[rgb(var(--card))] text-[rgb(var(--foreground))] border border-[rgb(var(--border))]"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-3xl px-6 py-4 flex items-center gap-3 shadow-sm">
                    <Loader2 className="w-5 h-5 text-[rgb(var(--primary))] animate-spin" />
                    <span className="text-[rgb(var(--muted-foreground))] text-sm font-medium">Thinking...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-center animate-fade-in">
                  <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-4 text-red-600 text-sm font-medium">
                    {error}
                  </div>
                </div>
              )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-6 shadow-sm">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end bg-[rgb(var(--background))] rounded-3xl p-3 shadow-sm border border-[rgb(var(--border))] focus-within:border-[rgb(var(--primary))] focus-within:shadow-md transition-all">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share what's on your mind..."
              rows={1}
              className="flex-1 bg-transparent text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] px-3 py-2 resize-none focus:outline-none text-[15px]"
              style={{ maxHeight: '150px' }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 bg-[rgb(var(--primary))] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-[rgb(var(--primary-foreground))] rounded-2xl p-3 transition-all shadow-sm hover:shadow-md hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-[rgb(var(--muted-foreground))] mt-3 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
}
