"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Building,
  MapPin,
  Banknote,
  Clock,
  TimerOff,
  Send,
  Share,
  Mail,
  Link,
} from "lucide-react";
import Image from "next/image";

import countries from "@/data/countries_full.json";

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

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function trackEvent(offerId: number, eventType: "click" | "share") {
  try {
    await fetch("/api/control/authentification/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: offerId,
        type: eventType,
      }),
    });
  } catch (err) {
    console.error(err);
  }
}

export default function JobOfferPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const [suggestedJobs, setSuggestedJobs] = useState<JobOffer[]>([]);
  const [job, setJob] = useState<JobOffer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const id = Number(slug.split("-")[0]);

    if (isNaN(id)) {
      setLoading(false);
      return;
    }

    async function fetchJob() {
      try {
        const res = await fetch("/api/jobs/get-offers", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const jobs: JobOffer[] = await res.json();

        const found = jobs.find((j) => j.id === id) || null;
        const now = new Date();

        setJob(found);

        if (found) {
          let suggestions = jobs.filter(
            (j) =>
              j.id !== found.id &&
              j.sector === found.sector &&
              new Date(j.expire) > now,
          );

          if (suggestions.length < 4) {
            suggestions = jobs.filter(
              (j) =>
                j.id !== found.id &&
                j.countryId === found.countryId &&
                new Date(j.expire) > now,
            );
          }

          if (suggestions.length < 4) {
            suggestions = jobs.filter((j) => j.id !== found.id);
          }

          setSuggestedJobs(suggestions.slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20">Chargement...</div>;
  }

  if (!job) {
    return <div className="text-center py-20">Offre introuvable</div>;
  }

  const isExpired = new Date(job.expire) < new Date();
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

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `/offres-emploi/${job.id}-${slugify(job.title)}`;

  const getCountryLabel = (id: string) =>
    countries.find((c) => c.id === id)?.label || "Pays inconnu";

  return (
    <div className="container mx-auto px-4 py-16">
      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-10 border-b pb-6 pt-12">
        {/* Informations du job */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-3">
            {job.title}{" "}
            <span
              className={`font-bold ${isJobExpired(job) ? "text-red-800" : "text-green-700"}`}
            >
              ({isJobExpired(job) ? "Expirée" : "Active"})
            </span>
          </h1>

          <p className="flex items-center text-amber-700 font-medium mb-2">
            <Building className="h-4 w-4 mr-2" />
            {job.company}
          </p>

          <div className="flex flex-wrap gap-6 text-gray-600">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {job.location},{" "}
              {getCountryLabel(job.countryId) || "Pays non précisé"}
            </span>

            <span className="flex items-center">
              <Banknote className="h-4 w-4 mr-2" />
              {job.salary || "Négociable"}
            </span>

            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {job.type || "Non précisé"}
            </span>

            <span className="flex items-center text-red-800">
              <TimerOff className="h-4 w-4 mr-2" />
              Expire le {job.expire}
            </span>
          </div>
        </div>
      </div>

      {/* GRID */}

      <div className="grid lg:grid-cols-3 gap-10">
        {/* CONTENU */}

        <div className="lg:col-span-2 space-y-10">
          {/* DESCRIPTION */}

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Description du poste
            </h2>

            <div className="bg-gray-200/35 p-6 rounded-xl leading-relaxed">
              {job.description.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>

          {/* EXIGENCES */}

          <section>
            <h2 className="text-2xl font-semibold mb-4">Exigences</h2>

            <ul className="bg-gray-200/35 p-6 rounded-xl list-disc list-inside space-y-2">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* SIDEBAR */}

        <aside className="space-y-6">
          {/* SECTION MARKETING */}
          <div className="relative border rounded-xl p-6 bg-gradient-to-br from-amber-50 via-white to-amber-50 shadow-sm">
            {/* Logo en décor absolu */}
            <div className="absolute top-4 right-4">
              <Image
                src="/artivisioLogo1.jpg"
                alt="Logo Artivisio"
                width={70}
                height={70}
              />
            </div>

            {/* Texte et boutons */}
            <span className="inline-block text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded mb-3">
              Conseil carrière
            </span>

            <h3 className="font-semibold text-lg mb-2">
              Boostez votre candidature
            </h3>

            <p className="text-sm text-gray-600 mb-5">
              Les recruteurs reçoivent des centaines de candidatures.
              Démarquez-vous avec un CV professionnel et un accompagnement
              carrière.
            </p>

            <div className="space-y-3">
              <a
                href="/services"
                className="block w-full text-center bg-amber-600 text-white font-medium py-2.5 rounded-lg hover:bg-amber-700 transition"
              >
                Créer un CV professionnel
              </a>

              <a
                href="/coaching"
                className="block w-full text-center border border-amber-600 text-amber-700 font-medium py-2.5 rounded-lg hover:bg-amber-600 hover:text-white transition"
              >
                Coaching carrière
              </a>
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
              CV conçus selon les attentes actuelles des recruteurs et des
              cabinets RH
            </div>
          </div>

          {/* SECTION POSTULER */}
          <div className="border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Postuler à cette offre</h3>

            <div className="flex flex-col gap-4">
              {job.mail && (
                <Button
                  asChild
                  className="bg-amber-600 hover:bg-amber-700 text-white w-full"
                >
                  <a
                    href={`mailto:${job.mail}`}
                    onClick={() => trackEvent(job.id, "click")}
                  >
                    <Mail className="mr-2" />
                    Postuler par mail
                  </a>
                </Button>
              )}

              {job.link && (
                <Button
                  asChild
                  className="bg-amber-600 hover:bg-amber-700 text-white w-full"
                >
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent(job.id, "click")}
                  >
                    <Link className="mr-2" />
                    Postuler en ligne
                  </a>
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={async () => {
                  await trackEvent(job.id, "share");

                  if (navigator.share) {
                    navigator.share({
                      title: job.title,
                      text: job.title,
                      url: shareUrl,
                    });
                  } else {
                    await navigator.clipboard.writeText(shareUrl);
                    alert("Lien copié !");
                  }
                }}
              >
                <Share className="mr-2" />
                Partager l’offre
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* OFFRES SIMILAIRES */}

      {suggestedJobs.length > 0 && (
        <section className="mt-24 border-t pt-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">
              Offres qui pourraient vous intéresser
            </h2>

            <a
              href="/offres-emploi"
              className="text-sm font-medium text-amber-600 hover:underline"
            >
              Voir toutes les offres
            </a>
          </div>

          <div className="relative">
            {/* slider */}

            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {suggestedJobs.map((offer) => (
                <a
                  key={offer.id}
                  href={`/offres-emploi/${offer.id}-${slugify(offer.title)}`}
                  className="snap-start min-w-[300px] max-w-[300px] bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-amber-600 transition">
                      {offer.title}
                    </h3>

                    <p className="text-sm text-gray-700 flex items-center mb-2">
                      <Building className="h-4 w-4 mr-2 text-gray-400" />
                      {offer.company}
                    </p>

                    <p className="text-sm text-gray-500 flex items-center mb-3">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {offer.location}
                    </p>

                    {offer.salary && (
                      <p className="text-sm text-gray-600 flex items-center mb-4">
                        <Banknote className="h-4 w-4 mr-2 text-gray-400" />
                        {offer.salary}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                      {offer.type || "CDI"}
                    </span>

                    <span className="text-sm font-medium text-amber-600 group-hover:translate-x-1 transition">
                      Voir l'offre →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
