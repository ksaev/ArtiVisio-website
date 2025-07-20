"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, DollarSign, Building, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"

export default function OffresEmploiPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")

  const jobOffers = [
    {
      id: 1,
      title: "Développeur Full-Stack",
      company: "TechCorp Abidjan",
      location: "Abidjan, Côte d'Ivoire",
      salary: "800 000 - 1 200 000 FCFA",
      type: "CDI",
      sector: "tech",
      description: "Recherche développeur expérimenté en React/Node.js pour projets innovants",
      requirements: ["3+ ans d'expérience", "React, Node.js", "Base de données"],
      posted: "Il y a 2 jours",
    },
    {
      id: 2,
      title: "Chef de Projet Marketing",
      company: "Orange Mali",
      location: "Bamako, Mali",
      salary: "600 000 - 900 000 FCFA",
      type: "CDI",
      sector: "marketing",
      description: "Pilotage de campagnes marketing digital pour le marché malien",
      requirements: ["5+ ans marketing", "Digital marketing", "Gestion d'équipe"],
      posted: "Il y a 1 jour",
    },
    {
      id: 3,
      title: "Consultant en Stratégie",
      company: "McKinsey Dakar",
      location: "Dakar, Sénégal",
      salary: "1 000 000 - 1 500 000 FCFA",
      type: "CDI",
      sector: "consulting",
      description: "Accompagnement stratégique d'entreprises ouest-africaines",
      requirements: ["MBA ou équivalent", "Consulting", "Anglais courant"],
      posted: "Il y a 3 jours",
    },
    {
      id: 4,
      title: "Responsable RH",
      company: "Total Energies",
      location: "Libreville, Gabon",
      salary: "700 000 - 1 000 000 FCFA",
      type: "CDI",
      sector: "rh",
      description: "Gestion RH pour filiale gabonaise, recrutement et formation",
      requirements: ["Master RH", "5+ ans expérience", "Gestion d'équipe"],
      posted: "Il y a 1 semaine",
    },
    {
      id: 5,
      title: "Ingénieur Commercial",
      company: "Schneider Electric",
      location: "Casablanca, Maroc",
      salary: "500 000 - 800 000 FCFA",
      type: "CDI",
      sector: "commercial",
      description: "Développement commercial secteur énergie et infrastructure",
      requirements: ["Ingénieur", "Commercial B2B", "Mobilité régionale"],
      posted: "Il y a 4 jours",
    },
    {
      id: 6,
      title: "Data Analyst",
      company: "Jumia Technologies",
      location: "Lagos, Nigeria",
      salary: "400 000 - 700 000 FCFA",
      type: "CDI",
      sector: "tech",
      description: "Analyse de données e-commerce pour optimiser les performances",
      requirements: ["Python/R", "SQL", "Visualisation de données"],
      posted: "Il y a 5 jours",
    },
  ]

  const sectors = [
    { id: "all", label: "Tous les secteurs" },
    { id: "tech", label: "Technologie" },
    { id: "marketing", label: "Marketing" },
    { id: "consulting", label: "Conseil" },
    { id: "rh", label: "Ressources Humaines" },
    { id: "commercial", label: "Commercial" },
  ]

  const filteredJobs = jobOffers.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === "all" || job.sector === selectedSector
    return matchesSearch && matchesSector
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
                Offres d'Emploi
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les meilleures opportunités d'emploi en Afrique francophone
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher un poste, entreprise ou ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {sectors.map((sector) => (
                <Button
                  key={sector.id}
                  variant={selectedSector === sector.id ? "default" : "outline"}
                  size="sm"
                  className={`transition-all duration-300 ${
                    selectedSector === sector.id
                      ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
                      : "border-amber-600 text-amber-700 hover:bg-amber-50"
                  }`}
                  onClick={() => setSelectedSector(sector.id)}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  {sector.label}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            {filteredJobs.map((job) => (
              <motion.div key={job.id} variants={itemVariants}>
                <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-800 mb-2">{job.title}</CardTitle>
                        <div className="flex items-center text-amber-700 font-medium mb-2">
                          <Building className="h-4 w-4 mr-2" />
                          {job.company}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.type}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                          {job.sector}
                        </span>
                        <p className="text-xs text-gray-500 mt-2">{job.posted}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Exigences :</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-full transition-all duration-300">
                        Postuler maintenant
                      </Button>
                      <Button
                        variant="outline"
                        className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-full bg-transparent"
                      >
                        Sauvegarder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredJobs.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-600 text-lg">Aucune offre trouvée pour ces critères.</p>
              <Button
                variant="outline"
                className="mt-4 border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedSector("all")
                }}
              >
                Réinitialiser les filtres
              </Button>
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Vous recrutez ?</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Publiez vos offres d'emploi et trouvez les meilleurs talents d'Afrique francophone
            </p>
            <Button className="bg-white text-amber-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Publier une offre
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
