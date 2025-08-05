import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const recaptchaToken = data.recaptchaToken;
    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA token manquant." }, { status: 400 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

    const recaptchaRes = await fetch(verificationUrl, { method: "POST" });
    const recaptchaJson = await recaptchaRes.json();

    if (!recaptchaJson.success) {
      return NextResponse.json({ error: "Échec de la validation reCAPTCHA." }, { status: 403 });
    }

    // Champs requis
    const requiredFields = [
      "title",
      "company",
      "location",
      "mail",
      "description",
      "expire",
      "countryId",
      "sector",
      "type",
    ];
    for (const field of requiredFields) {
      if (!data[field] || (typeof data[field] === "string" && data[field].trim() === "")) {
        return NextResponse.json({ error: `Le champ '${field}' est obligatoire.` }, { status: 400 });
      }
    }

    const newOffer = await prisma.jobOffer.create({
      data: {
        title: data.title,
        company: data.company,
        location: data.location,
        salary: data.salary ?? "",
        type: data.type,
        sector: data.sector,
        description: data.description,
        requirements: data.requirements ?? "", // chaîne texte
        posted: new Date(), // date actuelle
        expire: new Date(data.expire),
        mail: data.mail,
        countryId: data.countryId,
      },
    });

    return NextResponse.json({ message: "Offre créée avec succès.", offer: newOffer }, { status: 201 });
  } catch (error) {
    console.error("[API /control/authentification/offres] Erreur :", error);
    return NextResponse.json({ error: "Erreur serveur interne." }, { status: 500 });
  }
}
