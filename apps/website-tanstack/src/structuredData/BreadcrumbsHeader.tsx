/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */
import { Website_Domain } from '@intlayer/design-system/routes';
import type { FC } from 'react';

type BreadcrumbsListItem = {
  name: string;
  url: string;
};

type BreadcrumbsHeaderProps = {
  breadcrumbs: BreadcrumbsListItem[];
};

export const BreadcrumbsHeader: FC<BreadcrumbsHeaderProps> = ({
  breadcrumbs,
}) => (
  <Script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http')
            ? item.url
            : `https://${Website_Domain}${item.url}`,
        })),
      }),
    }}
  />
);
