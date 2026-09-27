/**
 * Category of a technology detected on a scanned page.
 *
 * - `framework`: rendering framework (Next.js, Nuxt, Angular…)
 * - `i18n-library`: code-level i18n library (Intlayer, i18next, vue-i18n…)
 * - `tms`: translation management system (Crowdin, Phrase, Lokalise…)
 * - `translation-proxy`: hosted website translation layer (Weglot, Localize…)
 * - `cms`: content management system / site builder
 */
export type TechnologyCategory =
  | 'framework'
  | 'i18n-library'
  | 'tms'
  | 'translation-proxy'
  | 'cms';

/**
 * Fingerprint of a technology. Every signal is optional; a technology is
 * detected as soon as one of them matches. Regexes with a first capture group
 * provide the detected version.
 */
export type TechnologySignature = {
  /** Stable identifier, e.g. `nextjs`, `crowdin`. */
  id: string;
  /** Human-readable name. */
  name: string;
  category: TechnologyCategory;
  /** Matched against script / stylesheet / iframe / request URLs. */
  resourceUrls?: RegExp[];
  /** Matched against the HTML document, inline scripts included. */
  html?: RegExp[];
  /** Matched against the content of same-origin JavaScript chunks. */
  bundle?: RegExp[];
  /** Window globals, only available when inspecting a live page. */
  globals?: string[];
  /** Cookie / localStorage / sessionStorage keys (case-insensitive). */
  storageKeys?: string[];
  /**
   * Markers only a live DOM exposes, reported by the collector (e.g.
   * `react-fiber` for the `__reactFiber$…` keys React sets on elements).
   */
  domMarkers?: string[];
  /** Dotted window path holding the version, e.g. `next.version`. */
  versionGlobal?: string;
  /** Only reported when every one of these ids is detected too. */
  requires?: string[];
  /** Hidden when any of these ids is detected (e.g. Vue under Nuxt). */
  hiddenBy?: string[];
};

/**
 * Any string-literal quote. Minifiers such as rolldown / oxc emit template
 * literals (`` `i18next:` ``), so bundle patterns must accept backticks too.
 */
const QUOTE = `["'\`]`;

/** Build a bundle pattern where every `<Q>` placeholder stands for {@link QUOTE}. */
const quoted = (source: string, flags?: string): RegExp =>
  new RegExp(source.replaceAll('<Q>', QUOTE), flags);

/** Rendering frameworks and site builders. */
const frameworkSignatures: TechnologySignature[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'framework',
    html: [/<script[^>]+id=["']__NEXT_DATA__["']/, /self\.__next_f\b/],
    resourceUrls: [/\/_next\/static\//],
    globals: ['__NEXT_DATA__', '__next_f'],
    versionGlobal: 'next.version',
  },
  {
    id: 'nuxt',
    name: 'Nuxt',
    category: 'framework',
    html: [/window\.__NUXT__|id=["']__nuxt["']|data-nuxt-/],
    resourceUrls: [/\/_nuxt\//],
    globals: ['__NUXT__', 'useNuxtApp'],
  },
  {
    id: 'gatsby',
    name: 'Gatsby',
    category: 'framework',
    html: [/id=["']___gatsby["']/],
    globals: ['___gatsby'],
  },
  {
    id: 'remix',
    name: 'Remix',
    category: 'framework',
    html: [/window\.__remixContext\b/],
    globals: ['__remixContext'],
  },
  {
    id: 'react-router',
    name: 'React Router',
    category: 'framework',
    html: [/window\.__reactRouterContext\b/],
    globals: ['__reactRouterContext'],
  },
  {
    id: 'tanstack-start',
    name: 'TanStack Start',
    category: 'framework',
    html: [/\$_TSR\b|__TSR_ROUTER__/],
    globals: ['$_TSR', '__TSR_ROUTER__'],
  },
  {
    id: 'tanstack-router',
    name: 'TanStack Router',
    category: 'framework',
    bundle: [/tsr-scroll-restoration/],
    hiddenBy: ['tanstack-start'],
  },
  {
    id: 'astro',
    name: 'Astro',
    category: 'framework',
    html: [
      /<meta[^>]+name=["']generator["'][^>]+content=["']Astro v?([\d.]+)/i,
      /<astro-(?:island|slot)\b/,
    ],
  },
  {
    id: 'sveltekit',
    name: 'SvelteKit',
    category: 'framework',
    html: [/data-sveltekit-|__sveltekit_/],
    resourceUrls: [/\/_app\/immutable\//],
  },
  {
    id: 'svelte',
    name: 'Svelte',
    category: 'framework',
    bundle: [/https:\/\/svelte\.dev\/e\//],
    hiddenBy: ['sveltekit'],
  },
  {
    id: 'angular',
    name: 'Angular',
    category: 'framework',
    html: [/ng-version=["']([\d.]+)/],
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'framework',
    html: [/data-v-app\b/],
    bundle: [/\b__v_isRef\b/],
    globals: ['__VUE__'],
    hiddenBy: ['nuxt'],
  },
  {
    id: 'solid',
    name: 'SolidJS',
    category: 'framework',
    html: [/_\$HY\b/],
    bundle: [/\b_\$HY\.done\b/],
    globals: ['_$HY'],
  },
  {
    id: 'qwik',
    name: 'Qwik',
    category: 'framework',
    html: [/q:container=/],
  },
  {
    // `react.element` alone also appears in deepmerge's isReactElement.
    id: 'react',
    name: 'React',
    category: 'framework',
    bundle: [
      quoted(
        String.raw`Symbol\.for\(<Q>react\.(?:transitional\.element|forward_ref)<Q>\)`
      ),
    ],
    domMarkers: ['react-fiber'],
    hiddenBy: [
      'nextjs',
      'gatsby',
      'remix',
      'react-router',
      'tanstack-start',
      'tanstack-router',
    ],
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'cms',
    html: [
      /<meta[^>]+name=["']generator["'][^>]+content=["']WordPress ?([\d.]+)?/i,
    ],
    resourceUrls: [/\/wp-(?:content|includes)\//],
  },
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'cms',
    resourceUrls: [/cdn\.shopify\.com\//],
    globals: ['Shopify'],
  },
  {
    id: 'webflow',
    name: 'Webflow',
    category: 'cms',
    html: [/data-wf-page=/],
  },
  {
    id: 'wix',
    name: 'Wix',
    category: 'cms',
    resourceUrls: [/static\.parastorage\.com\/|static\.wixstatic\.com\//],
  },
];

/**
 * Code-level i18n libraries. Bundle patterns target string literals kept by
 * minifiers in production builds (error codes, symbols, cookie names).
 */
const i18nLibrarySignatures: TechnologySignature[] = [
  {
    id: 'intlayer',
    name: 'Intlayer',
    category: 'i18n-library',
    resourceUrls: [/\/intlayer-(?:shared|index|client)-[\w-]+\.m?js/],
    bundle: [
      /INTLAYER_(?:NODE_TYPE_|EDITOR_ENABLED|ROUTING_)|intlayer-node-plugin|intlayerQualifierTypes/,
    ],
    storageKeys: ['INTLAYER_LOCALE'],
  },
  {
    id: 'next-intl',
    name: 'next-intl',
    category: 'i18n-library',
    bundle: [quoted('X-NEXT-INTL-LOCALE|<Q>ENVIRONMENT_FALLBACK<Q>', 'i')],
    requires: ['nextjs'],
  },
  {
    id: 'use-intl',
    name: 'use-intl',
    category: 'i18n-library',
    bundle: [quoted('<Q>ENVIRONMENT_FALLBACK<Q>')],
    hiddenBy: ['next-intl'],
  },
  {
    id: 'next-i18next',
    name: 'next-i18next',
    category: 'i18n-library',
    html: [/"_nextI18Next"\s*:/],
  },
  {
    id: 'react-i18next',
    name: 'react-i18next',
    category: 'i18n-library',
    bundle: [/NO_I18NEXT_INSTANCE|USE_T_BEFORE_READY/],
    hiddenBy: ['next-i18next'],
  },
  {
    id: 'i18next',
    name: 'i18next',
    category: 'i18n-library',
    bundle: [quoted('<Q>backendConnector<Q>|<Q>i18next:<Q>')],
    globals: ['i18next'],
    storageKeys: ['i18nextLng', 'i18next'],
    versionGlobal: 'i18next.version',
    hiddenBy: ['next-i18next', 'react-i18next'],
  },
  {
    id: 'react-intl',
    name: 'react-intl (FormatJS)',
    category: 'i18n-library',
    bundle: [quoted(String.raw`\[React Intl\]|<Q>UNSUPPORTED_FORMATTER<Q>`)],
  },
  {
    id: 'nuxt-i18n',
    name: '@nuxtjs/i18n',
    category: 'i18n-library',
    bundle: [/__NUXT_I18N_|nuxt-i18n-slp/],
    storageKeys: ['i18n_redirected'],
  },
  {
    id: 'vue-i18n',
    name: 'vue-i18n',
    category: 'i18n-library',
    bundle: [/__VUE_I18N_SYMBOL__|intlify-message-/],
    globals: ['__INTLIFY__', '__VUE_I18N__'],
    hiddenBy: ['nuxt-i18n'],
  },
  {
    id: 'lingui',
    name: 'Lingui',
    category: 'i18n-library',
    bundle: [/Lingui: Attempted to call a translation function/],
  },
  {
    id: 'svelte-i18n',
    name: 'svelte-i18n',
    category: 'i18n-library',
    bundle: [/\[svelte-i18n\]/],
  },
  {
    id: 'paraglide',
    name: 'Paraglide JS',
    category: 'i18n-library',
    bundle: [/PARAGLIDE_LOCALE/],
    storageKeys: ['PARAGLIDE_LOCALE'],
  },
  {
    id: 'ngx-translate',
    name: 'ngx-translate',
    category: 'i18n-library',
    bundle: [/ngx-translate\/core: /],
  },
  {
    id: 'transloco',
    name: 'Transloco',
    category: 'i18n-library',
    bundle: [/\bTRANSLOCO_[A-Z_]+/],
  },
  {
    id: 'angular-localize',
    name: 'Angular @angular/localize',
    category: 'i18n-library',
    globals: ['$localize'],
  },
  {
    id: 'next-translate',
    name: 'next-translate',
    category: 'i18n-library',
    html: [/"__namespaces"\s*:/],
    bundle: [/\b__NEXT_TRANSLATE__\b/],
    globals: ['__NEXT_TRANSLATE__'],
  },
  {
    id: 'next-international',
    name: 'next-international',
    category: 'i18n-library',
    bundle: [/\bI18nProviderClient\b/],
    requires: ['nextjs'],
  },
  {
    id: 'gt-next',
    name: 'gt-next (General Translation)',
    category: 'i18n-library',
    bundle: [/\bgt-next\b/],
    requires: ['nextjs'],
  },
  {
    id: 'gt-react',
    name: 'gt-react (General Translation)',
    category: 'i18n-library',
    bundle: [
      /__generaltranslation|generaltranslation\/react-core|\bgt-react\b/,
    ],
    hiddenBy: ['gt-next'],
  },
  {
    id: 'lingo-dev',
    name: 'Lingo.dev',
    category: 'i18n-library',
    bundle: [/__LINGO_DEV_(?:STATE|UPDATE)__|\bLINGO_DEBUG\b/],
    globals: ['__LINGO_DEV_STATE__'],
  },
  {
    id: 'wuchale',
    name: 'wuchale',
    category: 'i18n-library',
    bundle: [/i18n-404:tag/],
  },
  {
    id: 'fluent-vue',
    name: 'fluent-vue',
    category: 'i18n-library',
    bundle: [/\[fluent-vue\]/],
  },
  {
    id: 'fluent',
    name: 'Fluent (Project Fluent)',
    category: 'i18n-library',
    bundle: [quoted('ReferenceError\\(<Q>Unknown term: ')],
    hiddenBy: ['fluent-vue'],
  },
  {
    id: 'solid-primitives-i18n',
    name: '@solid-primitives/i18n',
    category: 'i18n-library',
    bundle: [quoted(String.raw`RegExp\(<Q>\{\{\\\\s\*\$\{\w+\}\\\\s\*\}\}<Q>`)],
  },
  {
    id: 'next-locale',
    name: 'Next.js i18n routing',
    category: 'i18n-library',
    storageKeys: ['NEXT_LOCALE'],
    requires: ['nextjs'],
    hiddenBy: ['intlayer', 'next-intl', 'next-i18next', 'next-translate'],
  },
  {
    id: 'polylang',
    name: 'Polylang',
    category: 'i18n-library',
    // Language switcher items: `lang-item lang-item-2 lang-item-fr`.
    html: [/\blang-item-\d+\b/],
    resourceUrls: [/\/wp-content\/plugins\/polylang/],
    storageKeys: ['pll_language'],
  },
  {
    id: 'wpml',
    name: 'WPML',
    category: 'i18n-library',
    html: [
      /<meta[^>]+name=["']generator["'][^>]+content=["']WPML ver:([\d.]+)/i,
      /\bwpml-ls(?:-item|-statics|-legacy)?\b/,
    ],
    resourceUrls: [/\/wp-content\/plugins\/sitepress-multilingual-cms/],
    storageKeys: ['wp-wpml_current_language', '_icl_current_language'],
  },
  {
    id: 'translatepress',
    name: 'TranslatePress',
    category: 'i18n-library',
    html: [/\btrp-language-switcher\b|\bdata-trp-/],
    resourceUrls: [/\/wp-content\/plugins\/translatepress-multilingual/],
  },
];

/** Translation management systems (in-context editors and OTA delivery). */
const tmsSignatures: TechnologySignature[] = [
  {
    id: 'intlayer-cms',
    name: 'Intlayer CMS',
    category: 'tms',
    resourceUrls: [/\/\/back\.intlayer\.org\//],
    // The editor config always embeds the backend URL: require it enabled.
    bundle: [
      quoted(
        String.raw`back\.intlayer\.org<Q>,\s*<Q>?port<Q>?:\s*[\w.]+,\s*<Q>?enabled<Q>?:\s*(?:!0|true)`
      ),
    ],
    requires: ['intlayer'],
  },
  {
    id: 'crowdin',
    name: 'Crowdin',
    category: 'tms',
    resourceUrls: [/(?:^|\.|\/\/)crowdin\.(?:com|net)\//],
    // In-context (JIPT) snippet: `var _jipt = []; _jipt.push(['project', …])`.
    html: [/\b_jipt\s*(?:=\s*\[|\.push\()/],
    bundle: [/distributions\.crowdin\.net|cdn\.crowdin\.com/],
    globals: ['_jipt'],
  },
  {
    id: 'phrase',
    name: 'Phrase',
    category: 'tms',
    html: [/\bPHRASEAPP_CONFIG\s*=/],
    resourceUrls: [/(?:^|\.|\/\/)(?:phrase|phraseapp)\.com\//],
    bundle: [/ota\.(?:eu|us)\.phrase\.com|PHRASEAPP_CONFIG|phraseapp\.com/],
    globals: ['PHRASEAPP_CONFIG', 'phraseApp'],
  },
  {
    id: 'lokalise',
    name: 'Lokalise',
    category: 'tms',
    html: [/\bLOKALISE_CONFIG\s*=/],
    resourceUrls: [/(?:^|\.|\/\/)lokalise\.(?:com|co)\//],
    bundle: [/ota\.lokalise\.com|app\.lokalise\.com|LOKALISE_CONFIG/],
    globals: ['LOKALISE_CONFIG'],
  },
  {
    id: 'locize',
    name: 'locize',
    category: 'tms',
    html: [/\blocizer\.init\(/],
    resourceUrls: [/(?:^|\.|\/\/)locize\.(?:app|io|com)\//],
    bundle: [/api\.(?:lite\.)?locize\.(?:app|io)/],
  },
  {
    id: 'transifex',
    name: 'Transifex',
    category: 'tms',
    // Transifex Live snippet: `window.liveSettings = { api_key: … }`.
    html: [/\bliveSettings\s*=\s*\{/],
    resourceUrls: [/(?:^|\.|\/\/)transifex\.(?:com|net)\//],
    bundle: [/cds\.svc\.transifex\.net/],
    globals: ['Transifex', 'liveSettings'],
  },
  {
    id: 'tolgee',
    name: 'Tolgee',
    category: 'tms',
    resourceUrls: [/(?:^|\.|\/\/)(?:tolgee\.io|tolg\.ee)\//],
    bundle: [/app\.tolgee\.io|@tolgee\//],
  },
  {
    id: 'localazy',
    name: 'Localazy',
    category: 'tms',
    resourceUrls: [/(?:^|\.|\/\/)localazy\.com\//],
    bundle: [/delivery\.localazy\.com/],
  },
  {
    id: 'simplelocalize',
    name: 'SimpleLocalize',
    category: 'tms',
    resourceUrls: [/(?:^|\.|\/\/)simplelocalize\.io\//],
    bundle: [/cdn\.simplelocalize\.io/],
  },
  {
    id: 'localizely',
    name: 'Localizely',
    category: 'tms',
    resourceUrls: [/(?:^|\.|\/\/)localizely\.com\//],
    bundle: [/api\.localizely\.com/],
  },
  {
    id: 'smartling',
    name: 'Smartling',
    category: 'tms',
    resourceUrls: [/(?:^|\.|\/\/)smartling\.com\//],
    bundle: [/api\.smartling\.com/],
  },
  {
    id: 'poeditor',
    name: 'POEditor',
    category: 'tms',
    resourceUrls: [/(?:^|\.|\/\/)poeditor\.com\//],
    bundle: [/api\.poeditor\.com/],
  },
  {
    id: 'weblate',
    name: 'Weblate',
    category: 'tms',
    resourceUrls: [/hosted\.weblate\.org\//],
    bundle: [/hosted\.weblate\.org/],
  },
  {
    id: 'lingohub',
    name: 'Lingohub',
    category: 'tms',
    resourceUrls: [/(?:^|\.|\/\/)lingohub\.com\//],
    bundle: [/api\.lingohub\.com/],
  },
  {
    id: 'loco',
    name: 'Loco',
    category: 'tms',
    resourceUrls: [/(?:^|\.|\/\/)localise\.biz\//],
    bundle: [/localise\.biz\/api/],
  },
  {
    id: 'gridly',
    name: 'Gridly',
    category: 'tms',
    resourceUrls: [/(?:^|\.|\/\/)gridly\.com\//],
    bundle: [/cdn\.gridly\.com|api\.gridly\.com/],
  },
];

/** Hosted website translation layers (proxy or JS overlay). */
const translationProxySignatures: TechnologySignature[] = [
  {
    id: 'weglot',
    name: 'Weglot',
    category: 'translation-proxy',
    html: [/\bWeglot\.initialize\(|\bdata-wg-notranslate\b/],
    resourceUrls: [/cdn\.weglot\.(?:com|us)\//],
    globals: ['Weglot'],
  },
  {
    id: 'localizejs',
    name: 'Localize',
    category: 'translation-proxy',
    html: [/\bLocalize\.initialize\(/],
    resourceUrls: [/global\.localizecdn\.com\/|cdn\.localizejs\.com\//],
    globals: ['Localize'],
  },
  {
    id: 'gtranslate',
    name: 'GTranslate',
    category: 'translation-proxy',
    html: [/\bgtranslateSettings\s*=|\bgtranslate_wrapper\b/],
    resourceUrls: [/cdn\.gtranslate\.net\//],
    globals: ['gtranslateSettings'],
  },
  {
    id: 'google-translate',
    name: 'Google Translate widget',
    category: 'translation-proxy',
    html: [
      /\bgoogleTranslateElementInit\b|\bgoogle\.translate\.TranslateElement\(/,
    ],
    resourceUrls: [/translate\.google\.com\/translate_a\/element\.js/],
    globals: ['googleTranslateElementInit'],
  },
  {
    id: 'conveythis',
    name: 'ConveyThis',
    category: 'translation-proxy',
    html: [/\bConveyThis_Initializer\.init\(/],
    resourceUrls: [/cdn\.conveythis\.com\//],
  },
  {
    id: 'bablic',
    name: 'Bablic',
    category: 'translation-proxy',
    resourceUrls: [/(?:^|\.|\/\/)bablic\.com\//],
    globals: ['bablic'],
  },
  {
    id: 'linguise',
    name: 'Linguise',
    category: 'translation-proxy',
    html: [/\blinguise_configs\b/],
    resourceUrls: [/(?:^|\.|\/\/)linguise\.com\//],
  },
  {
    id: 'onelink',
    name: 'OneLink (TransPerfect)',
    category: 'translation-proxy',
    resourceUrls: [/(?:^|\.|\/\/)onelink(?:js|-edge)?\.com\//],
  },
  {
    id: 'motionpoint',
    name: 'MotionPoint',
    category: 'translation-proxy',
    resourceUrls: [/(?:^|\.|\/\/)motionpoint\.(?:com|net)\//],
  },
];

/** Every known technology fingerprint, in display order. */
export const technologySignatures: readonly TechnologySignature[] = [
  ...frameworkSignatures,
  ...i18nLibrarySignatures,
  ...tmsSignatures,
  ...translationProxySignatures,
];
