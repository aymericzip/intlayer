import { getUrlLocale, type RoutingDetection } from './detectRoutingStrategy';
import { isSameLanguage } from './localeCode';
import { normalizeHostname, normalizeUrl, parseUrl } from './url';

/** A page anchor, as parsed from HTML or read from a live DOM. */
export type LinkAnchor = {
  href: string;
  text: string;
  /** `hreflang` attribute, set on language-switcher links. */
  hreflang?: string;
};

/** Input of {@link classifyInternalLinks}. */
export type LinkClassificationInput<Anchor extends LinkAnchor> = {
  /** Absolute URL of the page holding the anchors. */
  targetUrl: string;
  anchors: Anchor[];
  hreflangs: { hreflang: string; href: string }[];
  routing: RoutingDetection;
  /** Locale of the page. */
  pageLocale?: string;
};

/** Internal anchors of a page, grouped by the locale they lead to. */
export type LinkClassification<Anchor extends LinkAnchor> = {
  /** Internal page links, language-switcher links excluded. */
  internalLinks: Anchor[];
  /** Internal links keeping the page locale. */
  sameLocaleLinks: Anchor[];
  /** Internal links leading to another locale. */
  otherLocaleLinks: Anchor[];
  /** Internal links whose URL carries no locale. */
  unlocalizedLinks: Anchor[];
  /** Links to the other locale versions (hreflang alternates). */
  switcherLinks: Anchor[];
};

const NON_PAGE_EXTENSION_PATTERN =
  /\.(?:pdf|png|jpe?g|gif|svg|webp|avif|ico|zip|xml|txt|json|css|js|mp4|webm|mp3)$/i;

/**
 * Group the internal anchors of a page by the locale they lead to, reading
 * each URL through the detected routing strategy (so unprefixed links count as
 * the default locale on a `prefix-no-default` site, and `?lang=` is understood
 * on a `search-params` site).
 */
export const classifyInternalLinks = <Anchor extends LinkAnchor>({
  targetUrl,
  anchors,
  hreflangs,
  routing,
  pageLocale,
}: LinkClassificationInput<Anchor>): LinkClassification<Anchor> => {
  const targetHostname = normalizeHostname(new URL(targetUrl).hostname);
  const localeHostnames = new Set(Object.keys(routing.hostLocales ?? {}));
  const otherLocaleAlternateUrls = new Set(
    hreflangs
      .filter(
        ({ hreflang }) =>
          hreflang.toLowerCase() !== 'x-default' &&
          !isSameLanguage(hreflang, pageLocale)
      )
      .map(({ href }) => normalizeUrl(href, targetUrl))
  );

  const classification: LinkClassification<Anchor> = {
    internalLinks: [],
    sameLocaleLinks: [],
    otherLocaleLinks: [],
    unlocalizedLinks: [],
    switcherLinks: [],
  };

  for (const anchor of anchors) {
    if (/^(?:#|javascript:|mailto:|tel:)/i.test(anchor.href)) continue;
    const url = parseUrl(anchor.href, targetUrl);
    if (!url || !/^https?:$/.test(url.protocol)) continue;

    const hostname = normalizeHostname(url.hostname);
    if (hostname !== targetHostname && !localeHostnames.has(hostname)) continue;
    if (NON_PAGE_EXTENSION_PATTERN.test(url.pathname)) continue;

    if (
      (anchor.hreflang && !isSameLanguage(anchor.hreflang, pageLocale)) ||
      otherLocaleAlternateUrls.has(normalizeUrl(url.href))
    ) {
      classification.switcherLinks.push(anchor);
      continue;
    }

    classification.internalLinks.push(anchor);
    const linkLocale = getUrlLocale(url.href, routing);
    if (!linkLocale) {
      classification.unlocalizedLinks.push(anchor);
    } else if (isSameLanguage(linkLocale, pageLocale)) {
      classification.sameLocaleLinks.push(anchor);
    } else {
      classification.otherLocaleLinks.push(anchor);
    }
  }

  return classification;
};
