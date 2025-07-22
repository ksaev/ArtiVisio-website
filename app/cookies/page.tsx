"use client";

import React from "react";
import { useLanguage } from "@/contexts/language-context";

export default function CookiesPage() {
  const { t } = useLanguage();

  return (
    <section className="bg-white min-h-screen py-16 px-6 sm:px-10 lg:px-24 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 text-center">
          {t("cookies.title")}
        </h1>

        <div className="space-y-6 text-base leading-relaxed text-gray-700">
          <p>{t("cookies.intro")}</p>

          <h2 className="text-xl font-semibold">{t("cookies.whatIs")}</h2>
          <p>{t("cookies.whatIsDesc")}</p>

          <h2 className="text-xl font-semibold">{t("cookies.types")}</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>{t("cookies.types.functional")}</li>
            <li>{t("cookies.types.analytics")}</li>
            <li>{t("cookies.types.marketing")}</li>
          </ul>

          <h2 className="text-xl font-semibold">{t("cookies.consent")}</h2>
          <p>{t("cookies.consentDesc")}</p>

          <h2 className="text-xl font-semibold">{t("cookies.disable")}</h2>
          <p>{t("cookies.disableDesc")}</p>

          <p>
            {t("cookies.contact").split("contact@artivisio.com")[0]}
            <a href="mailto:contact@artivisio.com" className="text-primary underline font-medium">
              contact@artivisio.com
            </a>
            {t("cookies.contact").split("contact@artivisio.com")[1] || ""}
          </p>
        </div>
      </div>
    </section>
  );
}
