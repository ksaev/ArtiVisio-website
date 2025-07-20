"use client"

import { motion } from "framer-motion"
import { Linkedin, Instagram, MessageCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

  const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}


export default function Footer() {

  const [showScrollTop, setShowScrollTop] = useState(false)
  const currentYear = new Date().getFullYear()


  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: MessageCircle, href: "#", label: "WhatsApp" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ]

  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "CV Professionnels", href: "#services" },
        { name: "Portfolios Web", href: "#services" },
        { name: "Identité Visuelle", href: "#services" },
        { name: "Stratégie LinkedIn", href: "#services" },
      ],
    },
    {
      title: "Ressources",
      links: [
        { name: "Portfolio", href: "#portfolio" },
        { name: "Témoignages", href: "#testimonials" },
        { name: "Blog", href: "#" },
        { name: "FAQ", href: "#" },
      ],
    },
    {
      title: "Légal",
      links: [
        { name: "Mentions légales", href: "#" },
        { name: "Politique de confidentialité", href: "#" },
        { name: "CGV", href: "#" },
        { name: "Cookies", href: "#" },
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
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Artivisio
                </span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Nous créons des expériences professionnelles uniques qui vous démarquent et accélèrent votre carrière.
              </p>

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
                      <a href={link.href} className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                        {link.name}
                      </a>
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
              <p className="text-gray-400">CV professionnels et templates de portfolio à personnaliser</p>
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
            <p className="text-gray-400 text-sm">© {currentYear} Artivisio. Tous droits réservés.</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        aria-label="Revenir en haut"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl transition-all duration-300 z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </footer>
  )
}
