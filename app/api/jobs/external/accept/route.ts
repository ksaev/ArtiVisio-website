import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const offerId = body.id;

    if (!offerId) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    // Récupérer l'offre externe dans la table JobOffer
    const offer = await prisma.jobOffer.findUnique({
      where: { id: offerId },
    });

    if (!offer) {
      return NextResponse.json({ error: "Offre non trouvée" }, { status: 404 });
    }

    // Upsert dans la même table ou dans une table interne si tu en as une
    await prisma.jobOffer.upsert({
      where: { externalId: offer.externalId ?? offer.id?.toString() ?? "UNKNOWN_EXTERNAL_ID" },
      update: {
        title: offer.title,
        company: offer.company ?? "Non précisé",
        location: offer.location ?? "Non précisé",
        description: offer.description ?? "",
        link: offer.link ?? "",
        salary: offer.salary ?? "Non précisé",
        type: offer.type ?? "Non précisé",
        sector: offer.sector ?? "Non précisé",
        mail: offer.mail ?? "",
        posted: new Date(),
      },
      create: {
        externalId: offer.externalId ?? offer.id?.toString() ?? "UNKNOWN_EXTERNAL_ID",
        title: offer.title,
        company: offer.company ?? "Non précisé",
        location: offer.location ?? "Non précisé",
        description: offer.description ?? "",
        link: offer.link ?? "",
        salary: offer.salary ?? "Non précisé",
        type: offer.type ?? "Non précisé",
        sector: offer.sector ?? "Non précisé",
        mail: offer.mail ?? "",
        countryId: "CI",
        expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        posted: new Date(),
      },
    });

    // Supprimer l'offre externe après acceptation
    await prisma.jobOffer.delete({
      where: { id: offer.id },
    });

    return NextResponse.json({ success: true, message: "Offre acceptée et ajoutée aux offres internes" });
  } catch (err) {
    console.error("Erreur acceptation offre :", err);
    return NextResponse.json({ error: "Impossible d'accepter l'offre" }, { status: 500 });
  }
}