import type { FC } from 'react';
import {
  baseCheckType,
  checkLabel,
  checkSection,
} from '../../scan/checkLabels';
import type { MergedAuditData } from '../../scan/types';
import type { AuditScan } from '../useAuditScan';
import { ScoreRing } from './ScoreRing';
import { StatusIcon } from './StatusIcon';

const sectionTitles: Record<string, string> = {
  domain: 'Domain',
  page: 'Page',
  robots: 'Robots.txt',
  sitemap: 'Sitemap',
};

const sectionOrder = ['page', 'domain', 'robots', 'sitemap'] as const;

const groupChecks = (mergedData: MergedAuditData) => {
  const groups: Record<string, { type: string; label: string }[]> = {};

  for (const type of Object.keys(mergedData)) {
    const section = checkSection(baseCheckType(type));
    groups[section] ??= [];
    // The same base check can be streamed for several URLs — keep one row.
    if (
      groups[section].some(
        (entry) => baseCheckType(entry.type) === baseCheckType(type)
      )
    ) {
      continue;
    }
    groups[section].push({ type, label: checkLabel(type) });
  }

  return groups;
};

/**
 * Backend audit results: run button, live progress, score ring and the
 * streamed checks grouped by section.
 */
export const AuditSection: FC<{ scan: AuditScan; tabUrl: string | null }> = ({
  scan,
  tabUrl,
}) => {
  const hasResults = Object.keys(scan.mergedData).length > 0;
  const groups = groupChecks(scan.mergedData);

  return (
    <div>
      {!scan.isScanning && (
        <button
          type="button"
          className="primary-button"
          disabled={!tabUrl}
          onClick={() => tabUrl && scan.startScan(tabUrl)}
        >
          {hasResults ? 'Run audit again' : 'Run full i18n audit'}
        </button>
      )}

      {scan.isScanning && (
        <div className="scan-progress">
          <div className="progress-track">
            <div
              className="progress-value"
              style={{ width: `${scan.progress}%` }}
            />
          </div>
          <div className="scan-progress-footer">
            <span className="scan-step">{scan.stepMessage}</span>
            <button
              type="button"
              className="ghost-button"
              onClick={scan.cancelScan}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {scan.error && <p className="scan-error">{scan.error}</p>}

      {hasResults && (
        <div className="audit-results">
          <div className="audit-score">
            <ScoreRing score={scan.score} />
            <div>
              <div className="audit-score-title">i18n / SEO score</div>
              {scan.domainData?.discoveredLocales &&
                scan.domainData.discoveredLocales.length > 0 && (
                  <div className="audit-score-subtitle">
                    {scan.domainData.discoveredLocales.length} locales
                    discovered
                  </div>
                )}
            </div>
          </div>

          {sectionOrder.map((section) => {
            const checks = groups[section];
            if (!checks || checks.length === 0) return null;
            return (
              <div key={section} className="audit-group">
                <h3 className="audit-group-title">{sectionTitles[section]}</h3>
                <ul className="check-list">
                  {checks.map(({ type, label }) => (
                    <li key={type} className="check-row">
                      <StatusIcon status={scan.mergedData[type]?.status} />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
