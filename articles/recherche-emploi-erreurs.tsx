"use client";

import { useLanguage } from "@/contexts/language-context";
import { Container } from "@/components/ui/container";
import { Title, Subtitle, Paragraph, Section } from "@/components/ui/typography";

export default function JobSearchErrors() {
  const { t } = useLanguage();

  return (
    <Container className="bg-white py-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto rounded-md shadow-md">
      <Title className="mb-6">{t("blog.rechercheEmploiErreurs.title")}</Title>
      <Paragraph className="mb-8 text-gray-700">{t("blog.rechercheEmploiErreurs.intro")}</Paragraph>

      <Section className="mb-6">
        <Subtitle className="mb-2">{t("blog.rechercheEmploiErreurs.section1.title")}</Subtitle>
        <Paragraph>{t("blog.rechercheEmploiErreurs.section1.text")}</Paragraph>
      </Section>

      <Section className="mb-6">
        <Subtitle className="mb-2">{t("blog.rechercheEmploiErreurs.section2.title")}</Subtitle>
        <Paragraph>{t("blog.rechercheEmploiErreurs.section2.text")}</Paragraph>
      </Section>

      <Section className="mb-6">
        <Subtitle className="mb-2">{t("blog.rechercheEmploiErreurs.section3.title")}</Subtitle>
        <Paragraph>{t("blog.rechercheEmploiErreurs.section3.text")}</Paragraph>
      </Section>

      <Section className="mb-6">
        <Subtitle className="mb-2">{t("blog.rechercheEmploiErreurs.section4.title")}</Subtitle>
        <Paragraph>{t("blog.rechercheEmploiErreurs.section4.text")}</Paragraph>
      </Section>

      <Section>
        <Subtitle className="mb-2">{t("blog.rechercheEmploiErreurs.conclusion.title")}</Subtitle>
        <Paragraph>{t("blog.rechercheEmploiErreurs.conclusion.text")}</Paragraph>
      </Section>
    </Container>
  );
}
