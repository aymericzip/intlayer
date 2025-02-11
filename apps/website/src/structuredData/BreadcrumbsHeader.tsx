import Script from 'next/script';
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
          item: item.url,
        })),
      }),
    }}
  />
);
