import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// POST /api/contact
export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message, recaptchaToken, } = await req.json()
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

    // Validation des champs requis
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Prénom, nom, email et message sont requis." },
        { status: 400 }
      )
    }

    // Configuration du transporteur SMTP (Gmail)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // Port 465 nécessite secure = true
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Contenu de l'email
    {/*await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.SMTP_USER,
      subject: `NOUVEAU MESSAGE DE CONTACT DU SITE WEB: ${subject || "Sans sujet"}`,
      html: `
        <h2>Nouvelle demande de contact :</h2>
        <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject || "Non précisé"}</p>
        <p><strong>Message :</strong><br/>${message}</p>
      `,
    })*/}

        await transporter.sendMail({
        from: `"Artivisio" <contact.artivisio@gmail.com>`,  // Doit être ton mail exact
        to: "contact@artivisio.com",                      // Peut être Gmail ou pas
        replyTo: `"${firstName} ${lastName}" <${email}>`,
        subject: "Contact client site web",
        html:`        
        <h2>Nouvelle demande de contact :</h2>
          <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject || "Non précisé"}</p>
          <p><strong>Message :</strong><br/>${message}</p>`,
      })

    // Réponse OK
    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error)
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message." },
      { status: 500 }
    )
  }
}
