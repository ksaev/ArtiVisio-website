// app/api/newsletter/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
const ADMIN_EMAIL = "toutemavie87@gmail.com" // 🔁 Modifiable

function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email)
}

export async function POST(request: Request) {
  const body = await request.json()
  const email: string = body?.email?.trim()

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Adresse e-mail invalide" }, { status: 400 })
  }

  if (!AUDIENCE_ID) {
    console.error("❌ AUDIENCE_ID manquant dans .env")
    return NextResponse.json({ error: "Configuration manquante" }, { status: 500 })
  }

  try {
    // Étape 1 — Ajouter à l’audience
    await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
      firstName: "Peggy",     // Ou récupérer depuis le body si dispo
      lastName: "Derrick",
    })

    console.log("✅ Abonné ajouté à l'audience", email +"  "+AUDIENCE_ID)

    // Étape 2 — Envoyer mail de bienvenue à l’utilisateur
    await resend.emails.send({
      from: "onboarding@resend.dev", // ⚠️ à remplacer par un domaine vérifié pour la prod
      to: email,
      subject: "Bienvenue chez PEGGY DERRICK SARL",
      html: `
        <div style="font-family: sans-serif; font-size: 16px;">
          <h2>Bienvenue 🎉</h2>
          <p>Merci pour votre inscription à notre newsletter.</p>
          <p>Vous recevrez bientôt nos actualités, offres et conseils utiles.</p>
          <br/>
          <p><strong>PEGGY DERRICK SARL</strong></p>
        </div>
      `,
    })

    // Étape 3 — Notifier l’administrateur de l’inscription
    await resend.emails.send({
      from: "onboarding@resend.dev", // idem, à remplacer en production
      to: ADMIN_EMAIL,
      subject: "Nouvelle inscription newsletter",
      html: `<p>Nouvel abonné : <strong>${email}</strong></p>`,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("❌ Erreur Resend:", error.message || error)
    return NextResponse.json({ error: "Erreur interne lors de l’envoi." }, { status: 500 })
  }
}
