import type { Score } from './calculateScore';

/** Status of an individual scan check. */
export type ScanCheckStatus = 'success' | 'warning' | 'error';

/** Per-status human-readable details attached to a {@link ScanEvent}. */
export type ScanEventDetails = {
  success?: unknown;
  warning?: unknown;
  error?: unknown;
};

/**
 * A single check produced while scanning a page. The `type` matches a key of
 * the score table (optionally suffixed with the URL for URL-scoped checks).
 */
export type ScanEvent = {
  type: string;
  status: ScanCheckStatus;
  details?: ScanEventDetails;
};

/** How the scan was performed. */
export type ScanMode = 'basic' | 'deep';

/** A single JavaScript chunk fetched while scanning. */
export type BundleChunkInput = {
  url: string;
  /** Whether the chunk is eagerly loaded on the initial page load. */
  isMainBundle: boolean;
  content: string;
};

/** Locale-weight analysis of a single bundle chunk. */
export type ChunkAnalysis = {
  url: string;
  fileSize: number;
  totalLocaleSize: number;
  unusedLocaleSize: number;
  usedLocaleSize: number;
  dictionariesFound: number;
  /** `unusedLocaleSize / totalLocaleSize`, rounded to a percentage. */
  unusedPercent: number;
};

/** Aggregated locale-weight analysis across every fetched chunk. */
export type BundleContentAnalysis = {
  currentLocale: string;
  totalPageSize: number;
  renderedContentSize: number;
  /** `renderedContentSize` + all locale content. */
  contentSize: number;
  /** All locale strings (used + unused, main + lazy). */
  totalLocaleSize: number;
  /** All unused locale strings (main + lazy). */
  totalUnusedLocaleSize: number;
  /** `totalUnusedLocaleSize / totalLocaleSize`, rounded to a percentage. */
  unusedPercentOfLocale: number;
  mainBundleChunks: ChunkAnalysis[];
  lazyBundleChunks: ChunkAnalysis[];
};

/** Options controlling how a website is scanned. */
export type ScanOptions = {
  /**
   * Attempt a deeper, render-based scan using a locally installed `puppeteer`.
   * When `puppeteer` is not installed, the scan transparently falls back to the
   * basic fetch-based mode. Defaults to `true`.
   */
  deep?: boolean;
  /** Override the request timeout in milliseconds. Defaults to 30000. */
  timeoutMs?: number;
  /** Override the User-Agent used for every request. */
  userAgent?: string;
};

/** Result of scanning a single page. */
export type ScanResult = {
  url: string;
  /** Whether the scan ran in `basic` or `deep` mode. */
  mode: ScanMode;
  /** Total transferred bytes measured for the page. */
  totalPageSize: number;
  /** Bytes of the initial HTML document. */
  htmlSize: number;
  /** Overall score as a 0–100 percentage. */
  score: number;
  /** Raw accumulated score (obtained / total points). */
  rawScore: Score;
  /** Every check produced during the scan. */
  events: ScanEvent[];
  /** Locales discovered on the page (from `lang` and `hreflang`). */
  locales: string[];
  /** Locale-weight breakdown of the bundles, when computable. */
  bundle?: BundleContentAnalysis;
};
