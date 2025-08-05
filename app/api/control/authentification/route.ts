// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { SignJWT } from 'jose';

export async function POST(req: Request) {
  try {
    const { email: rawEmail, password } = await req.json();
    const email = rawEmail?.trim().toLowerCase();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email et mot de passe sont requis.' }, { status: 400 });
    }

    const user = await prisma.administrateur.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'Email ou mot de passe incorrect.' }, { status: 401 });
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ message: 'Email ou mot de passe incorrect.' }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({ message: 'Erreur serveur.' }, { status: 500 });
    }

    const token = await new SignJWT({ email: user.email, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(jwtSecret));

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Erreur login:', error);
    return NextResponse.json({ message: 'Erreur serveur.' }, { status: 500 });
  }
}
