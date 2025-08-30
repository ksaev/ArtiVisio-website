"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bar } from "react-chartjs-2";
import Confetti from "react-confetti";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaWhatsapp, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Mail } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  bgColor: string;
  description?: string[];
  img?: string;
  chartData?: any;
};

const contactMethods = [
  { icon: Mail, title: "Email", value: "contact@artivisio.com", description: "Réponse sous 24h" },
];

const socialLinks = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/company/artivisioco", label: "LinkedIn", color: "hover:text-blue-600" },
  { icon: FaWhatsapp, href: "https://chat.whatsapp.com/CwvOp480ovNBnCzKMJ20QG", label: "WhatsApp", color: "hover:text-green-600" },
  { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61552513933160", label: "Facebook", color: "hover:text-blue-600" },
];

const slides: Slide[] = [
  {
    id: 1,
    title: "Bienvenue chez ArtiVisio",
    subtitle: "Impact digital, design et innovation pour vos projets",
    bgColor: "bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400",
    img: "/images/presentation/artivisioLogo.webp",
    description: [
      "ArtiVisio accompagne les entreprises et particuliers dans la transformation digitale et le branding, en offrant des solutions créatives et innovantes adaptées aux besoins spécifiques.",
      "Notre mission est de fusionner design, technologie et stratégie pour des projets à fort impact visuel et commercial.",
      "Nous proposons des services sur mesure : CV interactifs, portfolios immersifs, mini-applications web et supports de branding complets.",
      "Nos formations et programmes de coaching certifiés permettent à chaque participant de renforcer ses compétences et d’obtenir une reconnaissance professionnelle.",
      "Avec ArtiVisio, chaque idée se transforme en un projet concret, visible et performant sur le marché."
    ]
  },
  {
    id: 2,
    title: "Notre Vision",
    subtitle: "Faire de chaque projet un succès digital",
    bgColor: "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500",
    description: [
      "Nous croyons que la transformation digitale est accessible à tous et qu’elle doit générer un impact concret sur les entreprises et les individus.",
      "Chaque projet que nous accompagnons bénéficie d’une stratégie personnalisée combinant innovation, design et performance.",
      "Nous cherchons à démocratiser le branding et le digital sur le marché africain, avec des solutions efficaces et adaptées à chaque secteur.",
      "Notre objectif est de créer des expériences utilisateurs engageantes tout en maximisant la visibilité et le retour sur investissement de nos clients.",
      "Nous aspirons à être un partenaire stratégique pour toutes les initiatives numériques et créatives de nos clients."
    ]
  },
  {
    id: 3,
    title: "CV & Lettres de Motivation",
    subtitle: "Modernité et adaptabilité pour le marché africain",
    bgColor: "bg-gradient-to-r from-green-500 via-teal-600 to-cyan-600",
    chartData: {
      labels: ["CV Standard", "CV Premium", "CV Créatif", "Lettre Motivation"],
      datasets: [
        { label: "Demandes Clients", data: [150, 120, 80, 50], backgroundColor: ["#1f77b4","#ff7f0e","#2ca02c","#d62728"], borderRadius: 6 }
      ]
    },
    description: [
      "Nous créons des CV modernes, interactifs et adaptés à chaque secteur, pour maximiser vos chances d’obtenir des entretiens.",
      "Nos lettres de motivation sont personnalisées et alignées sur vos objectifs professionnels et les exigences des employeurs.",
      "Chaque document est conçu pour refléter votre identité et vos compétences de manière claire et impactante.",
      "Nous incluons des conseils pratiques pour valoriser vos expériences et vous démarquer sur le marché local et international.",
      "Nos clients bénéficient d’un accompagnement complet avec retour et optimisation jusqu’à satisfaction totale."
    ]
  },
  {
    id: 4,
    title: "Portfolio & Mini-applications",
    subtitle: "Projets interactifs et immersifs",
    bgColor: "bg-gradient-to-r from-purple-500 via-pink-600 to-red-500",
    chartData: {
      labels: ["Sites Web","Mini Apps","Portfolios","Outils Présentation"],
      datasets: [
        { label: "Projets réalisés", data: [40,25,35,20], borderColor:"#fff", backgroundColor:"rgba(255,255,255,0.3)", tension:0.4, fill:true }
      ]
    },
    description: [
      "Nous concevons des portfolios interactifs et mini-applications qui illustrent parfaitement vos compétences et projets.",
      "Chaque réalisation est optimisée UX/UI pour garantir une expérience fluide et immersive aux utilisateurs.",
      "Nos outils permettent de présenter vos travaux de manière innovante, facilement partageable et visuellement attractive.",
      "Nous intégrons des fonctionnalités interactives pour que chaque visiteur puisse explorer vos réalisations et vos services.",
      "Ces solutions sont conçues pour être adaptables et évolutives selon la croissance de vos projets."
    ]
  },
  {
    id: 5,
    title: "Branding & Identité Visuelle",
    subtitle: "Logos, cartes premium et supports marketing digitaux",
    bgColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
    chartData: {
      labels: ["Logos","Cartes","Supports Digitaux","Infographies"],
      datasets: [
        { label: "Projets Branding", data: [30,20,25,15], backgroundColor:["#f6c90e","#ff7f50","#ff69b4","#00ced1"] }
      ]
    },
    description: [
      "Nous créons des identités visuelles complètes : logos, cartes de visite premium, et supports marketing adaptés à votre image.",
      "Chaque projet de branding est pensé pour renforcer la reconnaissance et l’impact de votre entreprise.",
      "Nos designs sont modernes, élégants et conçus pour séduire vos clients et partenaires.",
      "Nous intégrons une stratégie marketing digitale pour maximiser votre visibilité en ligne et hors ligne.",
      "Le branding ArtiVisio garantit cohérence, attractivité et efficacité dans toutes vos communications."
    ]
  },
  {
    id: 6,
    title: "Coaching & Formations",
    subtitle: "Programmes personnalisés avec attestation et certification",
    bgColor: "bg-gradient-to-r from-pink-500 to-red-600",
    chartData: {
      labels: ["En ligne","Présentiel","Mixte"],
      datasets: [
        { label: "Participants", data: [500,400,100], backgroundColor:["#ff6384","#36a2eb","#ffcd56"] }
      ]
    },
    description: [
      "Nos formations sont adaptées aux besoins de chaque participant, avec un suivi personnalisé et des objectifs clairs.",
      "Nous délivrons des attestations et la possibilité d’obtenir la certification officielle ArtiVisio.",
      "Les programmes couvrent compétences digitales, branding, création de contenu et développement de projets.",
      "Chaque session est interactive, engageante et orientée pratique pour un apprentissage efficace.",
      "Les participants bénéficient d’un accompagnement post-formation pour consolider leurs acquis."
    ]
  },
  {
    id: 7,
    title: "Accompagnement Bureautique",
    subtitle: "Rapports, présentations et documents professionnels",
    bgColor: "bg-gradient-to-r from-teal-400 to-cyan-500",
    img: "/images/presentation/bureautique.webp",
    description: [
      "Nous aidons à structurer rapports, mémoires, présentations et documents administratifs pour étudiants et jeunes professionnels.",
      "Chaque document est rédigé de manière claire, professionnelle et adaptée aux standards du marché.",
      "Nous optimisons la lisibilité, la cohérence et l’impact visuel de vos fichiers pour chaque destinataire.",
      "Notre accompagnement inclut des conseils méthodologiques pour améliorer vos travaux futurs.",
      "Idéal pour les porteurs de projets, freelances et jeunes actifs souhaitant un rendu professionnel."
    ]
  },
  {
    id: 8,
    title: "Services Additionnels",
    subtitle: "Hébergement, support et branding accessible",
    bgColor: "bg-gradient-to-r from-gray-600 to-gray-800",
    chartData: {
      labels: ["CV","Portfolio","Branding","Support"],
      datasets: [
        { label: "Demandes clients", data: [120,75,60,30], backgroundColor:["#4caf50","#2196f3","#ff9800","#9c27b0"] }
      ]
    },
    description: [
      "Nous proposons des services additionnels à prix accessibles, adaptés au marché africain.",
      "Hébergement, support technique et branding personnel sont proposés pour faciliter votre développement digital.",
      "Chaque service est pensé pour maximiser votre visibilité et professionnaliser vos supports de communication.",
      "Nos solutions sont flexibles et modulables selon vos besoins et votre budget.",
      "Nous garantissons un rendu professionnel et un suivi complet pour chaque service."
    ]
  },
  {
    id: 9,
    title: "Expansion Afrique de l’Ouest",
    subtitle: "Stratégie et opportunités",
    bgColor: "bg-gradient-to-r from-yellow-600 to-orange-600",
    description: [
      "Nous ciblons la Côte d’Ivoire, le Sénégal, le Bénin, le Burkina Faso, le Mali et la Guinée pour nos services et formations.",
      "Chaque marché bénéficie d’une approche stratégique adaptée aux besoins locaux et aux tendances digitales.",
      "Nous combinons visibilité digitale, services premium et formations pour créer un impact concret.",
      "Notre objectif est de favoriser l’insertion professionnelle et le développement des compétences dans chaque pays.",
      "Nous collaborons avec des partenaires locaux pour renforcer notre présence et nos actions sur le terrain."
    ]
  },
  {
    id: 10,
    title: "Projections & Chiffres",
    subtitle: "Investissement et retours",
    bgColor: "bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500",
    chartData: {
      labels: ["Investissement initial","Revenus prévisionnels","Participants attendus"],
      datasets: [
        { label: "Projection 12 mois", data: [5000000, 8000000, 2000], backgroundColor:["#ff6384","#36a2eb","#ffcd56"], borderRadius: 6 }
      ]
    },
    description: [
      "Investissement initial estimé à 5 000 000 FCFA pour couvrir les services, formations et branding.",
      "Revenus prévisionnels à 12 mois : 8 000 000 FCFA, avec une augmentation progressive grâce aux partenariats et clients récurrents.",
      "Participants attendus : 2 000 jeunes actifs et étudiants pour les programmes de formation et coaching.",
      "Nous suivons des indicateurs de performance précis pour optimiser chaque action et maximiser le ROI.",
      "Les projections sont basées sur l’expérience des années précédentes et les tendances du marché africain."
    ]
  },
  {
    id: 11,
    title: "Étude de Satisfaction",
    subtitle: "Clients et participants",
    bgColor: "bg-gradient-to-r from-green-500 to-teal-600",
    chartData: {
      labels: ["Très satisfait","Satisfait","Peu satisfait","Insatisfait"],
      datasets: [
        { label: "Feedback", data: [120, 60, 15, 5], backgroundColor:["#4caf50","#2196f3","#ff9800","#f44336"] }
      ]
    },
    description: [
      "Plus de 85% de nos clients se déclarent très satisfaits de nos services et formations.",
      "Le taux de recommandation est élevé grâce à la qualité, la réactivité et le suivi personnalisé.",
      "Chaque retour client est analysé pour améliorer nos prestations et renforcer la satisfaction globale.",
      "Nous adaptons nos offres selon les besoins exprimés pour garantir un accompagnement optimal.",
      "Notre engagement : fournir une expérience client unique et valorisante pour chaque participant."
    ]
  },
  {
    id: 12,
    title: "Partenaires & Réseaux",
    subtitle: "Collaboration et visibilité",
    bgColor: "bg-gradient-to-r from-indigo-600 to-purple-600",
    description: [
      "Nous collaborons avec universités, startups, associations et professionnels pour élargir notre réseau.",
      "Ces partenariats permettent d’offrir plus de visibilité et d’opportunités aux participants et clients.",
      "Chaque collaboration est pensée pour créer une valeur ajoutée pour toutes les parties prenantes.",
      "Nous développons des actions conjointes pour renforcer la présence digitale et l’impact social.",
      "Notre réseau est un atout majeur pour la réussite et la crédibilité de nos projets."
    ]
  },
  {
    id: 13,
    title: "Contactez-nous",
    subtitle: "Prêt à transformer votre projet ?",
    bgColor: "bg-gradient-to-r from-red-600 to-orange-500",
    description: [
      "Nous sommes disponibles pour répondre à toutes vos questions et discuter de vos projets.",
      "Contactez-nous par email ou via nos réseaux sociaux pour un accompagnement rapide et efficace.",
      "Notre équipe se tient prête à proposer des solutions personnalisées selon vos besoins.",
      "Chaque message reçoit une réponse sous 24h pour un suivi optimal.",
      "Nous vous invitons à rejoindre notre communauté et bénéficier d’un soutien complet pour votre réussite."
    ]
  },
  {
    id: 14,
    title: "Téléchargez notre PDF",
    subtitle: "Présentation complète disponible",
    bgColor: "bg-gradient-to-r from-blue-600 to-cyan-500",
    description: [
      "Téléchargez la présentation complète pour consulter tous nos services, offres et résultats détaillés.",
      "Le PDF contient toutes les informations sur nos programmes, projets et projections.",
      "C’est un outil pratique pour partager notre vision et nos services avec votre équipe ou partenaires.",
      "Il inclut des illustrations, graphiques et exemples concrets pour mieux comprendre notre impact.",
      "Disponible en téléchargement immédiat, il vous permet de conserver une référence complète et professionnelle."
    ]
  },
  {
    id: 15,
    title: "Merci !",
    subtitle: "Nous espérons vous revoir bientôt",
    bgColor: "bg-gradient-to-r from-purple-700 to-pink-600",
    description: [
      "Merci d’avoir pris le temps de découvrir ArtiVisio et nos services.",
      "Nous espérons collaborer avec vous pour transformer vos idées en projets concrets et réussis.",
      "Votre succès est notre priorité et chaque projet est traité avec soin et professionnalisme.",
      "Rejoignez notre communauté pour suivre nos dernières innovations et offres exclusives.",
      "À très bientôt pour de nouvelles collaborations et expériences digitales mémorables."
    ]
  },
];

// Composant optimisé pour slides
export default function ArtiVisioUltraPro() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showControls, setShowControls] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    const deltaY = touchEndY.current - touchStartY.current;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      deltaX > 0 ? prevSlide() : nextSlide();
    }
  };

  useEffect(() => setWindowSize({ width: window.innerWidth, height: window.innerHeight }), []);
  useEffect(() => setShowConfetti(currentSlide === slides.length - 1), [currentSlide]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleScreenClick = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 3000);
  };

  const exportPDF = () => {
    const link = document.createElement("a");
    link.href = "/documents/presentation/Presentation_ArtiVisio_Complete.pdf";
    link.download = "Presentation_ArtiVisio_Complete.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen relative overflow-auto text-white font-sans ${slides[currentSlide].bgColor}`} onClick={handleScreenClick}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={200} />}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].id}
          initial={{ opacity:0, x:400 }}
          animate={{ opacity:1, x:0 }}
          exit={{ opacity:0, x:-400 }}
          transition={{ duration:0.8, ease:"easeInOut" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative flex flex-col md:flex-row items-center justify-center p-8 md:p-12"
        >
          <div className="md:w-1/2 max-w-lg text-center md:text-left space-y-6 mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold">{slides[currentSlide].title}</h1>
            <p className="text-xl md:text-3xl">{slides[currentSlide].subtitle}</p>
            {slides[currentSlide].description && (
              <ul className="space-y-2 text-left mt-4">
                {slides[currentSlide].description.map((desc, idx) => <li key={idx}>• {desc}</li>)}
              </ul>
            )}
            <div className="flex mt-6 space-x-4 justify-center md:justify-start">
              {(currentSlide === 14) && <button onClick={exportPDF} className="px-6 py-3 bg-blue-700 rounded-lg shadow-lg hover:bg-blue-800">Télécharger PDF</button>}
            </div>
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
            {slides[currentSlide].chartData ? (
              <div className="w-full max-w-md bg-white/10 rounded-xl p-4 shadow-2xl">
                <Bar data={slides[currentSlide].chartData} options={{ responsive:true, plugins:{ legend:{ labels:{ color:"#fff" } }, tooltip:{ enabled:true } }, scales:{ x:{ ticks:{ color:"#fff" } }, y:{ ticks:{ color:"#fff" } } } }} />
              </div>
            ) : slides[currentSlide].img ? (
              <img src={slides[currentSlide].img} alt="Illustration" className="w-full max-w-md object-contain rounded-2xl shadow-2xl" />
            ) : currentSlide === 13 ? (
              <div className="space-y-4">
                {contactMethods.map((c, idx) => {
                  const Icon = c.icon;
                  return (
                    <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/20">
                      <Icon className="w-5 h-5 mt-1 text-white" />
                      <div>
                        <p className="font-semibold">{c.title}</p>
                        <p>{c.value}</p>
                        <p className="text-gray-200">{c.description}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="flex space-x-4 mt-2">
                  {socialLinks.map((s, idx) => {
                    const Icon = s.icon;
                    return <a key={idx} href={s.href} target="_blank" rel="noopener noreferrer" className={`text-white text-2xl ${s.color}`}><Icon /></a>;
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>

      {showControls && (
        <>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-lg">◀</button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-lg">▶</button>
        </>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-white/30 rounded-full overflow-hidden">
        <motion.div key={currentSlide} initial={{ width:0 }} animate={{ width:`${((currentSlide+1)/slides.length)*100}%` }} transition={{ duration:0.7 }} className="h-full bg-white rounded-full" />
      </div>
    </div>
  );
}
