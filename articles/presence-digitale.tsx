"use client";

import { useLanguage } from "@/contexts/language-context";
import { Container } from "@/components/ui/container";
import { Title, Subtitle, Paragraph, Section } from "@/components/ui/typography";

export default function DigitalPresence() {
  const { t } = useLanguage();

  return (
    <Container className="bg-white py-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto rounded-md shadow-md">
      <Title className="mb-6">{t("blog.presenceDigitale.title")}</Title>
      <Paragraph className="mb-8 text-gray-700">{t("blog.presenceDigitale.intro")}</Paragraph>

      <Section className="mb-8">
        <Subtitle className="mb-2">{t("blog.presenceDigitale.section1.title")}</Subtitle>
        <Paragraph>{t("blog.presenceDigitale.section1.text")}</Paragraph>
      </Section>

      <Section className="mb-8">
        <Subtitle className="mb-2">{t("blog.presenceDigitale.section2.title")}</Subtitle>
        <Paragraph>{t("blog.presenceDigitale.section2.text")}</Paragraph>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          <li>{t("blog.presenceDigitale.section2.bullet1")}</li>
          <li>{t("blog.presenceDigitale.section2.bullet2")}</li>
          <li>{t("blog.presenceDigitale.section2.bullet3")}</li>
          <li>{t("blog.presenceDigitale.section2.bullet4")}</li>
        </ul>
      </Section>

      <Section>
        <Subtitle className="mb-2">{t("blog.presenceDigitale.section3.title")}</Subtitle>
        <Paragraph>{t("blog.presenceDigitale.section3.text")}</Paragraph>
      </Section>
    </Container>
  );
}
