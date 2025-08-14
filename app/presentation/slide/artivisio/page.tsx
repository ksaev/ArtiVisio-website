"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bar } from "react-chartjs-2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaWhatsapp, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";
import Confetti from "react-confetti";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
  Legend
);

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  bgColor: string;
  description: string[];
  img?: string;
  chartData?: any;
};

// Contact et réseaux
const contactMethods = [
  { icon: Mail, title: "Email", value: "contact@artivisio.com", description: "Réponse sous 24h" },
  { icon: FaWhatsapp, title: "WhatsApp", value: "+225 07 08 97 67 37", description: "Réponse immédiate" },
  { icon: Phone, title: "Téléphone", value: "+225 01 53 26 51 47", description: "Lun-Ven 9h-18h" },
  { icon: MapPin, title: "Localisation", value: "Abidjan, Côte d'Ivoire", description: "Afrique de l'Ouest" },
];

const socialLinks = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/company/artivisioco/?viewAsMember=true", label: "LinkedIn", color: "hover:text-blue-600" },
  { icon: FaWhatsapp, href: "https://chat.whatsapp.com/CwvOp480ovNBnCzKMJ20QG", label: "WhatsApp", color: "hover:text-green-600" },
  { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61552513933160", label: "Facebook", color: "hover:text-blue-600" },
];

const slides: Slide[] = [
  {
    id: 1,
    title: "Bienvenue chez ArtiVisio",
    subtitle: "Impact digital, design et innovation pour vos projets",
    bgColor: "bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700",
    img: "/illustration-welcome.png",
    description: [
      "ArtiVisio accompagne entreprises et particuliers dans la transformation digitale et le branding.",
      "Services : CV interactifs, portfolios, mini-apps web, branding, coaching et formations certifiées."
    ]
  },
  {
    id: 2,
    title: "CV & Lettres de Motivation",
    subtitle: "CV modernes et adaptés au marché africain",
    bgColor: "bg-gradient-to-r from-green-500 via-teal-600 to-cyan-600",
    chartData: {
      labels: ["CV Standard", "CV Premium", "CV Créatif", "Lettre Motivation"],
      datasets: [
        { label: "Demandes Clients", data: [150, 120, 80, 50], backgroundColor: ["#1f77b4","#ff7f0e","#2ca02c","#d62728"], borderRadius: 6 }
      ]
    },
    description: ["Création de CV professionnels et interactifs.", "Lettres de motivation personnalisées et sectorielles."]
  },
  {
    id: 3,
    title: "Portfolio & Mini-applications",
    subtitle: "Projets interactifs et immersifs",
    bgColor: "bg-gradient-to-r from-purple-500 via-pink-600 to-red-500",
    chartData: {
      labels: ["Sites Web","Mini Apps","Portfolios","Outils Présentation"],
      datasets: [
        { label: "Projets réalisés", data: [40,25,35,20], borderColor:"#fff", backgroundColor:"rgba(255,255,255,0.3)", tension:0.4, fill:true }
      ]
    },
    description: ["Portfolios interactifs et mini-applications web.","Optimisation UX/UI et impact visuel maximal."]
  },
  {
    id: 4,
    title: "Branding & Identité Visuelle",
    subtitle: "Logos, cartes premium, supports marketing digitaux",
    bgColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
    chartData: {
      labels: ["Logos","Cartes","Supports Digitaux","Infographies"],
      datasets: [
        { label: "Projets Branding", data: [30,20,25,15], backgroundColor:["#f6c90e","#ff7f50","#ff69b4","#00ced1"] }
      ]
    },
    description: ["Création de logos, cartes de visite premium, et supports marketing digitaux.","Stratégie branding adaptée à chaque projet pour un impact maximal."]
  },
  {
    id: 5,
    title: "Coaching & Formations",
    subtitle: "Programmes personnalisés avec attestation et certification",
    bgColor: "bg-gradient-to-r from-pink-500 to-red-600",
    chartData: {
      labels: ["En ligne","Présentiel","Mixte"],
      datasets: [
        { label: "Participants", data: [500,400,100], backgroundColor:["#ff6384","#36a2eb","#ffcd56"] }
      ]
    },
    description: ["Formations sur mesure pour étudiants et professionnels.","Accompagnement avec attestation et possibilité de certification Artivisio."]
  },
  {
    id: 6,
    title: "Accompagnement Bureautique",
    subtitle: "Rapports, présentations et documents professionnels",
    bgColor: "bg-gradient-to-r from-teal-400 to-cyan-500",
    img: "/illustration-bureau.png",
    description: ["Aide à la structuration de rapports, mémoires, présentations et documents administratifs.","Idéal pour étudiants, jeunes actifs et porteurs de projets."]
  },
  {
    id: 7,
    title: "Services Additionnels",
    subtitle: "Hébergement, support et branding accessible",
    bgColor: "bg-gradient-to-r from-gray-600 to-gray-800",
    chartData: {
      labels: ["CV","Portfolio","Branding","Support"],
      datasets: [
        { label: "Demandes clients", data: [120,75,60,30], backgroundColor:["#4caf50","#2196f3","#ff9800","#9c27b0"] }
      ]
    },
    description: ["Services à prix accessibles : hébergement, support technique, branding personnel.","Optimisé pour le marché africain avec un rendu professionnel."]
  },
  {
    id: 8,
    title: "Conclusion & Contact",
    subtitle: "Prêt à transformer votre projet en succès avec ArtiVisio ?",
    bgColor: "bg-gradient-to-r from-red-600 to-orange-600",
    description: ["Contactez-nous pour un accompagnement complet et sur-mesure.","Nous transformons vos idées en projets concrets et impactants."]
  },
  {
    id: 9,
    title: "Merci !",
    subtitle: "Nous espérons vous revoir bientôt",
    bgColor: "bg-gradient-to-r from-purple-700 to-pink-600",
    description: ["Merci d’avoir parcouru notre présentation.","Revenez pour vos futurs projets et contactez-nous pour en savoir plus !"]
  },
];

export default function ArtiVisioUltraPro() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Swipe tactile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  const exportPDF = async () => {
    if (!slideRef.current) return;
    const canvas = await html2canvas(slideRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`ArtiVisio_Slide_${currentSlide + 1}.pdf`);
  };

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    setShowConfetti(currentSlide === slides.length - 1);
  }, [currentSlide]);

  return (
    <div className="w-full h-screen relative overflow-hidden text-white font-sans">
      {showConfetti && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={200} />
          <motion.div 
            initial={{ opacity:0, scale:0.5 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:1 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <h1 className="text-6xl font-extrabold drop-shadow-lg">Merci !</h1>
            <p className="text-2xl mt-2 drop-shadow-md">Nous espérons vous revoir bientôt pour vos prochains projets.</p>
            <p className="text-xl mt-2 drop-shadow-sm">Revenez pour vos futurs projets et contactez-nous pour en savoir plus !</p>
          </motion.div>
        </>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          ref={slideRef}
          key={slides[currentSlide].id}
          initial={{ opacity:0, x:400, y:50, scale:0.9, rotate:1 }}
          animate={{ opacity:1, x:0, y:0, scale:1, rotate:0 }}
          exit={{ opacity:0, x:-400, y:-50, scale:0.95, rotate:-1 }}
          transition={{ duration:0.9, ease:"easeInOut" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center p-8 ${slides[currentSlide].bgColor}`}
        >
          {/* Texte */}
          <motion.div
            initial={{ opacity:0, y:80 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.3, duration:0.6 }}
            className="md:w-1/2 m-16 text-center md:text-left space-y-4"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">{slides[currentSlide].title}</h1>
            <p className="text-2xl md:text-3xl tracking-wide drop-shadow-md">{slides[currentSlide].subtitle}</p>

            {slides[currentSlide].description && (
              <ul className="space-y-2 text-lg md:text-xl">
                {slides[currentSlide].description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
              <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} onClick={exportPDF} className="px-6 py-3 bg-blue-700 rounded-lg shadow-lg hover:bg-blue-800">Télécharger PDF</motion.button>
            </div>
          </motion.div>

          {/* Graphique / Image / Contact */}
          <motion.div
            initial={{ opacity:0, y:100, scale:0.95 }}
            animate={{ opacity:1, y:0, scale:1 }}
            transition={{ delay:0.5, duration:0.7 }}
            className="md:w-1/2 mt-6 md:mt-0 flex justify-center relative"
          >
            {currentSlide === 8 ? (
              <motion.div className="w-full max-w-xl space-y-4">
                <h2 className="text-3xl font-bold text-center md:text-left">Contactez-nous</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {contactMethods.map((contact, idx) => {
                    const Icon = contact.icon;
                    return (
                      <motion.div key={idx} whileHover={{ scale: 1.05, y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex items-start space-x-2 p-3 rounded-lg shadow-lg bg-white/10 hover:bg-white/20 transition-colors">
                        <Icon className="w-5 h-5 mt-1 text-white" />
                        <div className="text-sm md:text-base">
                          <p className="font-semibold">{contact.title}</p>
                          <p>{contact.value}</p>
                          <p className="text-gray-200">{contact.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <motion.div className="flex justify-center sm:justify-start space-x-4 mt-2">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <motion.a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.95 }} className={`text-white text-2xl transition-colors ${social.color}`} aria-label={social.label}>
                        <Icon />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </motion.div>
            ) : slides[currentSlide].chartData ? (
              <motion.div whileHover={{ scale:1.05, rotate:1 }} className="w-80 md:w-96 h-80 md:h-96 bg-white/10 rounded-xl p-4 backdrop-blur-sm shadow-2xl">
                <Bar
                  data={slides[currentSlide].chartData}
                  options={{
                    responsive: true,
                    plugins: { legend: { labels: { color:"#fff", font:{ size:16 } } }, tooltip: { enabled:true } },
                    scales: { x:{ ticks:{ color:"#fff", font:{ size:14 } } }, y:{ ticks:{ color:"#fff", font:{ size:14 } } } }
                  }}
                />
              </motion.div>
            ) : slides[currentSlide].img ? (
              <motion.img src={slides[currentSlide].img} alt="Illustration" className="w-80 md:w-96 h-80 md:h-96 object-contain rounded-2xl shadow-2xl" whileHover={{ scale:1.05, rotate:1 }} />
            ) : null}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Flèches */}
      <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }} onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black px-5 py-3 rounded-lg shadow-lg opacity-80 hover:opacity-100">◀</motion.button>
      <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }} onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black px-5 py-3 rounded-lg shadow-lg opacity-80 hover:opacity-100">▶</motion.button>

      {/* Progression */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-2/3 h-2 bg-white/30 rounded-full overflow-hidden">
        <motion.div key={currentSlide} initial={{ width:0 }} animate={{ width:`${((currentSlide+1)/slides.length)*100}%` }} transition={{ duration:0.7, ease:"easeInOut" }} className="h-full bg-white rounded-full" />
      </div>

      {/* Overlay subtil */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/texture-overlay.png')] bg-repeat opacity-10" />
    </div>
  );
}
