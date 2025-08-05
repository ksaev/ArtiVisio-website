import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.jobOffer.findMany({
      select: {
        id: true,
        title: true,
        company: true,
        location: true,
        salary: true,
        type: true,
        sector: true,
        description: true,
        requirements: true,
        posted: true,
        expire: true,
        countryId: true,
        mail: true,
      },
      orderBy: { posted: "desc" },
    });

    const formattedJobs = jobs.map((job) => {
      let requirementsParsed: string[] = [];

      if (Array.isArray(job.requirements)) {
        requirementsParsed = job.requirements;
      } else if (typeof job.requirements === "string") {
        const raw = job.requirements.trim();

        try {
          // Cas JSON.stringify([ ... ])
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            requirementsParsed = parsed.map((item: string) => item.trim());
          } else {
            throw new Error("Pas un tableau JSON");
          }
        } catch {
          // Cas brut : split sur retour ligne ou slash ou virgule
          requirementsParsed = raw
            .split(/[\n/,/]+/)
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }

      return {
        ...job,
        requirements: requirementsParsed,
        posted: new Intl.DateTimeFormat("fr-FR").format(new Date(job.posted)),
        expire: new Intl.DateTimeFormat("fr-FR").format(new Date(job.expire)),
      };
    });

    return NextResponse.json(formattedJobs);
  } catch (error) {
    console.error("[API /jobs] Erreur :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
