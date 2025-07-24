"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

import {
  Calendar,
  Award ,
  Target,
  Users,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  Briefcase,
  TrendingUp,
} from "lucide-react"


export default function CoachingPage() {
  const { t } = useLanguage()

  const services = [
    {
      icon: Target,
      title: "Orientation Carrière",
      description: "Définissez votre projet professionnel et identifiez les opportunités qui vous correspondent",
      features: [
        "Bilan de compétences approfondi",
        "Identification de vos motivations",
        "Cartographie des opportunités",
        "Plan d'action personnalisé",
      ],
      duration: "4+ séances",
    },
    {
      icon: FileText,
      title: "Optimisation CV & LinkedIn",
      description: "Créez des outils de candidature percutants qui mettent en valeur votre profil",
      features: [
        "Refonte complète de votre CV",
        "Optimisation profil LinkedIn",
        "Lettre de motivation type",
        "Portfolio professionnel",
      ],
      duration: "2+ séances",
    },
    {
      icon: MessageSquare,
      title: "Préparation Entretiens",
      description: "Maîtrisez l'art de l'entretien et maximisez vos chances de décrocher le poste",
      features: [
        "Simulation d'entretiens",
        "Techniques de communication",
        "Gestion du stress",
        "Négociation salariale",
      ],
      duration: "3+ séances",
    },
    {
      icon: TrendingUp,
      title: "Développement Leadership",
      description: "Développez vos compétences de leader et accélérez votre évolution professionnelle",
      features: ["Assessment 360°", "Plan de développement", "Coaching en situation", "Suivi personnalisé"],
      duration: "6+ séances",
    },
    {
      icon: Users,
      title: "Transition Professionnelle",
      description: "Réussissez votre reconversion ou changement de secteur en toute sérénité",
      features: [
        "Analyse de faisabilité",
        "Stratégie de transition",
        "Développement réseau",
        "Accompagnement changement",
      ],
      duration: "8+ séances",
    },
    {
      icon: Briefcase,
      title: "Lancement Freelance",
      description: "Lancez votre activité de freelance avec les bonnes bases et stratégies",
      features: ["Business plan freelance", "Stratégie tarifaire", "Prospection clients", "Outils et processus"],
      duration: "5+ séances",
    },
  ]

  const coachingProcess = [
    {
      step: "1",
      title: "Diagnostic Initial",
      description: "Évaluation de votre situation actuelle et définition de vos objectifs",
    },
    {
      step: "2",
      title: "Plan Personnalisé",
      description: "Création d'un programme sur mesure adapté à vos besoins spécifiques",
    },
    {
      step: "3",
      title: "Accompagnement",
      description: "Séances de coaching individuelles avec exercices pratiques et outils",
    },
    {
      step: "4",
      title: "Suivi & Ajustement",
      description: "Évaluation des progrès et ajustement du plan selon vos avancées",
    },
  ]

  const testimonials = [
    {
      name: "Marie-Claire Kouassi",
      role: "Chef de Projet IT",
      company: "Orange CI",
      content:
        "Grâce au coaching, j'ai obtenu une promotion en 6 mois et augmenté mon salaire de 35%. L'accompagnement était parfaitement adapté à mes besoins.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Seydou Traoré",
      role: "Consultant Indépendant",
      company: "Freelance",
      content:
        "Le programme de lancement freelance m'a permis de structurer mon activité. Je génère maintenant 3x plus de revenus qu'en salariat.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Aïcha Diallo",
      role: "Directrice Marketing",
      company: "Ecobank",
      content:
        "La préparation aux entretiens a été décisive. J'ai décroché le poste de mes rêves dès le premier entretien grâce aux techniques apprises.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const faqs = [
    {
      question: "Combien de temps dure un programme de coaching ?",
      answer:
        "La durée varie selon vos objectifs : de 2-3 séances pour l'optimisation CV à 8-10 séances pour une transition complète. Chaque programme est personnalisé.",
    },
    {
      question: "Les séances se déroulent-elles en présentiel ou à distance ?",
      answer:
        "Nous proposons les deux formats. Les séances à distance via visioconférence sont aussi efficaces et permettent plus de flexibilité.",
    },
    {
      question: "Proposez-vous des tarifs préférentiels ?",
      answer:
        "Oui, nous avons des tarifs étudiants (-30%) et des packages multi-services avec remises. Contactez-nous pour connaître nos offres actuelles.",
    },
    {
      question: "Comment choisir le bon programme de coaching ?",
      answer:
        "Nous commençons toujours par un entretien diagnostic gratuit de 30 minutes pour identifier vos besoins et vous orienter vers le programme le plus adapté.",
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
                Coaching LinkedIn
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Développez votre présence professionnelle et accélérez votre carrière en Afrique francophone
            </p>
          </motion.div>
        </div>
      </section>


      {/* Services de Coaching */}
      <section id="services" className="py-20 bg-gradient-to-br from-amber-50/50 to-stone-50/50">
          <div className="text-center mb-16 bg-white/50 w-full">
            <Badge variant="outline" className="mb-4">
              Nos Services
            </Badge>
            <h2 className=" m-5 text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Un accompagnement sur mesure pour chaque étape
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez le programme qui correspond à vos objectifs professionnels
            </p>
          </div>

        <div className="container mx-auto px-4 w-full">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gradient-to-br from-amber-50/50 to-stone-50/50">
            {services.map((service, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-amber-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-amber-700" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {service.duration}
                    </div>
                    {/*<div className="text-2xl font-bold text-primary">{service.price}</div>*/}
                    <Button className="rounded-full items-center justify-center bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 w-full">Choisir ce programme</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processus de Coaching */}
      <section className="py-20 bg-gradient-to-br from-amber-50/50 to-stone-50/50">
          <div className="text-center mb-16 bg-white/50 w-full">
            <Badge variant="outline" className="mb-4">
              Notre Méthode
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Comment se déroule votre coaching ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche structurée et personnalisée pour maximiser vos résultats
            </p>
          </div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coachingProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-gradient-to-br from-amber-50/50 to-stone-50/50 ">

          <div className="text-center mb-16 bg-white/50 w-full">
            <Badge variant="outline" className="mb-4">
              Témoignages
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ils ont transformé leur carrière</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Découvrez les success stories de nos clients</p>
          </div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-amber-50/50 to-stone-50/50">
         
          <div className="text-center mb-16 bg-white/50 w-full">
            <Badge variant="outline" className="mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
          </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Prêt à booster votre carrière ?</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Réservez votre session de coaching et donnez un nouvel élan à votre carrière dès aujourd’hui.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-amber-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Calendar className="mr-2 h-5 w-5" />
                Réserver ma session
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
