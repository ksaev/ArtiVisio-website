"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Share2 } from "lucide-react"

export default function ShareButton({ url, title }: { url: string; title?: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || "Découvrez cette offre sur Artivisio",
          url,
        })
      } catch (err) {
        console.error("Erreur lors du partage :", err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Erreur de copie :", err)
      }
    }
  }

  return (
    <Button onClick={handleShare} className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
      {copied ? <Copy size={16} className="text-green-600" /> : <Share2 size={16} />}
      {copied ? "Lien copié" : "Partager"}
    </Button>
  )
}
