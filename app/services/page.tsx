"use client"

import { motion } from "framer-motion"
import { Presentation,Pencil, GraduationCap,FileText, Globe, Palette, Linkedin, Search, Server, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { LucideProps } from "lucide-react"

export default function ServicesPage() {
  const { t } = useLanguage()

  type ServiceType = {
    icon: React.FC<LucideProps>;
    title: string;
    description: string;
    price: string;
    features: string[];
    popular: boolean;
  };


  const services: ServiceType[] = [
    {
      icon: FileText,
      title: "CV Professionnels",
      description: "CV modernes et impactants optimisés pour le marché africain",
      price: "5 000 - 10 000 FCFA",
      features: [
        "Design professionnel et moderne",
        "Version PDF haute qualité",
        "Version web responsive",
        "Optimisé pour les ATS",
        "Adapté au marché africain",
        "Révisions incluses",
      ],
      popular: true,
    },
    {
      icon: Globe,
      title: "Portfolios Interactifs",
      description: "Sites web personnalisés pour présenter vos réalisations",
      price: "10 000 - 15 000 FCFA",
      features: [
        "Design responsive unique",
        "Galerie de projets interactive",
        "Page de contact intégrée",
        "SEO optimisé",
        "Hébergement inclus",
        "Formation à la gestion",
      ],
      popular: false,
    },
    {
      icon: Palette,
      title: "Branding Personnel",
      description: "Identité visuelle complète et pages de présentation",
      price: "8 000 - 12 000 FCFA",
      features: [
        "Logo professionnel",
        "Charte graphique complète",
        "Couleurs et typographies",
        "Cartes de visite digitales",
        "Templates réseaux sociaux",
        "Guidelines d'utilisation",
      ],
      popular: false,
    },
    {
      icon: Linkedin,
      title: "Coaching LinkedIn",
      description: "Accompagnement personnalisé pour optimiser votre profil",
      price: "7 000 FCFA",
      features: [
        "Audit complet du profil",
        "2 sessions de coaching",
        "Optimisation du profil",
        "Stratégie de contenu",
        "Techniques de networking",
        "Suivi pendant 1 mois",
      ],
      popular: true,
    },
    {
      icon: Search,
      title: "Pages Personnalisées",
      description: "Mini sites web pour votre présence professionnelle",
      price: "6 000 - 10 000 FCFA",
      features: [
        "Page de présentation",
        "Formulaire de contact",
        "Intégration réseaux sociaux",
        "Design mobile-first",
        "Nom de domaine inclus",
        "Hébergement 1 an",
      ],
      popular: false,
    },
    {
      icon: Server,
      title: "Hébergement & Support",
      description: "Solutions techniques complètes avec maintenance",
      price: "3 000 FCFA/mois",
      features: [
        "Hébergement haute performance",
        "Certificat SSL inclus",
        "Sauvegardes automatiques",
        "Support technique",
        "Mises à jour sécurité",
        "Monitoring 24/7",
      ],
      popular: false,
    },
  

  ]

  const bureau: ServiceType[] = [

    {
      icon: GraduationCap,
      title: "Coaching & Formations Personnalisées",
      description: "Développement professionnel sur-mesure pour étudiants, freelances et jeunes actifs",
      price: "À partir de 5 000 FCFA",
      features: [
        "Coaching carrière individuel (CV, entretien, projet pro)",
        "Ateliers pratiques : rédaction, branding, orientation",
        "Formations bureautique (Word, Excel, PowerPoint...)",
        "Formations digitales : Canva, Notion, outils IA",
        "Accompagnement en freelancing et création de profil",
        "Attestation incluse & suivi personnalisé"
      ],
      popular: false,
    },
    {
      icon: FileText, 
      title: "Structuration de Rapports",
      description: "Optimisez vos rapports (stage, mémoire, pro) avec une structure claire et impactante.",
      price: "5 000 - 12 000 FCFA",
      features: [
        "Mise en page professionnelle",
        "Hiérarchie claire (titres, sommaire, annexes)",
        "Relecture avec correction typographique",
        "Conseils de contenu & cohérence",
        "Formats Word & PDF livrés",
        "Option impression sur demande"
      ],
      popular: true,
    },

      {
    icon: Presentation,
    title: "Préparation de Présentations Pro",
    description: "Slides percutants pour soutenances, pitches ou réunions stratégiques.",
    price: "6 000 - 10 000 FCFA",
    features: [
      "Création ou refonte de présentation (PowerPoint / Canva)",
      "Visuels et infographies intégrés",
      "Alignement avec votre branding",
      "Animations légères et transitions clean",
      "Conseils à l’oral pour prise de parole impactante"
    ],
    popular: false,
   },
    {
    icon: Pencil, 
    title: "Documents Administratifs",
    description: "Rédaction claire et conforme de courriers, attestations et demandes officielles.",
    price: "3 000 - 6 000 FCFA",
    features: [
      "Rédaction professionnelle et structurée",
      "Respect du ton administratif / corporate",
      "Livraison en Word et PDF",
      "Possibilité de traduction FR ↔ EN",
      "Relecture et ajustement inclus"
    ],
    popular: false,
  }

  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

    // Composant générique pour afficher les cartes de services
  function ServiceCards({ items }: { items: ServiceType[] }) {
    return (
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((service, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card
              className={`h-full relative ${
                service.popular ? "border-2 border-amber-500 shadow-2xl" : "border-amber-200/50"
              } bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group hover:scale-105`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-4">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Populaire
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-amber-700" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-2">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 mb-4">{service.description}</CardDescription>
                <div className="text-2xl font-bold text-amber-700">{service.price}</div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <Check className="h-4 w-4 text-amber-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                    Commander maintenant
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50/50 to-stone-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                Nos Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes et accessibles pour votre réussite professionnelle en Afrique francophone
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bloc 1 : Services classiques */}
      <section className="py-20 ">
        <div className="text-center mb-16 bg-white/50 w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Boostez Votre Présence Professionnelle</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Offrez-vous une image professionnelle forte et moderne grâce à nos services conçus pour vous démarquer en ligne comme hors ligne. Idéal pour étudiants, freelances, jeunes pros et entrepreneurs.
          </p>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceCards items={services} />
        </div>
      </section>

      {/* Bloc 2 : Accompagnement bureautique */}
      <section className="py-20 bg-amber-50/50">
        <div className="text-center mb-16 w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Accompagnement Bureautique Professionnel</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structuration, présentation et rédaction administrative pour booster vos projets et communications professionnelles.
          </p>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceCards items={bureau} />
        </div>
      </section>

      {/* CTA final */}

       <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Besoin d'un service personnalisé ?</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Nous créons des solutions sur mesure adaptées à vos besoins spécifiques et à votre budget.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-amber-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Demander un devis gratuit
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>


    </div>
  )
}
