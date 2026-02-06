import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// When you build auth pages, you'll see middleware in action:
// - User logs in → Middleware gets new session cookies
// - User navigates → Middleware keeps them logged in
// - Token expires → Middleware refreshes automatically

// 1. Runs on every request that matches the config.matcher
// 2. Calls updateSession() from your Supabase middleware file
// 3. Returns the modified response
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except (no need to check auth for static assets):
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
