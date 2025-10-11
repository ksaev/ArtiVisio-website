"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Globe, Moon, Sun, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import SeoHead from "@/components/seoHead";
import { useTheme } from "next-themes";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const homeSections = [
    { id: "services", name: "Nos Services" },
    { id: "realisations", name: "Nos Réalisations" },
    { id: "approche", name: "Notre approche stratégique" },
    { id: "temoignages", name: "Témoignages Clients" },
    { id: "contact", name: "Contactez-nous" },
  ];

  const servicesSections = [
    { id: "presence", name: "Présence professionnelle" },
    { id: "bureautique", name: "Accompagnement Bureautique" },
  ];

  const navItems = [
    { name: t("nav.coaching"), href: "/coaching" },
    { name: t("nav.creation"), href: "/portfolios" },
    { name: t("nav.jobs"), href: "/offres-emploi" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsMobileMenuOpen(false), 300);
    }
  };

  const handleHomeClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
    }
    setIsMobileMenuOpen(false);
    setIsHomeDropdownOpen(false);
  };

  const handleServicesClick = () => {
    if (pathname === "/services") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/services");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
    }
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  };

  const handleHomeSectionClick = (id: string) => {
    if (pathname === "/") {
      handleScroll(id);
    } else {
      router.push("/");
      setTimeout(() => handleScroll(id), 300);
    }
    setIsHomeDropdownOpen(false);
  };

  const handleServicesSectionClick = (id: string) => {
    if (pathname === "/services") {
      handleScroll(id);
    } else {
      router.push("/services");
      setTimeout(() => handleScroll(id), 300);
    }
    setIsServicesDropdownOpen(false);
  };

  useEffect(() => {
    const handleScrollEvent = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <>
      <SeoHead
        title="ArtiVisio - Création & Coaching Digital"
        description="Solutions modernes de création de sites, coaching digital et design professionnel."
        url="https://artivisio.com"
        image="/arti.webp"
      />

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-amber-200/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* 🔸 Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={handleHomeClick}
              >
                <div className="w-10 h-10 bg-[#fdf8f4] border border-[#d6bfae] rounded-lg flex items-center justify-center shadow-md shadow-[#bfa07a]/20 transition-transform duration-200 hover:scale-105">
                  <Image src="/arti.webp" alt="Logo" width={100} height={100} loading="lazy" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                  ArtiVisio
                </span>
              </motion.div>
            </Link>

            {/* 🔸 Menu Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Accueil avec dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsHomeDropdownOpen(true)}
                onMouseLeave={() => setIsHomeDropdownOpen(false)}
              >
                <button
                  className="font-medium text-gray-700 hover:text-amber-700 flex items-center"
                  onClick={handleHomeClick}
                >
                  {t("nav.home")}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {isHomeDropdownOpen && (
                  <div className="absolute mt-0 w-56 bg-white shadow-lg rounded-md z-50">
                    {homeSections.map((section) => (
                      <div
                        key={section.id}
                        onClick={() => handleHomeSectionClick(section.id)}
                        className="cursor-pointer px-4 py-2 hover:bg-amber-50 text-gray-700 text-sm"
                      >
                        {section.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Services avec dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
              >
                <button
                  className="font-medium text-gray-700 hover:text-amber-700 flex items-center"
                  onClick={handleServicesClick}
                >
                  {t("nav.services")}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {isServicesDropdownOpen && (
                  <div className="absolute mt-0 w-56 bg-white shadow-lg rounded-md z-50">
                    {servicesSections.map((section) => (
                      <div
                        key={section.id}
                        onClick={() => handleServicesSectionClick(section.id)}
                        className="cursor-pointer px-4 py-2 hover:bg-amber-50 text-gray-700 text-sm"
                      >
                        {section.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Autres liens */}
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors duration-200 relative group ${
                      pathname === item.href
                        ? "text-amber-700"
                        : "text-gray-700 hover:text-amber-700"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-amber-600 transition-all duration-300 ${
                        pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* 🔸 Actions Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 ml-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
                className="text-gray-700 hover:text-amber-700"
              >
                <Globe className="h-4 w-4 mr-1" />
                {language.toUpperCase()}
              </Button>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href="https://chat.whatsapp.com/CwvOp480ovNBnCzKMJ20QG" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {t("nav.start")}
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* 🔸 Bouton Mobile */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-amber-700 hover:bg-amber-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* 🔸 Menu Mobile */}
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-amber-200/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-6 space-y-4">
                {/* Accueil avec flèche séparée */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleHomeClick}
                    className="font-semibold text-gray-800"
                  >
                    {t("nav.home")}
                  </button>
                  <button
                    onClick={() => setIsHomeDropdownOpen(!isHomeDropdownOpen)}
                    className="text-gray-700 hover:text-amber-700"
                  >
                    {isHomeDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                {isHomeDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-1">
                    {homeSections.map((section) => (
                      <div
                        key={section.id}
                        onClick={() => handleHomeSectionClick(section.id)}
                        className="cursor-pointer px-2 py-1 text-sm hover:text-amber-700"
                      >
                        {section.name}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleServicesClick}
                    className="font-semibold text-gray-800"
                  >
                    {t("nav.services")}
                  </button>
                  <button
                    onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                    className="text-gray-700 hover:text-amber-700"
                  >
                    {isServicesDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                {isServicesDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-1">
                    {servicesSections.map((section) => (
                      <div
                        key={section.id}
                        onClick={() => handleServicesSectionClick(section.id)}    
                        className="cursor-pointer px-2 py-1 text-sm hover:text-amber-700"
                      >
                        {section.name}
                      </div>
                    ))}
                  </div>
                )}

                {/* Autres nav */}
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block font-medium py-2 transition-colors ${
                      pathname === item.href
                        ? "text-amber-700"
                        : "text-gray-700 hover:text-amber-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Langue & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-amber-200">
                  <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 ml-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
                    className="text-gray-700 hover:text-amber-700"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    {language.toUpperCase()}
                  </Button>

                  <Link href="/contact">
                    <Button
                      className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-2 rounded-full font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("nav.start")}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>
    </>
  );
}
