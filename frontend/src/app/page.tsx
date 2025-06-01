// Therapist/frontend/src/app/page.tsx

import { Card } from "../card";
import ChatWindow from "./ChatWindow";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <Card className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            🗣️ Therapist AI
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Your confidential AI counselor—always here to listen.
          </p>
        </header>

        {/* Real Chat Window */}
        <ChatWindow />

        {/* Footer */}
        <footer className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          Built with Next.js & TailwindCSS
        </footer>
      </Card>
    </div>
  );
}
