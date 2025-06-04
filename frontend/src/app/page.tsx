'use client';

import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';
import ChatWindow from './ChatWindow';

export default function Page() {
  const { userId, isLoaded } = useAuth();
  const [chatLog, setChatLog] = useState<string[]>([]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Therapist Chat</h1>
      <ChatWindow userId={userId} chatLog={chatLog} setChatLog={setChatLog} />
    </main>
  );
}
