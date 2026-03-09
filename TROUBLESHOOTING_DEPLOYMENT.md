# Troubleshooting Deployment Error

## Error: "Application error: a client-side exception has occurred"

This error typically means Clerk is not configured for your production domain.

## Solution Steps

### Step 1: Add Domain to Clerk

1. Go to: https://dashboard.clerk.com
2. Sign in and select your application
3. Click **"Domains"** in the left sidebar
4. Click **"Add domain"** button
5. Enter your Vercel domain: `therapist-qw8hzlurd-markpalkimas-projects.vercel.app`
6. Click **"Add"** or **"Save"**

### Step 2: Verify Environment Variables

Go to: https://vercel.com/markpalkimas-projects/therapist/settings/environment-variables

Make sure these three variables are set:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... (or pk_live_...)
CLERK_SECRET_KEY=sk_test_... (or sk_live_...)
OPENAI_API_KEY=sk-...
```

### Step 3: Check Clerk Keys Match

1. Go to Clerk Dashboard → API Keys
2. Copy the **Publishable key**
3. Compare it with the value in Vercel environment variables
4. They must match exactly

### Step 4: Redeploy

After making changes:
1. Go to Vercel dashboard
2. Find your latest deployment
3. Click the "..." menu
4. Click **"Redeploy"**
5. Wait for deployment to complete

## Common Issues

### Issue 1: Invalid Publishable Key

**Error in console**: `@clerk/clerk-react: The publishableKey passed to Clerk is invalid`

**Solution**:
- Verify the key in Vercel matches Clerk dashboard
- Make sure there are no extra spaces
- Ensure you're using the correct key (test vs production)

### Issue 2: Domain Not Allowed

**Error in console**: `Domain not allowed` or CORS error

**Solution**:
- Add your Vercel domain in Clerk dashboard
- Include both:
  - `therapist-qw8hzlurd-markpalkimas-projects.vercel.app` (preview)
  - Your production domain if you have one

### Issue 3: Test Keys in Production

**Error**: Keys work locally but not in production

**Solution**:
- If your Vercel deployment is in "Production" environment
- You might need production keys (`pk_live_...` and `sk_live_...`)
- Get them from Clerk dashboard → Switch to Production mode

### Issue 4: Environment Variables Not Loading

**Error**: App loads but authentication doesn't work

**Solution**:
1. Verify variables are set in Vercel
2. Check they're enabled for "Production" environment
3. Redeploy after adding variables

## Debugging Steps

### 1. Check Browser Console

Open your deployed site and press F12:

```
1. Go to Console tab
2. Look for red error messages
3. Common errors:
   - Clerk initialization error
   - Invalid publishable key
   - Network errors
```

### 2. Check Network Tab

```
1. Open Network tab in browser DevTools
2. Reload the page
3. Look for failed requests (red)
4. Check if API calls are being made
```

### 3. Test API Route Directly

Visit: `https://therapist-qw8hzlurd-markpalkimas-projects.vercel.app/api/chat`

**Expected**: 401 Unauthorized (this is correct - means API is working)
**If you see**: 500 error or other issue, check Vercel function logs

### 4. Check Vercel Function Logs

1. Go to Vercel dashboard
2. Click on your deployment
3. Click "Functions" tab
4. Look for error logs

## Quick Checklist

- [ ] Clerk domain added (your Vercel URL)
- [ ] Environment variables set in Vercel
- [ ] Clerk keys match between dashboard and Vercel
- [ ] Redeployed after making changes
- [ ] Browser console checked for specific error
- [ ] Using correct keys (test vs production)

## Still Not Working?

If you've done all the above and it still doesn't work:

1. **Share the browser console error** - The exact error message
2. **Check Clerk dashboard** - Any error messages there?
3. **Try test keys first** - Use `pk_test_...` keys for initial testing
4. **Clear browser cache** - Sometimes helps with Clerk issues

## Alternative: Use Test Environment First

If production is giving issues, try the preview environment:

1. In Clerk, make sure test keys are being used
2. Add `*.vercel.app` as an allowed domain pattern
3. Test with preview deployments first
4. Once working, switch to production keys

## Contact Support

If nothing works:
- **Clerk Support**: https://clerk.com/support
- **Vercel Support**: https://vercel.com/support
- **Check Clerk Status**: https://status.clerk.com

---

**Most Common Fix**: Add your Vercel domain to Clerk dashboard → Domains section
