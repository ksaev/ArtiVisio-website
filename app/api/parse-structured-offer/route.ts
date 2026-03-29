import { NextResponse } from "next/server";
import countries from "@/data/countries_full.json";
import sectors from "@/data/sectors.json";

type Country = { id: string; label: string };
type Sector = { id: string; label: string };

const countryList: Country[] = countries;
const sectorList: Sector[] = sectors;

function normalizeText(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text: string = body?.text;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { success: false, error: "Texte vide" },
        { status: 400 }
      );
    }

    const lowerText = normalizeText(text);

    const data = {
      title: "",
      company: "",
      location: "",
      salary: "Négociable",
      type: "Non precisé",
      sector: "",
      countryId: "",
      description: "",
      requirements: "",
      mail: "",
      link: "",
      expire: "",
    };

    // ---------------- EMAIL ----------------
    const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    if (emailMatch) data.mail = emailMatch[0];

    // ---------------- LINK ----------------
    const linkMatch = text.match(/https?:\/\/[^\s]+/);
    if (linkMatch) data.link = linkMatch[0];

    // ---------------- SALARY ----------------
    const salaryMatch = text.match(/\d{1,3}(?:[ ]?\d{3})*\s?(FCFA|€|\$)/i);
    if (salaryMatch) data.salary = salaryMatch[0];

    // ---------------- CONTRACT TYPE ----------------
    const contractTypes = ["CDI", "CDD", "Stage", "Freelance", "Consultant", "Volontariat"];
    for (const type of contractTypes) {
      if (lowerText.includes(normalizeText(type))) {
        data.type = type;
        break;
      }
    }

    // ---------------- DATE EXPIRATION ----------------
    const dateMatch = text.match(/\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4}/);
    if (dateMatch) {
      const d = dateMatch[0];
      if (d.includes("/")) {
        const [day, month, year] = d.split("/");
        data.expire = `${year}-${month}-${day}`;
      } else {
        data.expire = d;
      }
    }

    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

    // ---------------- TITLE ----------------
    const titleMatch = text.match(/(title|titre)\s*:?\s*(.+)/i);
    data.title = titleMatch?.[2]?.trim() || lines[0] || "";

    // ---------------- COMPANY ----------------
    const companyMatch = text.match(/(chez|entreprise|société|company)\s*:?\s*(.+)/i);
    data.company = companyMatch?.[2]?.trim() || lines[1] || "";

    // ---------------- LOCATION ----------------
    const locationMatch = text.match(/(à|location|lieu|ville)\s*:?\s*(.+)/i);
    data.location = locationMatch?.[2]?.trim() || lines[2] || "";

    // ---------------- COUNTRY ----------------
    for (const country of countryList) {
      const normalizedLabel = normalizeText(country.label);
      if (lowerText.includes(normalizedLabel)) {
        data.countryId = country.id;
        break;
      }
    }

    // ---------------- DESCRIPTION ----------------
    const descMatch = text.match(
      /(mission|description complète|description|poste|responsabilités)\s*:?([\s\S]*?)(?=\n\s*(exigences|profil|compétences|requirements))/i
    );
    data.description = (descMatch?.[2]?.trim() || text.substring(0, 1500)).replace(/\n{2,}/g, "\n").substring(0, 1500);

    // ---------------- REQUIREMENTS ----------------
    const reqMatch = text.match(
      /(exigences|compétences & exigences|profil|compétences|requirements)\s*:?([\s\S]*?)(?=\n{2,}|$)/i
    );
    if (reqMatch) {
      const reqLines = reqMatch[2]
        .split("\n")
        .map(l => l.replace(/[-•*]/g, "").trim())
        .filter(Boolean);
      data.requirements = reqLines.join("\n").replace(/\n{2,}/g, "\n");
    }

    // ---------------- SECTOR ----------------
    for (const sectored of sectorList) {
      const normalizedLabel = normalizeText(sectored.label);
      if (lowerText.includes(normalizedLabel)) {
        data.sector = sectored.id;
        break;
      }
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("PARSER ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Erreur analyse serveur" },
      { status: 500 }
    );
  }
}