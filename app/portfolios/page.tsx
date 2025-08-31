"use client"

import { motion } from "framer-motion"
import { ExternalLink, Eye, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { useState } from "react"

export default function PortfoliosPage() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState("all")


  const portfolioItems = [
    {
      id: 1,
      title: "Full-stack Developer & UI/UX",
      client: "Alex Martin",
      category: "portfolio",
      image: "/projet-freelance.png",
      description: "Portfolio immersif et interactif valorisant l’expertise digitale avec animations fluides et design premium.",
      link: "https://alex-martin.artivisio.com",
      tags: ["Website", "Consulting", "Landing"],

    },
    {
      id: 2,
      title: "CV Commercial",
      client: "Franck Olivier",
      category: "cv",
      image: "/CVP.webp",
      description: "CV moderne et percutant avec présentation claire des projets et compétences interactives.",
      link: "/CVP.webp",
      tags: ["Website", "Consulting", "Landing"],

    },
    {
      id: 3,
      title: "CV Moderne ",
      client: "Malick Sow",
      category: "cv",
      image: "/CVPro.jpg",
      description: "CV élégant en anglais pensé pour l’impact international et une présentation professionnelle soignée.",
      link: "/CVPro.jpg",
      tags: ["Website", "Consulting", "Landing"],

    },

    {
      id: 4,
      title: "CV Moderne Anglais",
      client: "Samira Benali",
      category: "cv",
      image: "/CV-F.webp",
      description: "CV élégant en anglais pensé pour l’impact international et une présentation professionnelle soignée.",
      link: "/CV-F.webp",
      tags: ["Website", "Consulting", "Landing"],

    },

    {
      id: 5,
      title: "Carte Connectée - ArtiVisio",
      client: "ArtiVisio",
      category: "branding",
      image: "/carte-arti.webp",
      description: "Carte de visite premium avec QR Code intégré offrant un accès instantané aux services ArtiVisio.",
      link: "carte-visite.webp",
      tags: ["Website", "Consulting", "Landing"],

    },

    {
      id: 6,
      title: "Lettre de motivation Moderne ",
      client: "Jean François",
      category: "LM",
      image: "/images/realisations/LmPro.jpg",
      description: "Lettre de motivation pour une présentation professionnelle soignée et impactante",
      link: "/documents/realisations/Lettre_de_Motivation_jean_francois__.pdf",
      tags: ["Website", "Consulting", "Landing"],

    },
    {
      id: 7,
      title: "Experte RH & Capital Humain  ",
      client: "Samira Benali",
      category: "portfolio",
      image: "/portfolioFemmeBlanc.webp",
      description: "Portfolio clair et raffiné mettant en valeur l’expérience et la crédibilité en recrutement.",
      link: "https://samira-benali.artivisio.com/",
      tags: ["Website", "Consulting", "Landing"],

    },
    {
      id: 8,
      title: "Présentation Interactive & Dynamique",
      client: "ArtiVisio",
      category: "presentation",
      image: "/images/presentation/slide.png",
      description: "Diaporama fluide avec animations, graphiques et contact, conçu pour capter l’attention et convertir.",
      link: "https://dev.artivisio.com/presentation/slide/artivisio",
      tags: ["Website", "Consulting", "Landing"],

    },

    {
      id: 9,
      title: "CV Professionnel Moderne ",
      client: "Henri Felix",
      category: "cv",
      image: "images/realisations/CV_HENRI_FELIX.jpg",
      description: "CV élégant en anglais pensé pour l’impact international et une présentation professionnelle soignée.",
      link: "images/realisations/CV_HENRI_FELIX.jpg",
      tags: ["Website", "Consulting", "Landing"],

    },

  ];


  const filters = [
    { id: "all", label: "Tous les projets" },
    { id: "cv", label: "CV" },
    { id: "LM", label: "Lettre de Motivation" },
    { id: "portfolio", label: "Portfolios" },
    { id: "branding", label: "Branding" },
    { id: "presentation", label: "Présentation" },
  ]

  const filteredItems =
    activeFilter === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      <section className="py-20 bg-gradient-to-br from-amber-50/50 to-stone-50/50 pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                Nos Réalisations
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez quelques-unes de nos créations qui ont aidé nos clients à se démarquer professionnellement en Afrique
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg"
                    : "border-amber-600 text-amber-700 hover:bg-amber-50"
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {filter.label}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeFilter}
          >
            {filteredItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-amber-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                            <a
                              href={item.link}
                              target="_self"
                              className="inline-flex items-center px-3 py-1.5 bg-white/90 text-gray-800 hover:bg-white text-sm rounded"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </a>
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 bg-white/90 text-gray-800 hover:bg-white text-sm rounded"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Visiter
                            </a>
                          </div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-amber-700 font-medium mb-3">{item.client}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-600 text-lg">Aucun projet trouvé pour cette catégorie.</p>
            </motion.div>
          )}
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Prêt à créer votre projet ?</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Rejoignez nos clients satisfaits et donnez vie à votre vision professionnelle
            </p>
            <Button className="bg-white text-amber-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Commencer mon projet
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
