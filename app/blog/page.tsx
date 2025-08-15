"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

const blogArticles = [
  {
    slug: "presence-digitale",
    date: "2025-07-15",
    titleKey: "blog.presenceDigitale.title",
    excerptKey: "blog.presenceDigitale.excerpt",
  },
  {
    slug: "tendances-webdesign-2025",
    date: "2025-07-10",
    titleKey: "blog.tendancesWebdesign.title",
    excerptKey: "blog.tendancesWebdesign.excerpt",
  },
  {
    slug: "reseaux-sociaux-impact",
    date: "2025-07-05",
    titleKey: "blog.reseauxSociaux.title",
    excerptKey: "blog.reseauxSociaux.excerpt",
  },
  {
    slug: "cv-efficace-conseils",
    date: "2025-06-25",
    titleKey: "blog.cvEfficace.title",
    excerptKey: "blog.cvEfficace.excerpt",
  },
  {
    slug: "personal-branding-clefs",
    date: "2025-06-20",
    titleKey: "blog.personalBranding.title",
    excerptKey: "blog.personalBranding.excerpt",
  },
  {
    slug: "recherche-emploi-erreurs",
    date: "2025-06-15",
    titleKey: "blog.rechercheEmploi.title",
    excerptKey: "blog.rechercheEmploi.excerpt",
  },
  {
    slug: "portfolios-inspirants",
    date: "2025-06-10",
    titleKey: "blog.portfoliosInspirants.title",
    excerptKey: "blog.portfoliosInspirants.excerpt",
  },
  {
    slug: "optimisation-linkedin",
    date: "2025-06-01",
    titleKey: "blog.optimisationLinkedIn.title",
    excerptKey: "blog.optimisationLinkedIn.excerpt",
  }
];

export default function BlogPage() {
  const { t } = useLanguage();

  return (
    <section className="bg-white min-h-screen py-16 px-6 sm:px-10 lg:px-24 text-gray-800 pt-40">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">
            {t("blog.title")}
          </h1>
          <p className="text-lg text-gray-600">{t("blog.intro")}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogArticles.map((article, index) => (
            <article
              key={index}
              className="bg-gray-50 rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-primary">
                {t(article.titleKey)}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{article.date}</p>
              <p className="text-gray-700 mb-4">{t(article.excerptKey)}</p>
              <Link
                href={`/blog/${article.slug}`}
                className="text-primary font-medium underline"
              >
                {t("blog.readMore")}
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog/archive"
            className="inline-block mt-6 text-primary font-semibold underline"
          >
            {t("blog.seeAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
