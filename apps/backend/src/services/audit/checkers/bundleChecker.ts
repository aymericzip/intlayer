import { analyzeBundleContent } from '../analysis/analyzeBundleContent';
import type { AuditEvent } from '../types';

export const checkBundleContent = (
  html: string,
  currentLocale: string | undefined,
  targetUrl: string,
  onEvent: (event: AuditEvent) => void
): void => {
  if (!currentLocale) {
    onEvent({
      type: `url_unusedBundleContent\\${targetUrl}`,
      status: 'warning',
      data: {
        warningsDetails:
          'Cannot analyse bundle content: page locale not detected',
      },
    });
    return;
  }

  const analysis = analyzeBundleContent(html, currentLocale);

  if (analysis.dictionariesFound === 0) {
    onEvent({
      type: `url_unusedBundleContent\\${targetUrl}`,
      status: 'success',
      data: {
        successDetails: 'No locale-keyed content detected in bundle',
      },
    });
    return;
  }

  const {
    optimizablePercentage,
    unusedLocaleSize,
    currentLocaleSize,
    totalContentSize,
    unusedLocaleBreakdown,
    dictionariesFound,
  } = analysis;

  const toKB = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;

  const summary = {
    currentLocale,
    dictionariesFound,
    totalContentSize: toKB(totalContentSize),
    currentLocaleSize: toKB(currentLocaleSize),
    unusedLocaleSize: toKB(unusedLocaleSize),
    optimizablePercentage: `${optimizablePercentage}%`,
    unusedLocaleBreakdown: Object.fromEntries(
      Object.entries(unusedLocaleBreakdown).map(([locale, size]) => [
        locale,
        toKB(size),
      ])
    ),
  };

  if (optimizablePercentage === 0) {
    onEvent({
      type: `url_unusedBundleContent\\${targetUrl}`,
      status: 'success',
      data: { successDetails: summary },
    });
  } else if (optimizablePercentage < 30) {
    onEvent({
      type: `url_unusedBundleContent\\${targetUrl}`,
      status: 'warning',
      data: { warningsDetails: summary },
    });
  } else {
    onEvent({
      type: `url_unusedBundleContent\\${targetUrl}`,
      status: 'error',
      data: { errorsDetails: summary },
    });
  }
};
