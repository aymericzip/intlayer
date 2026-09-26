import { describe, expect, it } from 'vitest';
import { detectRoutingStrategy, getUrlLocale } from './detectRoutingStrategy';

const alternates = (entries: Record<string, string>) =>
  Object.entries(entries).map(([hreflang, href]) => ({ hreflang, href }));

describe('detectRoutingStrategy', () => {
  it('detects prefix-all', () => {
    const routing = detectRoutingStrategy({
      pageUrl: 'https://example.com/fr/about',
      htmlLang: 'fr',
      hreflangs: alternates({
        en: 'https://example.com/en/about',
        fr: 'https://example.com/fr/about',
        'x-default': 'https://example.com/en/about',
      }),
    });
    expect(routing.strategy).toBe('prefix-all');
    expect(routing.defaultLocale).toBe('en');
    expect(routing.urlLocale).toBe('fr');
  });

  it('detects prefix-no-default and resolves unprefixed URLs to the default', () => {
    const routing = detectRoutingStrategy({
      pageUrl: 'https://example.com/about',
      htmlLang: 'en',
      hreflangs: alternates({
        en: 'https://example.com/about',
        fr: 'https://example.com/fr/about',
        'es-ES': 'https://example.com/es-es/about',
      }),
    });
    expect(routing.strategy).toBe('prefix-no-default');
    expect(routing.defaultLocale).toBe('en');
    expect(routing.urlLocale).toBe('en');
    expect(getUrlLocale('https://example.com/pricing', routing)).toBe('en');
    expect(getUrlLocale('https://example.com/es-ES/pricing', routing)).toBe(
      'es-ES'
    );
  });

  it('detects search-params', () => {
    const routing = detectRoutingStrategy({
      pageUrl: 'https://example.com/page?lang=fr',
      htmlLang: 'fr',
      hreflangs: alternates({
        en: 'https://example.com/page',
        fr: 'https://example.com/page?lang=fr',
        de: 'https://example.com/page?lang=de',
      }),
    });
    expect(routing.strategy).toBe('search-params');
    expect(routing.searchParamName).toBe('lang');
    expect(routing.defaultLocale).toBe('en');
    expect(routing.urlLocale).toBe('fr');
    expect(getUrlLocale('https://example.com/other', routing)).toBe('en');
  });

  it('detects subdomain and domain strategies', () => {
    const subdomain = detectRoutingStrategy({
      pageUrl: 'https://fr.example.com/',
      hreflangs: alternates({
        en: 'https://example.com/',
        fr: 'https://fr.example.com/',
      }),
    });
    expect(subdomain.strategy).toBe('subdomain');
    expect(subdomain.urlLocale).toBe('fr');

    const domain = detectRoutingStrategy({
      pageUrl: 'https://example.de/',
      hreflangs: alternates({
        fr: 'https://example.fr/',
        de: 'https://example.de/',
      }),
    });
    expect(domain.strategy).toBe('domain');
    expect(domain.urlLocale).toBe('de');

    // A few locale subdomains among www domains is still domain routing.
    const mixed = detectRoutingStrategy({
      pageUrl: 'https://www.example.fr/',
      hreflangs: alternates({
        fr: 'https://www.example.fr/',
        de: 'https://www.example.de/',
        it: 'https://www.example.it/',
        ar: 'https://ar.example.com/',
      }),
    });
    expect(mixed.strategy).toBe('domain');
  });

  it('detects no-prefix when every alternate shares the same URL', () => {
    const routing = detectRoutingStrategy({
      pageUrl: 'https://example.com/',
      htmlLang: 'en',
      hreflangs: alternates({
        en: 'https://example.com/',
        fr: 'https://example.com/',
      }),
    });
    expect(routing.strategy).toBe('no-prefix');
    expect(routing.urlLocale).toBeUndefined();
  });

  it('falls back to the page URL with a low confidence', () => {
    const prefixed = detectRoutingStrategy({
      pageUrl: 'https://example.com/fr/about',
      htmlLang: 'fr',
      hreflangs: [],
    });
    expect(prefixed).toMatchObject({
      strategy: 'prefix-all',
      confidence: 'low',
      urlLocale: 'fr',
    });

    const unmarked = detectRoutingStrategy({
      pageUrl: 'https://example.com/about',
      htmlLang: 'en',
      hreflangs: [],
    });
    expect(unmarked).toMatchObject({
      strategy: 'no-prefix',
      confidence: 'low',
    });
  });
});
