// app/api/newsletter/route.ts ou pages/api/newsletter.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ton Prisma global

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Email invalide" }, { status: 400 });
    }

    const existing = await prisma.newsletter.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, error: "Email déjà inscrit" }, { status: 400 });
    }

    const newEntry = await prisma.newsletter.create({ data: { email } });
    return NextResponse.json({ success: true, data: newEntry });
  } catch (err) {
    console.error("Erreur API newsletter:", err);
    return NextResponse.json({ success: false, error: "Impossible d’insérer l’email" }, { status: 500 });
  }
}