import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch des offres externes avec User-Agent
    const response = await fetch(
      "https://api.joinrise.io/api/v1/jobs/public?page=1&limit=20",
      { headers: { "User-Agent": "NodeJS" } }
    );

    if (!response.ok) {
      console.error("Erreur API externe :", response.status);
      return NextResponse.json([], { status: 500 });
    }

    const data = await response.json();

    // Les jobs sont dans data.result.jobs
    const jobs = data.result?.jobs || [];
    console.log("Nombre d'offres reçues :", jobs.length);

    if (jobs.length === 0) return NextResponse.json([]);

    // Upsert sécurisé pour chaque offre
    const upsertedOffers = await Promise.all(
      jobs.map(async (job: any) => {
        return prisma.jobOffer.upsert({
          where: { externalId: job.id?.toString() ?? job.title },
          update: {
            title: job.title,
            company: job.company ?? "Non précisé",
            location: job.location ?? "Non précisé",
            description: job.description ?? "",
            link: job.url ?? "",
            salary: job.salary ?? "Non précisé",
            type: job.type ?? "Non précisé",
            sector: job.sector ?? "Non précisé",
            mail: job.mail ?? "",
            posted: new Date(),
          },
          create: {
            externalId: job.id?.toString() ?? job.title,
            title: job.title,
            company: job.company ?? "Non précisé",
            location: job.location ?? "Non précisé",
            description: job.description ?? "",
            link: job.url ?? "",
            salary: job.salary ?? "Non précisé",
            type: job.type ?? "Non précisé",
            sector: job.sector ?? "Non précisé",
            mail: job.mail ?? "",
            countryId: "CI",
            expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 jours
            posted: new Date(),
          },
        });
      })
    );

    return NextResponse.json(upsertedOffers);
  } catch (err: any) {
    console.error("Erreur récupération offres externes :", err);
    return NextResponse.json([], { status: 500 });
  }
}