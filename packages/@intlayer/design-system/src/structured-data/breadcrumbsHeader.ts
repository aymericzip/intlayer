import { Website_Domain } from '@intlayer/design-system/routes';

type BreadcrumbsListItem = {
  name: string;
  url: string;
};

type BreadcrumbsHeaderProps = {
  breadcrumbs: BreadcrumbsListItem[];
};

export const getBreadcrumbsHeader = ({
  breadcrumbs,
}: BreadcrumbsHeaderProps) => ({
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
});
