# 🚀 Deployment Checklist

Use this checklist to ensure a smooth deployment to production.

## Pre-Deployment

### 1. Environment Setup

- [ ] Clerk account created at https://dashboard.clerk.com
- [ ] Clerk application created
- [ ] Clerk API keys copied (publishable + secret)
- [ ] OpenAI account created at https://platform.openai.com
- [ ] OpenAI API key created
- [ ] OpenAI account has credits

### 2. Local Testing

- [ ] Dependencies installed (`pnpm install`)
- [ ] `.env.local` created with real keys
- [ ] Development server runs (`pnpm dev`)
- [ ] Landing page loads at http://localhost:3000
- [ ] Sign up flow works
- [ ] Sign in flow works
- [ ] Chat interface loads after sign in
- [ ] AI responds to messages
- [ ] No console errors
- [ ] Mobile responsive (test in DevTools)

### 3. Build Verification

- [ ] Production build succeeds (`pnpm build`)
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Build output shows all routes

### 4. Code Quality

- [ ] No hardcoded API keys in code
- [ ] `.env.local` is in `.gitignore`
- [ ] No sensitive data in Git history
- [ ] All console.logs removed or appropriate
- [ ] Error handling in place
- [ ] Loading states implemented

## GitHub Setup

### 5. Repository

- [ ] GitHub repository exists: `MarkPalkimas/Therapist`
- [ ] Local Git initialized
- [ ] All files added to Git
- [ ] Initial commit created
- [ ] Remote added
- [ ] Code pushed to GitHub
- [ ] Verify files on GitHub
- [ ] Verify `.env.local` NOT in repository

## Vercel Deployment

### 6. Vercel Project Setup

- [ ] Vercel account created/logged in
- [ ] GitHub connected to Vercel
- [ ] New project created in Vercel
- [ ] Repository imported: `MarkPalkimas/Therapist`
- [ ] Root directory set to: `frontend`
- [ ] Framework preset: Next.js
- [ ] Build command: `pnpm build` (or default)
- [ ] Output directory: `.next` (default)

### 7. Environment Variables in Vercel

Add these in Vercel project settings:

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` added
- [ ] `CLERK_SECRET_KEY` added
- [ ] `OPENAI_API_KEY` added
- [ ] All values are production keys (not test keys)
- [ ] No extra spaces in values
- [ ] Values saved

### 8. Deploy

- [ ] Click "Deploy" in Vercel
- [ ] Wait for build to complete
- [ ] Build succeeds (no errors)
- [ ] Deployment URL generated

## Post-Deployment

### 9. Clerk Production Configuration

- [ ] Go to Clerk Dashboard
- [ ] Navigate to your application
- [ ] Go to "Domains" section
- [ ] Add Vercel domain (e.g., `therapist-markpalkimas.vercel.app`)
- [ ] Verify domain is active
- [ ] Check "Paths" configuration:
  - [ ] Sign-in URL: `/`
  - [ ] Sign-up URL: `/`
  - [ ] After sign-in: `/chat`
  - [ ] After sign-up: `/chat`

### 10. Production Testing

- [ ] Visit production URL
- [ ] Landing page loads correctly
- [ ] Styles applied correctly
- [ ] Sign up flow works
- [ ] Sign in flow works
- [ ] Redirects to `/chat` after auth
- [ ] Chat interface loads
- [ ] Can send messages
- [ ] AI responds correctly
- [ ] User button works
- [ ] Sign out works
- [ ] Test on mobile device
- [ ] Test on different browsers

### 11. Performance & Security

- [ ] Check Vercel Analytics (if enabled)
- [ ] Verify HTTPS is enabled (automatic)
- [ ] Check response times
- [ ] Verify no console errors in production
- [ ] Check Network tab for failed requests
- [ ] Verify API routes are protected
- [ ] Test unauthenticated access to `/chat` (should redirect)

### 12. Monitoring Setup

- [ ] Vercel Analytics enabled (optional)
- [ ] Error tracking configured (optional)
- [ ] OpenAI usage monitoring set up
- [ ] Clerk dashboard bookmarked
- [ ] Vercel dashboard bookmarked

## Troubleshooting

### Build Fails

**Check:**
- Root directory is `frontend`
- All dependencies in `package.json`
- Environment variables set
- Build logs for specific errors

**Fix:**
- Review build logs in Vercel
- Test build locally first
- Check for missing dependencies

### Authentication Fails

**Check:**
- Clerk keys are correct
- Production domain added in Clerk
- Middleware.ts is present
- Redirect URLs configured

**Fix:**
- Verify keys in Vercel settings
- Add domain in Clerk dashboard
- Check Clerk dashboard logs

### Chat API Errors

**Check:**
- OpenAI API key is correct
- API key has credits
- Server logs in Vercel
- Network requests in browser

**Fix:**
- Verify OpenAI key in Vercel
- Add credits to OpenAI account
- Check Vercel function logs

### Styles Not Loading

**Check:**
- Tailwind config is correct
- PostCSS config has `@tailwindcss/postcss`
- Build completed successfully

**Fix:**
- Clear Vercel cache and redeploy
- Verify Tailwind setup locally

## Success Criteria

Your deployment is successful when:

✅ Landing page loads with correct styling
✅ Authentication flow works end-to-end
✅ Chat interface is accessible after sign in
✅ AI responds to messages correctly
✅ No console errors
✅ Mobile responsive
✅ All routes protected correctly
✅ Sign out works

## Post-Launch

### Optional Enhancements

- [ ] Set up custom domain
- [ ] Configure Vercel Analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Add rate limiting
- [ ] Implement conversation persistence
- [ ] Add user feedback mechanism
- [ ] Set up automated testing
- [ ] Configure CI/CD pipeline

### Maintenance

- [ ] Monitor OpenAI usage and costs
- [ ] Check Clerk MAU usage
- [ ] Review Vercel analytics
- [ ] Update dependencies regularly
- [ ] Monitor error logs
- [ ] Respond to user feedback

## Emergency Contacts

- **Vercel Support**: https://vercel.com/support
- **Clerk Support**: https://clerk.com/support
- **OpenAI Support**: https://help.openai.com

## Rollback Plan

If deployment fails:

1. Check Vercel deployment logs
2. Revert to previous deployment in Vercel
3. Fix issues locally
4. Test build locally
5. Redeploy

## Notes

- Keep API keys secure
- Never commit `.env.local`
- Monitor costs regularly
- Update documentation as needed
- Test before each deployment

---

**Status**: Ready for deployment ✅
**Last Updated**: 2026-03-09
