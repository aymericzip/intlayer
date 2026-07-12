import type {
  DetectedTechnology,
  HreflangEntry,
  LocaleStorageEntry,
  PageDetectionResult,
} from './types';

/**
 * Collects every i18n-related implementation detail of the current page.
 *
 * IMPORTANT: this function is serialized and injected into the inspected page
 * via `chrome.scripting.executeScript({ world: 'MAIN' })`. It therefore MUST
 * be fully self-contained: no closure over module-level values, no imports of
 * runtime values (type-only imports are fine) and a JSON-serializable return.
 */
export const detectPage = (): PageDetectionResult => {
  const pageWindow = window as unknown as Record<string, unknown>;

  /** Matches `en`, `en-US`, `pt_BR`, `zh-Hant`… used to spot locale values. */
  const localeCodePattern =
    /^[a-z]{2,3}([_-][A-Za-z]{4})?([_-][A-Za-z0-9]{2,3})?$/;

  const technologies: DetectedTechnology[] = [];

  const addTechnology = (technology: DetectedTechnology): void => {
    if (technologies.some((entry) => entry.id === technology.id)) return;
    technologies.push(technology);
  };

  const readMetaContent = (selector: string): string | null =>
    document.querySelector<HTMLMetaElement>(selector)?.content ?? null;

  /* --------------------------- SEO i18n tags ---------------------------- */

  const htmlLang = document.documentElement.getAttribute('lang');
  const htmlDir = document.documentElement.getAttribute('dir');

  const canonicalHref =
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ??
    null;

  const hreflangs: HreflangEntry[] = Array.from(
    document.querySelectorAll<HTMLLinkElement>(
      'link[rel="alternate"][hreflang]'
    )
  ).map((link) => ({
    hreflang: link.getAttribute('hreflang') ?? '',
    href: link.href,
  }));

  const hasXDefault = hreflangs.some(
    (entry) => entry.hreflang.toLowerCase() === 'x-default'
  );

  const ogLocale = readMetaContent('meta[property="og:locale"]');
  const ogLocaleAlternates = Array.from(
    document.querySelectorAll<HTMLMetaElement>(
      'meta[property="og:locale:alternate"]'
    )
  ).map((meta) => meta.content);

  const generator = readMetaContent('meta[name="generator"]');

  /* ------------------------------ Locales ------------------------------- */

  const localeSet = new Set<string>();
  if (htmlLang) localeSet.add(htmlLang);
  for (const entry of hreflangs) {
    if (entry.hreflang && entry.hreflang.toLowerCase() !== 'x-default') {
      localeSet.add(entry.hreflang);
    }
  }
  if (ogLocale) localeSet.add(ogLocale.replace('_', '-'));
  for (const alternate of ogLocaleAlternates) {
    localeSet.add(alternate.replace('_', '-'));
  }

  const firstPathSegment = window.location.pathname
    .split('/')
    .filter(Boolean)[0];
  const urlLocalePrefix =
    firstPathSegment && localeCodePattern.test(firstPathSegment)
      ? firstPathSegment
      : null;

  /* --------------------------- Anchor analysis -------------------------- */

  const anchors = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('a[href]')
  );
  let internalAnchorCount = 0;
  let localizedAnchorCount = 0;
  for (const anchor of anchors) {
    let anchorUrl: URL;
    try {
      anchorUrl = new URL(anchor.href, window.location.href);
    } catch {
      continue;
    }
    if (anchorUrl.origin !== window.location.origin) continue;
    internalAnchorCount++;
    const anchorFirstSegment = anchorUrl.pathname.split('/').filter(Boolean)[0];
    if (anchorFirstSegment && localeCodePattern.test(anchorFirstSegment)) {
      localizedAnchorCount++;
    }
  }

  /* ------------------------ Framework detection ------------------------- */

  const nextData = pageWindow.__NEXT_DATA__;
  const nextRuntime = pageWindow.next as { version?: string } | undefined;
  if (nextData || pageWindow.__next_f || nextRuntime?.version) {
    addTechnology({
      id: 'nextjs',
      name: 'Next.js',
      category: 'framework',
      version: nextRuntime?.version,
      evidence: nextData
        ? 'window.__NEXT_DATA__ (pages router)'
        : pageWindow.__next_f
          ? 'window.__next_f (app router)'
          : 'window.next.version',
    });
  }

  if (
    pageWindow.__NUXT__ ||
    pageWindow.useNuxtApp ||
    document.getElementById('__nuxt')
  ) {
    addTechnology({
      id: 'nuxt',
      name: 'Nuxt',
      category: 'framework',
      evidence: pageWindow.__NUXT__ ? 'window.__NUXT__' : '#__nuxt element',
    });
  }

  if (document.getElementById('___gatsby') || pageWindow.___gatsby) {
    addTechnology({
      id: 'gatsby',
      name: 'Gatsby',
      category: 'framework',
      evidence: '#___gatsby element',
    });
  }

  if (pageWindow.__remixContext || pageWindow.__reactRouterContext) {
    addTechnology({
      id: 'remix',
      name: pageWindow.__remixContext ? 'Remix' : 'React Router',
      category: 'framework',
      evidence: pageWindow.__remixContext
        ? 'window.__remixContext'
        : 'window.__reactRouterContext',
    });
  }

  const astroIsland = document.querySelector('astro-island, astro-slot');
  if (astroIsland || generator?.startsWith('Astro')) {
    addTechnology({
      id: 'astro',
      name: 'Astro',
      category: 'framework',
      version: generator?.startsWith('Astro')
        ? generator.replace(/^Astro\s*v?/, '')
        : undefined,
      evidence: astroIsland ? '<astro-island> element' : 'generator meta tag',
    });
  }

  const hasSvelteKitGlobal = Object.keys(pageWindow).some((key) =>
    key.startsWith('__sveltekit')
  );
  if (
    hasSvelteKitGlobal ||
    document.querySelector('[data-sveltekit-preload-data]')
  ) {
    addTechnology({
      id: 'sveltekit',
      name: 'SvelteKit',
      category: 'framework',
      evidence: hasSvelteKitGlobal
        ? 'window.__sveltekit_* global'
        : '[data-sveltekit-preload-data] attribute',
    });
  }

  const angularElement = document.querySelector('[ng-version]');
  if (angularElement) {
    addTechnology({
      id: 'angular',
      name: 'Angular',
      category: 'framework',
      version: angularElement.getAttribute('ng-version') ?? undefined,
      evidence: '[ng-version] attribute',
    });
  }

  const hasVueMarker =
    pageWindow.__VUE__ === true ||
    Boolean(document.querySelector('[data-v-app]'));
  if (hasVueMarker && !technologies.some((entry) => entry.id === 'nuxt')) {
    addTechnology({
      id: 'vue',
      name: 'Vue.js',
      category: 'framework',
      evidence:
        pageWindow.__VUE__ === true
          ? 'window.__VUE__'
          : '[data-v-app] attribute',
    });
  }

  if (document.querySelector('[q\\:container]')) {
    addTechnology({
      id: 'qwik',
      name: 'Qwik',
      category: 'framework',
      evidence: '[q:container] attribute',
    });
  }

  const hasReactBasedFramework = technologies.some((entry) =>
    ['nextjs', 'gatsby', 'remix'].includes(entry.id)
  );
  if (!hasReactBasedFramework) {
    const sampledElements = [
      document.body,
      ...Array.from(document.body?.querySelectorAll('*') ?? []).slice(0, 300),
    ].filter(Boolean) as Element[];
    const hasReactMarker = sampledElements.some((element) =>
      Object.keys(element).some(
        (key) =>
          key.startsWith('__reactFiber$') ||
          key.startsWith('__reactContainer$') ||
          key === '_reactRootContainer'
      )
    );
    if (hasReactMarker) {
      addTechnology({
        id: 'react',
        name: 'React',
        category: 'framework',
        evidence: '__reactFiber$/__reactContainer$ DOM markers',
      });
    }
  }

  if (generator?.toLowerCase().includes('wordpress')) {
    addTechnology({
      id: 'wordpress',
      name: 'WordPress',
      category: 'cms',
      version: generator.replace(/^WordPress\s*/i, ''),
      evidence: 'generator meta tag',
    });
  }

  /* ----------------- Cookies / storage locale inspection ---------------- */

  const knownLocaleKeys = [
    'INTLAYER_LOCALE',
    'NEXT_LOCALE',
    'i18next',
    'i18nextLng',
    'i18n_redirected',
    'pll_language',
    'wp-wpml_current_language',
    '_icl_current_language',
    'locale',
    'lang',
    'language',
  ];
  const isLocaleEntry = (name: string, value: string): boolean =>
    knownLocaleKeys.some(
      (key) => key.toLowerCase() === name.trim().toLowerCase()
    ) && localeCodePattern.test(decodeURIComponent(value).trim());

  const localeStorageEntries: LocaleStorageEntry[] = [];

  for (const rawCookie of document.cookie.split(';')) {
    const separatorIndex = rawCookie.indexOf('=');
    if (separatorIndex === -1) continue;
    const name = rawCookie.slice(0, separatorIndex).trim();
    const value = rawCookie.slice(separatorIndex + 1).trim();
    if (isLocaleEntry(name, value)) {
      localeStorageEntries.push({
        source: 'cookie',
        name,
        value: decodeURIComponent(value),
      });
    }
  }

  for (const storageName of ['localStorage', 'sessionStorage'] as const) {
    try {
      const storage = window[storageName];
      for (let index = 0; index < storage.length; index++) {
        const name = storage.key(index);
        if (!name) continue;
        const value = storage.getItem(name) ?? '';
        if (isLocaleEntry(name, value)) {
          localeStorageEntries.push({ source: storageName, name, value });
        }
      }
    } catch {
      // Storage can be blocked by the page's permissions policy.
    }
  }

  const findStorageEntry = (name: string): LocaleStorageEntry | undefined =>
    localeStorageEntries.find(
      (entry) => entry.name.toLowerCase() === name.toLowerCase()
    );

  /* ---------------------- i18n library detection ------------------------ */

  const intlayerEntry = findStorageEntry('INTLAYER_LOCALE');
  if (intlayerEntry) {
    addTechnology({
      id: 'intlayer',
      name: 'Intlayer',
      category: 'i18n-library',
      evidence: `INTLAYER_LOCALE ${intlayerEntry.source} = ${intlayerEntry.value}`,
    });
  }

  const i18nextGlobal = pageWindow.i18next as
    | { version?: string; language?: string }
    | undefined;
  const i18nextEntry =
    findStorageEntry('i18nextLng') ?? findStorageEntry('i18next');
  if (i18nextGlobal || i18nextEntry) {
    addTechnology({
      id: 'i18next',
      name: 'i18next',
      category: 'i18n-library',
      version: i18nextGlobal?.version,
      evidence: i18nextGlobal
        ? 'window.i18next global'
        : `${i18nextEntry?.name} ${i18nextEntry?.source}`,
    });
  }

  const nextLocaleEntry = findStorageEntry('NEXT_LOCALE');
  if (
    nextLocaleEntry &&
    technologies.some((entry) => entry.id === 'nextjs') &&
    !technologies.some((entry) => entry.category === 'i18n-library')
  ) {
    addTechnology({
      id: 'next-locale',
      name: 'Next.js i18n routing (next-intl / next-i18next)',
      category: 'i18n-library',
      evidence: `NEXT_LOCALE cookie = ${nextLocaleEntry.value}`,
    });
  }

  if (pageWindow.__INTLIFY__ || pageWindow.__VUE_I18N__) {
    addTechnology({
      id: 'vue-i18n',
      name: 'Vue I18n',
      category: 'i18n-library',
      evidence: pageWindow.__INTLIFY__
        ? 'window.__INTLIFY__'
        : 'window.__VUE_I18N__',
    });
  }

  const nuxtI18nEntry = findStorageEntry('i18n_redirected');
  if (nuxtI18nEntry) {
    addTechnology({
      id: 'nuxt-i18n',
      name: '@nuxtjs/i18n',
      category: 'i18n-library',
      evidence: `i18n_redirected cookie = ${nuxtI18nEntry.value}`,
    });
  }

  if (typeof pageWindow.$localize === 'function') {
    addTechnology({
      id: 'angular-localize',
      name: 'Angular @angular/localize',
      category: 'i18n-library',
      evidence: 'window.$localize',
    });
  }

  if (pageWindow.Weglot) {
    addTechnology({
      id: 'weglot',
      name: 'Weglot',
      category: 'i18n-library',
      evidence: 'window.Weglot',
    });
  }

  if (pageWindow.Localize) {
    addTechnology({
      id: 'localizejs',
      name: 'Localize',
      category: 'i18n-library',
      evidence: 'window.Localize',
    });
  }

  const pllEntry = findStorageEntry('pll_language');
  if (pllEntry) {
    addTechnology({
      id: 'polylang',
      name: 'Polylang',
      category: 'i18n-library',
      evidence: `pll_language cookie = ${pllEntry.value}`,
    });
  }

  const wpmlEntry =
    findStorageEntry('wp-wpml_current_language') ??
    findStorageEntry('_icl_current_language');
  if (wpmlEntry) {
    addTechnology({
      id: 'wpml',
      name: 'WPML',
      category: 'i18n-library',
      evidence: `${wpmlEntry.name} cookie = ${wpmlEntry.value}`,
    });
  }

  return {
    url: window.location.href,
    title: document.title,
    htmlLang,
    htmlDir,
    canonicalHref,
    hreflangs,
    hasXDefault,
    ogLocale,
    ogLocaleAlternates,
    detectedLocales: Array.from(localeSet),
    urlLocalePrefix,
    generator,
    technologies,
    localeStorageEntries,
    internalAnchorCount,
    localizedAnchorCount,
  };
};
