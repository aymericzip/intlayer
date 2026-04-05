import {
  analyzeBundleContent,
  type BundleChunkInput,
} from '../analysis/analyzeBundleContent';
import type { AuditEvent } from '../types';

export const checkBundleContent = (
  chunks: BundleChunkInput[],
  htmlContent: string,
  currentLocale: string | undefined,
  targetUrl: string,
  totalPageSize: number,
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

  const analysis = analyzeBundleContent(
    chunks,
    htmlContent,
    currentLocale,
    totalPageSize
  );

  const {
    renderedContentSize,
    contentSize,
    totalLocaleSize,
    totalUnusedLocaleSize,
    unusedPercentOfLocale,
    mainBundleChunks,
    lazyBundleChunks,
    totalPageSize: analysisTotalPageSize,
  } = analysis;

  const formatSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${bytes} B`;
  };
  const filename = (url: string) => url.split('/').pop()?.split('?')[0] ?? url;

  const serializeChunk = (c: (typeof mainBundleChunks)[number]) => ({
    filename: filename(c.url),
    url: c.url,
    fileSize: formatSize(c.fileSize),
    totalLocaleSize: formatSize(c.totalLocaleSize),
    usedLocaleSize: formatSize(c.usedLocaleSize),
    unusedLocaleSize: formatSize(c.unusedLocaleSize),
    dictionariesFound: c.dictionariesFound,
    unusedPercent: `${c.unusedPercent}%`,
  });

  const summary = {
    currentLocale,
    totalPageSize: formatSize(analysisTotalPageSize),
    renderedContentSize: formatSize(renderedContentSize),
    contentSize: formatSize(contentSize),
    totalLocaleSize: formatSize(totalLocaleSize),
    totalUnusedLocaleSize: formatSize(totalUnusedLocaleSize),
    unusedPercentOfLocale: `${unusedPercentOfLocale}%`,
    mainBundleChunks: mainBundleChunks.map(serializeChunk),
    lazyBundleChunks: lazyBundleChunks.map(serializeChunk),
  };

  // Status is driven by the main bundle — lazy chunks with unused content are expected
  const mainBundleMaxUnused = mainBundleChunks.reduce(
    (max, c) => Math.max(max, c.unusedPercent),
    0
  );

  if (mainBundleMaxUnused === 0) {
    onEvent({
      type: `url_unusedBundleContent\\${targetUrl}`,
      status: 'success',
      data: { successDetails: summary },
    });
  } else if (mainBundleMaxUnused <= 30) {
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
