"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowRight, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Hero() {
  const { t, language } = useLanguage()
  const [index, setIndex] = useState(0)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const slides = [
    { src: "cv.webp", caption: "CVs qui captivent les recruteurs" },
    { src: "portfolio.webp", caption: "Votre vitrine professionnelle sur mesure" },
    { src: "entretien.jpg", caption: "Préparez vos entretiens avec un coach expert" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const mot = [
    { text: "Construisons" },
    { text: "votre" },
    { text: "image", className: "text-amber-700" },
    { text: "professionnelle", className: "text-amber-700" },
  ]
  const words = [
    { text: "Build" },
    { text: "your" },
    { text: "professional", className: "text-amber-700" },
    { text: "image", className: "text-amber-700" },
  ]

  return (
   <div className="min-h-screen">
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-start overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent"></div>
        <svg
          className="absolute inset-0 w-full h-screen"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Titre principal */}
        <motion.div
          className="text-center mb-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            <TypewriterEffect
              words={language === "fr" ? mot : words}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold"
            />
        </motion.div>

        {/* Grille sous-titre + slider */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Colonne gauche : Sous-titre + CTA */}
          <motion.div className="col-span-1 space-y-6" variants={itemVariants}>
            {/* Sous-titre avec alignement responsive et max-width */}
            <p className="text-xl text-center md:text-left text-gray-600 max-w-[560px] mx-auto md:mx-0 leading-snug">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col gap-4 w-full">
              <Link href="/portfolios" passHref>
                <Button
                  size="lg"
                  className="w-full h-15 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  aria-label={t("hero.cta")}
                >
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link
                href="https://wa.me/22508976737?text=Bonjour%2C+je+veux+construire+mon+image+pro"
                passHref
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-15 border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-full font-semibold group bg-white"
                  aria-label={t("hero.video")}
                >
                  <Hammer className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  {t("hero.video")}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Colonne droite : Slider */}
          <motion.div
            className="col-span-1 md:col-span-2 relative w-full h-[250px] md:h-[480px] rounded-2xl overflow-hidden shadow-xl"
            variants={itemVariants}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.caption}
                  fill
                  priority={i === 0}
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-10 text-sm md:text-xl font-semibold bg-black/60 px-3 md:px-4 py-2 rounded-md shadow-md max-w-[90%] leading-snug text-white">
                  {slide.caption}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="w-6 h-10 border-2 border-amber-600 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-amber-600 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
    </div>
  )
}
