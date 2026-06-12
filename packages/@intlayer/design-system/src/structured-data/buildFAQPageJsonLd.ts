/** @module buildFAQPageJsonLd */

export type FAQItem = {
  question: string;
  answer: string;
};

export type BuildFAQPageJsonLdParams = {
  faqs: FAQItem[];
};

/**
 * Builds a Schema.org FAQPage JSON-LD object.
 *
 * @param params - List of FAQ question/answer pairs.
 * @returns A JSON-LD FAQPage object ready for serialization.
 */
export const buildFAQPageJsonLd = ({ faqs }: BuildFAQPageJsonLdParams) => ({
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question' as const,
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer' as const,
      text: faq.answer,
    },
  })),
});
