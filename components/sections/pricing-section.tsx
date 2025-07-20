"use client"

import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function PricingSection() {
  const { t } = useLanguage()

  const plans = [
    {
      name: t("pricing.starter"),
      price: "5 000",
      period: "",
      description: "CV simple, Web, hébergement, 0 modif",
      features: [
        "CV professionnel PDF",
        "Version web responsive",
        "Hébergement 1 an",
        "Design moderne",
        "Optimisé ATS",
      ],
      popular: false,
      cta: t("pricing.order"),
    },
    {
      name: t("pricing.standard"),
      price: "10 000",
      period: "",
      description: "CV + Portfolio personnalisé",
      features: [
        "Tout du plan Starter",
        "Portfolio web interactif",
        "Galerie de projets",
        "Page de contact",
        "SEO optimisé",
        "Support 3 mois",
      ],
      popular: true,
      cta: t("pricing.order"),
    },
    {
      name: t("pricing.premium"),
      price: "15 000",
      period: t("pricing.lifetime"),
      description: "CV + Portfolio + Page perso + Accès à vie",
      features: [
        "Tout du plan Standard",
        "Page branding personnelle",
        "Identité visuelle complète",
        "Hébergement à vie",
        "Mises à jour incluses",
        "Pas de support technique",
      ],
      popular: false,
      cta: t("pricing.order"),
    },
    {
      name: t("pricing.coaching"),
      price: "7 000",
      period: "",
      description: "Audit + 2 sessions + Profil optimisé",
      features: [
        "Audit complet LinkedIn",
        "2 sessions de coaching",
        "Optimisation profil",
        "Stratégie de contenu",
        "Suivi 1 mois",
      ],
      popular: false,
      cta: t("pricing.contact"),
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
              Nos Tarifs
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des prix accessibles en FCFA pour l'Afrique francophone
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={`h-full relative ${
                  plan.popular
                    ? "border-2 border-amber-500 shadow-2xl scale-105"
                    : "border-amber-200/50 hover:shadow-xl"
                } bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Populaire
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-amber-700">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{t("pricing.fcfa")}</span>
                    {plan.period && <div className="text-sm text-amber-600 font-medium mt-1">{plan.period}</div>}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-amber-600 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.cta === t("pricing.contact") ? "/contact" : "/services"}>
                    <Button
                      className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover:shadow-xl"
                          : "bg-white border-2 border-amber-600 text-amber-700 hover:bg-amber-50"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
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
          <p className="text-gray-600 mb-4">
            Tous nos prix sont en Francs CFA. Paiement sécurisé par Mobile Money ou virement bancaire.
          </p>
          <Link href="/contact">
            <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent">
              Demander un devis personnalisé
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
