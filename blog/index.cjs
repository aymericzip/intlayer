const { Locales } = require('@intlayer/config');
const { localeRecord: localeRecordCore } = require('@intlayer/core');

/**
 * This condition is a hack to import markdown files either in node or in the browser
 */
if (require.extensions) {
  require.extensions['.md'] = (module, filename) => {
    module.exports = require('fs').readFileSync(filename, 'utf8');
  };
}

const localeList = [
  Locales.ENGLISH,
  Locales.FRENCH,
  Locales.SPANISH,
  Locales.GERMAN,
  Locales.ARABIC,
  Locales.ITALIAN,
  Locales.ENGLISH_UNITED_KINGDOM,
  Locales.PORTUGUESE,
  Locales.HINDI,
  Locales.JAPANESE,
  Locales.KOREAN,
  Locales.CHINESE,
];
const defaultLocale = Locales.ENGLISH;

const localeRecord = (mapper) =>
  localeRecordCore(mapper, localeList, defaultLocale);

const blogs = {
  index: localeRecord(({ locale }) => require(`./${locale}/index.md`)),
  what_is_internationalization: localeRecord(({ locale }) =>
    require(`./${locale}/what_is_internationalization.md`)
  ),
  internationalization_and_SEO: localeRecord(({ locale }) =>
    require(`./${locale}/internationalization_and_SEO.md`)
  ),
  'intlayer_with_next-i18next': localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_next-i18next.md`)
  ),
  'intlayer_with_next-intl': localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_next-intl.md`)
  ),
  'intlayer_with_react-i18next': localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_react-i18next.md`)
  ),
  'intlayer_with_react-intl': localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_react-intl.md`)
  ),
  'next-i18next_vs_next-intl_vs_intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/next-i18next_vs_next-intl_vs_intlayer.md`)
  ),
  'react-i18next_vs_react-intl_vs_intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/react-i18next_vs_react-intl_vs_intlayer.md`)
  ),
  list_i18n_technologies__frameworks__angular: localeRecord(({ locale }) =>
    require(`./${locale}/list_i18n_technologies/frameworks/angular.md`)
  ),
  list_i18n_technologies__frameworks__react: localeRecord(({ locale }) =>
    require(`./${locale}/list_i18n_technologies/frameworks/react.md`)
  ),
  list_i18n_technologies__frameworks__vue: localeRecord(({ locale }) =>
    require(`./${locale}/list_i18n_technologies/frameworks/vue.md`)
  ),
  list_i18n_technologies__frameworks__svelte: localeRecord(({ locale }) =>
    require(`./${locale}/list_i18n_technologies/frameworks/svelte.md`)
  ),
  list_i18n_technologies__frameworks__flutter: localeRecord(({ locale }) =>
    require(`./${locale}/list_i18n_technologies/frameworks/flutter.md`)
  ),
  'list_i18n_technologies__frameworks__react-native': localeRecord(
    ({ locale }) =>
      require(`./${locale}/list_i18n_technologies/frameworks/react-native.md`)
  ),
  list_i18n_technologies__CMS__wordpress: localeRecord(({ locale }) =>
    require(`./${locale}/list_i18n_technologies/CMS/wordpress.md`)
  ),
  list_i18n_technologies__CMS__drupal: localeRecord(({ locale }) =>
    require(`./${locale}/list_i18n_technologies/CMS/drupal.md`)
  ),
  list_i18n_technologies__CMS__wix: localeRecord(({ locale }) =>
    require(`./${locale}/list_i18n_technologies/CMS/wix.md`)
  ),
};

const getBlogs = (lang = Locales.ENGLISH) =>
  Object.fromEntries(
    Object.entries(blogs).map(([key, value]) => [key, value[lang]])
  );

const getBlog = (docName, lang = Locales.ENGLISH) => blogs[docName]?.[lang];

module.exports = { getBlog, getBlogs };
