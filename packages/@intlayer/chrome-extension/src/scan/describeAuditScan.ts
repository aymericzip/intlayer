import type { AuditScanState } from './auditScanState';
import { baseCheckType, checkSection, getCheckDetails } from './checkLabels';
import type { AuditStatus } from './types';

export type DescribedAuditCheck = {
  check: string;
  section: ReturnType<typeof checkSection>;
  /** Audited page, for URL-scoped checks. */
  url?: string;
  status?: AuditStatus;
  details?: unknown;
};

/**
 * An audit in the shape an agent can reason about: score, site overview,
 * status counts and every check with the details of its current status.
 */
export const describeAuditScan = ({
  score,
  domainData,
  mergedData,
  cachedAt,
  error,
}: AuditScanState) => {
  const checks: DescribedAuditCheck[] = Object.entries(mergedData).map(
    ([type, result]) => {
      const separatorIndex = type.indexOf('\\');

      return {
        check: baseCheckType(type),
        section: checkSection(type),
        url: separatorIndex >= 0 ? type.slice(separatorIndex + 1) : undefined,
        status: result.status,
        details: getCheckDetails(result),
      };
    }
  );
  const countByStatus = (status: AuditStatus): number =>
    checks.filter((check) => check.status === status).length;

  return {
    score,
    error: error ?? undefined,
    cachedAt: cachedAt ?? undefined,
    site: domainData
      ? {
          title: domainData.title,
          description: domainData.description,
          defaultLocale: domainData.defaultLocale,
          discoveredLocales: domainData.discoveredLocales,
          discoveredUrls: domainData.discoveredUrls,
        }
      : undefined,
    summary: {
      total: checks.length,
      success: countByStatus('success'),
      warning: countByStatus('warning'),
      error: countByStatus('error'),
    },
    checks,
  };
};
