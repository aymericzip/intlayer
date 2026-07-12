/**
 * Types mirroring the backend `/api/scan` SSE payloads.
 *
 * Kept as a local copy (same as `apps/website` ScannerPage) so the extension
 * bundle stays free of backend/runtime dependencies.
 */

/** Arbitrary JSON payload attached to a check to explain its result. */
export type Details =
  | string
  | number
  | boolean
  | null
  | undefined
  | Details[]
  | { [key: string]: Details };

export type AuditStatus = 'started' | 'success' | 'warning' | 'error';

export type AuditData = {
  successDetails?: Details;
  warningsDetails?: Details;
  errorsDetails?: Details;
};

export type DomainData = {
  discoveredUrls: Record<string, string[]>;
  discoveredLocales: string[];
  defaultLocale: string;
  image: string;
  title: string;
  description: string;
};

/** A single Server-Sent Event streamed by `GET /api/scan?url=…`. */
export type AuditEvent = {
  /** Identifier of the check, e.g. `url_htmlLang\https://example.com`. */
  type?: string;
  status?: AuditStatus;
  data?: AuditData;
  /** Running score, 0–100. */
  score?: number;
  /** Progress of the whole audit, 0–100. */
  progress?: number;
  /** Human-readable message for the current step. */
  message?: string;
  /** Fatal error aborting the whole audit. */
  globalError?: string;
  domainData?: Partial<DomainData>;
};

/** Result of a check, keyed by the `type` field of the SSE events. */
export type MergedAuditData = Record<
  string,
  Pick<AuditEvent, 'status' | 'data'>
>;
