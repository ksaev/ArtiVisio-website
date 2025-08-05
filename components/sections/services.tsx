"use client"

import { motion } from "framer-motion"
import { FileText, Globe, Palette, Linkedin, Search, Server } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Services() {
  const { t } = useLanguage()

  const services = [
    {
      icon: FileText,
      title: t("services.cv.title"),
      description: t("services.cv.desc"),
      features: ["Design personnalisé", "Format PDF et Web", "Optimisé ATS"],
    },
    {
      icon: Globe,
      title: t("services.portfolio.title"),
      description: t("services.portfolio.desc"),
      features: ["Design responsive", "Galerie interactive", "SEO optimisé"],
    },
    {
      icon: Palette,
      title: t("services.branding.title"),
      description: t("services.branding.desc"),
      features: ["Logo & charte graphique", "Couleurs & typographies", "Guidelines"],
    },
    {
      icon: Linkedin,
      title: t("services.coaching.title"),
      description: t("services.coaching.desc"),
      features: ["Profil optimisé", "Contenu engageant", "Stratégie de croissance"],
    },
    {
      icon: Search,
      title: t("services.landing.title"),
      description: t("services.landing.desc"),
      features: ["Page de présentation", "Formulaire de contact", "Tracking des candidatures"],
    },
    {
      icon: Server,
      title: t("services.hosting.title"),
      description: t("services.hosting.desc"),
      features: ["Next.js & Vercel", "Base de données Supabase","Maintenance et mises à jour", "Support technique"],
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
              {t("services.title")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("services.subtitle")}</p>
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

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/services">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Voir tous nos services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>

    
  )
}
