"use client";

import { useLanguage } from "@/contexts/language-context";
import { Container } from "@/components/ui/container";
import { Title, Subtitle, Paragraph, Section } from "@/components/ui/typography";

export default function PersonalBranding() {
  const { t } = useLanguage();

  return (
    <Container className="bg-white py-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto rounded-md shadow-md">
      <Title className="mb-6">{t("blog.personalBranding.title")}</Title>
      <Paragraph className="mb-8 text-gray-700">{t("blog.personalBranding.intro")}</Paragraph>

      <Section className="mb-8">
        <Subtitle className="mb-2">{t("blog.personalBranding.section1.title")}</Subtitle>
        <Paragraph>{t("blog.personalBranding.section1.text")}</Paragraph>
      </Section>

      <Section className="mb-8">
        <Subtitle className="mb-2">{t("blog.personalBranding.section2.title")}</Subtitle>
        <Paragraph>{t("blog.personalBranding.section2.text")}</Paragraph>
      </Section>

      <Section>
        <Subtitle className="mb-2">{t("blog.personalBranding.section3.title")}</Subtitle>
        <Paragraph>{t("blog.personalBranding.section3.text")}</Paragraph>
      </Section>
    </Container>
  );
}
