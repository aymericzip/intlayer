import { Button } from '@intlayer/design-system/button';
import { relativeTime } from 'intlayer';
import type { FunctionComponent } from 'preact';
import { useIntlayer, useLocale } from 'preact-intlayer';
import {
  baseCheckType,
  checkSection,
  fallbackCheckLabel,
  getCheckIssueLines,
} from '../../scan/checkLabels';
import type { MergedAuditData } from '../../scan/types';
import type { AuditScan } from '../useAuditScan';
import { ScoreRing } from './ScoreRing';
import { StatusIcon } from './StatusIcon';

const sectionOrder = ['page', 'domain', 'robots', 'sitemap'] as const;

/** Age of a cached audit in the popup locale, e.g. "12 minutes ago". */
const formatCachedAge = (cachedAt: string, locale: string): string => {
  const cachedDate = new Date(cachedAt);
  const elapsedSeconds = (Date.now() - cachedDate.getTime()) / 1000;
  const unit: Intl.RelativeTimeFormatUnit =
    elapsedSeconds < 60 ? 'second' : elapsedSeconds < 3600 ? 'minute' : 'hour';

  return relativeTime(new Date(), cachedDate, {
    locale,
    unit,
    numeric: 'auto',
  });
};

/** Keeps one check type per section and base type, in streaming order. */
const groupCheckTypes = (mergedData: MergedAuditData) => {
  const groups: Partial<Record<(typeof sectionOrder)[number], string[]>> = {};

  for (const type of Object.keys(mergedData)) {
    const section = checkSection(baseCheckType(type));
    const sectionTypes = groups[section] ?? [];
    groups[section] = sectionTypes;

    // The same base check can be streamed for several URLs — keep one row.
    if (
      sectionTypes.some(
        (existingType) => baseCheckType(existingType) === baseCheckType(type)
      )
    ) {
      continue;
    }

    sectionTypes.push(type);
  }

  return groups;
};

/**
 * Backend audit results: run button, live progress, score ring and the
 * streamed checks grouped by section.
 */
export const AuditSection: FunctionComponent<{
  scan: AuditScan;
  tabUrl: string | null;
}> = ({ scan, tabUrl }) => {
  const {
    runAudit,
    runAgain,
    cancel,
    scoreTitle,
    localesDiscovered,
    sectionTitles,
    checkLabels,
  } = useIntlayer('audit-section');
  const { locale } = useLocale();
  const hasResults = Object.keys(scan.mergedData).length > 0;
  const groups = groupCheckTypes(scan.mergedData);
  const discoveredLocaleCount = scan.domainData?.discoveredLocales?.length ?? 0;

  const getCheckLabel = (type: string) => {
    const base = baseCheckType(type);

    return base in checkLabels
      ? checkLabels[base as keyof typeof checkLabels]
      : fallbackCheckLabel(type);
  };

  const runButtonLabel = hasResults ? runAgain : runAudit;

  return (
    <div>
      {!scan.isScanning && (
        <Button
          label={runButtonLabel.value}
          isFullWidth
          disabled={!tabUrl}
          // "Run again" bypasses the one-hour backend cache.
          onClick={() =>
            tabUrl && scan.startScan(tabUrl, { refresh: hasResults })
          }
        >
          {runButtonLabel}
        </Button>
      )}

      {scan.isScanning && (
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 overflow-hidden rounded-full bg-text/10">
            <div
              className="h-full rounded-full bg-text transition-[width] duration-300"
              style={{ width: `${scan.progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-neutral text-xs">
              {scan.stepMessage}
            </span>
            <Button
              label={cancel.value}
              variant="link"
              color="neutral"
              size="sm"
              onClick={scan.cancelScan}
            >
              {cancel}
            </Button>
          </div>
        </div>
      )}

      {scan.error && <p className="mt-2 mb-0 text-error">{scan.error}</p>}

      {hasResults && (
        <div className="mt-3 flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <ScoreRing score={scan.score} />
            <div>
              <div className="font-semibold">{scoreTitle}</div>
              {discoveredLocaleCount > 0 && (
                <div className="text-neutral text-xs">
                  {localesDiscovered({ count: discoveredLocaleCount })}
                </div>
              )}
              {scan.cachedAt && (
                <div className="text-neutral text-xs">
                  🕘 {formatCachedAge(scan.cachedAt, locale)}
                </div>
              )}
            </div>
          </div>

          {sectionOrder.map((section) => {
            const checkTypes = groups[section];

            if (!checkTypes || checkTypes.length === 0) return null;

            return (
              <div key={section}>
                <h3 className="mt-0 mb-1.5 font-semibold text-neutral text-xs">
                  {sectionTitles[section]}
                </h3>
                <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                  {checkTypes.map((type) => {
                    const issueLines = getCheckIssueLines(
                      scan.mergedData[type]
                    );

                    return (
                      <li key={type} className="flex items-baseline gap-2">
                        <StatusIcon status={scan.mergedData[type]?.status} />
                        <div className="min-w-0">
                          <span>{getCheckLabel(type)}</span>
                          {issueLines[0] && (
                            <span
                              className="block truncate text-neutral text-xs"
                              title={issueLines.join('\n')}
                            >
                              {issueLines[0]}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
