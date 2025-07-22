"use client";

import React from "react";
import LastUpdateDate from "@/components/lastUpdateDate";
import { useLanguage } from "@/contexts/language-context";

export default function CGVPage() {
  const { t } = useLanguage();

  return (
    <section className="bg-white min-h-screen py-16 px-6 sm:px-10 lg:px-24 text-gray-800">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">{t("cgv.title")}</h1>
          <LastUpdateDate />
        </header>

        <div className="space-y-8 text-base leading-relaxed text-gray-700">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <div key={num}>
              <h3 className="text-xl font-bold mb-1">{t(`cgv.${num}.title`)}</h3>
              <p>{t(`cgv.${num}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
