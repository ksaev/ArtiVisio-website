"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.services": "Services",
    "nav.portfolios": "Portfolios",
    "nav.coaching": "Coaching",
    "nav.jobs": "Offres",
    "nav.contact": "Contact",
    "nav.start": "Commencer",

    // Hero
    "hero.title": "Construisons votre image professionnelle.",
    "hero.subtitle": "Vous avez le talent. Nous créons l’image qui le révèle. Pour convaincre les recruteurs, séduire les clients ou capter les bons projets.",
    "hero.cta": "Découvrir nos réalisations",
    "hero.video": "Construire mon image pro",

    // Services
    "services.title": "Nos Services",
    "services.subtitle": "Des solutions complètes pour votre réussite professionnelle en Afrique",
    "services.cv.title": "CV Professionnels",
    "services.cv.desc": "CV modernes optimisés pour le marché africain (PDF + Web)",
    "services.portfolio.title": "Portfolios Interactifs",
    "services.portfolio.desc": "Sites web personnalisés pour présenter vos réalisations",
    "services.branding.title": "Branding Personnel",
    "services.branding.desc": "Identité visuelle complète et pages de présentation",
    "services.coaching.title": "Coaching LinkedIn",
    "services.coaching.desc": "Accompagnement personnalisé pour optimiser votre profil",
    "services.landing.title": "Pages Personnalisées",
    "services.landing.desc": "Mini sites web pour votre présence professionnelle",
    "services.hosting.title": "Hébergement & Support",
    "services.hosting.desc": "Solutions techniques complètes avec Supabase",

    // Pricing
    "pricing.starter": "Starter",
    "pricing.standard": "Standard",
    "pricing.premium": "Premium",
    "pricing.coaching": "Coaching LinkedIn",
    "pricing.fcfa": "FCFA",
    "pricing.lifetime": "à vie",
    "pricing.order": "Commander",
    "pricing.contact": "Nous contacter",

    // Contact
    "contact.title": "Contactez-nous",
    "contact.subtitle": "Prêt à transformer votre image professionnelle ?",
    "contact.firstName": "Prénom",
    "contact.lastName": "Nom",
    "contact.email": "Email",
    "contact.subject": "Objet",
    "contact.message": "Message",
    "contact.send": "Envoyer le message",

    // Footer
    "footer.description": "Solutions professionnelles pour l'Afrique francophone",
    "footer.services": "Services",
    "footer.resources": "Ressources",
    "footer.legal": "Légal",
    "footer.copyright": "Tous droits réservés",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.portfolios": "Portfolios",
    "nav.coaching": "Coaching",
    "nav.jobs": "Jobs",
    "nav.contact": "Contact",
    "nav.start": "Get Started",

    // Hero
    "hero.title": "Build your professional image",
    "hero.subtitle": "You have the talent. We create the image that reveals it. To convince recruiters, attract clients, or land the right projects.",
    "hero.cta": "View our work",
    "hero.video": "Build My Image",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Complete solutions for your professional success in Africa",
    "services.cv.title": "Professional CVs",
    "services.cv.desc": "Modern CVs optimized for the African market (PDF + Web)",
    "services.portfolio.title": "Interactive Portfolios",
    "services.portfolio.desc": "Custom websites to showcase your achievements",
    "services.branding.title": "Personal Branding",
    "services.branding.desc": "Complete visual identity and presentation pages",
    "services.coaching.title": "LinkedIn Coaching",
    "services.coaching.desc": "Personalized guidance to optimize your profile",
    "services.landing.title": "Custom Pages",
    "services.landing.desc": "Mini websites for your professional presence",
    "services.hosting.title": "Hosting & Support",
    "services.hosting.desc": "Complete technical solutions with Supabase",

    // Pricing
    "pricing.starter": "Starter",
    "pricing.standard": "Standard",
    "pricing.premium": "Premium",
    "pricing.coaching": "LinkedIn Coaching",
    "pricing.fcfa": "CFA",
    "pricing.lifetime": "lifetime",
    "pricing.order": "Order",
    "pricing.contact": "Contact us",

    // Contact
    "contact.title": "Contact us",
    "contact.subtitle": "Ready to transform your professional image?",
    "contact.firstName": "First Name",
    "contact.lastName": "Last Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send message",

    // Footer
    "footer.description": "Professional solutions for French-speaking Africa",
    "footer.services": "Services",
    "footer.resources": "Resources",
    "footer.legal": "Legal",
    "footer.copyright": "All rights reserved",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    // Auto-detect browser language
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith("en")) {
      setLanguage("en")
    } else {
      setLanguage("fr")
    }
  }, [])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
