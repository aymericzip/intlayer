/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import { Website_Home } from '@intlayer/design-system/routes';
import type { BlogMetadata } from '@intlayer/docs';
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
  authorName?: string;
  authorUrl?: string;
  /** Revision history parsed from markdown frontmatter, newest entry first. */
  history?: BlogMetadata['history'];
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
  authorName,
  authorUrl,
  history,
}: DocHeaderProps) => {
  const { audienceType } = useIntlayer('creative-work-structured-data');
  const creativeWork = {
    '@context': 'https://schema.org',
    '@type': type,
    author: {
      '@type': 'Person',
      name: authorName ?? 'Aymeric Pineau',
      url: authorUrl ?? Website_Home,
    },
    creator: {
      '@type': 'Person',
      name: authorName ?? 'Aymeric Pineau',
      url: authorUrl ?? Website_Home,
    },
    name: creativeWorkName,
    text: creativeWorkContent,
    description: creativeWorkDescription,
    url,
    datePublished: datePublished ? formatDate(datePublished) : undefined,
    dateModified: dateModified ? formatDate(dateModified) : undefined,
    version: history?.[0]?.version,
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
