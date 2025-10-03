"use client";

import { motion, Variants } from "framer-motion";
import {
  Target,
  BarChart3,
  Palette,
  Send,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

const points = [
  {
    icon: Target,
    title: "Audit stratégique personnalisé",
    description:
      "Analyse approfondie de vos besoins, objectifs et contraintes spécifiques.",
  },
  {
    icon: BarChart3,
    title: "Définition précise des livrables",
    description:
      "Planification rigoureuse des objectifs, échéances et priorités.",
  },
  {
    icon: Palette,
    title: "Design et structuration sur-mesure",
    description:
      "Respect strict de votre charte graphique, typographies et hiérarchie visuelle.",
  },
  {
    icon: Send,
    title: "Coaching expert en diffusion",
    description:
      "Conseils pointus sur le timing, les canaux et les modalités d’utilisation.",
  },
  {
    icon: Smartphone,
    title: "Optimisation multi-supports",
    description:
      "Adaptation parfaite à tous les formats : mobile, web, PDF haute qualité.",
  },
  {
    icon: ShieldCheck,
    title: "Livraison avec garantie qualité",
    description:
      "Remise rapide, suivi post-livraison et possibilité d’ajustements ciblés.",
  },
];

// Variants pour container
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.6,
    },
  },
};

// Apparition depuis le bas
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Cartes avec hover flottant
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: custom * 0.15,
    },
  }),
  hover: {
    scale: 1.05,
    y: -5,
    boxShadow: "0 15px 25px rgba(217, 119, 6, 0.4)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// Icônes avec effet flottant
const iconFloatVariants: Variants = {
  float: {
    y: [0, -6, 0, 6, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function VideoSection() {
  return (
    <section id="approche" className="relative bg-black text-white py-24 px-6 sm:px-12 lg:px-28 overflow-hidden">
      {/* Effet lumineux flottant en arrière-plan */}
      <motion.div
        className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 bg-amber-200/5 blur-3xl rounded-full opacity-20 z-0"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />

      {/* Cercles dynamiques supplémentaires */}
      <motion.div
        className="absolute bottom-[-150px] right-[-150px] w-[300px] h-[300px] bg-amber-300/5 blur-2xl rounded-full opacity-25 z-0"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl lg:text-5xl font-extrabold mb-6 text-center text-white tracking-tight"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
        >
          Notre approche stratégique
        </motion.h2>

        <motion.p
          className="justify-center text-gray-300 mb-16 text-xl max-w-6xl leading-relaxed text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          transition={{ delay: 0.3 }}
        >
          Chez <strong>ArtiVisio</strong>, chaque livrable est le fruit d’une méthode éprouvée, alliant rigueur, design, adaptation multi-supports et accompagnement expert.
        </motion.p>

        <motion.div
          className="grid gap-10 max-w-4xl mx-auto sm:grid-cols-1 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {points.map(({ icon: Icon, title, description }, idx) => (
            <motion.div
              key={idx}
              className="flex items-start border border-amber-100/20 gap-5 cursor-default rounded-lg p-5 hover:bg-amber-500/5 transition-colors"
              variants={itemVariants}
              custom={idx}
              whileHover="hover"
              layout
            >
              <motion.div
                className="text-amber-700 w-9 h-9 flex-shrink-0 mt-1"
                variants={iconFloatVariants}
                animate="float"
              >
                <Icon size={36} />
              </motion.div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{title}</h3>
                  <p className="text-gray-400 leading-relaxed">{description}</p>
                </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
