"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, DollarSign, Building, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Share, View, Eye, Send } from "lucide-react"
import Link from "next/link"


export default function OffresEmploiPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null)

  interface JobOffer {
    id: number
    title: string
    company: string
    location: string
    salary: string
    type: string
    sector: string
    description: string
    requirements: string[]
    posted: string
    countryId: string
    mail : string
  }

  const jobOffers: JobOffer[] = [
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
      countryId: "ci",
      mail : "contact@techcorp-abidjan.com"
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
      countryId: "ml",
      mail : "contact@orange-mali.com"
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
      countryId: "dak",
      mail : "contact@mckinsey-dakar.com"
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
      countryId: "ga",
      mail : "contact@total-energies-gabon.com"

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
      countryId: "ma",
      mail : "contact@schneider-electric-maroc.com"

    },
    {
      id: 6,
      title: "Data Analyst",
      company: "Jumia Technologies",
      location: "Niamey, Niger",
      salary: "400 000 - 700 000 FCFA",
      type: "CDI",
      sector: "tech",
      description: "Analyse de données e-commerce pour optimiser les performances",
      requirements: ["Python/R", "SQL", "Visualisation de données"],
      posted: "Il y a 5 jours",
      countryId: "ne",
      mail : "contact@jumia-technologies-niger.com"

    },
  ]

const sectors = [
  { id: "all", label: "Tous les secteurs" },
  { id: "tech", label: "Technologie / Développement" },
  { id: "marketing", label: "Marketing / Communication" },
  { id: "consulting", label: "Conseil / Stratégie" },
  { id: "rh", label: "Ressources Humaines / Recrutement" },
  { id: "commercial", label: "Commercial / Vente" },
  { id: "finance", label: "Finance / Comptabilité" },
  { id: "legal", label: "Juridique / Droit" },
  { id: "education", label: "Éducation / Formation" },
  { id: "logistics", label: "Logistique / Transport" },
  { id: "health", label: "Santé / Médical" },
  { id: "admin", label: "Administratif / Support" },
  { id: "design", label: "Design / Création" },
  { id: "engineering", label: "Ingénierie / BTP" },
  { id: "public", label: "Secteur Public / ONG" },
  { id: "agriculture", label: "Agriculture / Agro-industrie" },
  { id: "tourism", label: "Tourisme / Hôtellerie" },
  { id: "customer", label: "Relation Client / Support" },
  { id: "data", label: "Data / Intelligence Artificielle" },
  { id: "freelance", label: "Freelance / Indépendant" },
]


const countries = [
  { id: "all", label: "Tous les pays" },
  { id: "ci", label: "Côte d’Ivoire" },
  { id: "sn", label: "Sénégal" },
  { id: "ml", label: "Mali" },
  { id: "bf", label: "Burkina Faso" },
  { id: "ne", label: "Niger" },
  { id: "tg", label: "Togo" },
  { id: "bj", label: "Bénin" },
  { id: "gn", label: "Guinée" },
  { id: "cm", label: "Cameroun" },
  { id: "td", label: "Tchad" },
  { id: "ma", label: "Maroc" },
  { id: "dz", label: "Algérie" },
  { id: "tn", label: "Tunisie" },
  { id: "ga", label: "Gabon" },
  { id: "cd", label: "RDC (Congo)" },
  { id: "fr", label: "France" },
  { id: "ca", label: "Canada (Québec)" },
  { id: "be", label: "Belgique" },
  { id: "lu", label: "Luxembourg" },
  { id: "intl", label: "International / Télétravail" },
]



  const filteredJobs = jobOffers.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === "all" || job.sector === selectedSector
    const matchesCountry = selectedCountry === "all" || job.countryId === selectedCountry
    return matchesSearch && matchesSector && matchesCountry
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
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trouvez un emploi ou une mission freelance dans votre secteur, votre pays ou à distance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1 relative gap-4">
              <Search className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher un poste, entreprise ou ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

          <Select
            value={selectedSector}
            onValueChange={(value) => setSelectedSector(value)}
          >
            <SelectTrigger className="w-full sm:w-64 border-amber-600 focus:ring-amber-500">
              <Filter className="h-4 w-4 mr-2 text-amber-600" />
              <SelectValue placeholder="Filtrer par secteur" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector.id} value={sector.id}>
                  {sector.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedCountry}
            onValueChange={(value) => setSelectedCountry(value)}
          >
            <SelectTrigger className="w-full sm:w-64 border-amber-600 focus:ring-amber-500">
              <Filter className="h-4 w-4 mr-2 text-amber-600" />
              <SelectValue placeholder="Filtrer par pays" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          </motion.div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4 py-8 px-2">
          <p className="text-lg text-center text-gray-600 max-w-xl">
            Vous avez repéré une offre mais vous hésitez sur votre CV, votre lettre ou votre profil ?
          </p>
          <a href="/coaching">
          <Button
            className="text-lg px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-full transition-all duration-300"
          >
            Besoin d’aide pour postuler ?
          </Button>
          </a>
        </div>

      </section>

      {/* Jobs List */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 " variants={containerVariants} initial="hidden" animate="visible">
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
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Exigences :</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button onClick={() => setSelectedJob(job)} className="w-full justify-center bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-full transition-all duration-300">
                        <Eye className="mr-2" style={{ width: "30px", height: "30px" }} />
                        Voir l'offre complète
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
                  setSelectedCountry("all")
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

        {/* ✅ MODALE */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
              {/* Fermer */}
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
              >
                &times;
              </button>

              {/* Titre & infos */}
              <h2 className="text-2xl font-bold text-amber-700 mb-2">
                {selectedJob.title}
              </h2>
              <p className="text-sm text-gray-600 font-medium mb-1">
                {selectedJob.company} – {selectedJob.location}
              </p>
              <p className="text-sm flex items-center text-gray-600 font-medium mb-1">
                 <DollarSign className="h-4 w-4 mr-1" />{selectedJob.salary}
              </p>
              <p className="flex items-center text-sm text-gray-600 font-medium mb-1">
                 <Clock className="h-4 w-4 mr-1" />{selectedJob.type}
              </p>
              <p className="text-gray-700 mb-4">{selectedJob.description}</p>

              {/* Liste */}
              {selectedJob.requirements && (
                <>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Exigences :
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 mb-6 space-y-1">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* Boutons */}
              <div  className="grid grid-cols-2 gap-4 w-full sm:flex-row justify-center">
                    <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8">
                      <a className="w-full" href={`mailto:${selectedJob.mail}`}>
                        <Send className="mr-2" style={{ width: "20px", height: "20px" }}/> 
                        Postuler
                       </a>
                    </Button>
                <Button
                  className="border text-white border-amber-600 hover:bg-amber-500 rounded-full px-8"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: selectedJob.title,
                        text: selectedJob.description,
                        url: window.location.href,
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                      alert('Lien copié dans le presse-papiers !')
                    }
                  }}
                >
                  <Share className="mr-2" style={{ width: "20px", height: "20px" }} />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
    
  )
}
