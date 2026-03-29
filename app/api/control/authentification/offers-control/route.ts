import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const offers = await prisma.jobOffer.findMany({
      orderBy: { posted: "desc" },
    });

    const today = new Date();

    const activeCount = offers.filter(o => new Date(o.expire) >= today).length;
    const expiredCount = offers.filter(o => new Date(o.expire) < today).length;

    const sectorMap: Record<string, number> = {};

    for (const offer of offers) {
      sectorMap[offer.sector] = (sectorMap[offer.sector] || 0) + 1;
    }

    const offersBySector = Object.entries(sectorMap).map(([sector, count]) => ({
      sector,
      count,
    }));

    const totalClicks = offers.reduce((sum, o) => sum + (o.clickCount ?? 0), 0);
    const totalShares = offers.reduce((sum, o) => sum + (o.shareCount ?? 0), 0);

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
    console.error(error);

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: "ID invalide" },
        { status: 400 }
      );
    }

    await prisma.jobOffer.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Offre supprimée" });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erreur suppression" },
      { status: 500 }
    );
  }
}