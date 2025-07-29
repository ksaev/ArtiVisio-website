"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X, Rocket } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export default function TeasingPopup() {
  const [visible, setVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const hasDismissed = localStorage.getItem("popupDismissed") === "true"
    if (!hasDismissed) {
      const timeout = setTimeout(() => setVisible(true), 25000) // Affiche après 25s
      return () => clearTimeout(timeout)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem("popupDismissed", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-md",
        "bg-white dark:bg-neutral-900 border border-yellow-500 shadow-xl",
        "rounded-2xl px-4 py-3 flex items-start sm:items-center gap-3 animate-fadeIn"
      )}
    >
      {/* Icône */}
      <div className="p-2 bg-yellow-100 dark:bg-yellow-800 rounded-full">
        <Rocket className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
      </div>

      {/* Texte + lien */}
      <div className="flex-1">
        <p className="text-sm sm:text-base text-neutral-900 dark:text-white font-semibold leading-snug">
          {t("popup.teasing.message")}
        </p>
        <Link
          href="/coaching"
          onClick={handleClose}
          className="inline-block mt-1 text-sm font-medium text-yellow-600 dark:text-yellow-300 hover:underline"
        >
          {t("popup.teasing.link")}
        </Link>
      </div>

      {/* Bouton de fermeture */}
      <button
        onClick={handleClose}
        aria-label="Fermer"
        className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-white transition"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  )
}
