"use client"

import Head from "next/head"
import { useLanguage } from "@/contexts/language-context"

type SeoHeadProps = {
  title: string
  description: string
  url?: string
  image?: string
  locale?: string
  siteName?: string
  type?: "website" | "article"
  twitterHandle?: string
  canonical?: string
}

export default function SeoHead({
  title,
  description,
  url = "https://dev.artivisio.com",
  image,
  locale,
  siteName = "Artivisio",
  type = "website",
  twitterHandle = "@artivisio",
  canonical,
}: SeoHeadProps) {
  const { language } = useLanguage()
  const pageLocale = locale || (language === "fr" ? "fr_FR" : "en_US")

  // Logo par défaut dans /public
  const defaultImage = "https://dev.artivisio.com/og-image.jpg"
  const ogImage = image || defaultImage

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical || url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={pageLocale} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${title} - ${siteName}`} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:type" content="image/png" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  )
}
