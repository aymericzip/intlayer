/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import { useIntlayer } from 'react-intlayer';

type DocHeaderProps = {
  type?: 'CreativeWork' | 'TechArticle' | 'Article' | 'BlogPosting' | 'WebPage';
  creativeWorkName: string;
  creativeWorkDescription: string;
  creativeWorkContent: string;
  keywords: string;
  datePublished?: Date;
  dateModified?: Date;
  url?: string;
};

const formatDate = (date: Date): string => {
  if (!(date instanceof Date)) {
    throw new Error('Input must be a valid Date object');
  }

  return date.toISOString().split('T')[0];
};

export const CreativeWorkHeader = ({
  type = 'CreativeWork',
  creativeWorkName,
  creativeWorkDescription,
  creativeWorkContent,
  keywords,
  dateModified,
  datePublished,
  url,
}: DocHeaderProps) => {
  const { audienceType } = useIntlayer('creative-work-structured-data');
  const creativeWork = {
    '@context': 'https://schema.org',
    '@type': type,
    creator: {
      '@type': 'Person',
      name: 'Aymeric Pineau',
    },
    name: creativeWorkName,
    text: creativeWorkContent,
    description: creativeWorkDescription,
    url,
    datePublished: datePublished ? formatDate(datePublished) : undefined,
    dateModified: dateModified ? formatDate(dateModified) : undefined,
    keywords: keywords,
    license:
      'https://raw.githubusercontent.com/aymericzip/intlayer/refs/heads/main/LICENSE',
    audience: {
      '@type': 'Audience',
      audienceType: audienceType.value,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(creativeWork).replace(/</g, '\\u003c'),
      }}
    />
  );
};
