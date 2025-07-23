"use client"

import { use } from "react";
import { notFound } from "next/navigation";
import { useLanguage } from "@/contexts/language-context"; // Peut être une hook client, attention !

// Import statique ou dynamique côté serveur (import statique recommandé)
import ArticlePresenceDigitale from "@/articles/presence-digitale";
import ArticleTendancesWebdesign from "@/articles/tendances-webdesign-2025";
import ArticleReseauxSociaux from "@/articles/reseaux-sociaux-impact";
import ArticleCvEfficace from "@/articles/cv-efficace-conseils";
import ArticlePersonalBranding from "@/articles/personal-branding-clefs";
import ArticleRechercheEmploi from "@/articles/recherche-emploi-erreurs";
import ArticlePortfoliosInspirants from "@/articles/portfolios-inspirants";
import ArticleOptimisationLinkedin from "@/articles/optimisation-linkedin";

const articles: Record<string, React.FC> = {
  "presence-digitale": ArticlePresenceDigitale,
  "tendances-webdesign-2025": ArticleTendancesWebdesign,
  "reseaux-sociaux-impact": ArticleReseauxSociaux,
  "cv-efficace-conseils": ArticleCvEfficace,
  "personal-branding-clefs": ArticlePersonalBranding,
  "recherche-emploi-erreurs": ArticleRechercheEmploi,
  "portfolios-inspirants": ArticlePortfoliosInspirants,
  "optimisation-linkedin": ArticleOptimisationLinkedin,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default function BlogArticle({ params }: Props) {
  const { slug } = use(params);
  const Article = articles[slug];

  if (!Article) {
    notFound();
  }

  // Attention : useLanguage() est un hook client. Ici on est en Server Component,
  // tu dois gérer la langue dans un composant client enfant si besoin.

  return (
    <>
      <Article />
    </>
  );
}
