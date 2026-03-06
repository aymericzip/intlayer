import { Locales } from 'intlayer';

const getBaseDomain = (hostname: string): string => {
  const parts = hostname.split('.');
  if (parts.length <= 2) return hostname;

  const lastTwo = parts.slice(-2).join('.');
  const commonMultiPartTLDs = [
    'co.uk',
    'com.au',
    'com.br',
    'com.tr',
    'co.jp',
    'com.cn',
    'com.mx',
    'com.ar',
    'com.co',
  ];

  if (commonMultiPartTLDs.includes(lastTwo) && parts.length >= 3) {
    return parts.slice(-3).join('.');
  }

  return parts.slice(-2).join('.');
};

export const analyzeUrlStructure = async (page: any, origin: string) => {
  const targetHostname = new URL(origin).hostname;
  const targetBaseDomain = getBaseDomain(targetHostname);

  const anchors: { href: string; text: string }[] = await page.$$eval(
    'a[href]',
    (nodes: any[]) =>
      nodes.map((a) => ({
        href: a.getAttribute('href'),
        text: a.innerText?.trim() || '',
      }))
  );

  let localizedCount = 0;
  let totalInternalCount = 0;
  const localizedLinks: string[] = [];
  const nonLocalizedLinks: string[] = [];
  const internalUrls: string[] = [];

  for (const { href, text } of anchors) {
    if (!href || href.startsWith('#') || href.startsWith('javascript:'))
      continue;

    try {
      const url = new URL(href, origin);
      const urlHostname = url.hostname;
      const urlBaseDomain = getBaseDomain(urlHostname);

      const isInternal = urlBaseDomain === targetBaseDomain;

      if (isInternal) {
        totalInternalCount++;
        let normalizedPath = url.pathname;
        if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
          normalizedPath = normalizedPath.slice(0, -1);
        }
        const normalizedUrl = url.origin + normalizedPath + url.search;
        internalUrls.push(normalizedUrl);
        const path = url.pathname.toLowerCase();
        const hostname = url.hostname.toLowerCase();

        const hasLocaleInPath = Object.values(Locales.ALL_LOCALES).some(
          (locale) => {
            const localeLower = (locale as string).toLowerCase();
            return (
              path.startsWith(`/${localeLower}/`) ||
              path === `/${localeLower}` ||
              path.includes(`/${localeLower}/`)
            );
          }
        );

        const hasLocaleInSubdomain = Object.values(Locales.ALL_LOCALES).some(
          (locale) => {
            const localeLower = (locale as string).toLowerCase();
            return (
              hostname.startsWith(`${localeLower}.`) ||
              hostname.includes(`.${localeLower}.`)
            );
          }
        );

        const linkHtml = `\`\`\`\`html\n<a href='${href}'>${text || 'Link'}</a>\n\`\`\``;

        if (hasLocaleInPath || hasLocaleInSubdomain) {
          localizedCount++;
          localizedLinks.push(linkHtml);
        } else {
          nonLocalizedLinks.push(linkHtml);
        }
      }
    } catch {
      // ignore invalid URLs
    }
  }

  const hasLocalizedLinks = localizedCount > 0;
  const allAnchorsLocalized =
    totalInternalCount === 0 || localizedCount === totalInternalCount;

  let urlStructureLocalized: 'none' | 'path-based' | 'subdomain-based' = 'none';
  if (hasLocalizedLinks) {
    urlStructureLocalized = 'path-based';
  }

  return {
    urlStructureLocalized,
    hasLocalizedLinks,
    allAnchorsLocalized,
    totalInternalCount,
    localizedCount,
    localizedLinks,
    nonLocalizedLinks,
    internalUrls: Array.from(new Set(internalUrls)),
  };
};
