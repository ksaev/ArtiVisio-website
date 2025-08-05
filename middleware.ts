import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/admin/login', '/'];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const isPublic = PUBLIC_PATHS.includes(req.nextUrl.pathname);

  if (!token) {
    if (isPublic) return NextResponse.next();
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    if (req.nextUrl.pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    // Optionnel : tu peux stocker le rôle ici si tu veux l'utiliser plus tard
    const res = NextResponse.next();
    res.headers.set('x-user-role', payload.role as string);
    return res;

  } catch (err) {
    // Token invalide ou expiré
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
