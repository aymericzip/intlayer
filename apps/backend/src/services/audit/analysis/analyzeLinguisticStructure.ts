export const analyzeLinguisticStructure = (
  $: any,
  baseUrl: string,
  localesSet: Set<string>
) => {
  const langTag = $('html').attr('lang') ?? 'not found';
  const htmlLangPresent = langTag !== 'not found';
  const dirTag = $('html').attr('dir') ?? null;
  const htmlDirPresent = Boolean(dirTag);

  const currentLocale = langTag;
  if (currentLocale && currentLocale !== 'not found') {
    localesSet.add(currentLocale);
  }

  const hreflangs: { hreflang: string; href: string }[] = [];
  $("link[rel='alternate']").each((_: any, elem: any) => {
    const hreflang = $(elem).attr('hreflang');
    const href = $(elem).attr('href');
    if (hreflang && href) {
      hreflangs.push({ hreflang, href });
    }
  });

  const hreflangDiversity = new Set(hreflangs.map((h) => h.hreflang)).size;
  const hasXDefault = hreflangs.some((h) => h.hreflang === 'x-default');

  const alternates: string[] = [];
  for (const item of hreflangs) {
    try {
      const absUrl = new URL(item.href, baseUrl).href;
      alternates.push(absUrl);
      const locale = item.hreflang;
      if (locale && locale !== 'x-default') {
        localesSet.add(locale);
      }
    } catch {
      // ignore
    }
  }

  return {
    langTag,
    htmlLangPresent,
    dirTag,
    htmlDirPresent,
    currentLocale,
    hreflangs,
    hreflangDiversity,
    hasXDefault,
    alternates,
  };
};
