"use client"

import { motion } from "framer-motion"
import { Presentation,Pencil, GraduationCap,FileText, Globe, Palette, Linkedin, Search, Server, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  Briefcase,
  LucideProps,
  Clock,
  ShieldCheck,
  Smartphone,
  Target,
  LayoutTemplate
} from "lucide-react"

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
      title: "CV Professionnels + LM",
      description: "CV modernes et impactants optimisés pour le marché africain",
      price: "3 000 - 10 000 FCFA",
      features: [
        "Design professionnel et moderne",
        "Version PDF haute qualité",
        "Version web responsive",
        "Optimisé pour les ATS",
        "Version en français et/ou en anglais",
        "Lettre de motivation offerte",
        "Révisions incluses",
      ],
      popular: true,
    },
    {
      icon: Globe,
      title: "Portfolios Interactifs",
      description: "Sites web personnalisés pour présenter vos réalisations",
      price: "10 000 - 25 000 FCFA",
      features: [
        "Design responsive unique",
        "Galerie de projets interactive",
        "Page de contact intégrée",
        "SEO optimisé",
        "3 mois d’hébergement & support offerts",
        "Formation à la gestion",
      ],
      popular: false,
    },
    {
      icon: Palette,
      title: "Branding Personnel",
      description: "Identité visuelle complète et pages de présentation",
      price: "8 000 - 35 000 FCFA",
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
      price: "6 000 - 15 000 FCFA",
      features: [
        "Page de présentation",
        "Formulaire de contact",
        "Intégration réseaux sociaux",
        "Design mobile-first",
        "3 mois d’hébergement & support offerts",
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
      icon: FileText, 
      title: "Structuration de Rapports",
      description: "Optimisez vos rapports (stage, mémoire, pro) avec une structure claire et impactante.",
      price: "5 000 - 20 000 FCFA",
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
      "Création ou refonte de présentation (PowerPoint)",
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
    price: "3 000 - 10 000 FCFA",
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


const points = [
  {
    title: "Image professionnelle",
    description:
      "Chaque document devient une vitrine. Digitaliser, c'est projeter sérieux, rigueur et crédibilité.",
    icon: Briefcase, // icône symbolisant le pro et le business
  },
  {
    title: "Gain de temps",
    description:
      "Tous vos fichiers sont centralisés, accessibles, modifiables et prêts à être partagés en un clic.",
    icon: Clock, // montre = rapidité, productivité
  },
  {
    title: "Sécurité & sauvegarde",
    description:
      "Vos documents sont protégés, sauvegardés automatiquement et accessibles à tout moment.",
    icon: ShieldCheck, // bouclier = protection
  },
  {
    title: "Accessibilité mobile/web",
    description:
      "Vos rapports, CV ou offres peuvent être consultés sur téléphone ou en ligne depuis n’importe où.",
    icon: Smartphone, // icône mobile pour l’accessibilité
  },
  {
    title: "Coaching stratégique inclus",
    description:
      "Nous vous aidons à choisir les bons formats, les bons moments, et à préparer vos diffusions.",
    icon: Target, // cible = stratégie, orientation
  },
  {
    title: "Design moderne & adapté",
    description:
      "Mise en page claire, typographies cohérentes, supports esthétiques et alignés à votre cible.",
    icon: LayoutTemplate, // layout/design visuel
  },
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

                <a href={`https://wa.me/22508976737?text=Bonjour%2C+je+veux+commander+le+service+de+${service.title}`} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                    Commander maintenant
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
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
      <section
        aria-labelledby="hero-services"
        className="relative w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-stone-100 via-amber-50/10 to-stone-200 overflow-hidden"
      >
        <h1 id="hero-services" className="sr-only">
          Services professionnels ArtiVisio : CV, Portfolio, Web et Branding
        </h1>

        {/* Image d’arrière-plan optimisée */}
        <div className="absolute inset-0">
          <Image
            src="/pages/services.jpg"
            alt="Nos services professionnels ArtiVisio – CV, portfolio, branding, web"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.9] contrast-[1.05] saturate-[1.05]"
          />
          {/* Overlay équilibré pour cohérence visuelle */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-800/40 to-transparent backdrop-brightness-[0.9]" />
        </div>

        {/* Contenu principal animé */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative z-10 text-center px-6 sm:px-8 md:px-12 py-20 sm:py-28 max-w-6xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
          >
            Donnez de la valeur à votre image professionnelle
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-6xl mx-auto leading-relaxed"
          >
            CV percutants, lettres de motivation convaincantes, portfolios élégants,
            pages web soignées… <br className="hidden sm:block" />
            <span className="text-amber-300 font-semibold">
              ArtiVisio structure vos ambitions, valorise votre profil et révèle votre
              potentiel professionnel.
            </span>
          </motion.p>

          {/* CTA double aligné */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#services"
              className="inline-block bg-amber-600 hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
            >
              Explorer nos services
            </a>

            <a
              href="https://wa.me/22508976737?text=Bonjour,+je+souhaite+un+accompagnement+personnalisé+pour+mes+services+ArtiVisio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-amber-500 text-amber-200 hover:bg-amber-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 font-semibold px-8 py-3 rounded-xl transition-all duration-300"
            >
              Parler à un conseiller
            </a>
          </motion.div>
        </motion.div>

        {/* Dégradé bas élégant pour transition fluide */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-stone-100 via-amber-50/30 to-transparent pointer-events-none" />
      </section>

        <div className="text-center mb-0 p-8 bg-white/50 w-full px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center"
          >
            Votre image professionnelle est-elle à la hauteur de vos ambitions ?
          </motion.h2>
        </div>


    <section className="bg-muted/40 py-16 bg-gradient-to-br from-amber-50/50 to-stone-50/50">
      <Container className="space-y-16 max-w-6xl">
        {/* Bloc image + texte */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center gap-10"
        >
          {/* Image gauche */}
          <div className="relative flex justify-center sm:flex-1">
            <div className="relative before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-tr before:from-amber-200/40 before:to-amber-50/20 rounded-2xl p-4 bg-white/70 backdrop-blur-xl shadow-lg shadow-amber-100/50 hover:rotate-1 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500">
              <Image
                src="/ScanSolution.webp"
                alt="Solutions digitales ArtiVisio"
                width={340}
                height={340}
                className="rounded-xl object-contain relative z-10"
              />
            </div>
          </div>

          {/* Texte droite */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-primary">
              Des documents qui parlent pour vous.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              <span className="text-amber-500 font-bold">
                CV, rapports, présentations, lettres de motivation, portfolios,
                dossiers de candidature, supports administratifs ou commerciaux…
              </span>
              <br />
              Chez <span className="font-bold text-primary">ArtiVisio</span>, nous
              valorisons tous les documents qui portent votre image professionnelle.
              Chaque livrable est pensé pour convaincre, structurer votre message et
              projeter une image de rigueur, de clarté et d’ambition.
            </p>
          </div>
        </motion.div>

        {/* Bloc titre central */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center px-4"
        >
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            Pourquoi nos clients ne reviennent jamais en arrière ?
          </h2>
        </motion.div>

        {/* Bloc points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl px-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {points.map((point, index) => {
              const Icon = point.icon
              return (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-white to-amber-50/30 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-7 w-7 text-amber-600 group-hover:text-primary transition-colors" />
                    <h3 className="text-lg font-semibold relative group-hover:text-primary transition-colors">
                      {point.title}
                      <span className="block w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
   
      {/* Bloc 1 : Services classiques */}
      <section id="tarifs" className="py-20 ">
         <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
        <div className="text-center mb-16 p-8 bg-white/50 w-full px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Boostez Votre Présence Professionnelle</h2>
           <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto text-muted-foreground"
        >
            Offrez-vous une image professionnelle forte et moderne grâce à nos services conçus pour vous démarquer en ligne comme hors ligne. Idéal pour étudiants, freelances, jeunes pros et entrepreneurs.
        </motion.p>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceCards items={services} />
        </div>
        </motion.div>
      </section>

      {/* Bloc 2 : Accompagnement bureautique */}
      <section className="py-20 bg-amber-50/50">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
        <div className="text-center mb-16 p-8 bg-white/50 w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Accompagnement Bureautique Professionnel</h2>
           <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto text-muted-foreground"
          >
              Structuration, présentation et rédaction administrative pour booster vos projets et communications professionnelles.
          </motion.p>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceCards items={bureau} />
        </div>
       </motion.div>

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
            <h2 className="text-3xl lg:text-4xl font-bold mb-6"> Besoin d’un accompagnement stratégique ?</h2>
            <p className="text-center sm:text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
              Nos programmes de coaching vous aident à franchir un cap : valoriser votre profil, réussir vos candidatures, clarifier vos projets ou structurer votre activité. Un accompagnement 100 % sur mesure, à votre rythme.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-amber-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Découvrir nos offres de coaching
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>


    </div>
  )
}
