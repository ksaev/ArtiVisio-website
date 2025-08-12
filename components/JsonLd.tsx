import React from "react";
import Head from "next/head";

interface JsonLdProps {
  json: object;
}

export default function JsonLd({ json }: JsonLdProps) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
        key="jsonld"
      />
    </Head>
  );
}
