"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Designer UX/UI",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Artivisio a transformé ma présence professionnelle. Mon nouveau portfolio m'a permis de décrocher le poste de mes rêves en moins d'un mois !",
    },
    {
      id: 2,
      name: "Thomas Martin",
      role: "Développeur Full-Stack",
      company: "StartupXYZ",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Le CV créé par l'équipe est exceptionnel. Design moderne, contenu optimisé, j'ai reçu 3 fois plus de réponses à mes candidatures.",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      role: "Photographe",
      company: "Freelance",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Mon portfolio photo est magnifique ! Les clients sont impressionnés par la qualité et l'expérience utilisateur. Mes ventes ont augmenté de 40%.",
    },
    {
      id: 4,
      name: "Pierre Rousseau",
      role: "Consultant Stratégie",
      company: "Conseil & Co",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Service professionnel et résultats au-delà de mes attentes. Ma landing page génère maintenant 5 nouveaux prospects par semaine.",
    },
    {
      id: 5,
      name: "Lucas Bernard",
      role: "Marketing Manager",
      company: "GrowthCorp",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "L'équipe Artivisio comprend parfaitement les enjeux du marketing moderne. Mon identité visuelle est parfaitement alignée avec ma stratégie.",
    },
    {
      id: 6,
      name: "Emma Moreau",
      role: "Chef de Projet",
      company: "InnovTech",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Accompagnement personnalisé et expertise technique remarquable. Je recommande vivement Artivisio pour tous vos projets professionnels.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="py-20 bg-white/50" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              Témoignages Clients
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce que nos clients disent de leur expérience avec Artivisio
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="h-full bg-white/80 backdrop-blur-sm border-amber-200/50 hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-amber-700 font-medium">{testimonial.role}</p>
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-500 fill-current" />
                    ))}
                  </div>

                  <div className="relative">
                    <Quote className="h-8 w-8 text-amber-200 absolute -top-2 -left-2" />
                    <p className="text-gray-600 italic leading-relaxed pl-6">{testimonial.text}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
