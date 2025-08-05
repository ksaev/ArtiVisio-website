// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const verified = token ? await verifyToken(token) : null;

  const url = req.nextUrl.clone();

  if (!verified) {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // Redirection sécurisée : seuls les admins accèdent au dashboard
  if (url.pathname.startsWith('/admin/dashboard') && verified.role !== 'admin') {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Protéger les routes nécessaires
export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
