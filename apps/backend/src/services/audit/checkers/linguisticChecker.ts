import { analyzeLinguisticStructure } from '../analysis/analyzeLinguisticStructure';
import type { AuditEvent, CheerioAPI } from '../types';

export const checkLinguisticStructure = async (
  $: CheerioAPI,
  targetUrl: string,
  localesSet: Set<string>,
  onEvent: (event: AuditEvent) => void
): Promise<string[]> => {
  const linguisticData = analyzeLinguisticStructure($, targetUrl, localesSet);
  const alternatesOnRoot = linguisticData.alternates;

  onEvent({
    type: `url_hreflang\\${targetUrl}`,
    status: linguisticData.hreflangs.length > 0 ? 'success' : 'warning',
    data: {
      successDetails:
        linguisticData.hreflangs.length > 0
          ? linguisticData.hreflangs
          : undefined,
      warningsDetails:
        linguisticData.hreflangs.length === 0
          ? 'No hreflang tags found'
          : undefined,
    },
  });

  onEvent({
    domainData: { discoveredLocales: Array.from(localesSet) },
  });

  onEvent({
    type: `url_hasXDefault\\${targetUrl}`,
    status: linguisticData.hasXDefault ? 'success' : 'error',
    data: {
      successDetails: linguisticData.hasXDefault ? true : undefined,
      errorsDetails: linguisticData.hasXDefault
        ? undefined
        : 'Missing x-default hreflang link',
    },
  });

  return alternatesOnRoot;
};
