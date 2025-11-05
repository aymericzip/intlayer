/**
 * It will be parsed and rendered as JSON Code by the client
 */
export type Details =
  | 'string'
  | 'number'
  | 'boolean'
  | Details[]
  | { [key: string]: Details };

export type AuditStatus = 'started' | 'success' | 'warning' | 'error';

export type AuditData = {
  successDetails?: Details;
  warningsDetails?: Details;
  errorsDetails?: Details;
};

type Url = string;

export type AuditDataList<T extends Url> =
  | `url_hasCanonical\\${T}`
  | `url_hasLocalizedLinks\\${T}`
  | `url_currentLocale\\${T}`
  | `url_htmlLang\\${T}`
  | `url_htmlDir\\${T}`
  | `url_hreflang\\${T}`
  | `url_hasXDefault\\${T}`
  | `url_allAnchorsLocalized\\${T}`
  | `url_hasLangSelector\\${T}`
  | `url_hasFlagIcons\\${T}`
  | 'domain_localesCount'
  | 'robots_robotsPresent'
  | 'robots_noLocalizedUrlsForgotten'
  | 'sitemap_sitemapPresent'
  | 'sitemap_noLocalizedUrlsForgotten'
  | 'sitemap_hasXDefault';

type Locale = string;

export type DomainData = {
  discoveredUrls: Record<Locale, string[]>;
  discoveredLocales: Locale[];
  defaultLocale: Locale;
  image: string;
  title: string;
  description: string;
};

export type AuditEvent = {
  // Step data
  type?: AuditDataList<Url>; // Describe the  check made
  status?: AuditStatus; // Success, Warning, Error
  data?: AuditData; // Add details on the step to helps the user understand the result - Return brut data, not stringified

  // Global data
  score?: number;
  progress?: number; // 0 to 100
  message?: string; // Message for the current audit step
  globalError?: string; // Global error message for the entire audit
  domainData?: Partial<DomainData>; // Domain data
};

export type MergedData = Partial<
  Record<AuditDataList<Url>, Pick<AuditEvent, 'status' | 'data'>>
>;
