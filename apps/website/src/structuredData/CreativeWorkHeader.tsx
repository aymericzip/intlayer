import Script from 'next/script';
import { useIntlayer } from 'next-intlayer/server';

type DocHeaderProps = {
  creativeWorkName: string;
  creativeWorkDescription: string;
  creativeWorkContent: string;
  keywords: string;
  datePublished?: Date;
  dateModified?: Date;
  url?: string;
};

const formatDate = (date: Date): string => {
  // Ensure the input is a Date object
  if (!(date instanceof Date)) {
    throw new Error('Input must be a valid Date object');
  }

  // Extract the parts of the date
  const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  // Combine them in the desired format
  return `${day}-${month}-${year}`;
};

export const CreativeWorkHeader = ({
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
    '@type': 'CreativeWork',
    creator: {
      '@type': 'Person',
      name: 'Aymeric Pineau',
    },
    name: creativeWorkName,
    text: creativeWorkContent,
    about: creativeWorkDescription,
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
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(creativeWork),
      }}
    />
  );
};
