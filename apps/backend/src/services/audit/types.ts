import type {
  DetectedTechnology,
  RoutingDetection,
} from '@intlayer/engine/scan';

type Details =
  | null
  | undefined
  | string
  | number
  | boolean
  | Details[]
  | { [key: string]: Details };

type AuditStatus = 'started' | 'success' | 'warning' | 'error';

export type AuditData = {
  successDetails?: Details;
  warningsDetails?: Details;
  errorsDetails?: Details;
};

type Url = string;

/**
 * Prefixes for the per-URL audit checks. The full runtime key is
 * backslash-separated (e.g. `url_hasCanonical\https://example.com`), built by
 * the producers/consumers of {@link AuditEvent}.
 */
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
 * Keys used to describe each audit check.
 *
 * The per-URL keys interpolate the audited URL as `${UrlAuditCheck}${T}`. The
 * literal backslash that separates the prefix from the URL at runtime is
 * intentionally omitted from the type: the TypeScript 7 native `.d.ts` emitter
 * cannot serialise a backslash inside a template-literal type (it silently
 * drops the whole declaration). Widening the suffix to the interpolated URL is
 * emit-safe and the runtime keys still satisfy the type.
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

export type DomainData = {
  discoveredUrls: Record<Locale, string[]>;
  discoveredLocales: Locale[];
  defaultLocale: Locale;
  image: string;
  title: string;
  description: string;
  /** How the site encodes the locale in its URLs. */
  routing: RoutingDetection;
  /** Frameworks, i18n libraries, TMS and translation proxies detected. */
  technologies: DetectedTechnology[];
};

export type AuditEvent = {
  type?: AuditDataList<Url>;
  status?: AuditStatus;
  data?: AuditData;
  score?: number;
  progress?: number;
  message?: string;
  globalError?: string;
  domainData?: Partial<DomainData>;
  /**
   * ISO date of the audit, sent first when the result is replayed from cache
   * (audits are cached one hour; `refresh=true` forces a new one).
   */
  cachedAt?: string;
};
