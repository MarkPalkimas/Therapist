import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all pages (except Next internals and static files)
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Always run for API routes
    '/api(.*)',
  ],
};
