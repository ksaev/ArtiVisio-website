import Head from "next/head";

type SEOProps = {
  title: string;
  description: string;
  url: string;
  image: string; // Absolute URL: https://tonsite.com/images/article.jpg
  locale?: string; // ex: "fr_FR" ou "en_US"
  siteName?: string; // par défaut : Artivisio
  type?: string; // "article" ou "website"
  twitterHandle?: string; // ex: "@artivisio"
};

export default function SEO({
  title,
  description,
  url,
  image,
  locale = "fr_FR",
  siteName = "Artivisio",
  type = "article",
  twitterHandle = "@artivisio",
}: SEOProps) {
  return (
    <Head>
      {/* --- Standard SEO --- */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* --- Open Graph / Facebook / LinkedIn --- */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />

      {/* --- Twitter Cards --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
    </Head>
  );
}
