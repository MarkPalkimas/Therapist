# Deployment Guide

## Prerequisites

1. **GitHub Repository**: https://github.com/MarkPalkimas/Therapist
2. **Vercel Account**: Connected to your GitHub
3. **Clerk Account**: Set up at https://clerk.com
4. **OpenAI API Key**: From https://platform.openai.com

## Step 1: Configure Clerk

1. Go to https://dashboard.clerk.com
2. Create a new application (or use existing)
3. Get your keys from the API Keys section:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

## Step 2: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create a new secret key
3. Copy the key (starts with `sk-`)

## Step 3: Push to GitHub

```bash
cd Therapist
git add .
git commit -m "Production-ready Therapist AI application"
git branch -M main
git remote add origin https://github.com/MarkPalkimas/Therapist.git
git push -u origin main
```

## Step 4: Deploy to Vercel

### Option A: Vercel Dashboard

1. Go to https://vercel.com/markpalkimas-projects
2. Click "Add New Project"
3. Import `MarkPalkimas/Therapist` from GitHub
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `pnpm build` (or leave default)
   - **Output Directory**: Leave default

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   OPENAI_API_KEY=sk-...
   ```

6. Click "Deploy"

### Option B: Vercel CLI

```bash
cd frontend
npm i -g vercel
vercel login
vercel --prod
```

When prompted, add environment variables.

## Step 5: Configure Clerk for Production

1. Go back to Clerk Dashboard
2. Navigate to your application
3. Go to "Domains" section
4. Add your Vercel domain: `therapist-markpalkimas.vercel.app`
5. Update allowed redirect URLs if needed

## Step 6: Verify Deployment

1. Visit: https://therapist-markpalkimas.vercel.app
2. Test sign up flow
3. Test sign in flow
4. Test chat functionality
5. Verify all environment variables are working

## Troubleshooting

### Build Fails

- Check that root directory is set to `frontend`
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Authentication Not Working

- Verify Clerk environment variables are set correctly
- Check that domain is added in Clerk dashboard
- Ensure middleware.ts is present

### Chat API Errors

- Verify `OPENAI_API_KEY` is set in Vercel
- Check API route logs in Vercel dashboard
- Ensure OpenAI API key has credits

### Environment Variables Not Loading

- Environment variables must be set in Vercel dashboard
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)

## Production Checklist

- [ ] All environment variables configured
- [ ] Clerk domain added and verified
- [ ] OpenAI API key has sufficient credits
- [ ] Landing page loads correctly
- [ ] Sign up/sign in works
- [ ] Chat interface functional
- [ ] Mobile responsive
- [ ] Error handling works
- [ ] Security headers configured
- [ ] Analytics set up (optional)

## Monitoring

- **Vercel Dashboard**: Monitor deployments, logs, and analytics
- **Clerk Dashboard**: Monitor authentication events
- **OpenAI Dashboard**: Monitor API usage and costs

## Cost Estimates

- **Vercel**: Free tier (Hobby) should be sufficient for moderate traffic
- **Clerk**: Free tier includes 10,000 MAUs
- **OpenAI**: ~$0.15 per 1M tokens (GPT-4o-mini)

## Support

For issues:
1. Check Vercel deployment logs
2. Check browser console for client errors
3. Review Clerk dashboard for auth issues
4. Verify OpenAI API status
