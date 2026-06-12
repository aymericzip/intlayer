/** @module buildBreadcrumbsJsonLd */

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type BuildBreadcrumbsJsonLdParams = {
  breadcrumbs: BreadcrumbItem[];
  /**
   * Domain used to prefix relative URLs (e.g. "www.intlayer.org").
   * Required when any breadcrumb URL is relative.
   */
  domain?: string;
};

/**
 * Builds a Schema.org BreadcrumbList JSON-LD object.
 *
 * @param params - Breadcrumb items and optional domain for relative URL resolution.
 * @returns A JSON-LD BreadcrumbList object ready for serialization.
 */
export const buildBreadcrumbsJsonLd = ({
  breadcrumbs,
  domain,
}: BuildBreadcrumbsJsonLdParams) => ({
  '@context': 'https://schema.org' as const,
  '@type': 'BreadcrumbList' as const,
  itemListElement: breadcrumbs.map((item, index) => ({
    '@type': 'ListItem' as const,
    position: index + 1,
    name: item.name,
    item:
      item.url.startsWith('http') || !domain
        ? item.url
        : `https://${domain}${item.url}`,
  })),
});
