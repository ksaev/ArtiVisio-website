"use client";

import React from "react";
import LastUpdateDate from "@/components/lastUpdateDate";
import { useLanguage } from "@/contexts/language-context";

export default function PolitiquePage() {
  const { t } = useLanguage();

  return (
    <section className="bg-white min-h-screen py-16 px-6 sm:px-10 lg:px-24 text-gray-800">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">
            {t("privacy.title")}
          </h1>
          <LastUpdateDate />
        </header>

        <div className="space-y-8 text-base leading-relaxed text-gray-700">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div key={num}>
              <h3 className="text-xl font-bold mb-1">{t(`privacy.section${num}.title`)}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t(`privacy.section${num}.content`) }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
