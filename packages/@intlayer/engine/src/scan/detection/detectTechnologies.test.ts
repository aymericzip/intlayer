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

  it('matches template-literal quotes emitted by rolldown / oxc', () => {
    expect(
      detectedIds({
        scripts: ['e.ENVIRONMENT_FALLBACK=`ENVIRONMENT_FALLBACK`'],
      })
    ).toEqual(['use-intl']);
    expect(
      detectedIds({ scripts: ['this.prefix=t.prefix||`i18next:`'] })
    ).toContain('i18next');
  });

  it('ignores the react.element symbol checked by deepmerge', () => {
    expect(
      detectedIds({ scripts: ['Symbol.for(`react.element`):60103'] })
    ).not.toContain('react');
    expect(
      detectedIds({ scripts: ['Symbol.for(`react.transitional.element`)'] })
    ).toContain('react');
  });

  it.each([
    ['next-translate', 'globalThis.__NEXT_TRANSLATE__'],
    ['gt-react', 't.__generaltranslation??={}'],
    ['lingo-dev', 'typeof process<`u`&&{}.LINGO_DEBUG===`true`'],
    ['wuchale', 'return a==null?`i18n-404:tag`:a(t)'],
    // biome-ignore lint/suspicious/noTemplateCurlyInString: minified bundle fixture
    ['fluent-vue', 'throw Error(`[fluent-vue] ${t}`)'],
    // biome-ignore lint/suspicious/noTemplateCurlyInString: minified bundle fixture
    ['fluent', 'e.reportError(ReferenceError(`Unknown term: ${i}`))'],
    [
      'solid-primitives-i18n',
      // biome-ignore lint/suspicious/noTemplateCurlyInString: minified bundle fixture
      'e=e.replace(RegExp(`{{\\\\s*${n}\\\\s*}}`,`g`),r)',
    ],
  ])('detects %s from its production bundle', (id, script) => {
    expect(detectedIds({ scripts: [script] })).toContain(id);
  });

  it('only reports the Intlayer CMS when the editor is enabled', () => {
    const config = (enabled: string) =>
      `const a="INTLAYER_NODE_TYPE_";backendURL:\`https://back.intlayer.org\`,port:8e3,enabled:${enabled}`;
    expect(detectedIds({ scripts: [config('!1')] })).not.toContain(
      'intlayer-cms'
    );
    expect(detectedIds({ scripts: [config('!0')] })).toContain('intlayer-cms');
  });

  it('detects TMS in-context snippets from the HTML alone', () => {
    expect(
      detectedIds({
        html: "<script>var _jipt = []; _jipt.push(['project', 'demo']);</script>",
      })
    ).toEqual(['crowdin']);
    expect(
      detectedIds({
        html: '<script>window.liveSettings = { api_key: "x" }</script>',
      })
    ).toEqual(['transifex']);
  });

  it('detects over-the-air TMS requests seen by live collectors', () => {
    expect(
      detectedIds({
        pageUrl: 'https://example.com/',
        resourceUrls: [
          'https://distributions.crowdin.net/abc/manifest.json',
          'https://cdn.tolg.ee/abc/en.json',
        ],
      })
    ).toEqual(['crowdin', 'tolgee']);
  });

  it.each([
    ['weglot', "<script>Weglot.initialize({ api_key: 'wg_x' });</script>"],
    ['localizejs', "<script>Localize.initialize({ key: 'x' });</script>"],
    ['gtranslate', '<script>window.gtranslateSettings = {}</script>'],
    [
      'google-translate',
      '<script>function googleTranslateElementInit() {}</script>',
    ],
    [
      'conveythis',
      '<script>ConveyThis_Initializer.init({ api_key: "x" })</script>',
    ],
    ['linguise', '<script>var linguise_configs = {}</script>'],
    ['locize', "<script>locizer.init({ projectId: 'x' })</script>"],
    ['polylang', '<li class="lang-item lang-item-2 lang-item-fr">'],
    ['wpml', '<div class="wpml-ls-statics-shortcode_actions wpml-ls">'],
    ['translatepress', '<div class="trp-language-switcher">'],
  ])('detects %s from its HTML snippet', (id, html) => {
    expect(detectedIds({ html })).toContain(id);
  });
});
