import { NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from './utils/supabase/server'

export async function middleware(request) {
  // update supabase client sessions
  await updateSession(request)

  // Validate protected routes
  if (request.nextUrl.pathname.startsWith('/user')) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  
  if (request.nextUrl.pathname.startsWith('/auth')) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser()
    if (data.user) {
      return NextResponse.redirect(new URL('/user', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}


// if (request.nextUrl.pathname.startsWith('/dashboard')) {
//   return NextResponse.rewrite(new URL('/dashboard/user', request.url))
// }