import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Email invalide' }, { status: 400 });
    }

    // Vérifie si l'email existe déjà
    const existing = await prisma.newsletter.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Email déjà inscrit' }, { status: 400 });
    }

    const newEntry = await prisma.newsletter.create({
      data: { email },
    });

    return NextResponse.json({ success: true, data: newEntry });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Impossible d’insérer l’email' }, { status: 500 });
  }
}
