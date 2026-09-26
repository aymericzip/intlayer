import { describe, expect, it } from 'vitest';
import { detectTechnologies } from './detectTechnologies';

const detectedIds = (...args: Parameters<typeof detectTechnologies>) =>
  detectTechnologies(...args).map(({ id }) => id);

describe('detectTechnologies', () => {
  it('detects Next.js + next-intl from HTML and bundle signals', () => {
    const ids = detectedIds({
      html: '<script id="__NEXT_DATA__" type="application/json">{}</script>',
      scripts: ['e.headers.set("X-NEXT-INTL-LOCALE",t)'],
      storageKeys: ['NEXT_LOCALE'],
    });
    expect(ids).toContain('nextjs');
    expect(ids).toContain('next-intl');
    // Hidden once a real i18n library is identified.
    expect(ids).not.toContain('next-locale');
    expect(ids).not.toContain('use-intl');
  });

  it('keeps next-intl out when the page is not a Next.js app', () => {
    const ids = detectedIds({ scripts: ['case"ENVIRONMENT_FALLBACK":'] });
    expect(ids).toEqual(['use-intl']);
  });

  it('detects Intlayer from its production bundle markers', () => {
    expect(
      detectedIds({ scripts: ['const a="INTLAYER_NODE_TYPE_TRANSLATION"'] })
    ).toContain('intlayer');
  });

  it('detects TMS and translation proxies from resource URLs and globals', () => {
    const technologies = detectTechnologies({
      resourceUrls: [
        'https://cdn.crowdin.com/jipt/jipt.js',
        'https://cdn.weglot.com/weglot.min.js',
      ],
      globals: ['LOKALISE_CONFIG'],
    });
    expect(technologies.map(({ id, category }) => [id, category])).toEqual([
      ['crowdin', 'tms'],
      ['lokalise', 'tms'],
      ['weglot', 'translation-proxy'],
    ]);
  });

  it('reads versions from capture groups and version globals', () => {
    const technologies = detectTechnologies({
      html: '<app-root ng-version="19.2.1"></app-root>',
      globals: ['__NEXT_DATA__'],
      globalVersions: { 'next.version': '15.1.0' },
    });
    expect(technologies.find(({ id }) => id === 'angular')?.version).toBe(
      '19.2.1'
    );
    expect(technologies.find(({ id }) => id === 'nextjs')?.version).toBe(
      '15.1.0'
    );
  });

  it('hides Vue under Nuxt and i18next under react-i18next', () => {
    const ids = detectedIds({
      html: '<div id="__nuxt" data-v-app></div>',
      scripts: ['"NO_I18NEXT_INSTANCE"', 'prefix:"i18next:"'],
    });
    expect(ids).toEqual(['nuxt', 'react-i18next']);
  });

  it("ignores a vendor's own assets when scanning the vendor's website", () => {
    const ids = detectedIds({
      pageUrl: 'https://crowdin.com/',
      resourceUrls: [
        'https://crowdin.com/astro-website/favicon.svg',
        'https://gtm-sst.crowdin.com/ns.html',
      ],
    });
    expect(ids).toEqual([]);
  });
});
