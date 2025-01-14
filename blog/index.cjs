/* eslint-disable @typescript-eslint/no-require-imports */
const { Locales } = require('@intlayer/config');

/**
 * This condition is a hack to import markdown files either in node or in the browser
 */
if (require.extensions) {
  require.extensions['.md'] = (module, filename) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    module.exports = require('fs').readFileSync(filename, 'utf8');
  };
}

const blogs = {
  index: {
    en: require('./en/index.md'),
    fr: require('./fr/index.md'),
    es: require('./es/index.md'),
    'en-GB': require('./en-GB/index.md'),
    de: require('./de/index.md'),
    hi: require('./hi/index.md'),
    it: require('./it/index.md'),
    ja: require('./ja/index.md'),
    ko: require('./ko/index.md'),
    pt: require('./pt/index.md'),
    ru: require('./ru/index.md'),
    zh: require('./zh/index.md'),
    ar: require('./ar/index.md'),
  },
  internationalization_and_SEO: {
    en: require('./en/internationalization_and_SEO.md'),
    fr: require('./fr/internationalization_and_SEO.md'),
    es: require('./es/internationalization_and_SEO.md'),
    'en-GB': require('./en-GB/internationalization_and_SEO.md'),
    de: require('./de/internationalization_and_SEO.md'),
    hi: require('./hi/internationalization_and_SEO.md'),
    it: require('./it/internationalization_and_SEO.md'),
    ja: require('./ja/internationalization_and_SEO.md'),
    ko: require('./ko/internationalization_and_SEO.md'),
    pt: require('./pt/internationalization_and_SEO.md'),
    ru: require('./ru/internationalization_and_SEO.md'),
    zh: require('./zh/internationalization_and_SEO.md'),
    ar: require('./ar/internationalization_and_SEO.md'),
  },
  'intlayer_with_next-i18next': {
    en: require('./en/intlayer_with_next-i18next.md'),
    fr: require('./fr/intlayer_with_next-i18next.md'),
    es: require('./es/intlayer_with_next-i18next.md'),
    'en-GB': require('./en-GB/intlayer_with_next-i18next.md'),
    de: require('./de/intlayer_with_next-i18next.md'),
    hi: require('./hi/intlayer_with_next-i18next.md'),
    it: require('./it/intlayer_with_next-i18next.md'),
    ja: require('./ja/intlayer_with_next-i18next.md'),
    ko: require('./ko/intlayer_with_next-i18next.md'),
    pt: require('./pt/intlayer_with_next-i18next.md'),
    ru: require('./ru/intlayer_with_next-i18next.md'),
    zh: require('./zh/intlayer_with_next-i18next.md'),
    ar: require('./ar/intlayer_with_next-i18next.md'),
  },
  'intlayer_with_next-intl': {
    en: require('./en/intlayer_with_next-intl.md'),
    fr: require('./fr/intlayer_with_next-intl.md'),
    es: require('./es/intlayer_with_next-intl.md'),
    'en-GB': require('./en-GB/intlayer_with_next-intl.md'),
    de: require('./de/intlayer_with_next-intl.md'),
    hi: require('./hi/intlayer_with_next-intl.md'),
    it: require('./it/intlayer_with_next-intl.md'),
    ja: require('./ja/intlayer_with_next-intl.md'),
    ko: require('./ko/intlayer_with_next-intl.md'),
    pt: require('./pt/intlayer_with_next-intl.md'),
    ru: require('./ru/intlayer_with_next-intl.md'),
    zh: require('./zh/intlayer_with_next-intl.md'),
    ar: require('./ar/intlayer_with_next-intl.md'),
  },
  'intlayer_with_react-i18next': {
    en: require('./en/intlayer_with_react-i18next.md'),
    fr: require('./fr/intlayer_with_react-i18next.md'),
    es: require('./es/intlayer_with_react-i18next.md'),
    'en-GB': require('./en-GB/intlayer_with_react-i18next.md'),
    de: require('./de/intlayer_with_react-i18next.md'),
    hi: require('./hi/intlayer_with_react-i18next.md'),
    it: require('./it/intlayer_with_react-i18next.md'),
    ja: require('./ja/intlayer_with_react-i18next.md'),
    ko: require('./ko/intlayer_with_react-i18next.md'),
    pt: require('./pt/intlayer_with_react-i18next.md'),
    ru: require('./ru/intlayer_with_react-i18next.md'),
    zh: require('./zh/intlayer_with_react-i18next.md'),
    ar: require('./ar/intlayer_with_react-i18next.md'),
  },
  'intlayer_with_react-intl': {
    en: require('./en/intlayer_with_react-intl.md'),
    fr: require('./fr/intlayer_with_react-intl.md'),
    es: require('./es/intlayer_with_react-intl.md'),
    'en-GB': require('./en-GB/intlayer_with_react-intl.md'),
    de: require('./de/intlayer_with_react-intl.md'),
    hi: require('./hi/intlayer_with_react-intl.md'),
    it: require('./it/intlayer_with_react-intl.md'),
    ja: require('./ja/intlayer_with_react-intl.md'),
    ko: require('./ko/intlayer_with_react-intl.md'),
    pt: require('./pt/intlayer_with_react-intl.md'),
    ru: require('./ru/intlayer_with_react-intl.md'),
    zh: require('./zh/intlayer_with_react-intl.md'),
    ar: require('./ar/intlayer_with_react-intl.md'),
  },
  'next-i18next_vs_next-intl_vs_intlayer': {
    en: require('./en/next-i18next_vs_next-intl_vs_intlayer.md'),
    fr: require('./fr/next-i18next_vs_next-intl_vs_intlayer.md'),
    es: require('./es/next-i18next_vs_next-intl_vs_intlayer.md'),
    'en-GB': require('./en-GB/next-i18next_vs_next-intl_vs_intlayer.md'),
    de: require('./de/next-i18next_vs_next-intl_vs_intlayer.md'),
    hi: require('./hi/next-i18next_vs_next-intl_vs_intlayer.md'),
    it: require('./it/next-i18next_vs_next-intl_vs_intlayer.md'),
    ja: require('./ja/next-i18next_vs_next-intl_vs_intlayer.md'),
    ko: require('./ko/next-i18next_vs_next-intl_vs_intlayer.md'),
    pt: require('./pt/next-i18next_vs_next-intl_vs_intlayer.md'),
    ru: require('./ru/next-i18next_vs_next-intl_vs_intlayer.md'),
    zh: require('./zh/next-i18next_vs_next-intl_vs_intlayer.md'),
    ar: require('./ar/next-i18next_vs_next-intl_vs_intlayer.md'),
  },
  'react-i18next_vs_react-intl_vs_intlayer': {
    en: require('./en/react-i18next_vs_react-intl_vs_intlayer.md'),
    fr: require('./fr/react-i18next_vs_react-intl_vs_intlayer.md'),
    es: require('./es/react-i18next_vs_react-intl_vs_intlayer.md'),
    'en-GB': require('./en-GB/react-i18next_vs_react-intl_vs_intlayer.md'),
    de: require('./de/react-i18next_vs_react-intl_vs_intlayer.md'),
    hi: require('./hi/react-i18next_vs_react-intl_vs_intlayer.md'),
    it: require('./it/react-i18next_vs_react-intl_vs_intlayer.md'),
    ja: require('./ja/react-i18next_vs_react-intl_vs_intlayer.md'),
    ko: require('./ko/react-i18next_vs_react-intl_vs_intlayer.md'),
    pt: require('./pt/react-i18next_vs_react-intl_vs_intlayer.md'),
    ru: require('./ru/react-i18next_vs_react-intl_vs_intlayer.md'),
    zh: require('./zh/react-i18next_vs_react-intl_vs_intlayer.md'),
    ar: require('./ar/react-i18next_vs_react-intl_vs_intlayer.md'),
  },
};

const getBlogs = (lang = Locales.ENGLISH) =>
  Object.fromEntries(
    Object.entries(blogs).map(([key, value]) => [key, value[lang]])
  );

const getBlog = (docName, lang = Locales.ENGLISH) => blogs[docName]?.[lang];

module.exports = { getBlog, getBlogs };
