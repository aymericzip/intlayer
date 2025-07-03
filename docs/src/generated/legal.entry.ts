/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import { LocalesValues } from 'intlayer';
/**
 * This condition is a hack to import markdown files either in node or in the browser
 */
if (require.extensions) {
  require.extensions['.md'] = (module, filename) => {
    module.exports = require('fs').readFileSync(filename, 'utf8');
  };
}

export const legalEntry = {
  './legal/en/privacy_notice.md': {
    en: Promise.resolve(
      require('../../../legal/en/privacy_notice.md') as string
    ),
    fr: Promise.resolve(
      require('../../../legal/fr/privacy_notice.md') as string
    ),
    ru: Promise.resolve(
      require('../../../legal/ru/privacy_notice.md') as string
    ),
    ja: Promise.resolve(
      require('../../../legal/ja/privacy_notice.md') as string
    ),
    ko: Promise.resolve(
      require('../../../legal/ko/privacy_notice.md') as string
    ),
    zh: Promise.resolve(
      require('../../../legal/zh/privacy_notice.md') as string
    ),
    es: Promise.resolve(
      require('../../../legal/es/privacy_notice.md') as string
    ),
    de: Promise.resolve(
      require('../../../legal/de/privacy_notice.md') as string
    ),
    ar: Promise.resolve(
      require('../../../legal/ar/privacy_notice.md') as string
    ),
    pt: Promise.resolve(
      require('../../../legal/pt/privacy_notice.md') as string
    ),
    'en-GB': Promise.resolve(
      require('../../../legal/en-GB/privacy_notice.md') as string
    ),
    it: Promise.resolve(
      require('../../../legal/it/privacy_notice.md') as string
    ),
    hi: Promise.resolve(
      require('../../../legal/hi/privacy_notice.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './legal/en/terms_of_service.md': {
    en: Promise.resolve(
      require('../../../legal/en/terms_of_service.md') as string
    ),
    fr: Promise.resolve(
      require('../../../legal/fr/terms_of_service.md') as string
    ),
    ru: Promise.resolve(
      require('../../../legal/ru/terms_of_service.md') as string
    ),
    ja: Promise.resolve(
      require('../../../legal/ja/terms_of_service.md') as string
    ),
    ko: Promise.resolve(
      require('../../../legal/ko/terms_of_service.md') as string
    ),
    zh: Promise.resolve(
      require('../../../legal/zh/terms_of_service.md') as string
    ),
    es: Promise.resolve(
      require('../../../legal/es/terms_of_service.md') as string
    ),
    de: Promise.resolve(
      require('../../../legal/de/terms_of_service.md') as string
    ),
    ar: Promise.resolve(
      require('../../../legal/ar/terms_of_service.md') as string
    ),
    pt: Promise.resolve(
      require('../../../legal/pt/terms_of_service.md') as string
    ),
    'en-GB': Promise.resolve(
      require('../../../legal/en-GB/terms_of_service.md') as string
    ),
    it: Promise.resolve(
      require('../../../legal/it/terms_of_service.md') as string
    ),
    hi: Promise.resolve(
      require('../../../legal/hi/terms_of_service.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
} as const;
