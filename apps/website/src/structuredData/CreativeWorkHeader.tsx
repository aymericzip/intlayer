/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import { Website_Home } from '@intlayer/design-system/routes';
import {
  buildCreativeWorkJsonLd,
  type CreativeWorkType,
} from '@intlayer/design-system/structured-data';
import {
  type BlogMetadata,
  buildAuthorJsonLd,
  getAuthor,
} from '@intlayer/docs';
import { useIntlayer } from 'next-intlayer/server';

type DocHeaderProps = {
  type?: CreativeWorkType;
  creativeWorkName: string;
  creativeWorkDescription: string;
  creativeWorkContent: string;
  keywords: string;
  datePublished?: Date;
  dateModified?: Date;
  url?: string;
  /** GitHub handle — resolved to a full AuthorProfile via authors.json. */
  author?: string;
  /** Revision history parsed from markdown frontmatter, newest entry first. */
  history?: BlogMetadata['history'];
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
  author,
  history,
}: DocHeaderProps) => {
  const { audienceType } = useIntlayer('creative-work-structured-data');

  const ogImageUrl = `${process.env.NEXT_PUBLIC_URL}/api/og?title=${encodeURIComponent(
    creativeWorkName
  )}&description=${encodeURIComponent(creativeWorkDescription)}`;

  const authorNode = buildAuthorJsonLd(author ? getAuthor(author) : undefined);

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inlined for crawlers
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          buildCreativeWorkJsonLd({
            type,
            name: creativeWorkName,
            description: creativeWorkDescription,
            content: creativeWorkContent,
            keywords,
            datePublished,
            dateModified,
            url,
            author: authorNode,
            version: history?.[0]?.version,
            audienceType: audienceType.value,
            publisherName: 'Intlayer',
            publisherLogoUrl: `${Website_Home}/assets/logo.png`,
            ogImageUrl,
          })
        ).replace(/</g, '\\u003c'),
      }}
    />
  );
};
