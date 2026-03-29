import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.joinrise.io/api/v1/jobs/public?page=1&limit=20"
    );

    const data = await response.json();

    // Si pas d'offres, on retourne directement
    if (!data.jobs || data.jobs.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Aucune offre à importer"
      });
    }

    // Upsert en parallèle pour toutes les offres
    await Promise.all(
      data.jobs.map(async (job: any) => {
        try {
          await prisma.jobOffer.upsert({
            where: { externalId: job.id?.toString() ?? job.title },
            update: {
              title: job.title,
              company: job.company,
              location: job.location ?? "Non précisé",
              description: job.description ?? "",
              link: job.url,
              salary: job.salary ?? "Non précisé",
              type: job.type ?? "Non précisé",
              sector: job.sector ?? "Non précisé",
              mail: job.mail ?? "",
              posted: new Date(), // optionnel, si tu veux mettre à jour la date
            },
            create: {
              externalId: job.id?.toString() ?? job.title,
              title: job.title,
              company: job.company,
              location: job.location ?? "Non précisé",
              description: job.description ?? "",
              link: job.url,
              salary: "Non précisé",
              type: "Non précisé",
              sector: "Non précisé",
              mail: "",
              countryId: "CI", // obligatoire
              expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // expiration 30 jours
              posted: new Date(),
            },
          });
        } catch (err) {
          console.error("Erreur sur l'offre :", job.id, err);
        }
      })
    );

    return NextResponse.json({
      success: true,
      message: "Offres importées avec succès"
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur récupération offres" },
      { status: 500 }
    );
  }
}