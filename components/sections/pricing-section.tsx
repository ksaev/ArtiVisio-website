"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Target, Users, Star, Globe } from "lucide-react";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3, delayChildren: 0.3 } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const floatVariant: Variants = {
  float: {
    y: [0, -6, 0, 6, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const stats = [
  { icon: Users, label: "Professionnels accompagnés", value: "250+" },
  { icon: Globe, label: "Pays couverts", value: "5+" },
  { icon: Star, label: "Taux de satisfaction", value: "95%" },
  { icon: Target, label: "Offres publiées", value: "500+" },
];

export default function AboutSectionWithLogo() {
  return (
    <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        className="flex flex-col lg:flex-row items-center gap-16"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Texte large */}
        <motion.div className="lg:w-1/2 space-y-6" variants={fadeInUp}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            ArtiVisio – Propulseur de talents africains et internationaux
          </h2>

          <p className="text-lg text-gray-700 max-w-3xl leading-relaxed text-justify">
            Depuis 2023, <strong>ArtiVisio accompagne les talents du monde entier</strong> en combinant expertise <strong>Ressources Humaines</strong>, solutions digitales et accompagnement personnalisé pour maximiser leur visibilité, valoriser leurs compétences et accéder aux meilleures <strong>opportunités professionnelles</strong>, qu’il s’agisse d’<strong>emploi</strong>, de <strong>missions freelance</strong> ou de <strong>collaborations stratégiques</strong>.
          </p>

          <p className="text-base text-gray-600 max-w-2xl leading-relaxed text-justify">
            Notre plateforme propose un <strong>écosystème complet pour booster votre carrière</strong>. Elle offre des <strong>offres d’emploi ciblées</strong> et opportunités freelance, un <strong>coaching stratégique</strong> pour développer compétences et performance, des <strong>CV et portfolios design</strong>, du <strong>branding personnel</strong>, ainsi que des <strong>outils numériques et formations</strong> pour maximiser votre visibilité et vos résultats.
          </p>

          <p className="text-base text-gray-600 max-w-2xl leading-relaxed text-justify">
            Avec <strong>ArtiVisio</strong>, développez vos compétences, valorisez votre profil et <strong>propulsez votre carrière partout dans le monde</strong>.
          </p>

        </motion.div>

        {/* Logo ArtiVisio animé */}
        <motion.div
          className="relative w-full max-w-md h-72 flex items-center justify-center"
          variants={fadeInUp}
          aria-label="Logo ArtiVisio"
        >
          <motion.div
            className="w-full h-full relative "
            variants={floatVariant}
            animate="float"
          >
            <Image
              src="/artivisioLogo.webp"
              alt="Logo ArtiVisio"
              fill
              style={{ objectFit: "contain" }}
              priority
              className="transition-all duration-700 ease-\[cubic-bezier\(0.19\,1\,0.22\,1\)\] hover:scale-110 hover:rotate-6 hover:drop-shadow-[0_8px_15px_rgba(0,0,0,0.15)] hover:brightness-110 hover:saturate-110 cursor-pointer"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Valeurs clés */}
      <motion.div
        className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[
          {
            icon: Target,
            title: "Excellence",
            desc: "Un accompagnement expert pour booster votre réussite professionnelle.",
          },
          {
            icon: Users,
            title: "Bienveillance",
            desc: "Un suivi humain, respectant vos aspirations et besoins uniques.",
          },
          {
            icon: Star,
            title: "Collaboration",
            desc: "Le pouvoir du collectif pour enrichir votre parcours.",
          },
          {
            icon: Globe,
            title: "Innovation",
            desc: "Des outils modernes au service de votre visibilité et succès.",
          },
        ].map(({ icon: Icon, title, desc }, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03] cursor-pointer"
            variants={fadeInUp}
          >
            <motion.div
              className="p-4 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-full mb-4 transition-all duration-300 hover:scale-110 shadow-lg"
              whileHover={{ rotate: 3 }}
            >
              <Icon className="text-white w-8 h-8" />
            </motion.div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm">{desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats chiffres */}
      <motion.div
        className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map(({ icon: Icon, label, value }, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-tr from-amber-100 to-amber-200 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 cursor-pointer"
            variants={fadeInUp}
          >
            <Icon className="w-10 h-10 text-amber-600 mb-2 transition-all duration-300 group-hover:scale-110" />
            <span className="text-3xl font-bold text-amber-700">{value}</span>
            <span className="text-gray-700 mt-1 text-sm">{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
