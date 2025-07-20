"use client"

import { motion } from "framer-motion"
import { Calendar, CheckCircle, Star, Users, TrendingUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function CoachingPage() {
  const { t } = useLanguage()

  const coachingServices = [
    {
      title: "Audit LinkedIn Complet",
      price: "3 000 FCFA",
      duration: "1 session - 1h",
      description: "Analyse détaillée de votre profil LinkedIn avec recommandations personnalisées",
      features: [
        "Analyse complète du profil",
        "Recommandations personnalisées",
        "Plan d'optimisation",
        "Rapport détaillé PDF",
      ],
    },
    {
      title: "Coaching LinkedIn Standard",
      price: "7 000 FCFA",
      duration: "2 sessions - 2h",
      description: "Accompagnement complet pour optimiser votre présence LinkedIn",
      features: [
        "Audit complet inclus",
        "2 sessions de coaching",
        "Optimisation du profil",
        "Stratégie de contenu",
        "Suivi pendant 1 mois",
      ],
      popular: true,
    },
    {
      title: "Coaching Carrière Premium",
      price: "15 000 FCFA",
      duration: "4 sessions - 4h",
      description: "Accompagnement global pour votre développement professionnel",
      features: [
        "Tout du plan Standard",
        "Stratégie de carrière",
        "Préparation entretiens",
        "Personal branding",
        "Suivi pendant 3 mois",
        "Accès groupe privé",
      ],
    },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Visibilité accrue",
      description: "Augmentez votre visibilité de 300% sur LinkedIn",
    },
    {
      icon: Users,
      title: "Réseau élargi",
      description: "Développez un réseau professionnel solide en Afrique",
    },
    {
      icon: Award,
      title: "Opportunités",
      description: "Accédez à plus d'opportunités d'emploi et de collaboration",
    },
  ]

  const testimonials = [
    {
      name: "Aminata Traoré",
      role: "Marketing Manager",
      company: "Orange Mali",
      text: "Grâce au coaching Artivisio, j'ai décroché mon poste actuel. Mon profil LinkedIn génère maintenant 5 fois plus de vues !",
      rating: 5,
    },
    {
      name: "Jean-Baptiste Kouassi",
      role: "Développeur",
      company: "MTN Côte d'Ivoire",
      text: "L'accompagnement personnalisé m'a permis de structurer ma stratégie LinkedIn. Résultat : 3 propositions d'emploi en 2 mois.",
      rating: 5,
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

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center bg-white/80 backdrop-blur-sm border-amber-200/50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="h-8 w-8 text-amber-700" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Coaching Services */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                Nos Formules
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez la formule qui correspond à vos besoins et votre budget
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {coachingServices.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`h-full relative ${
                    service.popular ? "border-2 border-amber-500 shadow-2xl scale-105" : "border-amber-200/50"
                  } bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Populaire
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800 mb-2">{service.title}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-amber-700">{service.price}</span>
                      <div className="text-sm text-gray-600 mt-1">{service.duration}</div>
                    </div>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-amber-600 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact">
                      <Button
                        className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                          service.popular
                            ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover:shadow-xl"
                            : "bg-white border-2 border-amber-600 text-amber-700 hover:bg-amber-50"
                        }`}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Réserver
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                Témoignages
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-amber-700 font-medium">{testimonial.role}</p>
                      <p className="text-gray-500 text-sm">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
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
              Réservez votre session de coaching et transformez votre présence LinkedIn dès aujourd'hui
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
