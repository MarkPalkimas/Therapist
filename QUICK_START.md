# Quick Start Guide

Get Therapist AI running in 5 minutes.

## 1. Install Dependencies

```bash
cd frontend
pnpm install
```

## 2. Get Your API Keys

### Clerk (Authentication)
1. Go to https://dashboard.clerk.com
2. Create application → Copy keys

### OpenAI (AI)
1. Go to https://platform.openai.com/api-keys
2. Create key → Copy key

## 3. Configure Environment

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key
OPENAI_API_KEY=sk-your_key
```

## 4. Run Locally

```bash
pnpm dev
```

Open http://localhost:3000

## 5. Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push

# Deploy
# Go to vercel.com → Import project → Add env vars → Deploy
```

Done! 🎉

For detailed instructions, see [SETUP.md](SETUP.md)
