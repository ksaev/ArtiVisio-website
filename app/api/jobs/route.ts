import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const {
      titre,
      entreprise,
      localisation,
      typePoste,
      domaine,
      niveau,
      description,
      salaire,
      anneesExperience,
      niveauEtudes,
      dateLimite,
      datePublication,
      enAvant,
    } = await req.json()

    if (![titre, entreprise, localisation, description].every(f => typeof f === 'string' && f.trim() !== '')) {
      return NextResponse.json(
        { error: "Les champs titre, entreprise, localisation et description sont requis." },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // Port 465 nécessite secure = true
      auth: {
        user: process.env.SMTP_USER_OFFRES,
        pass: process.env.SMTP_PASS_OFFRES,
      },
    })

    console.log(transporter)

    const emailHtml = `
      <h2>Nouvelle offre d'emploi reçue</h2>
      <ul>
        <li><strong>Titre :</strong> ${titre}</li>
        <li><strong>Entreprise :</strong> ${entreprise}</li>
        <li><strong>Localisation :</strong> ${localisation}</li>
        <li><strong>Type de poste :</strong> ${typePoste || "Non précisé"}</li>
        <li><strong>Domaine :</strong> ${domaine || "Non précisé"}</li>
        <li><strong>Niveau :</strong> ${niveau || "Non précisé"}</li>
        <li><strong>Description :</strong> ${description}</li>
        <li><strong>Salaire :</strong> ${salaire || "Non précisé"}</li>
        <li><strong>Années d'expérience :</strong> ${anneesExperience || "Non précisé"}</li>
        <li><strong>Niveau d'études :</strong> ${niveauEtudes || "Non précisé"}</li>
        <li><strong>Date limite :</strong> ${dateLimite || "Non précisé"}</li>
        <li><strong>Date publication :</strong> ${datePublication || new Date().toISOString().split("T")[0]}</li>
        <li><strong>Mise en avant :</strong> ${enAvant ? "Oui" : "Non"}</li>
      </ul>
    `

   const envoi = await transporter.sendMail({
      from: `"Artivisio Offres" <artivisio.offres@gmail.com>`,
      to: "offres@artivisio.com",
      replyTo: process.env.SMTP_USER_OFFRES,
      subject: `Nouvelle offre d'emploi : ${titre}`,
      html: emailHtml,
    })

    console.log(envoi)

    return NextResponse.json({
      success: true,
      message: "Offre envoyée et email transmis avec succès.",
    })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'offre d'emploi :", error)
    return NextResponse.json(
      { error: "Erreur serveur lors de l'envoi de l'offre." },
      { status: 500 }
    )
  }
}
