import { describe, expect, it } from 'vitest';
import {
  checkCanonical,
  checkHreflang,
  checkHtmlDir,
  checkHtmlLang,
  checkInternalLinks,
  checkLocaleConsistency,
  type PageSignals,
} from './checks';
import { detectRoutingStrategy } from './detection/detectRoutingStrategy';
import {
  extractAnchors,
  extractCanonicalHref,
  extractHreflangs,
  extractHtmlDir,
  extractHtmlLang,
} from './parseHtml';
import type { ScanEvent } from './types';

/** Build the page signals of an HTML document, as `runScanChecks` does. */
const getSignals = (targetUrl: string, html: string): PageSignals => {
  const langTag = extractHtmlLang(html);
  const hreflangs = extractHreflangs(html);
  const routing = detectRoutingStrategy({
    pageUrl: targetUrl,
    htmlLang: langTag,
    hreflangs,
  });
  return {
    targetUrl,
    langTag,
    dirTag: extractHtmlDir(html),
    canonicalHref: extractCanonicalHref(html),
    hreflangs,
    anchors: extractAnchors(html),
    routing,
    pageLocale: routing.urlLocale ?? langTag,
  };
};

/** Run a check and index its events by check name (URL suffix stripped). */
const runCheck = (
  check: (signals: PageSignals, emit: (event: ScanEvent) => void) => void,
  signals: PageSignals
): Record<string, ScanEvent> => {
  const events: Record<string, ScanEvent> = {};
  check(signals, (event) => {
    events[event.type.split('\\')[0] ?? event.type] = event;
  });
  return events;
};

const head = (hreflangs: Record<string, string>, extra = '') =>
  Object.entries(hreflangs)
    .map(
      ([hreflang, href]) =>
        `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`
    )
    .join('\n') + extra;

describe('html attribute checks', () => {
  it('rejects invalid lang tags', () => {
    const events = runCheck(
      checkHtmlLang,
      getSignals('https://example.com/', '<html lang="en_US">')
    );
    expect(events.url_htmlLang?.status).toBe('error');
  });

  it('only requires dir for right-to-left languages', () => {
    const ltr = runCheck(
      checkHtmlDir,
      getSignals('https://example.com/', '<html lang="en">')
    );
    expect(ltr.url_htmlDir?.status).toBe('success');

    const rtlMissing = runCheck(
      checkHtmlDir,
      getSignals('https://example.com/ar', '<html lang="ar">')
    );
    expect(rtlMissing.url_htmlDir?.status).toBe('error');

    const rtl = runCheck(
      checkHtmlDir,
      getSignals('https://example.com/ar', '<html lang="ar" dir="rtl">')
    );
    expect(rtl.url_htmlDir?.status).toBe('success');
  });

  it('flags a lang attribute contradicting the URL locale', () => {
    const events = runCheck(
      checkLocaleConsistency,
      getSignals(
        'https://example.com/fr/about',
        `<html lang="en">${head({
          en: 'https://example.com/en/about',
          fr: 'https://example.com/fr/about',
        })}`
      )
    );
    expect(events.url_currentLocale?.status).toBe('error');
  });
});

describe('canonical & hreflang checks', () => {
  const alternates = {
    en: 'https://example.com/about',
    fr: 'https://example.com/fr/about',
    'x-default': 'https://example.com/about',
  };

  it('errors when the canonical points to another locale', () => {
    const events = runCheck(
      checkCanonical,
      getSignals(
        'https://example.com/fr/about',
        `<html lang="fr">${head(
          alternates,
          '<link rel="canonical" href="https://example.com/about" />'
        )}`
      )
    );
    expect(events.url_hasCanonical?.status).toBe('error');
  });

  it('accepts a self-referencing canonical', () => {
    const events = runCheck(
      checkCanonical,
      getSignals(
        'https://example.com/fr/about',
        `<html lang="fr">${head(
          alternates,
          '<link rel="canonical" href="https://example.com/fr/about/" />'
        )}`
      )
    );
    expect(events.url_hasCanonical?.status).toBe('success');
  });

  it('reports invalid codes, relative URLs and a missing self reference', () => {
    const events = runCheck(
      checkHreflang,
      getSignals(
        'https://example.com/de/about',
        `<html lang="de">${head({
          en_US: 'https://example.com/en/about',
          'en-UK': '/uk/about',
        })}`
      )
    );
    const details = events.url_hreflang?.details?.warning as {
      issues: string[];
    };
    expect(events.url_hreflang?.status).toBe('warning');
    expect(details.issues).toHaveLength(4);
  });
});

describe('internal link checks', () => {
  it('accepts unprefixed links on the default locale of prefix-no-default', () => {
    const events = runCheck(
      checkInternalLinks,
      getSignals(
        'https://example.com/about',
        `<html lang="en">${head({
          en: 'https://example.com/about',
          fr: 'https://example.com/fr/about',
        })}
        <a href="/pricing">Pricing</a>
        <a href="/fr/about" hreflang="fr">Français</a>`
      )
    );
    expect(events.url_hasLocalizedLinks?.status).toBe('success');
    expect(events.url_allAnchorsLocalized?.status).toBe('success');
    expect(events.url_hasLangSelector?.status).toBe('success');
  });

  it('flags links losing the ?lang= parameter and lists them', () => {
    const events = runCheck(
      checkInternalLinks,
      getSignals(
        'https://example.com/page?lang=fr',
        `<html lang="fr">${head({
          en: 'https://example.com/page',
          fr: 'https://example.com/page?lang=fr',
        })}
        <a href="/pricing">Tarifs</a>`
      )
    );
    const details = events.url_hasLocalizedLinks?.details?.warning as {
      links: string[];
    };
    expect(events.url_hasLocalizedLinks?.status).toBe('warning');
    expect(details.links).toEqual(['<a href="/pricing">Tarifs</a>']);
    expect(events.url_allAnchorsLocalized?.status).toBe('warning');
    expect(events.url_hasLangSelector?.status).toBe('warning');
  });
});
