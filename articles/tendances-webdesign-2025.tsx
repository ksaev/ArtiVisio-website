"use client";

import { useLanguage } from "@/contexts/language-context";
import { Container } from "@/components/ui/container";
import { Title, Subtitle, Paragraph, Section } from "@/components/ui/typography";

export default function WebDesignTrends() {
  const { t } = useLanguage();

  return (
    <Container className="py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto rounded-md shadow-md pt-40">
      <Title className="mb-6 pt-2">{t("blog.tendancesWebdesign.title")}</Title>
      <Paragraph className="mb-8 text-gray-700">{t("blog.tendancesWebdesign.intro")}</Paragraph>

      <Section className="mb-8">
        <Subtitle className="mb-2">{t("blog.tendancesWebdesign.section1.title")}</Subtitle>
        <Paragraph>{t("blog.tendancesWebdesign.section1.text")}</Paragraph>
      </Section>

      <Section className="mb-8">
        <Subtitle className="mb-2">{t("blog.tendancesWebdesign.section2.title")}</Subtitle>
        <Paragraph>{t("blog.tendancesWebdesign.section2.text")}</Paragraph>
      </Section>

      <Section>
        <Subtitle className="mb-2">{t("blog.tendancesWebdesign.section3.title")}</Subtitle>
        <Paragraph>{t("blog.tendancesWebdesign.section3.text")}</Paragraph>
      </Section>
    </Container>
  );
}
