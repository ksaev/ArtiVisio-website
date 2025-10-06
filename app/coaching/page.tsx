"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

import {
  Calendar,
  Award,
  Target,
  Users,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  Star,
  Briefcase,
  TrendingUp,
} from "lucide-react";

export default function CoachingPage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Target,
      title: "Orientation Carrière",
      description: "Définissez votre projet et identifiez les opportunités alignées à vos forces.",
      features: [
        "Bilan de compétences approfondi",
        "Identification des motivations",
        "Cartographie des opportunités",
        "Plan d'action opérationnel",
      ],
      duration: "4+ séances",
      pricing: { standard: "10 000 FCFA", premium: "25 000 FCFA", vip: "50 000 FCFA" },
      slug: "orientation-carriere",
    },
    {
      icon: FileText,
      title: "Optimisation CV & LinkedIn",
      description: "CV et profil LinkedIn optimisés pour capter l'attention des recruteurs.",
      features: [
        "Refonte CV moderne (PDF + Web)",
        "Optimisation du titre et résumé",
        "Réglage complet du profil LinkedIn",
        "Lettre de motivation professionnelle",
      ],
      duration: "2+ séances",
      pricing: { standard: "8 000 FCFA", premium: "20 000 FCFA", vip: "40 000 FCFA" },
      slug: "optimisation-cv-linkedin",
    },
    {
      icon: MessageSquare,
      title: "Préparation Entretiens",
      description: "Simulations ciblées et techniques pour convaincre en entretien.",
      features: ["Simulations vidéo", "Feedback détaillé", "Gestion du stress", "Négociation de salaire"],
      duration: "3+ séances",
      pricing: { standard: "10 000 FCFA", premium: "22 000 FCFA", vip: "45 000 FCFA" },
      slug: "preparation-entretiens",
    },
    {
      icon: TrendingUp,
      title: "Développement Leadership",
      description: "Renforcez votre posture managériale et votre influence stratégique.",
      features: ["Assessment 360°", "Plan de développement", "Coaching en situation réelle", "Suivi personnalisé"],
      duration: "6+ séances",
      pricing: { standard: "15 000 FCFA", premium: "35 000 FCFA", vip: "60 000 FCFA" },
      slug: "developpement-leadership",
    },
    {
      icon: Users,
      title: "Transition Professionnelle",
      description: "Reconversion sécurisée : stratégie, réseau et plan d’action personnalisé.",
      features: [
        "Analyse de faisabilité",
        "Stratégie de repositionnement",
        "Développement réseau",
        "Suivi d’intégration professionnelle",
      ],
      duration: "8+ séances",
      pricing: { standard: "20 000 FCFA", premium: "40 000 FCFA", vip: "75 000 FCFA" },
      slug: "transition-professionnelle",
    },
    {
      icon: Briefcase,
      title: "Lancement Freelance",
      description: "Structurez votre activité et trouvez vos premiers clients.",
      features: [
        "Business model freelance",
        "Stratégie tarifaire",
        "Prospection efficace",
        "Outils de suivi clients",
      ],
      duration: "5+ séances",
      pricing: { standard: "12 000 FCFA", premium: "30 000 FCFA", vip: "55 000 FCFA" },
      slug: "lancement-freelance",
    },
    {
      icon: Award,
      title: "Branding Personnel",
      description: "Construisez une image professionnelle cohérente et reconnaissable.",
      features: ["Audit de profil", "Identité visuelle", "Stratégie de contenu", "Plan visibilité multicanal"],
      duration: "4+ séances",
      pricing: { standard: "15 000 FCFA", premium: "35 000 FCFA", vip: "60 000 FCFA" },
      slug: "branding-personnel",
    },
    {
      icon: FileText,
      title: "Portfolio Interactif",
      description: "Un site professionnel pour présenter vos projets et références.",
      features: ["Portfolio responsive", "Galerie projets", "Section contact", "Hébergement inclus"],
      duration: "2-3 semaines",
      pricing: { standard: "25 000 FCFA", premium: "50 000 FCFA", vip: "90 000 FCFA" },
      slug: "portfolio-interactif",
    },
    {
      icon: MessageSquare,
      title: "Coaching Communication",
      description: "Maîtrisez la parole et l’impact dans vos échanges professionnels.",
      features: [
        "Prise de parole en public",
        "Pitch commercial",
        "Communication d’équipe",
        "Retour constructif détaillé",
      ],
      duration: "3+ séances",
      pricing: { standard: "12 000 FCFA", premium: "28 000 FCFA", vip: "50 000 FCFA" },
      slug: "coaching-communication",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const badgeClassForLevel = (level: "standard" | "premium" | "vip") => {
    if (level === "standard") return "bg-gray-100 text-gray-800";
    if (level === "premium") return "bg-amber-100 text-amber-800";
    return "bg-amber-700 text-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/20 to-stone-50">
      {/* HERO */}
      <section className="pt-36 pb-20 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            Coaching Professionnel sur Mesure
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Accélérez votre évolution professionnelle avec des programmes adaptés à votre niveau d’ambition —
            <strong> Standard, Premium ou VIP</strong>.
          </p>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4">
              Nos Programmes
            </Badge>
            <h2 className="text-3xl font-bold mb-3">Un accompagnement structuré et progressif</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chaque offre est conçue pour générer des résultats concrets. Selon vos objectifs, choisissez votre
              niveau — <strong>Standard</strong> pour débuter, <strong>Premium</strong> pour performer, ou
              <strong> VIP</strong> pour une transformation complète.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((s) => (
              <motion.div key={s.slug} variants={itemVariants}>
                <Card className="h-full bg-white border border-amber-100/50 hover:shadow-2xl hover:scale-[1.02] transition-transform duration-200">
                  <CardHeader className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center">
                      <s.icon className="h-6 w-6 text-amber-700" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold">{s.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">{s.description}</CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="mt-2 mb-4 space-y-2">
                      {s.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{s.duration}</span>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(3)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400" />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {(["standard", "premium", "vip"] as const).map((level) => (
                          <div
                            key={level}
                            className={`text-center py-2 rounded ${badgeClassForLevel(level)} text-xs font-semibold`}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                            <br />
                            <span className="text-sm">{s.pricing[level]}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        {(["standard", "premium", "vip"] as const).map((level) => (
                          <Link   key={level}
                            href={`https://wa.me/22508976737?text=${encodeURIComponent(
                              `Bonjour, je souhaite commander le service ${level.toUpperCase()} de l’offre "${s.title}".`
                            )}`}target="_blank" rel="noopener noreferrer" className="w-1/3">
                            <Button
                              className={`w-full rounded-full text-sm ${
                                level === "vip"
                                  ? "bg-amber-700 text-white"
                                  : level === "premium"
                                  ? "bg-amber-600 text-white"
                                  : "bg-amber-50 text-amber-800 border"
                              }`}
                            >
                              {level.toUpperCase()}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* PROCESSUS */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-stone-50 text-center">
        <Badge variant="outline" className="mb-4">Notre Méthode</Badge>
        <h2 className="text-3xl font-bold mb-3">Un processus clair, des résultats mesurables</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Diagnostic → Plan personnalisé → Accompagnement → Suivi & ajustement
        </p>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Diagnostic Initial", desc: "Évaluation complète de votre profil et de vos objectifs." },
            { step: "2", title: "Plan Personnalisé", desc: "Programme ajusté à vos priorités." },
            { step: "3", title: "Accompagnement Actif", desc: "Mise en pratique et suivi concret." },
            { step: "4", title: "Mesure & Ajustement", desc: "Optimisation continue selon les progrès." },
          ].map((p) => (
            <div key={p.step} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white flex items-center justify-center font-bold text-xl mb-4">
                {p.step}
              </div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4">FAQ</Badge>
            <h3 className="text-2xl font-bold">Questions fréquentes</h3>
          </div>

          <div className="max-w-3xl mx-auto grid gap-4">
            {[
              {
                q: "Combien de temps dure un programme ?",
                a: "Entre 2 et 10 séances selon vos objectifs. Chaque parcours est ajusté à votre rythme.",
              },
              {
                q: "Puis-je suivre le coaching à distance ?",
                a: "Oui. Tous nos programmes sont disponibles en ligne, avec possibilité de présentiel.",
              },
              {
                q: "Offrez-vous des réductions étudiantes ?",
                a: "Oui, -30% pour les étudiants et formules groupées avantageuses.",
              },
              {
                q: "Comment choisir le bon programme ?",
                a: "Nous proposons un diagnostic gratuit de 30 minutes pour vous orienter.",
              },
              {
                q: "Y a-t-il un suivi après la fin du coaching ?",
                a: "Oui, un mois de suivi VIP offert pour consolider vos acquis.",
              },
              {
                q: "Les attestations sont-elles reconnues ?",
                a: "Oui, chaque programme donne lieu à une attestation officielle ArtiVisio.",
              },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-base">{item.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-800 text-center text-white">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Prêt à booster votre carrière ?</h2>
        <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
          Réservez votre session de coaching personnalisée et franchissez une nouvelle étape vers vos objectifs.
        </p>
        <Link href="/contact">
          <Button className="bg-white text-amber-700 px-8 py-3 rounded-full shadow-lg hover:shadow-xl">
            <Calendar className="mr-2 h-5 w-5" />
            Réserver ma session
          </Button>
        </Link>
      </section>
    </div>
    
  );
  
}
