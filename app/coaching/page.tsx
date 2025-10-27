"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  // --- Services / Programmes
  const services = [
    {
      icon: Target,
      title: "Orientation Carrière",
      description: "Définissez votre projet et identifiez les opportunités alignées à vos forces.",
      features: ["Bilan de compétences approfondi", "Identification des motivations", "Cartographie des opportunités", "Plan d'action opérationnel"],
      duration: "4+ séances",
      pricing: { standard: "10 000 FCFA", premium: "25 000 FCFA", vip: "50 000 FCFA" },
      slug: "orientation-carriere",
    },
    {
      icon: FileText,
      title: "Optimisation CV & LinkedIn",
      description: "CV et profil LinkedIn optimisés pour capter l'attention des recruteurs.",
      features: ["Refonte CV moderne (PDF + Web)", "Optimisation du titre et résumé", "Réglage complet du profil LinkedIn", "Lettre de motivation professionnelle"],
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
      features: ["Analyse de faisabilité", "Stratégie de repositionnement", "Développement réseau", "Suivi d’intégration professionnelle"],
      duration: "8+ séances",
      pricing: { standard: "20 000 FCFA", premium: "40 000 FCFA", vip: "75 000 FCFA" },
      slug: "transition-professionnelle",
    },
    {
      icon: Briefcase,
      title: "Lancement Freelance",
      description: "Structurez votre activité et trouvez vos premiers clients.",
      features: ["Business model freelance", "Stratégie tarifaire", "Prospection efficace", "Outils de suivi clients"],
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
      features: ["Prise de parole en public", "Pitch commercial", "Communication d’équipe", "Retour constructif détaillé"],
      duration: "3+ séances",
      pricing: { standard: "12 000 FCFA", premium: "28 000 FCFA", vip: "50 000 FCFA" },
      slug: "coaching-communication",
    },
  ];

  const chiffres = [
  { label: "Clients Accompagnés", value: 45, icon: Users },
  { label: "Séances Réalisées", value: 120, icon: Calendar },
  { label: "Taux de Satisfaction", value: 97, icon: Star, suffix: "%" },
  { label: "Années d’Expérience", value: 3, icon: Award },
  ];

  // --- FAQ
  const faqItems = [
    { q: "Combien de temps dure un programme ArtiVisio ?", a: "Nos programmes durent entre 2 et 10 séances selon vos objectifs. Chaque accompagnement est 100% personnalisé." },
    { q: "Puis-je suivre le coaching à distance ?", a: "Oui, tous nos programmes sont disponibles en ligne via visioconférences, exercices et support WhatsApp/email." },
    { q: "Offrez-vous des tarifs réduits pour étudiants ?", a: "Oui. Jusqu’à -30% pour étudiants et jeunes diplômés, et formules groupées accessibles pour clubs et associations." },
    { q: "Comment choisir le programme le plus adapté ?", a: "Diagnostic gratuit de 30 min pour évaluer vos besoins et recommander le programme optimal." },
    { q: "Les attestations délivrées sont-elles officielles ?", a: "Oui, chaque programme inclut une attestation ArtiVisio reconnue par nos partenaires académiques et professionnels." },
  ];

  // --- Témoignages clients
  const testimonials = [
    { name: "ROMARIC MANGOUA", role: "Commercial BtoB solution IT & cybersecurité", text: "Merci pour votre accompagnement. Grâce à ArtiVisio, j’ai décroché mon emploi actuel. J’ai apprécié la clarté des offres et la qualité des échanges. Votre soutien a été déterminant.", avatar: "/images/temoignages/temoignage5.jpg" },
    { name: "AHIRI JEANNE", role: "Comptable", text: "Leur approche en personal branding m’a permis de mieux mettre en avant mes compétences sur LinkedIn. J’ai gagné en visibilité et renforcé mon image professionnelle.", avatar: "/images/temoignages/temoignage1.jpg" },
    { name: "N'DA FRANCK OLIVIER", role: "Technicien laboratoire", text: "Le coaching Leadership a transformé ma posture managériale et ma confiance au travail.", avatar: "/images/temoignages/temoignage4.jpg" },
  ];

  // --- Variants Framer Motion
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

  // --- Helper pour badges couleurs
  const badgeClassForLevel = (level: "standard" | "premium" | "vip") => {
    if (level === "standard") return "bg-gray-100 text-gray-800";
    if (level === "premium") return "bg-amber-100 text-amber-800";
    return "bg-amber-700 text-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/20 to-stone-50">
      {/* HERO */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-stone-100 via-amber-50/30 to-stone-200 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/coaching/coaching.jpg" alt="Coaching Professionnel sur Mesure – ArtiVisio" fill priority sizes="100vw" className="object-cover object-center brightness-[0.85] contrast-[1.1] saturate-[1.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-800/40 to-transparent"></div>
        </div>
        <div className="relative z-10 px-6 sm:px-8 text-center max-w-4xl mx-auto space-y-8">
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-amber-700 via-amber-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_3px_10px_rgba(0,0,0,0.4)]">
            Coaching Professionnel sur Mesure
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-lg sm:text-xl text-gray-100 leading-relaxed">
            <strong>Accélérez votre évolution professionnelle</strong> grâce à un accompagnement structuré, personnalisé et adapté à votre niveau d’ambition — <strong>Standard, Premium ou VIP</strong>.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex justify-center">
            <a href="#programmes" className="inline-block px-8 py-3 rounded-xl font-semibold text-white bg-amber-600 hover:bg-amber-700 shadow-lg hover:shadow-amber-400/30 transition-all duration-300 hover:scale-[1.02]">Découvrir les Programmes</a>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-stone-100/95 to-transparent pointer-events-none"></div>
      </section>

      {/* PROGRAMMES */}
      <section id="programmes" className="py-24 bg-gradient-to-br from-white via-amber-50/20 to-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-amber-700 via-amber-600 to-amber-400 bg-clip-text text-transparent">
              Nos Programmes d’Accompagnement
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Des formules conçues pour booster votre carrière — selon vos besoins et votre niveau.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div key={i} variants={itemVariants} initial="hidden" animate="visible" className="bg-white border border-amber-100 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="flex items-start gap-4 p-6 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-white">
                  <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center p-2">
                    <s.icon className="h-full w-full text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">{s.title}</h3>
                    <p className="text-gray-700 text-sm leading-snug">{s.description}</p>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-5">
                    {s.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-amber-600 mt-[2px]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center text-sm text-gray-600 border-t border-amber-100 pt-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span>{s.duration}</span>
                    </div>
                    <div className="flex gap-[2px]">
                      {[...Array(3)].map((_, j) => (<Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-100 text-gray-800 text-center rounded-xl py-2">
                      <span className="block text-sm font-semibold">Standard</span>
                      <span className="text-xs">{s.pricing.standard}</span>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 text-center rounded-xl py-2">
                      <span className="block text-sm font-semibold">Premium</span>
                      <span className="text-xs">{s.pricing.premium}</span>
                    </div>
                    <div className="bg-amber-700 text-white text-center rounded-xl py-2">
                      <span className="block text-sm font-semibold">VIP</span>
                      <span className="text-xs">{s.pricing.vip}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {(["standard", "premium", "vip"] as const).map((level) => {
                      const safeTitle = s.title.replace(/’/g, "'");
                      const url = `https://wa.me/22508976737?text=${encodeURIComponent(`Bonjour, je souhaite commander le service ${level.toUpperCase()} de l’offre "${safeTitle}".`)}`;
                      const btnClass = level === "vip" ? "bg-amber-700 text-white hover:bg-amber-800" : level === "premium" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" : "bg-gray-100 text-gray-800 hover:bg-gray-200";
                      return (
                        <Link key={level} href={url} target="_blank" rel="noopener noreferrer" className="w-1/3">
                          <Button className={`w-full text-xs rounded-full ${btnClass}`}>{level.toUpperCase()}</Button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-amber-50 via-white to-amber-100 text-center">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-4xl font-extrabold text-amber-700 mb-12"
            >
              Nos Résultats en Chiffres
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {chiffres.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                      <Icon className="text-amber-700 w-8 h-8" />
                    </div>

                    {/* Chiffre roulant */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="text-2xl md:text-2xl font-extrabold text-amber-700 mb-2"
                    >
                      {Math.floor(item.value)}
                      {item.suffix ? item.suffix : "+"}
                    </motion.span>

                    <p className="text-gray-600 font-medium">{item.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

      {/* PROCESSUS */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-stone-50 text-center">
        <Badge variant="outline" className="mb-4">Notre Méthode</Badge>
        <h2 className="text-3xl font-bold mb-3">Un processus clair, des résultats mesurables</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">Diagnostic → Plan personnalisé → Accompagnement → Suivi & ajustement</p>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[{ step: "1", title: "Diagnostic Initial", desc: "Évaluation complète de votre profil et de vos objectifs." },
            { step: "2", title: "Plan Personnalisé", desc: "Programme ajusté à vos priorités." },
            { step: "3", title: "Accompagnement Actif", desc: "Mise en pratique et suivi concret." },
            { step: "4", title: "Mesure & Ajustement", desc: "Optimisation continue selon les progrès." }].map((p) => (
            <div key={p.step} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white flex items-center justify-center font-bold text-xl mb-4">{p.step}</div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-4">Témoignages</Badge>
          <h2 className="text-3xl font-bold mb-10">Ils nous ont fait confiance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-amber-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                <p className="text-gray-700 mb-4">"{t.text}"</p>
                <div className="flex items-center justify-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={48} height={48} className="rounded-full" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{t.name}</h4>
                    <p className="text-sm text-gray-600">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            {faqItems.map((item, i) => (
              <Card key={i} className="hover:shadow-md">
                <CardHeader className="cursor-pointer" onClick={() => setOpenFAQ(openFAQ === i ? null : i)}>
                  <CardTitle className="text-base flex justify-between items-center">{item.q}<span>{openFAQ === i ? "−" : "+"}</span></CardTitle>
                </CardHeader>
                {openFAQ === i && <CardContent><p className="text-gray-600 text-sm">{item.a}</p></CardContent>}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-800 text-center text-white">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Prêt à booster votre carrière ?</h2>
        <p className="text-amber-100 mb-6 max-w-2xl mx-auto">Réservez votre session de coaching personnalisée et franchissez une nouvelle étape vers vos objectifs.</p>
        <Link href="/contact">
          <Button className="bg-white text-amber-700 px-8 py-3 rounded-full shadow-lg hover:shadow-xl">
            <Calendar className="mr-2 h-5 w-5" /> Réserver ma session
          </Button>
        </Link>
      </section>
    </div>
  );
}
