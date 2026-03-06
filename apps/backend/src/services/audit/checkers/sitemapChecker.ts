import { analyzeSitemap } from '../analysis/analyzeSitemap';
import type { AuditEvent } from '../types';

export const checkSitemap = async (
  origin: string,
  discoveredLocales: Set<string>,
  onEvent: (event: AuditEvent) => void
): Promise<void> => {
  const sitemapData = await analyzeSitemap(origin, discoveredLocales);

  onEvent({
    type: 'sitemap_sitemapPresent',
    status: sitemapData.sitemapPresent ? 'success' : 'warning',
    data: {
      successDetails: sitemapData.sitemapPresent ? true : undefined,
      warningsDetails: sitemapData.sitemapPresent
        ? undefined
        : 'No sitemap.xml found',
      errorsDetails:
        sitemapData.errors.length > 0 ? sitemapData.errors : undefined,
    },
  });

  if (sitemapData.sitemapPresent) {
    onEvent({
      type: 'sitemap_noLocalizedUrlsForgotten',
      status: sitemapData.noLocalizedUrlsForgotten ? 'success' : 'warning',
      data: {
        successDetails: sitemapData.noLocalizedUrlsForgotten ? true : undefined,
        warningsDetails: sitemapData.noLocalizedUrlsForgotten
          ? undefined
          : sitemapData.errors,
      },
    });

    onEvent({
      type: 'sitemap_hasXDefault',
      status: sitemapData.hasXDefault ? 'success' : 'warning',
      data: {
        successDetails: sitemapData.hasXDefault ? true : undefined,
        warningsDetails: sitemapData.hasXDefault
          ? undefined
          : 'No x-default hreflang in sitemap',
      },
    });

    onEvent({
      type: 'sitemap_hasAlternates',
      status: sitemapData.hasAlternates ? 'success' : 'warning',
      data: {
        successDetails: sitemapData.hasAlternates ? true : undefined,
        warningsDetails: sitemapData.hasAlternates
          ? undefined
          : 'No alternate language links found in sitemap',
      },
    });
  }
};
