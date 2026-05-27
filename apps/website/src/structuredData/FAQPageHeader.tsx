import Script from 'next/script';
import type { FC } from 'react';

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQPageHeaderProps = {
  faqs: FAQItem[];
};

export const FAQPageHeader: FC<FAQPageHeaderProps> = ({ faqs }) => {
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqPage),
      }}
    />
  );
};
