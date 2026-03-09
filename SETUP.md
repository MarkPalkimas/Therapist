# Complete Setup Guide

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Git installed
- GitHub account
- Vercel account (free tier)
- Clerk account (free tier)
- OpenAI API account with credits

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/MarkPalkimas/Therapist.git
cd Therapist/frontend

# Install dependencies
pnpm install
```

## Step 2: Set Up Clerk Authentication

1. Go to https://dashboard.clerk.com
2. Click "Add application"
3. Name it "Therapist AI"
4. Choose authentication methods (Email, Google, etc.)
5. Click "Create application"

6. Copy your API keys:
   - Go to "API Keys" in the sidebar
   - Copy `Publishable key` (starts with `pk_test_` or `pk_live_`)
   - Copy `Secret key` (starts with `sk_test_` or `sk_live_`)

## Step 3: Get OpenAI API Key

1. Go to https://platform.openai.com
2. Sign in or create an account
3. Go to https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Name it "Therapist AI"
6. Copy the key (starts with `sk-`)
7. Add credits to your account if needed

## Step 4: Configure Environment Variables

Create a `.env.local` file in the `frontend` directory:

```bash
cd frontend
touch .env.local
```

Add the following content (replace with your actual keys):

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_here

# OpenAI API
OPENAI_API_KEY=sk-your_actual_openai_key_here
```

**Important**: Never commit `.env.local` to Git. It's already in `.gitignore`.

## Step 5: Run Locally

```bash
# Make sure you're in the frontend directory
cd frontend

# Start the development server
pnpm dev
```

Open http://localhost:3000 in your browser.

### Test the Application

1. Click "Get Started" or "Sign Up"
2. Create an account (use a real email or test email)
3. Sign in
4. You should be redirected to `/chat`
5. Send a message to test the AI

## Step 6: Configure Clerk for Local Development

1. Go back to Clerk Dashboard
2. Navigate to your application
3. Go to "Domains" in the sidebar
4. Ensure `localhost:3000` is in the allowed domains
5. Go to "Paths" and verify redirect URLs:
   - Sign-in URL: `/`
   - Sign-up URL: `/`
   - After sign-in URL: `/chat`
   - After sign-up URL: `/chat`

## Step 7: Push to GitHub

```bash
# Navigate to project root
cd ..

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Production-ready Therapist AI"

# Add remote
git remote add origin https://github.com/MarkPalkimas/Therapist.git

# Push to main branch
git branch -M main
git push -u origin main
```

## Step 8: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import `MarkPalkimas/Therapist`
5. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `pnpm build` (or leave default)
   - **Output Directory**: Leave default (`.next`)
   - **Install Command**: `pnpm install`

6. Add Environment Variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   OPENAI_API_KEY=sk-...
   ```

7. Click "Deploy"

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

## Step 9: Configure Clerk for Production

1. Go to Clerk Dashboard
2. Navigate to your application
3. Go to "Domains"
4. Add your Vercel domain: `therapist-markpalkimas.vercel.app`
5. Update redirect URLs if needed

## Step 10: Verify Production Deployment

1. Visit your Vercel URL
2. Test sign up flow
3. Test sign in flow
4. Test chat functionality
5. Check browser console for errors
6. Verify mobile responsiveness

## Troubleshooting

### Build Fails on Vercel

**Issue**: Build fails with "Module not found" or dependency errors

**Solution**:
- Verify `package.json` is correct
- Check that root directory is set to `frontend`
- Review build logs for specific errors

### Authentication Not Working

**Issue**: Clerk authentication fails or redirects incorrectly

**Solution**:
- Verify environment variables are set in Vercel
- Check that production domain is added in Clerk dashboard
- Ensure `middleware.ts` is present and correct
- Check Clerk dashboard for error logs

### Chat API Returns 500 Error

**Issue**: Chat endpoint fails with server error

**Solution**:
- Verify `OPENAI_API_KEY` is set correctly in Vercel
- Check OpenAI API key has credits
- Review Vercel function logs
- Test API key locally first

### Styles Not Loading

**Issue**: Tailwind styles not applied

**Solution**:
- Verify `tailwind.config.ts` is correct
- Check `postcss.config.mjs` has `@tailwindcss/postcss`
- Clear `.next` cache and rebuild

### Environment Variables Not Loading

**Issue**: App can't read environment variables

**Solution**:
- Environment variables must be set in Vercel dashboard
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)
- Client-side variables must start with `NEXT_PUBLIC_`

## Development Tips

### Hot Reload

The dev server supports hot reload. Changes to files will automatically refresh the browser.

### Type Checking

```bash
# Run TypeScript type checking
pnpm tsc --noEmit
```

### Linting

```bash
# Run ESLint
pnpm lint
```

### Build Locally

```bash
# Test production build locally
pnpm build
pnpm start
```

## Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] No API keys committed to Git
- [ ] Clerk secret key is server-side only
- [ ] OpenAI API key is server-side only
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Clerk middleware protecting `/chat` route
- [ ] API routes validate authentication

## Next Steps

After successful deployment:

1. Set up custom domain (optional)
2. Configure analytics (Vercel Analytics)
3. Set up error monitoring (Sentry, etc.)
4. Add rate limiting for API routes
5. Implement conversation persistence
6. Add user feedback mechanism

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Clerk Docs**: https://clerk.com/docs
- **OpenAI Docs**: https://platform.openai.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

## Getting Help

If you encounter issues:

1. Check Vercel deployment logs
2. Check browser console for client errors
3. Review Clerk dashboard for auth issues
4. Verify OpenAI API status
5. Check GitHub Issues for similar problems
