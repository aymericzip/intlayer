import type { RawPageSignals } from './types';

/**
 * Collects the raw i18n signals of the current page: SEO tags, locale storage,
 * resource URLs, same-origin script contents and the technology globals that
 * exist. Interpretation (technologies, routing strategy) happens in the popup
 * with the shared `@intlayer/engine/scan/detection` helpers.
 *
 * IMPORTANT: this function is serialized and injected into the inspected page
 * via `chrome.scripting.executeScript({ world: 'MAIN' })`. It therefore MUST
 * be fully self-contained: no closure over module-level values, no imports of
 * runtime values (type-only imports are fine) and a JSON-serializable return.
 *
 * @param globalNames - Window globals to look for.
 * @param versionPaths - Dotted window paths holding a version string.
 */
export const collectPageSignals = async (
  globalNames: string[],
  versionPaths: string[]
): Promise<RawPageSignals> => {
  const MAX_HTML_LENGTH = 1_500_000;
  const MAX_SCRIPT_COUNT = 25;
  const MAX_SCRIPT_LENGTH = 2_000_000;
  const MAX_ANCHOR_COUNT = 1_000;
  const SCRIPT_TIMEOUT_MS = 3_000;

  const pageWindow = window as unknown as Record<string, unknown>;

  const readMetaContent = (selector: string): string | null =>
    document.querySelector<HTMLMetaElement>(selector)?.content?.trim() || null;

  /* --------------------------- SEO i18n tags ---------------------------- */

  const hreflangs = Array.from(
    document.querySelectorAll<HTMLLinkElement>(
      'link[rel="alternate"][hreflang]'
    )
  ).map((link) => ({
    hreflang: link.getAttribute('hreflang') ?? '',
    href: link.href,
  }));

  const anchors = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('a[href]')
  )
    .slice(0, MAX_ANCHOR_COUNT)
    .map((anchor) => ({
      href: anchor.href,
      text: anchor.textContent?.replace(/\s+/g, ' ').trim().slice(0, 80) ?? '',
      hreflang: anchor.getAttribute('hreflang') ?? undefined,
    }));

  /* ------------------------ Cookies & web storage ------------------------ */

  const storageEntries: RawPageSignals['storageEntries'] = [];
  for (const rawCookie of document.cookie.split(';')) {
    const separatorIndex = rawCookie.indexOf('=');
    if (separatorIndex === -1) continue;
    const value = rawCookie.slice(separatorIndex + 1).trim();
    let decodedValue = value;
    try {
      decodedValue = decodeURIComponent(value);
    } catch {
      // Keep the raw cookie value.
    }
    storageEntries.push({
      source: 'cookie',
      name: rawCookie.slice(0, separatorIndex).trim(),
      value: decodedValue.slice(0, 100),
    });
  }
  for (const storageName of ['localStorage', 'sessionStorage'] as const) {
    try {
      const storage = window[storageName];
      for (let index = 0; index < storage.length; index++) {
        const name = storage.key(index);
        if (!name) continue;
        storageEntries.push({
          source: storageName,
          name,
          value: (storage.getItem(name) ?? '').slice(0, 100),
        });
      }
    } catch {
      // Storage can be blocked by the page's permissions policy.
    }
  }

  /* ------------------------ Technology signals ------------------------- */

  const resourceUrls = new Set<string>();
  for (const element of Array.from(
    document.querySelectorAll<HTMLScriptElement | HTMLLinkElement>(
      'script[src], link[href], iframe[src]'
    )
  )) {
    const url =
      'src' in element && element.src
        ? element.src
        : (element as HTMLLinkElement).href;
    if (url) resourceUrls.add(url);
  }
  for (const entry of performance.getEntriesByType('resource')) {
    resourceUrls.add(entry.name);
  }

  const globals = globalNames.filter((name) => pageWindow[name] !== undefined);
  const globalVersions: Record<string, string> = {};
  for (const versionPath of versionPaths) {
    const value = versionPath
      .split('.')
      .reduce<unknown>(
        (current, key) =>
          current && typeof current === 'object'
            ? (current as Record<string, unknown>)[key]
            : undefined,
        pageWindow
      );
    if (typeof value === 'string') globalVersions[versionPath] = value;
  }

  const domMarkers: string[] = [];
  const sampledElements = [
    document.body,
    ...Array.from(document.body?.querySelectorAll('*') ?? []).slice(0, 300),
  ].filter(Boolean) as Element[];
  const hasReactFiber = sampledElements.some((element) =>
    Object.keys(element).some(
      (key) =>
        key.startsWith('__reactFiber$') ||
        key.startsWith('__reactContainer$') ||
        key === '_reactRootContainer'
    )
  );
  if (hasReactFiber) domMarkers.push('react-fiber');

  // Same-origin scripts, read from the HTTP cache the page just filled.
  const scriptUrls = [...resourceUrls]
    .filter((url) => {
      try {
        const parsedUrl = new URL(url);
        return (
          parsedUrl.origin === window.location.origin &&
          /\.m?js(?:$|\?)/.test(parsedUrl.pathname + parsedUrl.search)
        );
      } catch {
        return false;
      }
    })
    .slice(0, MAX_SCRIPT_COUNT);

  const scripts = (
    await Promise.all(
      scriptUrls.map(async (url) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          SCRIPT_TIMEOUT_MS
        );
        try {
          const response = await fetch(url, {
            cache: 'force-cache',
            signal: controller.signal,
          });
          return response.ok
            ? (await response.text()).slice(0, MAX_SCRIPT_LENGTH)
            : '';
        } catch {
          return '';
        } finally {
          clearTimeout(timeoutId);
        }
      })
    )
  ).filter(Boolean);

  return {
    url: window.location.href,
    title: document.title,
    htmlLang: document.documentElement.getAttribute('lang'),
    htmlDir: document.documentElement.getAttribute('dir'),
    canonicalHref:
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ??
      null,
    hreflangs,
    ogLocale: readMetaContent('meta[property="og:locale"]'),
    ogLocaleAlternates: Array.from(
      document.querySelectorAll<HTMLMetaElement>(
        'meta[property="og:locale:alternate"]'
      )
    ).map((meta) => meta.content),
    siteName:
      readMetaContent('meta[property="og:site_name"]') ??
      readMetaContent('meta[name="application-name"]') ??
      readMetaContent('meta[name="apple-mobile-web-app-title"]'),
    anchors,
    storageEntries,
    html: document.documentElement.outerHTML.slice(0, MAX_HTML_LENGTH),
    resourceUrls: [...resourceUrls],
    scripts,
    globals,
    globalVersions,
    domMarkers,
  };
};
