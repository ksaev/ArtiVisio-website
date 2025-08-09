"use client"

import { motion } from "framer-motion"
import { Banknote,Coins,CreditCard,MapPin, Clock, DollarSign, Building, Search, Filter,Timer,TimerOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { useState,useEffect } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Share, View, Eye, Send } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import countries from "@/data/countries_full.json";
import sectors from "@/data/sectors.json"


  interface JobOffer {
    link: string
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
    expire: string
  }


export default function OffresEmploiPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null)

  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const searchParams = useSearchParams()



  // Charger les offres depuis l'API au montage
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs/get-offers")
        if (res.ok) {
          const data = await res.json()
          setJobOffers(data)
        } else {
          console.error("Erreur lors du chargement des offres")
        }
      } catch (err) {
        console.error("Erreur réseau:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  useEffect(() => {
    const idParam = searchParams.get("id")
    if (idParam && jobOffers.length > 0) {
      const id = Number(idParam)
      const job = jobOffers.find((j) => j.id === id)
      if (job) {
        setSelectedJob(job)
      }
    }
  }, [searchParams, jobOffers])

  const [origin, setOrigin] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin)
    }
  }, [])

  // Ensuite pour ton URL :
  const shareUrl = `${origin}/offres-emploi?id=${selectedJob?.id}`


  const filteredJobs = jobOffers.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === "all" || job.sector === selectedSector
    const matchesCountry = selectedCountry === "all" || job.countryId === selectedCountry
    return matchesSearch && matchesSector && matchesCountry
  })

  const getCountryLabel = (id: string): string => {
    const found = countries.find((c) => c.id === id);
    return found?.label || "Pays inconnu";
  };
  const getSectorLabel = (id: string): string => {
    const found = sectors.find((c) => c.id === id);
    return found?.label || "Secteur inconnu";
  };

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
  async function trackEvent(offerId: number, eventType: "click" | "share") {
    try {
      await fetch("/api/control/authentification/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: offerId, type: eventType }),
      });
    } catch (err) {
      console.error("Erreur tracking event", err);
    }
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // éviter les problèmes d'heure

  // Ajoute cette fonction pour tester expiration par job
  function isJobExpired(job: JobOffer): boolean {
    const [day, month, year] = job.expire.split("/");
    const expireDate = new Date(`${year}-${month}-${day}`);
    expireDate.setHours(0, 0, 0, 0);
    return expireDate < today;
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
      <section className=" p-6 bg-white/50">
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

        <div className="w-full flex flex-col items-center justify-center gap-4 py-2 px-2">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

          <p className="text-lg pb-6 text-center  text-gray-600 max-w-3xl">
            Vous avez repéré une offre mais vous hésitez sur votre CV, votre lettre ou votre profil ?
          </p>
          <a href="/coaching">
          <Button
            className="text-lg px-6 py-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-full transition-all duration-300"
          >
            Besoin d’aide pour postuler ?
          </Button>
          </a>
           </motion.div>
        </div>

        <div className="w-full flex bg-amber-200/50 flex-col items-center justify-center gap-4 py-2 px-2">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

          <p className="text-lg pb-6 text-center  text-gray-600 max-w-3xl">
            Publiez vos offres d'emploi et trouvez les meilleurs talents d'Afrique francophone.
          </p>
          <a href="/add-offres">
          <Button
            className="text-lg px-6 py-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-full transition-all duration-300"
          >
            Publier une offre d'emploi
          </Button>
          </a>
           </motion.div>
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
                        <CardTitle className="text-xl font-bold text-gray-800 mb-2">{job.title} <span className="text-red-800 font-bold"> ({isJobExpired(job) ? "Expirée" : "Active"}) </span></CardTitle> 
                        <div className="flex items-center text-amber-700 font-medium mb-2">
                          <Building className="h-4 w-4 mr-2" />
                          {job.company} 
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location ? job.location : "Lieu non spécifié"}, {getCountryLabel(job.countryId)}
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <Banknote className="h-4 w-4 mr-1" />
                              {job.salary ? job.salary : "Négociable"}    
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {job.type ? job.type : "Non precisé"}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <Timer className=" h-4 w-4 mr-1" />
                              {job.posted}   
                            </div>
                            <div className="flex text-red-600 items-center">
                              <TimerOff className=" h-4 w-4 mr-1" />
                              {job.expire}
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                          {getSectorLabel(job.sector)}
                        </span>
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
            <Link href="/add-offres">
            <Button className="bg-white text-amber-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Publier une offre
            </Button>
            </Link>
          </motion.div>
        </div>

        {/* ✅ MODALE */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
              {/* Fermer */}
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
              >
                &times;
              </button>

              <Link href="/services">
                <button
                  className=" top-4 sm:px-6 sm:absolute right-10 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-700 transition-colors"
                >
                  Besoin d'aide pour postuler ?
                </button>
              </Link>
          
              {/* Titre & infos */}
              <h2 className="text-2xl font-bold text-amber-700 mb-2 pt-8 ">
                {selectedJob.title} <span className="text-black font-bold"> ({isJobExpired(selectedJob) ? "Expirée" : "Active"}) </span>
              </h2>
                <p className="flex items-center text-amber-700 font-medium mb-2 text-sm">
                  <Building className="h-4 w-4 mr-2" />
                  {selectedJob.company}
                </p>
                  <p className="flex items-center mb-2 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedJob.location || "Lieu non spécifié"}, {getCountryLabel(selectedJob.countryId)}
                  </p>
                  <div className="flex items-center gap-4 mb-2">
                    <p className="flex items-center text-sm">
                      <Banknote className="h-4 w-4 mr-1" />
                        {selectedJob.salary ? selectedJob.salary : "Négociable"}
                    </p>
                    <p className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedJob.type}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mb-2 ">
                    <p className="flex items-center text-sm">
                      <Timer className=" h-4 w-4 mr-1" />
                      {selectedJob.posted}   
                    </p>
                    <p className="flex text-red-600 items-center text-sm">
                      <TimerOff className=" h-4 w-4 mr-1" />
                      {selectedJob.expire}
                    </p>
                  </div>
              
              <h4 className="font-semibold text-gray-800 pt-2">
                Description du poste :
              </h4>
              <div className="bg-amber-50/5 p-1 rounded-md">
                <p className="text-sm text-gray-700 mb-2 space-y-1">
                  {selectedJob.description}
                </p>
              </div>

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
                    {selectedJob.mail ? (
                      <a
                        className="w-full flex items-center justify-center"
                        href={`mailto:${selectedJob.mail}`}
                        onClick={async (e) => {
                          e.preventDefault();
                          await trackEvent(selectedJob.id, "click");
                          window.location.href = `mailto:${selectedJob.mail}`;
                        }}
                      >
                        <Send className="mr-2" style={{ width: "20px", height: "20px" }} />
                        Postuler
                      </a>
                    ) : selectedJob.link ? (
                      <a
                        className="w-full flex items-center justify-center"
                        href={selectedJob.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={async (e) => {
                          e.preventDefault();
                          await trackEvent(selectedJob.id, "click");
                          window.open(selectedJob.link, "_blank", "noopener");
                        }}
                      >
                        <Send className="mr-2" style={{ width: "20px", height: "20px" }} />
                        Postuler
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full flex items-center justify-center opacity-50 cursor-not-allowed"
                      >
                        <Send className="mr-2" style={{ width: "20px", height: "20px" }} />
                        Postuler
                      </button>
                    )}
                  </Button>


                <Button
                  className="border text-white border-amber-600 hover:bg-amber-500 rounded-full px-8"
                  onClick={async () => {
                    await trackEvent(selectedJob.id, "share")
                    if (navigator.share) {
                      navigator.share({
                        title: selectedJob.title,
                        text: selectedJob.description,
                        url: shareUrl,
                      })
                    } else {
                      navigator.clipboard.writeText(shareUrl)
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
