# Architecture Overview

## System Design

Therapist AI is a modern, secure full-stack application built with Next.js 15 App Router architecture.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│  - Landing Page (Public)                                 │
│  - Chat Interface (Protected)                            │
│  - Clerk Authentication UI                               │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTPS
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js Server (Vercel)                     │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Middleware (Clerk Auth)                       │    │
│  │  - Route protection                            │    │
│  │  - Session management                          │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Pages (Server Components)                     │    │
│  │  - / (Landing)                                 │    │
│  │  - /chat (Protected)                           │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  API Routes (Server-Side Only)                 │    │
│  │  - /api/chat                                   │    │
│  │    • Auth validation                           │    │
│  │    • OpenAI integration                        │    │
│  │    • Error handling                            │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          │
                          │ API Calls
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  External Services                       │
│                                                          │
│  ┌──────────────────┐      ┌──────────────────┐        │
│  │  Clerk Auth      │      │  OpenAI API      │        │
│  │  - User mgmt     │      │  - GPT-4o-mini   │        │
│  │  - Sessions      │      │  - Chat API      │        │
│  └──────────────────┘      └──────────────────┘        │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom React components
- **Icons**: Lucide React

### Backend
- **Runtime**: Next.js API Routes (Edge/Node.js)
- **Authentication**: Clerk
- **AI Integration**: OpenAI SDK

### Infrastructure
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network
- **Environment**: Serverless Functions

## Security Architecture

### Authentication Flow

1. User visits landing page (public)
2. User clicks "Sign Up" or "Sign In"
3. Clerk modal handles authentication
4. Session token stored in secure HTTP-only cookie
5. Middleware validates session on protected routes
6. API routes verify authentication before processing

### API Security

- All OpenAI calls are server-side only
- API keys never exposed to client
- Clerk authentication required for all chat endpoints
- Input validation on all requests
- Error messages sanitized (no stack traces to client)

### Data Flow

```
User Input → Client Component → API Route → Auth Check → OpenAI → Response → Client
```

## File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts          # Server-side chat API
│   │   ├── chat/
│   │   │   └── page.tsx              # Protected chat page
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout with Clerk
│   │   └── page.tsx                  # Landing page
│   └── components/
│       └── ChatInterface.tsx         # Main chat UI
├── middleware.ts                     # Clerk auth middleware
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies
```

## Component Architecture

### Server Components
- `app/page.tsx` - Landing page (dynamic)
- `app/chat/page.tsx` - Chat page (dynamic, protected)
- `app/layout.tsx` - Root layout with Clerk provider

### Client Components
- `ChatInterface.tsx` - Interactive chat UI with state management

### API Routes
- `app/api/chat/route.ts` - POST endpoint for chat messages

## State Management

- **Local State**: React useState for chat messages and UI state
- **Server State**: Clerk session management
- **No Global State**: Intentionally simple, no Redux/Zustand needed

## AI Integration

### System Prompt Design

The AI is configured with a comprehensive system prompt that:
- Defines empathetic, supportive behavior
- Sets clear boundaries (not a licensed therapist)
- Provides crisis intervention guidance
- Encourages professional help when appropriate

### Conversation Flow

1. User sends message
2. Client sends POST to `/api/chat` with message history
3. Server validates authentication
4. Server calls OpenAI with system prompt + conversation
5. Response streamed back to client
6. UI updates with assistant message

## Performance Optimizations

- Server Components for static content
- Dynamic rendering for authenticated pages
- Edge runtime for API routes (fast global response)
- Tailwind CSS for minimal CSS bundle
- Code splitting via Next.js automatic optimization

## Scalability Considerations

- Serverless architecture scales automatically
- Stateless API routes (no server-side session storage)
- CDN caching for static assets
- Database-ready (can add conversation persistence)

## Future Enhancements

### Potential Features
- Conversation history persistence (database)
- Mood tracking over time
- Journaling functionality
- Breathing exercises
- Daily reflection prompts
- Export conversation transcripts

### Technical Improvements
- Streaming responses (OpenAI streaming API)
- Rate limiting per user
- Analytics and monitoring
- A/B testing framework
- Internationalization (i18n)

## Deployment Architecture

```
GitHub Repository
       │
       │ Push
       ▼
Vercel Build System
       │
       │ Build & Deploy
       ▼
Vercel Edge Network
       │
       ├─── US East
       ├─── US West
       ├─── Europe
       └─── Asia Pacific
```

## Monitoring & Observability

- **Vercel Analytics**: Page views, performance metrics
- **Clerk Dashboard**: Authentication events, user activity
- **OpenAI Dashboard**: API usage, token consumption
- **Next.js Logs**: Server-side errors and warnings

## Cost Structure

- **Vercel**: Free tier (Hobby) - $0/month
- **Clerk**: Free tier - $0/month (up to 10K MAUs)
- **OpenAI**: Pay-per-use - ~$0.15 per 1M tokens (GPT-4o-mini)

Estimated cost for 1,000 conversations/month: ~$5-10
