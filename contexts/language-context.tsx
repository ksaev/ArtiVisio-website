"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
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
    "hero.subtitle":
      "Vous avez le talent. Nous façonnons l’image qui le révèle. Pour convaincre les recruteurs, séduire les clients, et capter les projets qui vous correspondent.",
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
    "footer.description": "Construisez votre impact professionnel, ici et maintenant.",
    "footer.services": "Services",
    "footer.cv": "CV Professionnels",
    "footer.portfolio": "Portfolios Web",
    "footer.portfolios": "Portfolios",
    "footer.linkedin": "Coaching LinkedIn",
    "footer.jobs": "Offres d'emploi",
    "footer.resources": "Ressources",
    "footer.testimonials": "Témoignages",
    "footer.blog": "Blog",
    "footer.faq": "FAQ",
    "footer.legal": "Légal",
    "footer.mentions": "Mentions légales",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "Conditions générales de vente",
    "footer.cookies": "Cookies",
    "footer.copyright": "Tous droits réservés",


    // CGV
    "cgv.title": "Conditions Générales de Vente",
    "cgv.1.title": "1. Objet",
    "cgv.1.text":
      "Les présentes Conditions Générales de Vente régissent les relations contractuelles entre Artivisio et ses clients pour toute prestation de service proposée via le site artivisio.com.",
    "cgv.2.title": "2. Prestations concernées",
    "cgv.2.text":
      "Création de CV, portfolios, profils professionnels, accompagnement et coaching individuel, création de contenus ou outils digitaux (visuels, mini-sites, etc.).",
    "cgv.3.title": "3. Commande et validation",
    "cgv.3.text":
      "Toute commande fait l’objet d’un accord clair (écrit ou vocal), validé par devis ou confirmation. Le client s’engage à fournir les éléments nécessaires à la réalisation.",
    "cgv.4.title": "4. Tarifs et paiement",
    "cgv.4.text":
      "Les prix sont exprimés en XOF ou EUR ou USD. Le paiement peut être demandé en une ou plusieurs fois selon le type de service. Une facture peut être émise sur demande. Les moyens de paiement acceptés : mobile money, virement ou paiement sécurisé.",
    "cgv.5.title": "5. Délais et livraisons",
    "cgv.5.text":
      "Les délais sont donnés à titre indicatif. Toute livraison est soumise à la réactivité du client (retours, informations à fournir). ArtiVisio s’efforce de respecter les délais convenus.",
    "cgv.6.title": "6. Droit de rétractation et annulation",
    "cgv.6.text":
      "Conformément à la nature des services numériques personnalisés, aucun remboursement n’est garanti après validation et démarrage du projet. Toute annulation doit être notifiée au plus tôt.",
    "cgv.7.title": "7. Propriété intellectuelle",
    "cgv.7.text":
      "Les contenus livrés (CV, design, documents) restent la propriété d’ArtiVisio jusqu’à paiement complet. Toute reproduction ou usage non autorisé est interdit.",
    "cgv.8.title": "8. Responsabilité",
    "cgv.8.text":
      "ArtiVisio s'engage à fournir des prestations professionnelles et à jour. Cependant, la responsabilité de l’entreprise ne saurait être engagée en cas de mauvaise utilisation des livrables ou d’un défaut d'information de la part du client.",
    "cgv.9.title": "9. Confidentialité",
    "cgv.9.text":
      "Toutes les informations échangées dans le cadre de la prestation sont confidentielles et ne seront jamais partagées sans votre consentement écrit.",
    "cgv.10.title": "10. Loi applicable",
    "cgv.10.text":
      "Les présentes CGV sont soumises au droit ivoirien. En cas de litige, une résolution à l’amiable sera privilégiée avant tout recours judiciaire.",

    // FAQ
        "faq.title": "Foire aux Questions",
    "faq.subtitle": "Vous vous posez des questions ? Nous avons rassemblé ici les réponses les plus fréquentes pour vous guider.",
    "faq.q1": "Que propose ArtiVisio ?",
    "faq.a1": "ArtiVisio est une entreprise digitale spécialisée dans l'accompagnement vers l’emploi durable à travers le coaching professionnel, la valorisation de profil, le branding et la création d’outils de visibilité.",
    "faq.q2": "Est-ce adapté aux freelances, étudiants ou professionnels ?",
    "faq.a2": "Oui. Nos services s’adressent à tous les profils : étudiants en insertion, jeunes diplômés, freelances, professionnels en reconversion ou cadres expérimentés.",
    "faq.q3": "Comment réserver une consultation ?",
    "faq.a3": "Vous pouvez réserver une consultation gratuite depuis notre site via le bouton 'Consultation stratégique'. Nous vous contactons ensuite pour confirmer.",
    "faq.q4": "Quels sont les services disponibles ?",
    "faq.a4": "Coaching individuel, création de CV professionnel, profils LinkedIn optimisés, branding visuel, portfolio digital, stratégie d’image et conseils emploi.",
    "faq.q5": "Proposez-vous des offres d’emploi ?",
    "faq.a5": "Oui, nous publions régulièrement des opportunités qualifiées. Vous pouvez y accéder depuis votre espace ou via les canaux de diffusion prévus.",
    "faq.q6": "Combien coûtent vos services ?",
    "faq.a6": "Les tarifs varient selon les besoins. Une estimation personnalisée vous est proposée après consultation.",
    "faq.q7": "Mes données sont-elles protégées ?",
    "faq.a7": "Oui. ArtiVisio respecte la confidentialité de vos données. Aucune information n’est partagée sans votre consentement.",
    "faq.q8": "Puis-je me désinscrire ou supprimer mon compte ?",
    "faq.a8": "Vous pouvez demander la suppression de votre compte à tout moment, sur simple demande écrite.",
    "faq.q9": "Pourquoi dois-je faire une consultation avant tout ?",
    "faq.a9": "La consultation permet d'évaluer vos besoins réels, d'éviter les demandes inutiles et de construire une proposition personnalisée. Elle garantit aussi le sérieux des échanges.",
    "faq.q10": "Est-ce que je peux vous appeler directement ?",
    "faq.a10": "Non. Toute prise de contact initiale se fait via le site pour cadrer la demande et vous orienter efficacement.",
    "faq.q11": "Proposez-vous du bénévolat ou des aides gratuites ?",
    "faq.a11": "Nos services sont professionnels et à haute valeur ajoutée. Toutefois, certaines ressources sont offertes gratuitement, comme des webinaires ou des articles de blog.",
    "faq.q12": "Puis-je vous envoyer mon CV directement ?",
    "faq.a12": "Non. Nous n'acceptons pas les candidatures spontanées sans processus. Utilisez les canaux définis sur le site pour soumettre un besoin ou postuler.",
    "faq.q13": "Je n'ai pas WhatsApp, comment vous contacter ?",
    "faq.a13": "Vous pouvez nous écrire via notre formulaire de contact ou par email. Les coordonnées sont disponibles en bas de page.",

    // Cookies
    "cookies.title": "Politique de Cookies",
    "cookies.intro":
      "Notre site utilise des cookies afin d'améliorer votre expérience, analyser le trafic et proposer des services personnalisés.",
    "cookies.whatIs": "Qu’est-ce qu’un cookie ?",
    "cookies.whatIsDesc":
      "Un cookie est un petit fichier stocké sur votre appareil lorsque vous visitez un site web. Il permet de collecter des informations sur votre navigation.",
    "cookies.types": "Types de cookies utilisés",
    "cookies.types.functional": "Cookies fonctionnels : essentiels au bon fonctionnement du site.",
    "cookies.types.analytics": "Cookies analytiques : utilisés pour suivre l’utilisation du site (ex. : Google Analytics).",
    "cookies.types.marketing": "Cookies marketing : pour personnaliser les publicités si activés.",
    "cookies.consent": "Votre consentement",
    "cookies.consentDesc":
      "Lors de votre première visite, une bannière s’affiche pour obtenir votre consentement. Vous pouvez modifier vos préférences à tout moment.",
    "cookies.disable": "Désactiver les cookies",
    "cookies.disableDesc":
      "Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait altérer certaines fonctionnalités du site.",
    "cookies.contact":
      "Pour toute question, contactez-nous à : contact@artivisio.com",

    // Mentions légales
    "legal.title": "Mentions Légales",
    "legal.section1.title": "1. Éditeur du site",
    "legal.section1.content": "Le site <strong>ArtiVisio</strong> est édité par la société <strong>Artivisio SARL</strong>, immatriculée au Registre du Commerce sous le numéro [à compléter], dont le siège social est situé à [adresse complète].",
    "legal.section2.title": "2. Responsable de publication",
    "legal.section2.content": "Directeur de la publication : [Nom du responsable]<br />Contact : [email de contact]",
    "legal.section3.title": "3. Hébergement",
    "legal.section3.content": "Le site est hébergé par : <br /><strong>[Nom de l’hébergeur]</strong><br />Adresse : [adresse complète de l’hébergeur]<br />Téléphone : [numéro] – Site web : [url]",
    "legal.section4.title": "4. Propriété intellectuelle",
    "legal.section4.content": "L’ensemble des éléments du site (textes, images, graphismes, logo, etc.) est protégé par le droit d’auteur. Toute reproduction ou représentation sans autorisation est interdite.",
    "legal.section5.title": "5. Données personnelles",
    "legal.section5.content": "Les données personnelles collectées via le site sont traitées dans le respect de la réglementation en vigueur. Pour en savoir plus, veuillez consulter notre <a href=\"/politique\" class=\"text-primary underline\">Politique de confidentialité</a>.",
    "legal.section6.title": "6. Cookies",
    "legal.section6.content": "Le site utilise des cookies à des fins de fonctionnement, de statistiques ou de personnalisation. Pour plus de détails, consultez notre <a href=\"/cookies\" class=\"text-primary underline\">Politique de cookies</a>.",
    "legal.section7.title": "7. Contact",
    "legal.section7.content": "Pour toute question ou réclamation, vous pouvez nous contacter à l’adresse suivante : <br /><strong>[email de contact]</strong>",
    
    // Politique de Confidentialité
    "privacy.title": "Politique de Confidentialité",
    "privacy.section1.title": "1. Données collectées",
    "privacy.section1.content": "Nom, prénom, email, téléphone, secteur d’activité, offres consultées, messages, et toute information utile au coaching ou au recrutement.",
    "privacy.section2.title": "2. Utilisation des données",
    "privacy.section2.content": "Vos données sont utilisées pour vous fournir nos services, améliorer votre expérience, vous notifier des offres ou rendez-vous, et assurer le bon fonctionnement de la plateforme.",
    "privacy.section3.title": "3. Partage des données",
    "privacy.section3.content": "Nous ne partageons pas vos données avec des tiers sans consentement explicite, sauf pour répondre à des obligations légales ou techniques.",
    "privacy.section4.title": "4. Sécurité",
    "privacy.section4.content": "Vos données sont stockées de manière sécurisée sur des serveurs protégés. Des audits réguliers sont effectués pour garantir leur confidentialité.",
    "privacy.section5.title": "5. Vos droits",
    "privacy.section5.content": "Vous pouvez à tout moment demander à consulter, corriger ou supprimer vos données via : <a href=\"mailto:contact@artivisio.com\" class=\"text-primary font-medium underline ml-1\">contact@artivisio.com</a>",
    "privacy.section6.title": "6. Données des candidats",
    "privacy.section6.content": "Vos informations de candidature sont visibles uniquement des recruteurs sur les offres que vous choisissez. Vous pouvez modifier ou retirer votre dossier à tout moment.",
    "privacy.section7.title": "7. Données des recruteurs",
    "privacy.section7.content": "Les comptes recruteurs sont protégés et les informations liées aux campagnes ou aux entretiens ne sont jamais partagées sans consentement.",

    

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
    "hero.subtitle":
      "You have the talent. We shape the image that reveals it. To convince recruiters, attract clients, and secure the projects that fit you",
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
    "footer.description": "Build your professional impact, here and now.",
    "footer.services": "Services",
    "footer.cv": "Professional Resumes",
    "footer.portfolio": "Web Portfolios",
    "footer.portfolios": "Portfolios",
    "footer.linkedin": "LinkedIn Coaching",
    "footer.jobs": "Job Offers",
    "footer.resources": "Resources",
    "footer.testimonials": "Testimonials",
    "footer.blog": "Blog",
    "footer.faq": "FAQ",
    "footer.legal": "Legal",
    "footer.mentions": "Legal Notice",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Sale",
    "footer.cookies": "Cookies",
    "footer.copyright": "All rights reserved",


    // CGV
    "cgv.title": "General Terms of Sale",
    "cgv.1.title": "1. Object",
    "cgv.1.text":
      "These General Terms of Sale govern the contractual relationship between Artivisio and its clients for all service provisions offered via the site artivisio.com.",
    "cgv.2.title": "2. Services covered",
    "cgv.2.text":
      "Creation of CVs, portfolios, professional profiles, individual coaching and support, creation of digital content or tools (visuals, mini-sites, etc.).",
    "cgv.3.title": "3. Order and validation",
    "cgv.3.text":
      "Any order must be clearly agreed (written or verbal), validated by a quote or confirmation. The client undertakes to provide the necessary elements for completion.",
    "cgv.4.title": "4. Pricing and payment",
    "cgv.4.text":
      "Prices are expressed in XOF, EUR, or USD. Payment may be requested in one or several installments depending on the type of service. An invoice can be issued upon request. Accepted payment methods: mobile money, bank transfer or secure payment.",
    "cgv.5.title": "5. Deadlines and delivery",
    "cgv.5.text":
      "Deadlines are indicative. Any delivery depends on the client’s responsiveness (feedback, information to provide). ArtiVisio strives to meet the agreed deadlines.",
    "cgv.6.title": "6. Right of withdrawal and cancellation",
    "cgv.6.text":
      "Due to the nature of personalized digital services, no refund is guaranteed after validation and project start. Any cancellation must be notified as soon as possible.",
    "cgv.7.title": "7. Intellectual property",
    "cgv.7.text":
      "Delivered content (CV, design, documents) remains the property of ArtiVisio until full payment. Any unauthorized reproduction or use is prohibited.",
    "cgv.8.title": "8. Liability",
    "cgv.8.text":
      "ArtiVisio commits to providing professional and up-to-date services. However, the company’s liability cannot be engaged in case of misuse of deliverables or failure to provide information by the client.",
    "cgv.9.title": "9. Confidentiality",
    "cgv.9.text":
      "All information exchanged in the framework of the service is confidential and will never be shared without your written consent.",
    "cgv.10.title": "10. Applicable law",
    "cgv.10.text":
      "These GTCs are subject to Ivorian law. In case of dispute, an amicable resolution will be preferred before any legal action.",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Got questions? We have gathered the most common answers here to guide you.",
    "faq.q1": "What does ArtiVisio offer?",
    "faq.a1": "ArtiVisio is a digital company specializing in sustainable employment support through professional coaching, profile enhancement, branding, and visibility tools creation.",
    "faq.q2": "Is it suitable for freelancers, students, or professionals?",
    "faq.a2": "Yes. Our services target all profiles: students entering the job market, recent graduates, freelancers, career changers, or experienced executives.",
    "faq.q3": "How to book a consultation?",
    "faq.a3": "You can book a free consultation from our site via the 'Strategic consultation' button. We will contact you afterwards to confirm.",
    "faq.q4": "What services are available?",
    "faq.a4": "Individual coaching, professional CV creation, optimized LinkedIn profiles, visual branding, digital portfolio, image strategy, and job advice.",
    "faq.q5": "Do you offer job opportunities?",
    "faq.a5": "Yes, we regularly publish qualified job offers. You can access them from your space or through the planned distribution channels.",
    "faq.q6": "How much do your services cost?",
    "faq.a6": "Prices vary according to needs. A personalized estimate is offered after consultation.",
    "faq.q7": "Is my data protected?",
    "faq.a7": "Yes. ArtiVisio respects your data confidentiality. No information is shared without your consent.",
    "faq.q8": "Can I unsubscribe or delete my account?",
    "faq.a8": "You can request to delete your account at any time with a simple written request.",
    "faq.q9": "Why do I need to have a consultation first?",
    "faq.a9": "The consultation allows us to assess your real needs, avoid unnecessary requests, and build a personalized proposal. It also guarantees seriousness of exchanges.",
    "faq.q10": "Can I call you directly?",
    "faq.a10": "No. All initial contacts are made through the website to frame the request and guide you efficiently.",
    "faq.q11": "Do you offer volunteering or free help?",
    "faq.a11": "Our services are professional and high value. However, some resources are offered for free, such as webinars or blog articles.",
    "faq.q12": "Can I send you my CV directly?",
    "faq.a12": "No. We do not accept unsolicited applications without process. Use the channels defined on the site to submit a need or apply.",
    "faq.q13": "I don't have WhatsApp, how can I contact you?",
    "faq.a13": "You can write to us via our contact form or by email. Contact details are available at the bottom of the page.",

    // Cookies
    "cookies.title": "Cookies Policy",
    "cookies.intro":
      "Our website uses cookies to improve your experience, analyze traffic, and offer personalized services.",
    "cookies.whatIs": "What is a cookie?",
    "cookies.whatIsDesc":
      "A cookie is a small file stored on your device when you visit a website. It collects information about your browsing.",
    "cookies.types": "Types of cookies used",
    "cookies.types.functional": "Functional cookies: essential for the proper functioning of the site.",
    "cookies.types.analytics": "Analytics cookies: used to track site usage (e.g., Google Analytics).",
    "cookies.types.marketing": "Marketing cookies: used to personalize ads if enabled.",
    "cookies.consent": "Your consent",
    "cookies.consentDesc":
      "On your first visit, a banner appears to obtain your consent. You can change your preferences at any time.",
    "cookies.disable": "Disabling cookies",
    "cookies.disableDesc":
      "You can configure your browser to refuse cookies, but this may affect some site functionalities.",
    "cookies.contact":
      "For any questions, contact us at: contact@artivisio.com",

    // Legal Notice
    "legal.title": "Legal Notice",
    "legal.section1.title": "1. Site Publisher",
    "legal.section1.content": "The site <strong>ArtiVisio</strong> is published by the company <strong>Artivisio SARL</strong>, registered with the Trade Register under number [to be completed], with its registered office located at [full address].",
    "legal.section2.title": "2. Publication Manager",
    "legal.section2.content": "Publication Director: [Name of responsible person]<br />Contact: [contact email]",
    "legal.section3.title": "3. Hosting",
    "legal.section3.content": "The site is hosted by: <br /><strong>[Hosting provider name]</strong><br />Address: [full address of hosting provider]<br />Phone: [number] – Website: [url]",
    "legal.section4.title": "4. Intellectual Property",
    "legal.section4.content": "All elements of the site (texts, images, graphics, logo, etc.) are protected by copyright law. Any reproduction or representation without authorization is prohibited.",
    "legal.section5.title": "5. Personal Data",
    "legal.section5.content": "Personal data collected via the site are processed in compliance with applicable regulations. For more information, please consult our <a href=\"/privacy-policy\" class=\"text-primary underline\">Privacy Policy</a>.",
    "legal.section6.title": "6. Cookies",
    "legal.section6.content": "The site uses cookies for functionality, statistics, or personalization purposes. For more details, please consult our <a href=\"/cookies\" class=\"text-primary underline\">Cookies Policy</a>.",
    "legal.section7.title": "7. Contact",
    "legal.section7.content": "For any questions or complaints, you can contact us at the following address: <br /><strong>[contact email]</strong>",

    // Privacy Policy
    "privacy.title": "Privacy Policy",
    "privacy.section1.title": "1. Data Collected",
    "privacy.section1.content": "Name, first name, email, phone, sector of activity, consulted offers, messages, and any information useful for coaching or recruitment.",
    "privacy.section2.title": "2. Data Use",
    "privacy.section2.content": "Your data is used to provide our services, improve your experience, notify you of offers or appointments, and ensure the proper functioning of the platform.",
    "privacy.section3.title": "3. Data Sharing",
    "privacy.section3.content": "We do not share your data with third parties without explicit consent, except to comply with legal or technical obligations.",
    "privacy.section4.title": "4. Security",
    "privacy.section4.content": "Your data is securely stored on protected servers. Regular audits are conducted to ensure confidentiality.",
    "privacy.section5.title": "5. Your Rights",
    "privacy.section5.content": "You can at any time request to view, correct or delete your data via: <a href=\"mailto:contact@artivisio.com\" class=\"text-primary font-medium underline ml-1\">contact@artivisio.com</a>",
    "privacy.section6.title": "6. Candidate Data",
    "privacy.section6.content": "Your application information is only visible to recruiters for the offers you choose. You can modify or withdraw your file at any time.",
    "privacy.section7.title": "7. Recruiter Data",
    "privacy.section7.content": "Recruiter accounts are protected, and information related to campaigns or interviews is never shared without consent.",

        
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("en")) {
      setLanguage("en");
    } else {
      setLanguage("fr");
    }
  }, []);

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
