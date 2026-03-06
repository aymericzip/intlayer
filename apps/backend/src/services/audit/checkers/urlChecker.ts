import type { Page } from 'puppeteer';
import { analyzeUrlStructure } from '../analysis/analyzeUrlStructure';
import type { AuditEvent } from '../types';

export const checkUrlStructure = async (
  page: Page,
  origin: string,
  targetUrl: string,
  onEvent: (event: AuditEvent) => void
): Promise<string[]> => {
  const urlStructureData = await analyzeUrlStructure(page, origin);

  onEvent({
    type: `url_hasLocalizedLinks\\${targetUrl}`,
    status: urlStructureData.hasLocalizedLinks ? 'success' : 'warning',
    data: {
      successDetails: urlStructureData.hasLocalizedLinks
        ? {
            message: `${urlStructureData.localizedCount} localized links found out of ${urlStructureData.totalInternalCount} internal links`,
            links: urlStructureData.localizedLinks,
          }
        : undefined,
      warningsDetails: urlStructureData.hasLocalizedLinks
        ? undefined
        : 'No localized links found',
    },
  });

  onEvent({
    type: `url_allAnchorsLocalized\\${targetUrl}`,
    status: urlStructureData.allAnchorsLocalized ? 'success' : 'warning',
    data: {
      successDetails: urlStructureData.allAnchorsLocalized ? true : undefined,
      warningsDetails: !urlStructureData.allAnchorsLocalized
        ? {
            message: 'Some internal links are not localized',
            links: urlStructureData.nonLocalizedLinks,
          }
        : undefined,
    },
  });

  return urlStructureData.internalUrls;
};
