"use client"

import { motion } from "framer-motion"
import { ExternalLink, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function Portfolio() {
  const portfolioItems = [
    {
      id: 1,
      title: "Portfolio Digital Manager",
      client: "SIEBE KOUASSI",
      category: "Portfolio Web",
      image: "/p-presentation.png",
      description: "Portfolio interactif pour Digital Manager avec galerie de projets et animations modernes",
      link: "https://portfolio.artivisio.com",
    },
    {
      id: 2,
      title: "CV Développeur Full-Stack",
      client: "Thomas Martin",
      category: "CV Professionnel",
      image: "/CVP.webp",
      description: "CV moderne et technique avec section projets et compétences interactives",
      link: "/CVP.webp",
    },
    {
      id: 3,
      title: "Identité Visuelle Startup",
      client: "TechFlow",
      category: "Branding",
      image: "/carte-arti.png",
      description: "Création complète d'identité visuelle pour startup technologique",
      link: "carte-visite.webp",
    },
    {
      id: 4,
      title: "Landing Page Consultant",
      client: "Pierre Rousseau",
      category: "Site Web",
      image: "/placeholder.svg?height=300&width=400",
      description: "Page de présentation professionnelle pour consultant en stratégie",
      link: "#",
    },
    {
      id: 5,
      title: "Portfolio Photographe",
      client: "Sophie Laurent",
      category: "Portfolio Web",
      image: "/placeholder.svg?height=300&width=400",
      description: "Galerie photo immersive avec système de filtres et lightbox",
      link: "#",
    },
    {
      id: 6,
      title: "CV Créatif Marketing",
      client: "Lucas Bernard",
      category: "CV Professionnel",
      image: "/CVpro.webp",
      description: "CV créatif pour professionnel du marketing avec infographies",
      link: "/CVpro.webp",
    },
  ]

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
    <section id="portfolio" className="py-20 bg-gradient-to-br from-amber-50/50 to-stone-50/50">
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
              Nos Réalisations
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez quelques-unes de nos créations qui ont aidé nos clients à se démarquer
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {portfolioItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-amber-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={200}
                    height={100}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                      className="inline-flex items-center px-3 py-1.5 border border-white/90 bg-white/90 text-gray-800 hover:bg-white text-sm rounded"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visiter
                    </a>
                  </div>

                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-amber-700 font-medium mb-3">{item.client}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
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
          <Link href="/portfolios">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Voir plus de réalisations
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
