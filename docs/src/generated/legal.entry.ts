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

export const legalEntry = {
  './legal/en/privacy_notice.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../legal/en/privacy_notice.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../legal/fr/privacy_notice.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../legal/ru/privacy_notice.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../legal/ja/privacy_notice.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../legal/ko/privacy_notice.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../legal/zh/privacy_notice.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../legal/es/privacy_notice.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../legal/de/privacy_notice.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../legal/ar/privacy_notice.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../legal/pt/privacy_notice.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../legal/en-GB/privacy_notice.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../legal/it/privacy_notice.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../legal/hi/privacy_notice.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './legal/en/terms_of_service.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../legal/en/terms_of_service.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../legal/fr/terms_of_service.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../legal/ru/terms_of_service.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../legal/ja/terms_of_service.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../legal/ko/terms_of_service.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../legal/zh/terms_of_service.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../legal/es/terms_of_service.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../legal/de/terms_of_service.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../legal/ar/terms_of_service.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../legal/pt/terms_of_service.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../legal/en-GB/terms_of_service.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../legal/it/terms_of_service.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../legal/hi/terms_of_service.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
} as const;
