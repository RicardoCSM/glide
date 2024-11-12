import type { NextRequest } from 'next/server'
import { getToken } from './app/auth'

export async function middleware(request: NextRequest) {
  const token = await getToken();

  if (token && request.nextUrl.pathname === '/') {
    return Response.redirect(new URL('/home', request.url))
  }

  if (
    !token &&
    !request.nextUrl.pathname.startsWith('/login')
  ) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}