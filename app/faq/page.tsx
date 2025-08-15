"use client";

import React from "react";
import { useLanguage } from "@/contexts/language-context";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="bg-gray-50 rounded-xl p-6 shadow-md">
    <h3 className="text-lg font-semibold text-primary mb-2">{question}</h3>
    <p className="text-gray-700 leading-relaxed">{answer}</p>
  </div>
);

export default function FAQPage() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen bg-white py-16 px-4 sm:px-8 lg:px-24 text-gray-800 pt-20">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6">
            {t("faq.title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <FAQItem question={t("faq.q1")} answer={t("faq.a1")} />
          <FAQItem question={t("faq.q2")} answer={t("faq.a2")} />
          <FAQItem question={t("faq.q3")} answer={t("faq.a3")} />
          <FAQItem question={t("faq.q4")} answer={t("faq.a4")} />
          <FAQItem question={t("faq.q5")} answer={t("faq.a5")} />
          <FAQItem question={t("faq.q6")} answer={t("faq.a6")} />
          <FAQItem question={t("faq.q7")} answer={t("faq.a7")} />
          <FAQItem question={t("faq.q8")} answer={t("faq.a8")} />
          <FAQItem question={t("faq.q9")} answer={t("faq.a9")} />
          <FAQItem question={t("faq.q10")} answer={t("faq.a10")} />
          <FAQItem question={t("faq.q11")} answer={t("faq.a11")} />
          <FAQItem question={t("faq.q12")} answer={t("faq.a12")} />
          <FAQItem question={t("faq.q13")} answer={t("faq.a13")} />

        </div>
      </div>
    </section>
  );
}
