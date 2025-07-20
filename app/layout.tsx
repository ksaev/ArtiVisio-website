import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Artivisio - Construisons votre image professionnelle en Afrique",
  description:
    "CV professionnels, portfolios, coaching LinkedIn et pages branding pour l'Afrique francophone. Tarifs accessibles en FCFA.",
  keywords: "CV Afrique, portfolio professionnel, coaching LinkedIn, branding personnel, emploi Afrique francophone",
  authors: [{ name: "Artivisio" }],
  openGraph: {
    title: "Artivisio - Image professionnelle pour l'Afrique",
    description: "Services professionnels de CV, portfolio et coaching pour l'Afrique francophone",
    type: "website",
    locale: "fr_FR",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <LanguageProvider>
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100">
            <Header />
            <main className="pt-20">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
