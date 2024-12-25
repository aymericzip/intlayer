/* eslint-disable @typescript-eslint/no-require-imports */
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

  intlayer_with_i18next: {
    en: require('./en/intlayer_with_i18next.md'),
    fr: require('./fr/intlayer_with_i18next.md'),
    es: require('./es/intlayer_with_i18next.md'),
    'en-GB': require('./en-GB/intlayer_with_i18next.md'),
    de: require('./de/intlayer_with_i18next.md'),
    hi: require('./hi/intlayer_with_i18next.md'),
    it: require('./it/intlayer_with_i18next.md'),
    ja: require('./ja/intlayer_with_i18next.md'),
    ko: require('./ko/intlayer_with_i18next.md'),
    pt: require('./pt/intlayer_with_i18next.md'),
    ru: require('./ru/intlayer_with_i18next.md'),
    zh: require('./zh/intlayer_with_i18next.md'),
    ar: require('./ar/intlayer_with_i18next.md'),
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
};

const getBlogs = (lang) =>
  Object.fromEntries(
    Object.entries(blogs).map(([key, value]) => [key, value[lang]])
  );

const getBlog = (docName, lang) => blogs[docName]?.[lang];

module.exports = { getBlog, getBlogs };
