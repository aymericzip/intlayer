/**
 * It will be parsed and rendered as JSON Code by the client
 */
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

type Url = string;

/** Prefixes of the per-URL audit checks. */
type UrlAuditCheck =
  | 'url_hasCanonical'
  | 'url_hasLocalizedLinks'
  | 'url_currentLocale'
  | 'url_htmlLang'
  | 'url_htmlDir'
  | 'url_ogLocale'
  | 'url_hreflang'
  | 'url_hreflangReciprocal'
  | 'url_hasXDefault'
  | 'url_allAnchorsLocalized'
  | 'url_hasLangSelector'
  | 'url_unusedBundleContent';

/**
 * Check keys. Per-URL keys are `<check>\<url>` at runtime; the backslash is
 * left out of the template type, matching the backend `AuditDataList` (the
 * TypeScript 7 `.d.ts` emitter cannot serialise it).
 */
export type AuditDataList<T extends Url> =
  | `${UrlAuditCheck}${T}`
  | 'robots_robotsPresent'
  | 'robots_noLocalizedUrlsForgotten'
  | 'sitemap_sitemapPresent'
  | 'sitemap_noLocalizedUrlsForgotten'
  | 'sitemap_hasXDefault'
  | 'sitemap_hasAlternates';

type Locale = string;

/** How the site encodes the locale in its URLs (from `@intlayer/engine`). */
export type RoutingStrategy =
  | 'prefix-all'
  | 'prefix-no-default'
  | 'search-params'
  | 'subdomain'
  | 'domain'
  | 'no-prefix'
  | 'unknown';

/** Routing detection streamed in `domainData.routing`. */
export type RoutingDetection = {
  strategy: RoutingStrategy;
  confidence: 'high' | 'low';
  locales: Locale[];
  defaultLocale?: Locale;
  searchParamName?: string;
  urlLocale?: Locale;
  evidence: string;
};

/** Category of a detected technology. */
export type TechnologyCategory =
  | 'framework'
  | 'i18n-library'
  | 'tms'
  | 'translation-proxy'
  | 'cms';

/** Technology streamed in `domainData.technologies`. */
export type DetectedTechnology = {
  id: string;
  name: string;
  category: TechnologyCategory;
  version?: string;
  evidence: string;
};

export type DomainData = {
  discoveredUrls: Record<Locale, string[]>;
  discoveredLocales: Locale[];
  defaultLocale: Locale;
  image: string;
  title: string;
  description: string;
  routing: RoutingDetection;
  technologies: DetectedTechnology[];
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
  cachedAt?: string; // ISO date of the audit, when replayed from the one-hour cache
};

export type MergedData = Partial<
  Record<AuditDataList<Url>, Pick<AuditEvent, 'status' | 'data'>>
>;
