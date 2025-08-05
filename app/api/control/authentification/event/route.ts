import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { id, type } = await request.json();

    if (!id || !type)
      return NextResponse.json({ error: "ID ou type manquant" }, { status: 400 });

    const offerId = Number(id);
    if (isNaN(offerId))
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });

    if (type !== "click" && type !== "share")
      return NextResponse.json({ error: "Type invalide" }, { status: 400 });

    const dataToUpdate =
      type === "click"
        ? { clickCount: { increment: 1 } }
        : { shareCount: { increment: 1 } };

    const updated = await prisma.jobOffer.update({
      where: { id: offerId },
      data: dataToUpdate,
    });

    return NextResponse.json({
      message: `${type} comptabilisé`,
      clickCount: updated.clickCount,
      shareCount: updated.shareCount,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
