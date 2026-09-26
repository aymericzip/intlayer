import type {
  DetectedTechnology,
  RoutingDetection,
} from '@intlayer/engine/scan/detection';

export type { DetectedTechnology, RoutingDetection };

/** An `<link rel="alternate" hreflang>` entry found in the page head. */
export type HreflangEntry = {
  hreflang: string;
  href: string;
};

/** A cookie or web-storage entry. */
export type LocaleStorageEntry = {
  /** Where the entry was found. */
  source: 'cookie' | 'localStorage' | 'sessionStorage';
  name: string;
  value: string;
};

/** Raw signals collected in the inspected page by `collectPageSignals`. */
export type RawPageSignals = {
  url: string;
  title: string;
  htmlLang: string | null;
  htmlDir: string | null;
  canonicalHref: string | null;
  hreflangs: HreflangEntry[];
  ogLocale: string | null;
  ogLocaleAlternates: string[];
  /** Site name from `og:site_name` / `application-name` meta tags. */
  siteName: string | null;
  /** Absolute `href` + text of the page anchors. */
  anchors: { href: string; text: string; hreflang?: string }[];
  /** Every cookie and web-storage entry (values truncated). */
  storageEntries: LocaleStorageEntry[];
  /** `outerHTML` of the document, truncated. */
  html: string;
  /** Script / stylesheet / iframe / network resource URLs. */
  resourceUrls: string[];
  /** Contents of the same-origin scripts, truncated. */
  scripts: string[];
  /** Technology globals present on `window`. */
  globals: string[];
  /** Version strings read from dotted window paths. */
  globalVersions: Record<string, string>;
  /** Live-DOM markers, e.g. `react-fiber`. */
  domMarkers: string[];
};

/** Everything the popup displays about the inspected page. */
export type PageDetectionResult = {
  url: string;
  title: string;
  htmlLang: string | null;
  htmlDir: string | null;
  /** Whether `dir` is right for the language (only required for RTL). */
  isHtmlDirValid: boolean;
  canonicalHref: string | null;
  hreflangs: HreflangEntry[];
  hasXDefault: boolean;
  ogLocale: string | null;
  ogLocaleAlternates: string[];
  /** Union of locales found in `lang`, hreflang and og tags. */
  detectedLocales: string[];
  /** How the site encodes the locale in its URLs. */
  routing: RoutingDetection;
  /** Site name from `og:site_name` / `application-name` meta tags. */
  siteName: string | null;
  technologies: DetectedTechnology[];
  /** Cookie / web-storage entries holding a locale value. */
  localeStorageEntries: LocaleStorageEntry[];
  /** Same-origin anchors, language-switcher links excluded. */
  internalAnchorCount: number;
  /** Internal anchors resolving to the page locale, per the routing strategy. */
  localizedAnchorCount: number;
};
