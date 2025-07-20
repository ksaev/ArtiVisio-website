"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowRight, Hammer, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage} from "@/contexts/language-context"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import Link from "next/link"

export default function Hero() {
  const { t } = useLanguage()
  const { language } = useLanguage()

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

  const handleWhatsApp = () =>{
      window.location.href="https://wa.me/22508976737?text=Bonjour%2C+je+veux+construire+mon+image+pro"
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent"></div>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title with Typewriter Effect */}
          <motion.div className="mb-6" variants={itemVariants}>
            <TypewriterEffect words={language === "fr" ? mot : words} className="text-4xl sm:text-5xl lg:text-7xl font-bold" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <Link href="/portfolios">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                {t("hero.cta")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="https://wa.me/22508976737?text=Bonjour%2C+je+veux+construire+mon+image+pro">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-full font-semibold group bg-transparent"
              >
                {t("hero.video")}
                <Hammer className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Video Preview */}
          <motion.div className="relative max-w-4xl mx-auto" variants={itemVariants}>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-100 to-amber-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <Play className="h-8 w-8 text-amber-700 ml-1" />
                  </div>
                  <p className="text-gray-600 font-medium">Vidéo de présentation Artivisio</p>
                  <p className="text-sm text-gray-500 mt-2">Solutions pour l'Afrique francophone</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-amber-100/50"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
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
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}
