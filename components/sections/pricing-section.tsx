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
  { icon: Users, label: "Professionnels accompagnés", value: "200+" },
  { icon: Globe, label: "Pays couverts", value: "3" },
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
          ArtiVisio : accélérateur de talents africains
        </h2>

        <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
          Depuis 2023, nous accompagnons les talents d’Afrique de l’Ouest en combinant expertise RH et solutions digitales pour maximiser leur visibilité et accéder aux meilleures opportunités d’emploi, de mission freelance ou de collaboration.
        </p>

        <p className="text-base text-gray-600 max-w-2xl leading-relaxed">
          Plateforme 100% orientée résultats, ArtiVisio propose un écosystème complet : coaching stratégique, CV design, outils numériques et offres ciblées pour propulser votre carrière.
        </p>
        </motion.div>

        {/* Logo ArtiVisio animé */}
        <motion.div
          className="relative w-full max-w-md h-72 flex items-center justify-center"
          variants={fadeInUp}
          aria-label="Logo ArtiVisio"
        >
          <motion.div
            className="w-full h-full relative"
            variants={floatVariant}
            animate="float"
          >
            <Image
              src="/artivisioLogo.webp"
              alt="Logo ArtiVisio"
              fill
              style={{ objectFit: "contain" }}
              priority
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
