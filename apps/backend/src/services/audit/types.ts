import type { CheerioAPI as CheerioAPIType } from 'cheerio';
import type { FastifyRequest } from 'fastify';

export type CompatibleRequest =
  | (FastifyRequest & { signal?: AbortSignal })
  | (Request & { signal: AbortSignal });

export type CheerioAPI = CheerioAPIType;

type Details =
  | null
  | undefined
  | string
  | number
  | boolean
  | Details[]
  | { [key: string]: Details };

type AuditStatus = 'started' | 'success' | 'warning' | 'error' | 'done';

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
  | `url_hasFlagIcons\\${T}`
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
};
