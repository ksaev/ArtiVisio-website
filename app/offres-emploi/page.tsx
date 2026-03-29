"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation"; // ✅ assure-toi d'importer

import {
  Building,
  MapPin,
  Banknote,
  Clock,
  Timer,
  TimerOff,
  Eye,
  Share,
  Send,
} from "lucide-react";

import { useLanguage } from "@/contexts/language-context";

import countries from "@/data/countries_full.json";
import sectors from "@/data/sectors.json";

interface JobOffer {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  sector: string;
  description: string;
  requirements: string[];
  posted: string;
  countryId: string;
  mail?: string;
  link?: string;
  expire: string;
}

export default function OffresEmploiPage() {
  const { t } = useLanguage();
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const [origin, setOrigin] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  function slugify(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  // Fetch jobs
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs/get-offers", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const parsed: JobOffer[] = data.map((job: any) => ({
            ...job,
            requirements: Array.isArray(job.requirements)
              ? job.requirements
              : (job.requirements || "").split("\n"),
            description: job.description || "",
          }));
          setJobOffers(parsed);
        }
      } catch (err) {
        console.error("Erreur fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Set origin
  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  const shareUrl = `${origin}/offres-emploi`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function isJobExpired(job: JobOffer) {
    if (!job.expire) return false;

    // Si expire est en DD/MM/YYYY
    const [day, month, year] = job.expire.split("/");
    const expireDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      23,
      59,
      59,
    );

    const now = new Date();
    return now > expireDate;
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

  const filteredJobs = jobOffers.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector =
      selectedSector === "all" || job.sector === selectedSector;
    const matchesCountry =
      selectedCountry === "all" || job.countryId === selectedCountry;
    return matchesSearch && matchesSector && matchesCountry;
  });

  const getCountryLabel = (id: string) =>
    countries.find((c) => c.id === id)?.label || "Pays inconnu";
  const getSectorLabel = (id: string) =>
    sectors.find((c) => c.id === id)?.label || "Secteur inconnu";

  const jobSchema = selectedJob
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: selectedJob.title,
        description: selectedJob.description,
        datePosted: selectedJob.posted,
        validThrough: selectedJob.expire,
        employmentType: selectedJob.type,
        hiringOrganization: {
          "@type": "Organization",
          name: selectedJob.company,
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: selectedJob.location,
            addressCountry: selectedJob.countryId,
          },
        },
      }
    : null;

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Chargement des offres...
      </div>
    );

  return (
    <div className="min-h-screen">
      {jobSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
        />
      )}

      {/* HERO */}
      <section className="py-20 bg-gradient-to-br from-amber-50/50 to-stone-50/50 pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Offres d'Emploi en Afrique et en Remote
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Trouvez un emploi ou une mission freelance dans votre secteur, votre
            pays ou à distance.
          </motion.p>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <Card className="flex flex-col justify-between h-[470px] bg-white/80 backdrop-blur-sm border-amber-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden sm:h-[490px]">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                          {job.title}{" "}
                          <span
                            className={`font-bold ${
                              isJobExpired(job)
                                ? "text-red-800"
                                : "text-green-700"
                            }`}
                          >
                            ({isJobExpired(job) ? "Expirée" : "Active"})
                          </span>
                        </CardTitle>
                        <p className="flex items-center text-amber-700 font-medium mb-2">
                          <Building className="h-4 w-4 mr-2" />
                          {job.company}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <p className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location || "Lieu non spécifié"},{" "}
                            {getCountryLabel(job.countryId)}
                          </p>
                          <p className="flex items-center">
                            <Banknote className="h-4 w-4 mr-1" />
                            {job.salary || "Négociable"}
                          </p>
                          <p className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.type || "Non précisé"}
                          </p>
                          <p className="flex items-center">
                            <Timer className="h-4 w-4 mr-1" />
                            {job.posted}
                          </p>
                          <p className="flex items-center text-red-600">
                            <TimerOff className="h-4 w-4 mr-1" />
                            {job.expire}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                          {getSectorLabel(job.sector)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-grow">
                    <div className="flex-grow overflow-hidden">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Exigences :
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 line-clamp-3 overflow-hidden sm:line-clamp-4">
                        {job.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <Button
                        className="w-full justify-center bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() =>
                          router.push(
                            `/offres-emploi/${job.id}-${slugify(job.title)}`,
                          )
                        }
                      >
                        <Eye className="mr-2" /> Voir l'offre complète
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
              <p className="text-gray-600 text-lg">
                Aucune offre trouvée pour ces critères.
              </p>
              <Button
                variant="outline"
                className="mt-4 border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSector("all");
                  setSelectedCountry("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Vous recrutez ?</h2>
        <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
          Publiez vos offres d'emploi et trouvez les meilleurs talents au monde.
        </p>
        <Link href="/add-offres">
          <Button className="bg-white text-amber-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Publier une offre
          </Button>
        </Link>
      </section>

      {/* Job Modal */}
      {selectedJob && modalOpened && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setModalOpened(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpened(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-amber-700 mb-2 pt-8">
              {selectedJob.title}{" "}
              <span className="text-black font-bold">
                ({isJobExpired(selectedJob) ? "Expirée" : "Active"})
              </span>
            </h2>
            <p className="flex items-center text-amber-700 font-medium mb-2 text-sm">
              <Building className="h-4 w-4 mr-2" />
              {selectedJob.company}
            </p>
            <p className="flex items-center mb-2 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {selectedJob.location}, {getCountryLabel(selectedJob.countryId)}
            </p>

            <div className="flex items-center gap-4 mb-2">
              <p className="flex items-center text-sm">
                <Banknote className="h-4 w-4 mr-1" />
                {selectedJob.salary || "Négociable"}
              </p>
              <p className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {selectedJob.type || "Non précisé"}
              </p>
            </div>

            <h4 className="font-semibold text-gray-800 pt-2">
              Description du poste :
            </h4>
            <div className="bg-amber-50/5 p-1 rounded-md mb-6">
              {selectedJob.description.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <h4 className="font-semibold text-gray-800 mb-2">Exigences :</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-6 space-y-1">
              {selectedJob.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-4 w-full sm:flex-row justify-center">
              {/* Postuler */}
              <Button
                asChild
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8"
              >
                {selectedJob.mail ? (
                  <a
                    href={`mailto:${selectedJob.mail}`}
                    onClick={async (e) => {
                      e.preventDefault();
                      await trackEvent(selectedJob.id, "click");
                      window.location.href = `mailto:${selectedJob.mail}`;
                    }}
                    className="w-full flex items-center justify-center"
                  >
                    <Send className="mr-2" /> Postuler
                  </a>
                ) : selectedJob.link ? (
                  <a
                    href={selectedJob.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={async (e) => {
                      e.preventDefault();
                      await trackEvent(selectedJob.id, "click");
                      window.open(selectedJob.link, "_blank", "noopener");
                    }}
                    className="w-full flex items-center justify-center"
                  >
                    <Send className="mr-2" /> Postuler
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full flex items-center justify-center opacity-50 cursor-not-allowed"
                  >
                    <Send className="mr-2" />
                    Postuler
                  </button>
                )}
              </Button>

              {/* Partager */}
              <Button
                className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold rounded-full px-8 hover:opacity-90 shadow-md"
                onClick={async () => {
                  await trackEvent(selectedJob.id, "share");
                  const shareText = `💼 *${selectedJob.title}*\n🏢 ${selectedJob.company}\n📍 ${selectedJob.location}, ${getCountryLabel(
                    selectedJob.countryId,
                  )}\n🚀 Découvre cette opportunité ! 👇\n`;
                  if (navigator.share) {
                    navigator.share({
                      title: selectedJob.title,
                      text: shareText,
                      url: shareUrl,
                    });
                  } else {
                    await navigator.clipboard.writeText(shareText);
                    alert(
                      "✅ Lien de l’offre copié ! Partage-le autour de toi ✨",
                    );
                  }
                }}
              >
                <Share className="mr-2" /> Partager
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
