/** Category of a technology detected on the inspected page. */
export type TechnologyCategory = 'framework' | 'i18n-library' | 'cms';

/** A single technology detected on the inspected page. */
export type DetectedTechnology = {
  /** Stable identifier, e.g. `nextjs`, `intlayer`. */
  id: string;
  /** Human-readable name, e.g. `Next.js`. */
  name: string;
  category: TechnologyCategory;
  /** Version when it can be read from the page, e.g. `14.2.3`. */
  version?: string;
  /** Short explanation of the signal that triggered the detection. */
  evidence: string;
};

/** An `<link rel="alternate" hreflang>` entry found in the page head. */
export type HreflangEntry = {
  hreflang: string;
  href: string;
};

/** A cookie or web-storage entry that looks locale-related. */
export type LocaleStorageEntry = {
  /** Where the entry was found. */
  source: 'cookie' | 'localStorage' | 'sessionStorage';
  name: string;
  value: string;
};

/** Everything the in-page detector collects about the inspected page. */
export type PageDetectionResult = {
  url: string;
  title: string;
  htmlLang: string | null;
  htmlDir: string | null;
  canonicalHref: string | null;
  hreflangs: HreflangEntry[];
  hasXDefault: boolean;
  ogLocale: string | null;
  ogLocaleAlternates: string[];
  /** Union of locales found in `lang`, hreflang and og tags. */
  detectedLocales: string[];
  /** Locale prefix found in the current URL path, e.g. `fr` in `/fr/about`. */
  urlLocalePrefix: string | null;
  /** Content of the `<meta name="generator">` tag, when present. */
  generator: string | null;
  technologies: DetectedTechnology[];
  localeStorageEntries: LocaleStorageEntry[];
  /** Total number of same-origin anchors found on the page. */
  internalAnchorCount: number;
  /** Same-origin anchors whose path starts with a locale prefix. */
  localizedAnchorCount: number;
};
