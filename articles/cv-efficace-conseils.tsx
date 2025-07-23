"use client";

import { useLanguage } from "@/contexts/language-context";
import { Container } from "@/components/ui/container";
import { Title, Subtitle, Paragraph, Section } from "@/components/ui/typography";

export default function EffectiveCV() {
  const { t } = useLanguage();

  return (
    <Container className="bg-white py-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto rounded-md shadow-md">
      <Title className="mb-6">{t("blog.cv.title")}</Title>
      <Paragraph className="mb-8 text-gray-700">{t("blog.cv.intro")}</Paragraph>

      <Section className="mb-8">
        <Subtitle className="mb-2">{t("blog.cv.section1.title")}</Subtitle>
        <Paragraph>{t("blog.cv.section1.text")}</Paragraph>
      </Section>

      <Section className="mb-8">
        <Subtitle className="mb-2">{t("blog.cv.section2.title")}</Subtitle>
        <Paragraph>{t("blog.cv.section2.intro")}</Paragraph>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          <li>{t("blog.cv.section2.bullet1")}</li>
          <li>{t("blog.cv.section2.bullet2")}</li>
          <li>{t("blog.cv.section2.bullet3")}</li>
          <li>{t("blog.cv.section2.bullet4")}</li>
          <li>{t("blog.cv.section2.bullet5")}</li>
        </ul>
      </Section>

      <Section className="mb-8">
        <Subtitle className="mb-2">{t("blog.cv.section3.title")}</Subtitle>
        <Paragraph>{t("blog.cv.section3.text")}</Paragraph>
      </Section>

      <Section>
        <Subtitle className="mb-2">{t("blog.cv.conclusion.title")}</Subtitle>
        <Paragraph>{t("blog.cv.conclusion.text")}</Paragraph>
      </Section>
    </Container>
  );
}
