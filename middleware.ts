import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isAdminCookie = req.cookies.get('isAdmin')?.value;

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (isAdminCookie !== 'true') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}
