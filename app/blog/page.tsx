"use client";

import React from "react";
import Link from "next/link";

const BlogCard = ({ title, excerpt, slug, date }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out border border-gray-100">
    <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
    <p className="text-gray-700 text-sm mb-4">{excerpt}</p>
    <div className="flex items-center justify-between text-sm text-gray-500">
      <span>{date}</span>
      <Link
        href={`/blog/${slug}`}
        className="text-primary font-medium underline hover:text-primary/80"
      >
        Lire l’article
      </Link>
    </div>
  </div>
);

export default function BlogPage() {
  const articles = [
    {
      title: "5 erreurs à éviter dans votre CV",
      excerpt:
        "Un recruteur passe en moyenne 7 secondes sur un CV. Voici les erreurs courantes qui peuvent nuire à votre candidature et comment les éviter efficacement.",
      slug: "erreurs-cv",
      date: "20 juillet 2025",
    },
    {
      title: "Comment construire son image professionnelle",
      excerpt:
        "Votre image influence votre positionnement sur le marché. Découvrez les clés du personal branding pour vous démarquer durablement.",
      slug: "image-professionnelle",
      date: "10 juillet 2025",
    },
    {
      title: "Les codes pour réussir une candidature spontanée",
      excerpt:
        "Oser candidater sans offre, c’est possible — à condition de respecter certains codes essentiels. Voici notre guide express.",
      slug: "candidature-spontanee",
      date: "1 juillet 2025",
    },
  ];

  return (
    <section className="min-h-screen bg-white py-16 px-4 sm:px-8 lg:px-24 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">
            Le Blog ArtiVisio
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Astuces emploi, visibilité, coaching, et retours d'expérience — restez informé et gagnez en impact avec nos ressources.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <BlogCard key={index} {...article} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog/tous-les-articles"
            className="inline-block mt-8 px-6 py-3 text-white bg-primary rounded-full text-sm font-semibold shadow-md hover:bg-primary/90 transition"
          >
            Voir tous les articles
          </Link>
        </div>
      </div>
    </section>
  );
}
