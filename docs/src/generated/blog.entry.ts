/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import { ESMxCJSRequire } from '@intlayer/config';
import { LocalesValues } from 'intlayer';
/**
 * This condition is a hack to import markdown files either in node or in the browser
 */
if (ESMxCJSRequire.extensions) {
  ESMxCJSRequire.extensions['.md'] = (module, filename) => {
    const content = ESMxCJSRequire('fs').readFileSync(filename, 'utf8');
    module.exports = content;
  };
}

export const blogEntry = {
  './blog/en/index.md': {
    en: Promise.resolve(ESMxCJSRequire('../../../blog/en/index.md') as string),
    fr: Promise.resolve(ESMxCJSRequire('../../../blog/fr/index.md') as string),
    ru: Promise.resolve(ESMxCJSRequire('../../../blog/ru/index.md') as string),
    ja: Promise.resolve(ESMxCJSRequire('../../../blog/ja/index.md') as string),
    ko: Promise.resolve(ESMxCJSRequire('../../../blog/ko/index.md') as string),
    zh: Promise.resolve(ESMxCJSRequire('../../../blog/zh/index.md') as string),
    es: Promise.resolve(ESMxCJSRequire('../../../blog/es/index.md') as string),
    de: Promise.resolve(ESMxCJSRequire('../../../blog/de/index.md') as string),
    ar: Promise.resolve(ESMxCJSRequire('../../../blog/ar/index.md') as string),
    pt: Promise.resolve(ESMxCJSRequire('../../../blog/pt/index.md') as string),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../blog/en-GB/index.md') as string
    ),
    it: Promise.resolve(ESMxCJSRequire('../../../blog/it/index.md') as string),
    hi: Promise.resolve(ESMxCJSRequire('../../../blog/hi/index.md') as string),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/internationalization_and_SEO.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/internationalization_and_SEO.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/internationalization_and_SEO.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/internationalization_and_SEO.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/internationalization_and_SEO.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/internationalization_and_SEO.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/internationalization_and_SEO.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/internationalization_and_SEO.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/internationalization_and_SEO.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/internationalization_and_SEO.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/internationalization_and_SEO.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/internationalization_and_SEO.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/internationalization_and_SEO.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/internationalization_and_SEO.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/intlayer_with_i18next.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../blog/en/intlayer_with_i18next.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../blog/fr/intlayer_with_i18next.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../blog/ru/intlayer_with_i18next.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../blog/ja/intlayer_with_i18next.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../blog/ko/intlayer_with_i18next.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../blog/zh/intlayer_with_i18next.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../blog/es/intlayer_with_i18next.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../blog/de/intlayer_with_i18next.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../blog/ar/intlayer_with_i18next.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../blog/pt/intlayer_with_i18next.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../blog/en-GB/intlayer_with_i18next.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../blog/it/intlayer_with_i18next.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../blog/hi/intlayer_with_i18next.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/intlayer_with_next-i18next.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../blog/en/intlayer_with_next-i18next.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../blog/fr/intlayer_with_next-i18next.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../blog/ru/intlayer_with_next-i18next.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../blog/ja/intlayer_with_next-i18next.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../blog/ko/intlayer_with_next-i18next.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../blog/zh/intlayer_with_next-i18next.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../blog/es/intlayer_with_next-i18next.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../blog/de/intlayer_with_next-i18next.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../blog/ar/intlayer_with_next-i18next.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../blog/pt/intlayer_with_next-i18next.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/intlayer_with_next-i18next.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../blog/it/intlayer_with_next-i18next.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../blog/hi/intlayer_with_next-i18next.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/intlayer_with_next-intl.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../blog/en/intlayer_with_next-intl.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../blog/fr/intlayer_with_next-intl.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../blog/ru/intlayer_with_next-intl.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../blog/ja/intlayer_with_next-intl.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../blog/ko/intlayer_with_next-intl.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../blog/zh/intlayer_with_next-intl.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../blog/es/intlayer_with_next-intl.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../blog/de/intlayer_with_next-intl.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../blog/ar/intlayer_with_next-intl.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../blog/pt/intlayer_with_next-intl.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../blog/en-GB/intlayer_with_next-intl.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../blog/it/intlayer_with_next-intl.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../blog/hi/intlayer_with_next-intl.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/intlayer_with_react-i18next.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/intlayer_with_react-i18next.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/intlayer_with_react-i18next.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/intlayer_with_react-i18next.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/intlayer_with_react-i18next.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/intlayer_with_react-i18next.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/intlayer_with_react-i18next.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/intlayer_with_react-i18next.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/intlayer_with_react-i18next.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/intlayer_with_react-i18next.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/intlayer_with_react-i18next.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/intlayer_with_react-i18next.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/intlayer_with_react-i18next.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/intlayer_with_react-i18next.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/intlayer_with_react-intl.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../blog/en/intlayer_with_react-intl.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../blog/fr/intlayer_with_react-intl.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../blog/ru/intlayer_with_react-intl.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../blog/ja/intlayer_with_react-intl.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../blog/ko/intlayer_with_react-intl.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../blog/zh/intlayer_with_react-intl.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../blog/es/intlayer_with_react-intl.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../blog/de/intlayer_with_react-intl.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../blog/ar/intlayer_with_react-intl.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../blog/pt/intlayer_with_react-intl.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/intlayer_with_react-intl.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../blog/it/intlayer_with_react-intl.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../blog/hi/intlayer_with_react-intl.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/list_i18n_technologies/CMS/drupal.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/list_i18n_technologies/CMS/drupal.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/list_i18n_technologies/CMS/wix.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/list_i18n_technologies/CMS/wix.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/list_i18n_technologies/CMS/wordpress.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/list_i18n_technologies/CMS/wordpress.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/list_i18n_technologies/frameworks/angular.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/list_i18n_technologies/frameworks/angular.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/list_i18n_technologies/frameworks/flutter.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/list_i18n_technologies/frameworks/flutter.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/list_i18n_technologies/frameworks/react-native.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/list_i18n_technologies/frameworks/react-native.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/list_i18n_technologies/frameworks/react.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/list_i18n_technologies/frameworks/react.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/list_i18n_technologies/frameworks/svelte.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/list_i18n_technologies/frameworks/svelte.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/list_i18n_technologies/frameworks/vue.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/list_i18n_technologies/frameworks/vue.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/next-i18next_vs_next-intl_vs_intlayer.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/next-i18next_vs_next-intl_vs_intlayer.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/react-i18next_vs_react-intl_vs_intlayer.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/react-i18next_vs_react-intl_vs_intlayer.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './blog/en/what_is_internationalization.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en/what_is_internationalization.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/fr/what_is_internationalization.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ru/what_is_internationalization.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ja/what_is_internationalization.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ko/what_is_internationalization.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/zh/what_is_internationalization.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/es/what_is_internationalization.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/de/what_is_internationalization.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/ar/what_is_internationalization.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/pt/what_is_internationalization.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/en-GB/what_is_internationalization.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/it/what_is_internationalization.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../blog/hi/what_is_internationalization.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
} as const;
