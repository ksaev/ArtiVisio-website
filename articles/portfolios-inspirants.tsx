"use client";

import { useLanguage } from "@/contexts/language-context";
import { Container } from "@/components/ui/container";
import { Title, Subtitle, Paragraph, Section } from "@/components/ui/typography";

export default function InspiringPortfolios() {
  const { t } = useLanguage();

  return (
    <Container className=" py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto rounded-md shadow-md pt-40">
      <Title className="mb-6 pt-2">{t("blog.portfoliosInspirants.title")}</Title>
      <Paragraph className="mb-8 text-gray-700">{t("blog.portfoliosInspirants.intro")}</Paragraph>

      <Section className="mb-8">
        <Subtitle className="mb-2">{t("blog.portfoliosInspirants.section1.title")}</Subtitle>
        <Paragraph>{t("blog.portfoliosInspirants.section1.text")}</Paragraph>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          <li>{t("blog.portfoliosInspirants.section1.bullet1")}</li>
          <li>{t("blog.portfoliosInspirants.section1.bullet2")}</li>
          <li>{t("blog.portfoliosInspirants.section1.bullet3")}</li>
        </ul>
      </Section>

      <Section>
        <Subtitle className="mb-2">{t("blog.portfoliosInspirants.section2.title")}</Subtitle>
        <Paragraph>{t("blog.portfoliosInspirants.section2.text")}</Paragraph>
      </Section>

      <Section>
        <Subtitle className="mb-2">{t("blog.portfoliosInspirants.conclusion.title")}</Subtitle>
        <Paragraph>{t("blog.portfoliosInspirants.conclusion.text")}</Paragraph>
      </Section>
    </Container>
  );
}
