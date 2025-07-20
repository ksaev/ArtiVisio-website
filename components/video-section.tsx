"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

export default function VideoSection() {
  return (
    <section className="py-20 bg-gray-900/95 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">Découvrez notre approche</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Plongez dans notre processus créatif et découvrez comment nous transformons vos idées en réalité
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video 1 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-900/50 to-gray-800/50 group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 text-amber-700 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl font-bold mb-2">Notre processus créatif</h3>
                <p className="text-gray-300 text-sm">
                  De l'idée initiale à la réalisation finale, découvrez notre méthode de travail collaborative
                </p>
              </div>
            </div>
          </motion.div>

          {/* Video 2 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800/50 to-amber-900/50 group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 text-amber-700 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl font-bold mb-2">Témoignages clients</h3>
                <p className="text-gray-300 text-sm">
                  Écoutez nos clients parler de leur expérience et des résultats obtenus
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
