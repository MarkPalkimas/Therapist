"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Heart } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STARTER_PROMPTS = [
  "I feel overwhelmed",
  "I need help thinking something through",
  "I want to reflect on my day",
  "I feel anxious",
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
    <div className="flex-1 flex flex-col h-full relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-10 animate-fade-in">
              <div className="text-center space-y-4 max-w-xl">
                <div className="w-20 h-20 mx-auto bg-[#7A6A58] rounded-3xl flex items-center justify-center shadow-sm">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-semibold text-[#2F2A25]">
                  What&apos;s been on your mind today?
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  This is a safe space. Share whatever feels right.
                </p>
              </div>
              
              {/* Starter Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {STARTER_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleStarterPrompt(prompt)}
                    className="bg-white rounded-xl shadow-sm border border-neutral-200 px-6 py-5 text-left hover:shadow-md transition-all"
                  >
                    <span className="text-[#2F2A25] font-medium">
                      {prompt}
                    </span>
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
                  } animate-slide-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div
                    className={`max-w-[85%] ${
                      message.role === "user"
                        ? "message-user"
                        : "message-assistant"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white rounded-xl shadow-sm border border-neutral-200 px-6 py-4 flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-[#7A6A58] animate-spin" />
                    <span className="text-[#7A6A58] text-sm font-medium">Listening...</span>
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
      <div className="border-t border-neutral-200 bg-white/80 backdrop-blur-sm px-6 py-6">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end bg-white rounded-xl shadow-sm border border-neutral-200 p-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share what's on your mind..."
              rows={1}
              className="flex-1 bg-transparent text-[#2F2A25] placeholder-neutral-500 px-3 py-2 resize-none focus:outline-none"
              style={{ maxHeight: '150px' }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 bg-[#7A6A58] hover:bg-[#645747] disabled:bg-neutral-400 disabled:cursor-not-allowed text-white rounded-xl p-3 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-neutral-500 mt-3 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
}
