import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import type { NextRequest } from 'next/server'; // ✅ Import NextRequest

export async function POST(req: NextRequest) { // ✅ Use NextRequest here
  const { userId } = auth(req); // ✅ Pass the full NextRequest to auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { message } = await req.json();

  const res = await fetch(`${process.env.BACKEND_URL || 'http://localhost:4000'}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, message }),
  });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
