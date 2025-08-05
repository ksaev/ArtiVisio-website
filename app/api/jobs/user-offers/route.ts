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
      mail,
      datePublication,
      enAvant,
      noms,
      numero,
      mailpro,
      local,
      recaptchaToken,
    } = await req.json()

    // ✅ Validation reCAPTCHA v2 invisible
    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA token manquant." }, { status: 400 })
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`

    const recaptchaRes = await fetch(verificationUrl, { method: "POST" })
    const recaptchaJson = await recaptchaRes.json()

    if (!recaptchaJson.success) {
      return NextResponse.json({ error: "Échec de la validation reCAPTCHA." }, { status: 403 })
    }

    // ✅ Validation des champs requis
    if (![titre, entreprise, localisation, description].every(f => typeof f === 'string' && f.trim() !== '')) {
      return NextResponse.json(
        { error: "Les champs titre, entreprise, localisation et description sont requis." },
        { status: 400 }
      )
    }

    // ✅ Configuration de l’envoi d’email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER_OFFRES,
        pass: process.env.SMTP_PASS_OFFRES,
      },
    })

    const emailHtml = `
      <h2>Nouvelle offre d'emploi reçue</h2>
      <ul>
        <h3>Informations de l'offre</h3>
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
        <li><strong>Adresse de candidature :</strong> ${mail}</li>
        <br>
        <h3>Informations du recruteur</h3>
        <li><strong>Nom et prénoms :</strong> ${noms}</li>
        <li><strong>Adresse mail :</strong> ${mailpro}</li>
        <li><strong>Localisation :</strong> ${local}</li>
        <li><strong>Numéro de tél :</strong> ${numero}</li>
      </ul>
    `

    await transporter.sendMail({
      from: `"Artivisio Offres" <artivisio.offres@gmail.com>`,
      to: "offres@artivisio.com",
      replyTo: process.env.SMTP_USER_OFFRES,
      subject: `Nouvelle offre d'emploi : ${titre}`,
      html: emailHtml,
    })

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
