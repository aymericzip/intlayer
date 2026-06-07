export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQPageHeaderProps = {
  faqs: FAQItem[];
};

export const getFAQPageHeader = ({ faqs }: FAQPageHeaderProps) => ({
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
});
