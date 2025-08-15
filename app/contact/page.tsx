"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin, MessageCircle, Linkedin, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import {FaWhatsapp,FaFacebook, FaLinkedin} from "react-icons/fa"
import { useState,useEffect, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import { toast } from "react-hot-toast"
import ReCAPTCHA from "react-google-recaptcha"



export default function ContactPage() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
 // const { toast } = useToast()
  const sectionRef = useRef<HTMLDivElement>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const token = await recaptchaRef.current?.executeAsync()

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      })

      recaptchaRef.current?.reset()

      const result = await response.json()

      if (response.ok) {
        toast.success("Votre message a bien été envoyé. Notre équipe vous répondra sous peu")  
        setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" })
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer plus tard.")
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error)
      toast.error("Erreur réseau. Veuillez vérifier votre connexion Internet.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@artivisio.com",
      description: "Réponse sous 24h",
    },
    {
      icon:  FaWhatsapp,
      title: "WhatsApp",
      value: "+225 07 08 97 67 37",
      description: "Réponse immédiate",
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+225 01 53 26 51 47",
      description: "Lun-Ven 9h-18h",
    },
    {
      icon: MapPin,
      title: "Localisation",
      value: "Abidjan, Côte d'Ivoire",
      description: "Afrique de l'Ouest",
    },
  ]

  const socialLinks = [
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/artivisioco/?viewAsMember=true", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: FaWhatsapp, href: "https://chat.whatsapp.com/CwvOp480ovNBnCzKMJ20QG", label: "WhatsApp", color: "hover:text-green-600" },
    { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61552513933160", label: "Facebook", color: "hover:text-blue-600" },
  ]
  

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50/50 to-stone-50/50 pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                {t("contact.title")}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("contact.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">Envoyez-nous un message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          {t("contact.firstName")}
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          {t("contact.lastName")}
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.email")}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.subject")}
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                        placeholder="Sujet de votre message"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.message")}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                        placeholder="Décrivez votre projet ou vos besoins..."
                      />
                    </div>

                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      size="invisible"
                      ref={recaptchaRef}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                      disabled={isSubmitting}
                    >
                    <span className="relative flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                          Envoyer le message
                        </>
                      )}
                    </span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Contact Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mr-4">
                            <method.icon className="h-6 w-6 text-amber-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{method.title}</h3>
                            <p className="text-sm text-gray-500">{method.description}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 font-medium">{method.value}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Suivez-nous</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 ${social.color} hover:scale-110`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <social.icon style={{ width: "30px", height: "30px" }} />
                        <span className="sr-only">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Consultation gratuite</h3>
                  <p className="mb-6 opacity-90">
                    Discutons de votre projet lors d'un appel de 15 minutes sans engagement
                  </p>
                  <a href="https://calendly.com/contact-artivisio/15min">
                    <Button className="bg-white text-amber-700 hover:bg-gray-100 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                      Réserver un appel
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}


