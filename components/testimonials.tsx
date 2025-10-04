"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
  {
    id: 1,
    name: "AHIRI JEANNE",
    role: "Comptable",
    company: "Cabinet ABUNDANCE CONSULTING",
    avatar: "/images/temoignages/temoignage1.jpg", 
    rating: 5,
    text: "Leur approche en personal branding m’a permis de mieux mettre en avant mes compétences sur LinkedIn. J’ai gagné en visibilité et renforcé mon image professionnelle.",
  },
  {
    id: 2,
    name: "ROMARIC MANGOUA",
    role: "Commercial B to B solution IT & cybersecurité",
    company: "Infinity Africa Technology",
    avatar: "/images/temoignages/temoignage5.jpg", 
    rating: 5,
    text: "Merci pour votre accompagnement. Grâce à ArtiVisio, j’ai décroché mon emploi actuel. J’ai apprécié la clarté des offres et la qualité des échanges. Votre soutien a été déterminant.",
  },
  {
    id: 3,
    name: "LAURETTE BLIN",
    role: "Conseiller client",
    company: "7 days group",
    avatar: "/images/temoignages/temoignage6.jpg", 
    rating: 5,
    text: "Au-delà des services, j’ai surtout apprécié le réseau et les conseils pratiques. ArtiVisio m’a ouvert des perspectives nouvelles et m’a aidé à franchir un cap dans ma vie pro.",
  },

  {
    id: 4,
    name: "KOUASSI LAMBERT MEDARD",
    role: "Assistant comptable",
    company: "KS Côte d’Ivoire",
    avatar: "/images/temoignages/temoignage7.jpg", 
    rating: 5,
    text: "Grâce à ArtiVisio, mon CV et mon portfolio ont pris une dimension beaucoup plus professionnelle. Résultat : j’ai rapidement obtenu des entretiens et de nouvelles opportunités.",
  },
  {
    id: 5,
    name: "GNAHORE ZEBRO ELVIRE",
    role: "Stagiaire",
    company: "MINEDDTE/ PNCC",
    avatar: "/images/temoignages/temoignage8.jpg", 
    rating: 5,
    text: "L’accompagnement d’ArtiVisio m’a aidé à clarifier mes objectifs et à mieux structurer mon parcours professionnel. Aujourd’hui, je me sens confiant et armé pour évoluer dans ma carrière."
  }
  ,
  {
    id: 6,
    name: "N'DA FRANCK OLIVIER",
    role: "Technicien laboratoire ",
    company: "clinique polymed",
    avatar: "/images/temoignages/temoignage4.jpg", 
    rating: 5,
    text: "Grâce à l'accompagnement d'Artivisio, j'ai restructuré mon CV et décroché un entretien en moins d'un mois.",
  },

];


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
    <section className="py-20 bg-white/50" id="temoignages">
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
