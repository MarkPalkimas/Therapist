# 🚀 Deploy Now - Step by Step

Follow these exact commands to deploy your application.

## Step 1: Verify You Have Everything

```bash
# Check you're in the project root
pwd
# Should show: /path/to/Therapist

# Check frontend directory exists
ls frontend/
# Should show: src, package.json, etc.

# Check build works
cd frontend && pnpm build && cd ..
# Should complete without errors
```

## Step 2: Get Your API Keys

### Clerk Keys

1. Go to: https://dashboard.clerk.com
2. Sign in or create account
3. Click "Add application"
4. Name it "Therapist AI"
5. Click "Create application"
6. Copy these keys:
   - `Publishable key` (starts with `pk_test_` or `pk_live_`)
   - `Secret key` (starts with `sk_test_` or `sk_live_`)

### OpenAI Key

1. Go to: https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Name it "Therapist AI"
5. Copy the key (starts with `sk-`)
6. Add credits if needed: https://platform.openai.com/account/billing

## Step 3: Test Locally First

```bash
# Create environment file
cd frontend
cat > .env.local << 'EOF'
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
OPENAI_API_KEY=your_openai_key_here
EOF

# Edit the file with your real keys
nano .env.local
# Or use your preferred editor

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open http://localhost:3000 and test:
- Sign up works
- Sign in works
- Chat works
- AI responds

Press `Ctrl+C` to stop the server.

## Step 4: Push to GitHub

```bash
# Go back to project root
cd ..

# Check Git status
git status

# If Git is not initialized:
git init

# Add all files
git add .

# Check what will be committed (verify .env.local is NOT listed)
git status

# Commit
git commit -m "Production-ready Therapist AI application"

# Set main branch
git branch -M main

# Add GitHub remote (if not already added)
git remote add origin https://github.com/MarkPalkimas/Therapist.git

# If remote already exists, update it:
# git remote set-url origin https://github.com/MarkPalkimas/Therapist.git

# Push to GitHub
git push -u origin main

# If you need to force push (overwrites remote):
# git push -f origin main
```

## Step 5: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Find and import: `MarkPalkimas/Therapist`
5. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
   - **Build Command**: Leave default
   - **Output Directory**: Leave default

6. Click "Environment Variables"
7. Add these three variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Value: `pk_test_...` (your Clerk publishable key)

   **Variable 2:**
   - Name: `CLERK_SECRET_KEY`
   - Value: `sk_test_...` (your Clerk secret key)

   **Variable 3:**
   - Name: `OPENAI_API_KEY`
   - Value: `sk-...` (your OpenAI key)

8. Click "Deploy"
9. Wait 2-3 minutes for build to complete

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod

# Follow prompts:
# - Link to existing project? No
# - Project name: therapist-ai
# - Directory: ./ (current directory)
# - Override settings? No

# Add environment variables when prompted
```

## Step 6: Configure Clerk for Production

1. Go to: https://dashboard.clerk.com
2. Select your "Therapist AI" application
3. Click "Domains" in sidebar
4. Click "Add domain"
5. Enter your Vercel URL (e.g., `therapist-markpalkimas.vercel.app`)
6. Click "Add domain"

## Step 7: Test Production

1. Visit your Vercel URL (shown in Vercel dashboard)
2. Test the application:
   - Landing page loads
   - Click "Get Started"
   - Sign up with a test email
   - Verify email (check inbox)
   - Sign in
   - Should redirect to `/chat`
   - Send a message
   - AI should respond

## Step 8: Verify Everything Works

```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Check domains
vercel domains ls
```

## Troubleshooting

### Build Fails

```bash
# Check build locally first
cd frontend
pnpm build

# If it fails locally, fix errors first
# Then push and redeploy
```

### Authentication Doesn't Work

1. Verify Clerk keys in Vercel dashboard
2. Check domain is added in Clerk dashboard
3. Try signing out and back in
4. Check browser console for errors

### Chat API Fails

1. Verify OpenAI key in Vercel dashboard
2. Check OpenAI account has credits
3. View Vercel function logs
4. Test API key locally first

### Need to Update Environment Variables

```bash
# Using Vercel CLI
vercel env add VARIABLE_NAME

# Or update in Vercel dashboard:
# Project Settings → Environment Variables
```

## Success! 🎉

Your application is now live at:
`https://therapist-markpalkimas.vercel.app`

## Next Steps

1. **Custom Domain** (optional)
   ```bash
   vercel domains add yourdomain.com
   ```

2. **Enable Analytics**
   - Go to Vercel dashboard
   - Enable Vercel Analytics

3. **Monitor Usage**
   - Clerk: https://dashboard.clerk.com
   - OpenAI: https://platform.openai.com/usage
   - Vercel: https://vercel.com/dashboard

## Quick Commands Reference

```bash
# Redeploy
git add .
git commit -m "Update"
git push

# View logs
vercel logs

# Check status
vercel ls

# Open in browser
vercel open

# View environment variables
vercel env ls
```

## Support

If you get stuck:

1. Check `DEPLOYMENT_CHECKLIST.md`
2. Review `SETUP.md` troubleshooting section
3. Check Vercel deployment logs
4. Review browser console errors
5. Verify all environment variables

## Emergency Rollback

If something breaks:

1. Go to Vercel dashboard
2. Click on your project
3. Go to "Deployments"
4. Find previous working deployment
5. Click "..." → "Promote to Production"

---

**You're ready to deploy!** 🚀

Start with Step 1 and work through each step carefully.
