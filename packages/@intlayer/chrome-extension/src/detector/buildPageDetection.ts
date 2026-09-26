import {
  classifyInternalLinks,
  detectRoutingStrategy,
  detectTechnologies,
  isRightToLeftLocale,
  looksLikeLocaleCode,
  technologySignatures,
} from '@intlayer/engine/scan/detection';
import type {
  LocaleStorageEntry,
  PageDetectionResult,
  RawPageSignals,
} from './types';

/** Storage keys commonly holding the current locale. */
const localeStorageKeys = new Set(
  [
    ...technologySignatures.flatMap(({ storageKeys }) => storageKeys ?? []),
    'locale',
    'lang',
    'language',
  ].map((key) => key.toLowerCase())
);

/** Keep the cookie / storage entries whose name and value look like a locale. */
const getLocaleStorageEntries = (
  storageEntries: LocaleStorageEntry[]
): LocaleStorageEntry[] =>
  storageEntries.filter(
    ({ name, value }) =>
      localeStorageKeys.has(name.trim().toLowerCase()) &&
      looksLikeLocaleCode(value.trim())
  );

/** Whether `dir` matches the language: only right-to-left ones require it. */
const getIsHtmlDirValid = (
  htmlLang: string | null,
  htmlDir: string | null
): boolean => {
  const direction = htmlDir?.toLowerCase();
  if (!htmlLang) return Boolean(direction);
  return isRightToLeftLocale(htmlLang)
    ? direction === 'rtl'
    : direction === undefined || direction === 'ltr';
};

/**
 * Interpret the raw signals collected in the page with the shared
 * `@intlayer/engine` detection (same technologies and routing strategy as the
 * `intlayer scan` CLI and the hosted audit).
 */
export const buildPageDetection = (
  signals: RawPageSignals
): PageDetectionResult => {
  const htmlLang = signals.htmlLang || undefined;
  const routing = detectRoutingStrategy({
    pageUrl: signals.url,
    htmlLang,
    hreflangs: signals.hreflangs,
  });

  const localeSet = new Set<string>();
  if (htmlLang) localeSet.add(htmlLang);
  for (const { hreflang } of signals.hreflangs) {
    if (hreflang && hreflang.toLowerCase() !== 'x-default') {
      localeSet.add(hreflang);
    }
  }
  for (const ogLocale of [signals.ogLocale, ...signals.ogLocaleAlternates]) {
    if (ogLocale) localeSet.add(ogLocale.replace('_', '-'));
  }

  const { internalLinks, sameLocaleLinks } = classifyInternalLinks({
    targetUrl: signals.url,
    anchors: signals.anchors,
    hreflangs: signals.hreflangs,
    routing,
    pageLocale: routing.urlLocale ?? htmlLang,
  });

  return {
    url: signals.url,
    title: signals.title,
    htmlLang: signals.htmlLang,
    htmlDir: signals.htmlDir,
    isHtmlDirValid: getIsHtmlDirValid(signals.htmlLang, signals.htmlDir),
    canonicalHref: signals.canonicalHref,
    hreflangs: signals.hreflangs,
    hasXDefault: signals.hreflangs.some(
      ({ hreflang }) => hreflang.toLowerCase() === 'x-default'
    ),
    ogLocale: signals.ogLocale,
    ogLocaleAlternates: signals.ogLocaleAlternates,
    detectedLocales: Array.from(localeSet),
    routing,
    siteName: signals.siteName,
    technologies: detectTechnologies({
      pageUrl: signals.url,
      html: signals.html,
      resourceUrls: signals.resourceUrls,
      scripts: signals.scripts,
      globals: signals.globals,
      globalVersions: signals.globalVersions,
      storageKeys: signals.storageEntries.map(({ name }) => name),
      domMarkers: signals.domMarkers,
    }),
    localeStorageEntries: getLocaleStorageEntries(signals.storageEntries),
    internalAnchorCount: internalLinks.length,
    localizedAnchorCount: sameLocaleLinks.length,
  };
};
