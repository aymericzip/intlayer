import { describe, expect, it } from 'vitest';
import { buildPageDetection } from './buildPageDetection';
import type { RawPageSignals } from './types';

const baseSignals: RawPageSignals = {
  url: 'https://example.com/fr/about',
  title: 'À propos',
  htmlLang: 'fr',
  htmlDir: null,
  canonicalHref: 'https://example.com/fr/about',
  hreflangs: [
    { hreflang: 'en', href: 'https://example.com/about' },
    { hreflang: 'fr', href: 'https://example.com/fr/about' },
    { hreflang: 'x-default', href: 'https://example.com/about' },
  ],
  ogLocale: 'fr_FR',
  ogLocaleAlternates: [],
  siteName: 'Example',
  anchors: [
    { href: 'https://example.com/fr/pricing', text: 'Tarifs' },
    { href: 'https://example.com/pricing', text: 'Pricing' },
    { href: 'https://example.com/about', text: 'English', hreflang: 'en' },
  ],
  storageEntries: [
    { source: 'cookie', name: 'INTLAYER_LOCALE', value: 'fr' },
    { source: 'cookie', name: '_ga', value: 'GA1.1.123' },
  ],
  html: '<html lang="fr"></html>',
  resourceUrls: ['https://cdn.crowdin.com/jipt/jipt.js'],
  scripts: [],
  globals: [],
  globalVersions: {},
  domMarkers: ['react-fiber'],
};

describe('buildPageDetection', () => {
  it('interprets the raw signals with the shared engine detection', () => {
    const detection = buildPageDetection(baseSignals);

    expect(detection.routing.strategy).toBe('prefix-no-default');
    expect(detection.routing.urlLocale).toBe('fr');
    expect(detection.hasXDefault).toBe(true);
    expect(detection.detectedLocales).toEqual(['fr', 'en', 'fr-FR']);
    expect(detection.technologies.map(({ id }) => id)).toEqual([
      'react',
      'intlayer',
      'crowdin',
    ]);
    expect(detection.localeStorageEntries).toEqual([
      { source: 'cookie', name: 'INTLAYER_LOCALE', value: 'fr' },
    ]);
    // The language-switcher link is not an internal page link.
    expect(detection.internalAnchorCount).toBe(2);
    expect(detection.localizedAnchorCount).toBe(1);
  });

  it('only requires dir="rtl" for right-to-left languages', () => {
    expect(buildPageDetection(baseSignals).isHtmlDirValid).toBe(true);
    expect(
      buildPageDetection({ ...baseSignals, htmlLang: 'ar' }).isHtmlDirValid
    ).toBe(false);
    expect(
      buildPageDetection({ ...baseSignals, htmlLang: 'ar', htmlDir: 'rtl' })
        .isHtmlDirValid
    ).toBe(true);
  });
});
