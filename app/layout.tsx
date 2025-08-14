
import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@/components/theme-provider"
import TeasingPopup from "@/components/teasingPopup"
import OneSignalInit from "@/components/OneSignalInit"
import LayoutWrapper from "@/components/layout/layoutWrapper";
import SeoHead from "@/components/seoHead"
import  JsonLd  from   "@/components/JsonLd"



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})


export const metadata: Metadata = {
  title: "Artivisio - Offres d’Emploi, Coaching & Branding pour Talents Africains",
  description:
    "Découvrez les meilleures offres d'emploi en Afrique francophone, bénéficiez de coaching personnalisé, créez un CV et portfolio professionnels, et boostez votre visibilité digitale avec Artivisio. Tarifs accessibles en FCFA.",
  keywords: [
    "offres d'emploi Afrique",
    "emploi jeunes diplômés Afrique",
    "coaching carrière Afrique",
    "CV professionnels Afrique",
    "portfolio en ligne Afrique",
    "branding personnel digital",
    "coaching LinkedIn Afrique",
    "services digitaux Afrique francophone",
  ],
  authors: [{ name: "Artivisio", url: "https://dev.artivisio.com" }],
  openGraph: {
    title: "Artivisio – Offres d’Emploi, Coaching & Branding pour Talents Africains",
    description:
      "Trouvez des offres d’emploi, coaching expert, création de CV et portfolios professionnels. Accompagnement digital complet pour booster votre carrière en Afrique francophone.",
    url: "https://dev.artivisio.com",
    siteName: "Artivisio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://dev.artivisio.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Artivisio - Offres d'emploi et coaching en Afrique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artivisio – Offres d’Emploi, Coaching & Branding en Afrique",
    description:
      "Trouvez les meilleures offres d’emploi, coaching personnalisé, CV et portfolios professionnels adaptés au marché africain francophone.",
    creator: "@artivisio",
    images: ["https://dev.artivisio.com/og-image.jpg"],
  },
  metadataBase: new URL("https://dev.artivisio.com"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      "en-US": "/en",
    },
  },
}

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Artivisio",
      "url": "https://dev.artivisio.com",
      "logo": "https://dev.artivisio.com/logo.png",
      "sameAs": [
        "https://www.facebook.com/artivisio",
        "https://twitter.com/artivisio",
        "https://linkedin.com/company/artivisio",
      ],
    },
    {
      "@type": "WebSite",
      "url": "https://dev.artivisio.com",
      "name": "Artivisio",
      "inLanguage": "fr-FR",
      "publisher": {
        "@type": "Organization",
        "name": "Artivisio",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dev.artivisio.com/logo.png",
        },
      },
    },
    {
      "@type": "JobPosting",
      "title": "Offres d'emploi en Afrique francophone",
      "description":
        "Découvrez les meilleures offres d'emploi adaptées au marché africain francophone, avec coaching et accompagnement personnalisés.",
      "identifier": {
        "@type": "PropertyValue",
        "name": "Artivisio",
        "value": "JOB2025",
      },
      "datePosted": new Date().toISOString(),
      "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // +30 jours
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Artivisio",
        "sameAs": "https://dev.artivisio.com",
        "logo": "https://dev.artivisio.com/logo.png",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Abidjan",
          "addressRegion": "CI",
          "addressCountry": "CI",
        },
      },
    },
  ],
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>

      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased text-[#3E2F1C] bg-white`}>
        
        <OneSignalInit />

        <Toaster
          position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#F5F3EF", // Marron clair
            color: "#3E2F1C",       // Texte foncé, élégant
            border: "1px solid #D6CFC7",
            padding: "40px 20x",
            fontSize: "16px",
            fontWeight: 300,
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(62, 47, 28, 0.15)",
            maxWidth: "90%",
          },
          success: {
            icon: "✅",
            style: {
              background: "#F0FDF4",         // Vert ultra doux
              color: "#14532D",              // Texte vert pro
              border: "2px solid #4CAF50",
              fontWeight: 600,
            },
          },
          error: {
            icon: "❌",
            style: {
              background: "#FEF2F2",
              color: "#7F1D1D",
              border: "2px solid #E53935",
              fontWeight: 600,
            },
          },
        }}
      />

        <LanguageProvider>

        <SeoHead
          title="Artivisio – Emploi, Coaching et Visibilité pour les Talents en Afrique"
          description="CV modernes, portfolios interactifs, coaching et branding personnel. Accompagnement digital pour l'Afrique francophone. Tarifs accessibles en FCFA."
          url="https://dev.artivisio.com"
          image="https://dev.artivisio.com/og-image.jpg"
          type="website"
        />

        <JsonLd json={jsonLdSchema} />

        <TeasingPopup />

      <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
      >
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100">
            <LayoutWrapper><main>{children}</main></LayoutWrapper>
          </div>

     </ThemeProvider>

        </LanguageProvider>
      </body>
    </html>
  )
}
