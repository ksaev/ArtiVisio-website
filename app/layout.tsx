
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



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Artivisio – Emploi, Coaching et Visibilité pour les Talents en Afrique",
  description: "CV modernes, portfolios interactifs, coaching et branding personnel. Accompagnement digital pour l'Afrique francophone. Tarifs accessibles en FCFA.",
  keywords: [
    "CV professionnels Afrique",
    "Coaching LinkedIn",
    "Portfolio en ligne",
    "Branding personnel",
    "Services digitaux Afrique",
    "Emploi jeunes diplômés",
    "Image professionnelle Afrique"
  ],
  authors: [{ name: "Artivisio", url: "https://artivisio.com" }],
  openGraph: {
    title: "Artivisio – Construisez votre image pro en Afrique",
    description: "Découvrez nos services pour optimiser votre présence pro en ligne : CV, portfolios, coaching, branding et plus.",
    url: "https://artivisio.com",
    siteName: "Artivisio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://artivisio.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Artivisio - image pro Afrique"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Artivisio – Construisez votre image pro en Afrique",
    description: "Découvrez nos services pour optimiser votre présence pro en ligne : CV, portfolios, coaching, branding et plus.",
    creator: "@artivisio"
  }
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

        <TeasingPopup />


      <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
      >
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100">
            <Header />
            <main className="pt-20">{children}</main>
            <Footer />
          </div>

     </ThemeProvider>

        </LanguageProvider>
      </body>
    </html>
  )
}
