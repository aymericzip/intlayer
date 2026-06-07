import { Website_Home } from '@intlayer/design-system/routes';
import { getIntlayer, type Locales } from 'intlayer';

type DocHeaderProps = {
  type?: 'CreativeWork' | 'TechArticle' | 'Article' | 'BlogPosting' | 'WebPage';
  creativeWorkName: string;
  creativeWorkDescription: string;
  creativeWorkContent: string;
  keywords: string;
  datePublished?: Date;
  dateModified?: Date;
  url?: string;
  locale: Locales;
};

// Schema.org requires ISO 8601 dates (YYYY-MM-DD).
const formatDate = (date: Date): string => {
  if (!(date instanceof Date)) {
    throw new Error('Input must be a valid Date object');
  }

  return date.toISOString().split('T')[0];
};

export const getCreativeWorkHeader = ({
  type = 'CreativeWork',
  creativeWorkName,
  creativeWorkDescription,
  creativeWorkContent,
  keywords,
  dateModified,
  datePublished,
  url,
  locale,
}: DocHeaderProps) => {
  const { audienceType } = getIntlayer('creative-work-structured-data', locale);

  const ogImageUrl = `${process.env.NEXT_PUBLIC_URL}/api/og?title=${encodeURIComponent(
    creativeWorkName
  )}&description=${encodeURIComponent(creativeWorkDescription)}`;

  const author = {
    '@type': 'Person',
    name: 'Aymeric Pineau',
    url: Website_Home,
  };

  const creativeWork = {
    '@context': 'https://schema.org',
    '@type': type,
    author,
    creator: author,
    publisher: {
      '@type': 'Organization',
      name: 'Intlayer',
      logo: {
        '@type': 'ImageObject',
        url: `${Website_Home}/assets/logo.png`,
      },
    },
    name: creativeWorkName,
    headline: creativeWorkName,
    image: ogImageUrl,
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

  return creativeWork;
};
