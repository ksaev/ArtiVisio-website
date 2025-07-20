"use client"

import { motion } from "framer-motion"
import { FileText, Globe, Palette, Linkedin, Search, Server } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Services() {
  const services = [
    {
      icon: FileText,
      title: "CV Professionnels",
      description: "Création de CV modernes et impactants (PDF + Web) qui vous démarquent",
      features: ["Design personnalisé", "Format PDF et Web", "Optimisé ATS"],
    },
    {
      icon: Globe,
      title: "Portfolios Interactifs",
      description: "Portfolios web personnalisés pour mettre en valeur vos réalisations",
      features: ["Design responsive", "Galerie interactive", "SEO optimisé"],
    },
    {
      icon: Palette,
      title: "Identité Visuelle",
      description: "Création de votre branding personnel et pages de présentation",
      features: ["Logo & charte graphique", "Couleurs & typographies", "Guidelines"],
    },
    {
      icon: Linkedin,
      title: "Stratégie LinkedIn",
      description: "Création de contenu et stratégie pour optimiser votre présence",
      features: ["Profil optimisé", "Contenu engageant", "Stratégie de croissance"],
    },
    {
      icon: Search,
      title: "Landing Page Emploi",
      description: "Mini landing page dédiée à votre recherche d'emploi",
      features: ["Page de présentation", "Formulaire de contact", "Tracking des candidatures"],
    },
    {
      icon: Server,
      title: "Hébergement & Gestion",
      description: "Hébergement professionnel et maintenance sur mesure",
      features: ["Next.js & Vercel", "Base de données Supabase", "Support technique"],
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
    <section id="services" className="py-20 bg-white/50">
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
              Nos Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions complètes pour construire et développer votre présence professionnelle
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-white/80 backdrop-blur-sm border-amber-200/50 hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-amber-700" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
