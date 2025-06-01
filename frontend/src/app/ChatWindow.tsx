// Therapist/frontend/src/app/ChatWindow.tsx
"use client";

import { useState } from "react";

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const trimmed = input.trim();
    setChatLog((prev) => [...prev, `You: ${trimmed}`]);
    setInput("");
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        // Read the response body (could be JSON or text)
        let body = "";
        try {
          const json = await res.json();
          body = json.error || JSON.stringify(json);
        } catch {
          body = await res.text();
        }
        const errMsg = `Error ${res.status}: ${body}`;
        setError(errMsg);
        setChatLog((prev) => [...prev, errMsg]);
        return;
      }

      // If 200 OK, you can parse a JSON reply in the future.
      // For now, just echo a placeholder:
      setChatLog((prev) => [...prev, `Bot: (no reply logic yet)`]);
    } catch (e: any) {
      const errMsg = `Fetch failed: ${e.message}`;
      setError(errMsg);
      setChatLog((prev) => [...prev, errMsg]);
    }
  };

  return (
    <div className="flex flex-col space-y-2 mb-6">
      {/* Messages area */}
      <div className="flex-1 h-48 overflow-auto bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
        {chatLog.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">
            Start typing above and hit Send…
          </p>
        ) : (
          chatLog.map((line, idx) => (
            <p
              key={idx}
              className={`mb-1 text-sm ${
                line.startsWith("Error")
                  ? "text-red-500"
                  : line.startsWith("You:")
                  ? "text-gray-800 dark:text-gray-100 font-medium"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {line}
            </p>
          ))
        )}
        {error && <p className="text-xs text-red-500 mt-1">Last error: {error}</p>}
      </div>

      {/* Input + Send */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
