import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const path = req.nextUrl.pathname
  const secret = process.env.NEXTAUTH_SECRET;
  const isPublicPath = path === '/login' || path === '/signup'
  const token = await getToken({ req, secret })
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (path === '/admin' || path === '/create-user') {
    if (!token || !token.isAdmin) {
      return NextResponse.redirect(new URL('/blog', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/admin',
    '/blog',
    '/profile',
    '/create-user',
    '/create-post',
  ]
}