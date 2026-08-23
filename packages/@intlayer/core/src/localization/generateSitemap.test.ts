import * as Locales from '@intlayer/types/locales';
import { describe, expect, it } from 'vitest';
import { generateSitemap, generateSitemapUrl } from './generateSitemap';

const baseOptions = {
  siteUrl: 'https://intlayer.org',
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.CHINESE],
  defaultLocale: Locales.ENGLISH,
  mode: 'prefix-no-default' as const,
};

// `zh` is alone on intlayer.cn, `en` and `fr` share intlayer.org.
const domains = {
  [Locales.ENGLISH]: 'intlayer.org',
  [Locales.FRENCH]: 'intlayer.org',
  [Locales.CHINESE]: 'intlayer.cn',
};

describe('generateSitemapUrl', () => {
  it('should prefix every alternate with the site URL when no domain is mapped', () => {
    const result = generateSitemapUrl('/about', baseOptions);

    expect(result).toContain('<loc>https://intlayer.org/about</loc>');
    expect(result).toContain(
      '<xhtml:link rel="alternate" hreflang="en" href="https://intlayer.org/about"/>'
    );
    expect(result).toContain(
      '<xhtml:link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/about"/>'
    );
  });

  it('should keep the absolute URL of a locale served from its own domain', () => {
    const result = generateSitemapUrl('/about', { ...baseOptions, domains });

    expect(result).toContain(
      '<xhtml:link rel="alternate" hreflang="zh" href="https://intlayer.cn/about"/>'
    );
    // The domain origin must not be concatenated behind the site URL
    expect(result).not.toContain('https://intlayer.orghttps://');
  });

  it('should still prefix the alternates of locales sharing the site domain', () => {
    const result = generateSitemapUrl('/about', { ...baseOptions, domains });

    expect(result).toContain(
      '<xhtml:link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/about"/>'
    );
  });

  it('should generate alternates in no-prefix mode when domains make URLs distinct', () => {
    const result = generateSitemapUrl('/about', {
      ...baseOptions,
      mode: 'no-prefix',
      domains,
    });

    expect(result).toContain(
      '<xhtml:link rel="alternate" hreflang="zh" href="https://intlayer.cn/about"/>'
    );
  });

  it('should skip alternates in no-prefix mode without domains', () => {
    const result = generateSitemapUrl('/about', {
      ...baseOptions,
      mode: 'no-prefix',
    });

    expect(result).not.toContain('xhtml:link');
  });
});

describe('generateSitemap', () => {
  it('should declare the xhtml namespace when domains produce alternates', () => {
    const result = generateSitemap([{ path: '/about' }], {
      ...baseOptions,
      mode: 'no-prefix',
      domains,
    });

    expect(result).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    expect(result).toContain('href="https://intlayer.cn/about"');
  });
});
