"use client"

import { motion } from "framer-motion"
import { Linkedin, Instagram, MessageCircle,Facebook, Download } from "lucide-react"
import {FaWhatsapp,FaFacebook} from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToTopWhatsApp = () => {
    const message = encodeURIComponent("Bonjour, je vous contacte via le site web ArtiVisio concernant vos services.");
    window.open(`https://wa.me/22508976737?text=${message}`, "_blank", "noopener,noreferrer");
  }

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    const isScrollable = window.innerHeight < document.body.scrollHeight
    const isScrolledDown = window.scrollY > 100
    setShowScrollTop(isScrollable && isScrolledDown)
  }

  handleScroll() // Évaluer immédiatement au chargement
  window.addEventListener("scroll", handleScroll)
  window.addEventListener("resize", handleScroll)

  return () => {
    window.removeEventListener("scroll", handleScroll)
    window.removeEventListener("resize", handleScroll)
  }
}, [])


  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/artivisioco/?viewAsMember=true", label: "LinkedIn" },
    { icon: MessageCircle, href: "https://wa.me/22508976737", label: "WhatsApp" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61552513933160", label: "Facebook" },
  ]

  const footerLinks = [
    {
      title: t("footer.services"),
      links: [
        { name: t("footer.cv"), href: "/services" },
        { name: t("footer.portfolio"), href: "/portfolios" },
        { name: t("footer.linkedin"), href: "/coaching" },
        { name: t("footer.jobs"), href: "/offres-emploi" },
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        { name: t("footer.portfolios"), href: "/portfolios" },
        { name: t("footer.testimonials"), href: "/#testimonials" },
        { name: t("footer.blog"), href: "/blog" },
        { name: t("footer.faq"), href: "/faq" },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { name: t("footer.mentions"), href: "/mentions" },
        { name: t("footer.privacy"), href: "/politique" },
        { name: t("footer.terms"), href: "/cgv" },
        { name: t("footer.cookies"), href: "/cookies" },
      ],
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href="/">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                    <Image src="/blanc.png" alt="Logo" width={100} height={100} loading="lazy" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    Artivisio
                  </span>
                </div>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">{t("footer.description")}</p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerLinks.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6 text-amber-400">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <motion.div
          className="border-t border-gray-800 py-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-amber-400">Téléchargez nos modèles gratuits</h4>
              <p className="text-gray-400">CV professionnels et templates adaptés au marché africain</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white transition-all duration-300 bg-transparent"
              >
                <Download className="mr-2 h-4 w-4" />
                CV PDF
              </Button>
              <Button
                variant="outline"
                className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white transition-all duration-300 bg-transparent"
              >
                <Download className="mr-2 h-4 w-4" />
                CV Word
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="border-t border-gray-800 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Artivisio. {t("footer.copyright")}
            </p>
          </div>
        </motion.div>
      </div>

      <Button
        aria-label="Contact WhatsApp"
        onClick={scrollToTopWhatsApp}
        className={`sm:w-12 sm:h-12 fixed bottom-28 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-green-800 to-green-700 hover:from-green-600 hover:to-green-900 text-white shadow-2xl transition-all duration-300 z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <FaWhatsapp style={{ width: "30px", height: "30px" }}  />
      </Button>

      <Button
        aria-label="Revenir en haut"
        onClick={scrollToTop}
        className={`sm:w-12 sm:h-12 fixed bottom-14 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-600 hover:to-amber-700 text-white shadow-2xl transition-all duration-300 z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ArrowUp style={{ width: "30px", height: "30px" }} />
      </Button>

    </footer>
  )
}
