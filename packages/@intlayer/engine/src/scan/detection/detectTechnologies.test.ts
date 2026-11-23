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
    ['gt-react', 'const e=`generaltranslation.locale`'],
    ['gt-react', 'cacheUrl:"https://cdn.gtx.dev"'],
    ['paraglide', 'globalThis.__paraglide=globalThis.__paraglide??{}'],
    [
      'paraglide',
      'throw Error(`No locale found. Read the docs https://paraglidejs.com/errors#no-locale-found`)',
    ],
    [
      'paraglide',
      "throw new Error(`languageTag() didn't return a valid language tag. Check your setLanguageTag call`)",
    ],
    ['lingo-dev', 'typeof process<`u`&&{}.LINGO_DEBUG===`true`'],
    ['wuchale', 'return a==null?`i18n-404:tag`:a(t)'],
    // oxlint-disable-next-line no-template-curly-in-string -- minified bundle fixture
    ['fluent-vue', 'throw Error(`[fluent-vue] ${t}`)'],
    // oxlint-disable-next-line no-template-curly-in-string -- minified bundle fixture
    ['fluent', 'e.reportError(ReferenceError(`Unknown term: ${i}`))'],
    [
      'angular-localize',
      // oxlint-disable-next-line no-template-curly-in-string -- minified bundle fixture
      'throw Error(`Unterminated $localize metadata block in "${e}".`)',
    ],
    ['transloco', 'params:["translocoParams","params"]'],
    ['transloco', 'ɵɵdefinePipe({name:"transloco",type:t,pure:!1})'],
    ['angular-l10n', 'complete:()=>{this.releaseTranslation(t),r()}'],
    ['angular-l10n', 'inputs:{l10nTranslate:"l10nTranslate"}'],
    [
      'typesafe-i18n',
      'Object.assign(Object.defineProperty(()=>"","name",{writable:!0}),e)',
    ],
    ['sveltekit-i18n', 'pi=({logger:e=console,prefix:r="[i18n]: "})=>{}'],
    ['i18next-vue', 'e.config.globalProperties.$i18next=c'],
    ['nuxt-i18n', 'console.warn("[nuxt-i18n] Could not find domain name")'],
  ])('detects %s from its production bundle', (id, script) => {
    expect(detectedIds({ scripts: [script] })).toContain(id);
  });

  it('detects Angular and its version from a client-rendered bundle', () => {
    const technologies = detectTechnologies({
      html: '<app-root></app-root>',
      scripts: ['let o=e?[`ng-version`,`22.1.7`]:Ov(t.selectors[0])'],
    });
    expect(technologies.find(({ id }) => id === 'angular')?.version).toBe(
      '22.1.7'
    );
  });

  it('only reports @solid-primitives/i18n on Solid apps', () => {
    const translator =
      'switch(typeof u){case"function":return u(...i);case"string":return t(u,i[0]);default:return u}';
    expect(detectedIds({ scripts: [translator] })).not.toContain(
      'solid-primitives-i18n'
    );
    expect(
      detectedIds({ scripts: [translator, 'w.done=_$HY.done=!0'] })
    ).toContain('solid-primitives-i18n');
  });

  it('ignores the `{{ key }}` RegExp shared by Intlayer and other libraries', () => {
    const ids = detectedIds({
      html: '<app-root ng-version="20.3.34"></app-root>',
      scripts: [
        // oxlint-disable-next-line no-template-curly-in-string -- minified bundle fixture
        'l=l.replace(new RegExp(`{{\\\\s*${d}\\\\s*}}`,`g`),String(f));const a="INTLAYER_NODE_TYPE_"',
      ],
    });
    expect(ids).toEqual(['angular', 'intlayer']);
  });

  it.each([
    ['solid', 'var ee="_$DX_DELEGATE";'],
    ['solid', 'const t="_$SOLID_EVENT_OWNER";'],
    ['remix-3', 'e.getAttribute("data-rmx-target")'],
  ])('detects the %s framework from its production bundle', (id, script) => {
    expect(detectedIds({ scripts: [script] })).toContain(id);
  });

  it.each([
    ['astro', [], ['https://example.com/_astro/index.B1x2.js']],
    [
      'solid-start',
      ['w.done=_$HY.done=!0'],
      ['https://example.com/_build/assets/client-Ab12.js'],
    ],
    [
      'analog',
      [
        'let o=e?["ng-version","21.0.0"]:x',
        'new P("@analogjs/router Base URL")',
      ],
      [],
    ],
  ])('detects the %s meta-framework', (id, scripts, resourceUrls) => {
    const ids = detectedIds({ scripts, resourceUrls });
    expect(ids).toContain(id);
    // The underlying framework is hidden by its meta-framework.
    expect(ids).not.toContain(id === 'analog' ? 'angular' : 'solid');
  });

  it('detects Remix 3 from its server-rendered frame markers', () => {
    expect(
      detectedIds({ html: '<!-- rmx:h:abc --><div data-rmx-target="x">' })
    ).toEqual(['remix-3']);
  });

  it('reports General Translation as gt-next on Next.js sites', () => {
    const ids = detectedIds({
      html: '<script>self.__next_f.push([1,""])</script>',
      storageKeys: ['generaltranslation.referrer-locale'],
    });
    expect(ids).toContain('gt-next');
    expect(ids).not.toContain('gt-react');
  });

  it('detects Paraglide from its runtime global', () => {
    expect(detectedIds({ globals: ['__paraglide'] })).toContain('paraglide');
  });

  it('ignores pages that only mention General Translation packages', () => {
    expect(
      detectedIds({
        scripts: [
          '"Compare gt-next, gt-react and https://generaltranslation.com"',
        ],
      })
    ).toEqual([]);
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
