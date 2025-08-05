import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  sector: string;
  description: string;
  requirements: string | string[];
  posted: Date;
  expire: Date;
  countryId: string;
  mail: string;
};

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

    const formattedJobs = jobs.map((job: Job) => {
      let requirementsParsed: string[] = [];

      if (Array.isArray(job.requirements)) {
        requirementsParsed = job.requirements;
      } else if (typeof job.requirements === "string") {
        const raw = job.requirements.trim();

        try {
          // Si c'est un JSON valide de tableau
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            requirementsParsed = parsed.map((item) => item.trim());
          } else {
            // Sinon on essaie de splitter intelligemment
            requirementsParsed = raw.split(/[\n/]+/)
              .map((s) => s.trim())
              .filter(Boolean);
          }
        } catch {
          // Cas général : split par virgule ou retour à la ligne
          requirementsParsed = raw.split(/[\n/]+/)
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }

      return {
        ...job,
        requirements: requirementsParsed,
        posted: new Intl.DateTimeFormat("fr-FR").format(job.posted),
        expire: new Intl.DateTimeFormat("fr-FR").format(job.expire),
      };
    });

    return NextResponse.json(formattedJobs);
  } catch (error) {
    console.error("[API /jobs] Erreur :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
