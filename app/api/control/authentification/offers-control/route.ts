import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const offers = await prisma.jobOffer.findMany();

    const today = new Date();

    const activeCount = await prisma.jobOffer.count({
      where: { expire: { gte: today } },
    });

    const expiredCount = await prisma.jobOffer.count({
      where: { expire: { lt: today } },
    });

    const offersBySectorRaw = await prisma.jobOffer.groupBy({
      by: ["sector"],
      _count: { sector: true },
    });

    const offersBySector = offersBySectorRaw.map((item) => ({
      sector: item.sector,
      count: item._count.sector,
    }));

    // Calcul des totaux clics et partages
    const totalClicks = offers.reduce((sum, offer) => sum + (offer.clickCount ?? 0), 0);
    const totalShares = offers.reduce((sum, offer) => sum + (offer.shareCount ?? 0), 0);

    return NextResponse.json({
      offers,
      stats: {
        activeCount,
        expiredCount,
        offersBySector,
        totalClicks,
        totalShares,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Id manquant" }, { status: 400 });

    await prisma.jobOffer.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Offre supprimée" });
  } catch (error) {
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
