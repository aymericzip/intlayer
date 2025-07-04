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

export const docsEntry = {
  './docs/en/CI_CD.md': {
    en: Promise.resolve(ESMxCJSRequire('../../../docs/en/CI_CD.md') as string),
    fr: Promise.resolve(ESMxCJSRequire('../../../docs/fr/CI_CD.md') as string),
    ru: Promise.resolve(ESMxCJSRequire('../../../docs/ru/CI_CD.md') as string),
    ja: Promise.resolve(ESMxCJSRequire('../../../docs/ja/CI_CD.md') as string),
    ko: Promise.resolve(ESMxCJSRequire('../../../docs/ko/CI_CD.md') as string),
    zh: Promise.resolve(ESMxCJSRequire('../../../docs/zh/CI_CD.md') as string),
    es: Promise.resolve(ESMxCJSRequire('../../../docs/es/CI_CD.md') as string),
    de: Promise.resolve(ESMxCJSRequire('../../../docs/de/CI_CD.md') as string),
    ar: Promise.resolve(ESMxCJSRequire('../../../docs/ar/CI_CD.md') as string),
    pt: Promise.resolve(ESMxCJSRequire('../../../docs/pt/CI_CD.md') as string),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/CI_CD.md') as string
    ),
    it: Promise.resolve(ESMxCJSRequire('../../../docs/it/CI_CD.md') as string),
    hi: Promise.resolve(ESMxCJSRequire('../../../docs/hi/CI_CD.md') as string),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/autoFill.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/autoFill.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/autoFill.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/autoFill.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/autoFill.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/autoFill.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/autoFill.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/autoFill.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/autoFill.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/autoFill.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/autoFill.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/autoFill.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/autoFill.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/autoFill.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/configuration.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/configuration.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/configuration.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/configuration.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/configuration.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/configuration.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/configuration.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/configuration.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/configuration.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/configuration.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/configuration.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/configuration.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/configuration.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/configuration.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/condition.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/dictionary/condition.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/dictionary/condition.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/dictionary/condition.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/dictionary/condition.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/dictionary/condition.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/dictionary/condition.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/dictionary/condition.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/dictionary/condition.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/dictionary/condition.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/dictionary/condition.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/dictionary/condition.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/dictionary/condition.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/dictionary/condition.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/content_extention_customization.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/dictionary/content_extention_customization.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/dictionary/content_extention_customization.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/dictionary/content_extention_customization.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/dictionary/content_extention_customization.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/dictionary/content_extention_customization.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/dictionary/content_extention_customization.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/dictionary/content_extention_customization.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/dictionary/content_extention_customization.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/dictionary/content_extention_customization.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/dictionary/content_extention_customization.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/dictionary/content_extention_customization.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/dictionary/content_extention_customization.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/dictionary/content_extention_customization.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/enumeration.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/dictionary/enumeration.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/dictionary/enumeration.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/dictionary/enumeration.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/dictionary/enumeration.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/dictionary/enumeration.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/dictionary/enumeration.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/dictionary/enumeration.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/dictionary/enumeration.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/dictionary/enumeration.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/dictionary/enumeration.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/dictionary/enumeration.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/dictionary/enumeration.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/dictionary/enumeration.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/file.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/dictionary/file.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/dictionary/file.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/dictionary/file.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/dictionary/file.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/dictionary/file.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/dictionary/file.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/dictionary/file.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/dictionary/file.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/dictionary/file.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/dictionary/file.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/dictionary/file.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/dictionary/file.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/dictionary/file.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/function_fetching.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/dictionary/function_fetching.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/dictionary/function_fetching.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/dictionary/function_fetching.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/dictionary/function_fetching.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/dictionary/function_fetching.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/dictionary/function_fetching.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/dictionary/function_fetching.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/dictionary/function_fetching.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/dictionary/function_fetching.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/dictionary/function_fetching.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/dictionary/function_fetching.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/dictionary/function_fetching.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/dictionary/function_fetching.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/get_started.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/dictionary/get_started.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/dictionary/get_started.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/dictionary/get_started.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/dictionary/get_started.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/dictionary/get_started.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/dictionary/get_started.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/dictionary/get_started.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/dictionary/get_started.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/dictionary/get_started.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/dictionary/get_started.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/dictionary/get_started.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/dictionary/get_started.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/dictionary/get_started.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/insertion.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/dictionary/insertion.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/dictionary/insertion.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/dictionary/insertion.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/dictionary/insertion.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/dictionary/insertion.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/dictionary/insertion.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/dictionary/insertion.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/dictionary/insertion.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/dictionary/insertion.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/dictionary/insertion.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/dictionary/insertion.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/dictionary/insertion.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/dictionary/insertion.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/markdown.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/dictionary/markdown.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/dictionary/markdown.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/dictionary/markdown.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/dictionary/markdown.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/dictionary/markdown.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/dictionary/markdown.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/dictionary/markdown.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/dictionary/markdown.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/dictionary/markdown.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/dictionary/markdown.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/dictionary/markdown.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/dictionary/markdown.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/dictionary/markdown.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/nesting.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/dictionary/nesting.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/dictionary/nesting.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/dictionary/nesting.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/dictionary/nesting.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/dictionary/nesting.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/dictionary/nesting.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/dictionary/nesting.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/dictionary/nesting.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/dictionary/nesting.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/dictionary/nesting.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/dictionary/nesting.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/dictionary/nesting.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/dictionary/nesting.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/translation.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/dictionary/translation.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/dictionary/translation.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/dictionary/translation.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/dictionary/translation.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/dictionary/translation.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/dictionary/translation.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/dictionary/translation.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/dictionary/translation.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/dictionary/translation.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/dictionary/translation.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/dictionary/translation.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/dictionary/translation.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/dictionary/translation.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/how_works_intlayer.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/how_works_intlayer.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/how_works_intlayer.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/how_works_intlayer.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/how_works_intlayer.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/how_works_intlayer.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/how_works_intlayer.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/how_works_intlayer.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/how_works_intlayer.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/how_works_intlayer.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/how_works_intlayer.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/how_works_intlayer.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/how_works_intlayer.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/how_works_intlayer.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/index.md': {
    en: Promise.resolve(ESMxCJSRequire('../../../docs/en/index.md') as string),
    fr: Promise.resolve(ESMxCJSRequire('../../../docs/fr/index.md') as string),
    ru: Promise.resolve(ESMxCJSRequire('../../../docs/ru/index.md') as string),
    ja: Promise.resolve(ESMxCJSRequire('../../../docs/ja/index.md') as string),
    ko: Promise.resolve(ESMxCJSRequire('../../../docs/ko/index.md') as string),
    zh: Promise.resolve(ESMxCJSRequire('../../../docs/zh/index.md') as string),
    es: Promise.resolve(ESMxCJSRequire('../../../docs/es/index.md') as string),
    de: Promise.resolve(ESMxCJSRequire('../../../docs/de/index.md') as string),
    ar: Promise.resolve(ESMxCJSRequire('../../../docs/ar/index.md') as string),
    pt: Promise.resolve(ESMxCJSRequire('../../../docs/pt/index.md') as string),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/index.md') as string
    ),
    it: Promise.resolve(ESMxCJSRequire('../../../docs/it/index.md') as string),
    hi: Promise.resolve(ESMxCJSRequire('../../../docs/hi/index.md') as string),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/interest_of_intlayer.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/interest_of_intlayer.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/interest_of_intlayer.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/interest_of_intlayer.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/interest_of_intlayer.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/interest_of_intlayer.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/interest_of_intlayer.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/interest_of_intlayer.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/interest_of_intlayer.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/interest_of_intlayer.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/interest_of_intlayer.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/interest_of_intlayer.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/interest_of_intlayer.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/interest_of_intlayer.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_CMS.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_CMS.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_CMS.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_CMS.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_CMS.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_CMS.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_CMS.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_CMS.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_CMS.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_CMS.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_CMS.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/intlayer_CMS.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_CMS.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_CMS.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_cli.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_cli.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_cli.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_cli.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_cli.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_cli.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_cli.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_cli.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_cli.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_cli.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_cli.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/intlayer_cli.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_cli.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_cli.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_visual_editor.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_visual_editor.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_visual_editor.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_visual_editor.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_visual_editor.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_visual_editor.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_visual_editor.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_visual_editor.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_visual_editor.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_visual_editor.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_visual_editor.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/intlayer_visual_editor.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_visual_editor.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_visual_editor.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_angular.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_with_angular.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_with_angular.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_with_angular.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_with_angular.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_with_angular.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_with_angular.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_with_angular.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_with_angular.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_with_angular.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_with_angular.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/intlayer_with_angular.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_with_angular.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_with_angular.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_create_react_app.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/intlayer_with_create_react_app.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/intlayer_with_create_react_app.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/intlayer_with_create_react_app.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/intlayer_with_create_react_app.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/intlayer_with_create_react_app.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/intlayer_with_create_react_app.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/intlayer_with_create_react_app.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/intlayer_with_create_react_app.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/intlayer_with_create_react_app.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/intlayer_with_create_react_app.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/intlayer_with_create_react_app.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/intlayer_with_create_react_app.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/intlayer_with_create_react_app.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_express.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_with_express.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_with_express.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_with_express.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_with_express.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_with_express.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_with_express.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_with_express.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_with_express.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_with_express.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_with_express.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/intlayer_with_express.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_with_express.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_with_express.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_lynx+react.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_with_lynx+react.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_with_lynx+react.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_with_lynx+react.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_with_lynx+react.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_with_lynx+react.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_with_lynx+react.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_with_lynx+react.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_with_lynx+react.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_with_lynx+react.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_with_lynx+react.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/intlayer_with_lynx+react.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_with_lynx+react.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_with_lynx+react.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_nextjs_14.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_with_nextjs_14.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_with_nextjs_14.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_with_nextjs_14.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_with_nextjs_14.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_with_nextjs_14.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_with_nextjs_14.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_with_nextjs_14.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_with_nextjs_14.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_with_nextjs_14.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_with_nextjs_14.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/intlayer_with_nextjs_14.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_with_nextjs_14.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_with_nextjs_14.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_nextjs_15.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_with_nextjs_15.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_with_nextjs_15.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_with_nextjs_15.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_with_nextjs_15.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_with_nextjs_15.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_with_nextjs_15.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_with_nextjs_15.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_with_nextjs_15.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_with_nextjs_15.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_with_nextjs_15.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/intlayer_with_nextjs_15.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_with_nextjs_15.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_with_nextjs_15.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_nextjs_page_router.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/intlayer_with_nextjs_page_router.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_nuxt.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_with_nuxt.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_with_nuxt.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_with_nuxt.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_with_nuxt.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_with_nuxt.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_with_nuxt.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_with_nuxt.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_with_nuxt.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_with_nuxt.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_with_nuxt.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/intlayer_with_nuxt.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_with_nuxt.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_with_nuxt.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_react_native+expo.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/intlayer_with_react_native+expo.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/intlayer_with_react_native+expo.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/intlayer_with_react_native+expo.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/intlayer_with_react_native+expo.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/intlayer_with_react_native+expo.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/intlayer_with_react_native+expo.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/intlayer_with_react_native+expo.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/intlayer_with_react_native+expo.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/intlayer_with_react_native+expo.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/intlayer_with_react_native+expo.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/intlayer_with_react_native+expo.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/intlayer_with_react_native+expo.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/intlayer_with_react_native+expo.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_vite+preact.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_with_vite+preact.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_with_vite+preact.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_with_vite+preact.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_with_vite+preact.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_with_vite+preact.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_with_vite+preact.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_with_vite+preact.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_with_vite+preact.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_with_vite+preact.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_with_vite+preact.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/intlayer_with_vite+preact.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_with_vite+preact.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_with_vite+preact.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_vite+react.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_with_vite+react.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_with_vite+react.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_with_vite+react.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_with_vite+react.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_with_vite+react.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_with_vite+react.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_with_vite+react.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_with_vite+react.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_with_vite+react.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_with_vite+react.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/intlayer_with_vite+react.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_with_vite+react.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_with_vite+react.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_vite+solid.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_with_vite+solid.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_with_vite+solid.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_with_vite+solid.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_with_vite+solid.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_with_vite+solid.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_with_vite+solid.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_with_vite+solid.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_with_vite+solid.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_with_vite+solid.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_with_vite+solid.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/intlayer_with_vite+solid.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_with_vite+solid.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_with_vite+solid.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_vite+svelte.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_with_vite+svelte.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_with_vite+svelte.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_with_vite+svelte.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_with_vite+svelte.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_with_vite+svelte.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_with_vite+svelte.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_with_vite+svelte.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_with_vite+svelte.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_with_vite+svelte.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_with_vite+svelte.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/intlayer_with_vite+svelte.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_with_vite+svelte.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_with_vite+svelte.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_vite+vue.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/intlayer_with_vite+vue.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/intlayer_with_vite+vue.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/intlayer_with_vite+vue.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/intlayer_with_vite+vue.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/intlayer_with_vite+vue.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/intlayer_with_vite+vue.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/intlayer_with_vite+vue.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/intlayer_with_vite+vue.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/intlayer_with_vite+vue.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/intlayer_with_vite+vue.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/intlayer_with_vite+vue.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/intlayer_with_vite+vue.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/intlayer_with_vite+vue.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/introduction.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/introduction.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/introduction.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/introduction.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/introduction.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/introduction.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/introduction.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/introduction.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/introduction.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/introduction.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/introduction.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/introduction.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/introduction.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/introduction.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/mcp_server.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/mcp_server.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/mcp_server.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/mcp_server.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/mcp_server.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/mcp_server.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/mcp_server.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/mcp_server.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/mcp_server.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/mcp_server.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/mcp_server.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/mcp_server.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/mcp_server.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/mcp_server.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/api/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/@intlayer/api/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/@intlayer/api/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/@intlayer/api/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/@intlayer/api/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/@intlayer/api/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/@intlayer/api/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/@intlayer/api/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/@intlayer/api/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/@intlayer/api/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/@intlayer/api/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/@intlayer/api/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/@intlayer/api/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/@intlayer/api/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/chokidar/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/@intlayer/chokidar/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/cli/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/@intlayer/cli/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/@intlayer/cli/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/@intlayer/cli/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/@intlayer/cli/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/@intlayer/cli/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/@intlayer/cli/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/@intlayer/cli/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/@intlayer/cli/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/@intlayer/cli/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/@intlayer/cli/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/@intlayer/cli/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/@intlayer/cli/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/@intlayer/cli/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/config/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/@intlayer/config/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/@intlayer/config/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/@intlayer/config/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/@intlayer/config/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/@intlayer/config/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/@intlayer/config/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/@intlayer/config/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/@intlayer/config/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/@intlayer/config/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/@intlayer/config/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/@intlayer/config/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/@intlayer/config/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/@intlayer/config/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/core/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/@intlayer/core/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/@intlayer/core/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/@intlayer/core/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/@intlayer/core/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/@intlayer/core/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/@intlayer/core/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/@intlayer/core/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/@intlayer/core/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/@intlayer/core/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/@intlayer/core/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/@intlayer/core/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/@intlayer/core/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/@intlayer/core/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/design-system/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/@intlayer/design-system/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/@intlayer/design-system/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/@intlayer/design-system/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/@intlayer/design-system/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/@intlayer/design-system/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/@intlayer/design-system/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/@intlayer/design-system/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/@intlayer/design-system/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/@intlayer/design-system/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/@intlayer/design-system/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/@intlayer/design-system/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/@intlayer/design-system/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/@intlayer/design-system/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/dictionary-entry/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/@intlayer/dictionary-entry/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/editor-react/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/@intlayer/editor-react/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/editor/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/@intlayer/editor/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/@intlayer/editor/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/@intlayer/editor/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/@intlayer/editor/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/@intlayer/editor/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/@intlayer/editor/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/@intlayer/editor/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/@intlayer/editor/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/@intlayer/editor/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/@intlayer/editor/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/@intlayer/editor/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/@intlayer/editor/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/@intlayer/editor/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/webpack/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/@intlayer/webpack/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/@intlayer/webpack/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/@intlayer/webpack/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/@intlayer/webpack/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/@intlayer/webpack/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/@intlayer/webpack/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/@intlayer/webpack/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/@intlayer/webpack/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/@intlayer/webpack/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/@intlayer/webpack/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/@intlayer/webpack/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/@intlayer/webpack/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/@intlayer/webpack/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/angular-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/angular-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/angular-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/angular-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/angular-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/angular-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/angular-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/angular-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/angular-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/angular-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/angular-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/angular-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/angular-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/angular-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/express-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/express-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/express-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/express-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/express-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/express-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/express-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/express-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/express-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/express-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/express-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/express-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/express-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/express-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/express-intlayer/t.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/express-intlayer/t.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/express-intlayer/t.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/express-intlayer/t.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/express-intlayer/t.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/express-intlayer/t.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/express-intlayer/t.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/express-intlayer/t.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/express-intlayer/t.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/express-intlayer/t.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/express-intlayer/t.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/express-intlayer/t.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/express-intlayer/t.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/express-intlayer/t.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer-cli/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/intlayer-cli/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/intlayer-cli/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/intlayer-cli/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/intlayer-cli/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/intlayer-cli/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/intlayer-cli/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/intlayer-cli/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/intlayer-cli/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/intlayer-cli/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/intlayer-cli/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/intlayer-cli/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/intlayer-cli/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/intlayer-cli/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer-editor/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/intlayer-editor/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/intlayer-editor/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/intlayer-editor/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/intlayer-editor/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/intlayer-editor/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/intlayer-editor/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/intlayer-editor/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/intlayer-editor/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/intlayer-editor/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/intlayer-editor/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/intlayer-editor/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/intlayer-editor/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/intlayer-editor/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getConfiguration.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/intlayer/getConfiguration.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/intlayer/getConfiguration.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/intlayer/getConfiguration.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/intlayer/getConfiguration.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/intlayer/getConfiguration.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/intlayer/getConfiguration.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/intlayer/getConfiguration.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/intlayer/getConfiguration.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/intlayer/getConfiguration.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/intlayer/getConfiguration.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/intlayer/getConfiguration.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/intlayer/getConfiguration.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/intlayer/getConfiguration.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getEnumeration.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/intlayer/getEnumeration.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/intlayer/getEnumeration.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/intlayer/getEnumeration.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/intlayer/getEnumeration.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/intlayer/getEnumeration.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/intlayer/getEnumeration.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/intlayer/getEnumeration.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/intlayer/getEnumeration.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/intlayer/getEnumeration.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/intlayer/getEnumeration.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/intlayer/getEnumeration.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/intlayer/getEnumeration.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/intlayer/getEnumeration.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getHTMLTextDir.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/intlayer/getHTMLTextDir.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getLocaleLang.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/intlayer/getLocaleLang.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getLocaleName.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/intlayer/getLocaleName.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/intlayer/getLocaleName.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/intlayer/getLocaleName.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/intlayer/getLocaleName.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/intlayer/getLocaleName.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/intlayer/getLocaleName.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/intlayer/getLocaleName.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/intlayer/getLocaleName.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/intlayer/getLocaleName.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/intlayer/getLocaleName.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/intlayer/getLocaleName.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/intlayer/getLocaleName.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/intlayer/getLocaleName.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getLocalizedUrl.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/intlayer/getLocalizedUrl.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getMultilingualUrls.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/intlayer/getMultilingualUrls.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getPathWithoutLocale.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/intlayer/getPathWithoutLocale.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getTranslation.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/intlayer/getTranslation.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/intlayer/getTranslation.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/intlayer/getTranslation.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/intlayer/getTranslation.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/intlayer/getTranslation.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/intlayer/getTranslation.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/intlayer/getTranslation.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/intlayer/getTranslation.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/intlayer/getTranslation.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/intlayer/getTranslation.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/intlayer/getTranslation.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/intlayer/getTranslation.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/intlayer/getTranslation.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getTranslationContent.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/intlayer/getTranslationContent.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/packages/intlayer/index.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/packages/intlayer/index.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/packages/intlayer/index.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/packages/intlayer/index.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/packages/intlayer/index.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/packages/intlayer/index.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/packages/intlayer/index.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/packages/intlayer/index.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/packages/intlayer/index.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/packages/intlayer/index.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/packages/intlayer/index.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/packages/intlayer/index.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/packages/intlayer/index.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/lynx-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/lynx-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/lynx-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/lynx-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/lynx-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/lynx-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/lynx-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/lynx-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/lynx-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/lynx-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/lynx-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/lynx-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/lynx-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/lynx-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/next-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/next-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/next-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/next-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/next-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/next-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/next-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/next-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/next-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/next-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/next-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/next-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/next-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/next-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/next-intlayer/t.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/packages/next-intlayer/t.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/packages/next-intlayer/t.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/packages/next-intlayer/t.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/packages/next-intlayer/t.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/packages/next-intlayer/t.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/packages/next-intlayer/t.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/packages/next-intlayer/t.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/packages/next-intlayer/t.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/packages/next-intlayer/t.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/packages/next-intlayer/t.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/next-intlayer/t.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/packages/next-intlayer/t.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/packages/next-intlayer/t.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/next-intlayer/useDictionary.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/next-intlayer/useDictionary.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/next-intlayer/useIntlayer.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/next-intlayer/useIntlayer.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/next-intlayer/useIntlayerAsync.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/next-intlayer/useIntlayerAsync.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/next-intlayer/useLocale.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/next-intlayer/useLocale.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/next-intlayer/useLocale.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/next-intlayer/useLocale.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/next-intlayer/useLocale.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/next-intlayer/useLocale.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/next-intlayer/useLocale.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/next-intlayer/useLocale.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/next-intlayer/useLocale.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/next-intlayer/useLocale.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/next-intlayer/useLocale.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/next-intlayer/useLocale.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/next-intlayer/useLocale.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/next-intlayer/useLocale.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/nuxt-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/nuxt-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/nuxt-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/nuxt-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/nuxt-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/nuxt-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/nuxt-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/nuxt-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/nuxt-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/nuxt-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/nuxt-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/nuxt-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/nuxt-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/nuxt-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/preact-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/preact-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/preact-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/preact-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/preact-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/preact-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/preact-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/preact-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/preact-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/preact-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/preact-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/preact-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/preact-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/preact-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/react-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/react-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/react-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/react-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/react-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/react-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/react-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/react-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/react-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/react-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/react-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/react-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/react-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-intlayer/t.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/packages/react-intlayer/t.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/packages/react-intlayer/t.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/packages/react-intlayer/t.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/packages/react-intlayer/t.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/packages/react-intlayer/t.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/packages/react-intlayer/t.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/packages/react-intlayer/t.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/packages/react-intlayer/t.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/packages/react-intlayer/t.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/packages/react-intlayer/t.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/react-intlayer/t.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/packages/react-intlayer/t.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/packages/react-intlayer/t.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-intlayer/useDictionary.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/react-intlayer/useDictionary.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-intlayer/useIntlayer.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/react-intlayer/useIntlayer.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-intlayer/useIntlayerAsync.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/react-intlayer/useIntlayerAsync.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-intlayer/useLocale.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/react-intlayer/useLocale.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/react-intlayer/useLocale.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/react-intlayer/useLocale.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/react-intlayer/useLocale.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/react-intlayer/useLocale.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/react-intlayer/useLocale.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/react-intlayer/useLocale.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/react-intlayer/useLocale.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/react-intlayer/useLocale.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/react-intlayer/useLocale.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/react-intlayer/useLocale.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/react-intlayer/useLocale.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/react-intlayer/useLocale.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-native-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/react-native-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/react-native-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/react-native-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/react-native-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/react-native-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/react-native-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/react-native-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/react-native-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/react-native-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/react-native-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/react-native-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/react-native-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/react-native-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-scripts-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/react-scripts-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/solid-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/solid-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/solid-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/solid-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/solid-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/solid-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/solid-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/solid-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/solid-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/solid-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/solid-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/solid-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/solid-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/solid-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/svelte-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/svelte-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/svelte-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/svelte-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/svelte-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/svelte-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/svelte-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/svelte-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/svelte-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/svelte-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/svelte-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/svelte-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/svelte-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/svelte-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/vite-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/vite-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/vite-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/vite-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/vite-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/vite-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/vite-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/vite-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/vite-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/vite-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/vite-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/vite-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/vite-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/vite-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/vue-intlayer/index.md': {
    en: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en/packages/vue-intlayer/index.md'
      ) as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/fr/packages/vue-intlayer/index.md'
      ) as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ru/packages/vue-intlayer/index.md'
      ) as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ja/packages/vue-intlayer/index.md'
      ) as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ko/packages/vue-intlayer/index.md'
      ) as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/zh/packages/vue-intlayer/index.md'
      ) as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/es/packages/vue-intlayer/index.md'
      ) as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/de/packages/vue-intlayer/index.md'
      ) as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/ar/packages/vue-intlayer/index.md'
      ) as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/pt/packages/vue-intlayer/index.md'
      ) as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/en-GB/packages/vue-intlayer/index.md'
      ) as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/it/packages/vue-intlayer/index.md'
      ) as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire(
        '../../../docs/hi/packages/vue-intlayer/index.md'
      ) as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/per_locale_file.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/per_locale_file.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/per_locale_file.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/per_locale_file.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/per_locale_file.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/per_locale_file.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/per_locale_file.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/per_locale_file.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/per_locale_file.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/per_locale_file.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/per_locale_file.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/per_locale_file.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/per_locale_file.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/per_locale_file.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/roadmap.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/roadmap.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/roadmap.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/roadmap.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/roadmap.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/roadmap.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/roadmap.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/roadmap.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/roadmap.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/roadmap.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/roadmap.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/roadmap.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/roadmap.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/roadmap.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
  './docs/en/vs_code_extension.md': {
    en: Promise.resolve(
      ESMxCJSRequire('../../../docs/en/vs_code_extension.md') as string
    ),
    fr: Promise.resolve(
      ESMxCJSRequire('../../../docs/fr/vs_code_extension.md') as string
    ),
    ru: Promise.resolve(
      ESMxCJSRequire('../../../docs/ru/vs_code_extension.md') as string
    ),
    ja: Promise.resolve(
      ESMxCJSRequire('../../../docs/ja/vs_code_extension.md') as string
    ),
    ko: Promise.resolve(
      ESMxCJSRequire('../../../docs/ko/vs_code_extension.md') as string
    ),
    zh: Promise.resolve(
      ESMxCJSRequire('../../../docs/zh/vs_code_extension.md') as string
    ),
    es: Promise.resolve(
      ESMxCJSRequire('../../../docs/es/vs_code_extension.md') as string
    ),
    de: Promise.resolve(
      ESMxCJSRequire('../../../docs/de/vs_code_extension.md') as string
    ),
    ar: Promise.resolve(
      ESMxCJSRequire('../../../docs/ar/vs_code_extension.md') as string
    ),
    pt: Promise.resolve(
      ESMxCJSRequire('../../../docs/pt/vs_code_extension.md') as string
    ),
    'en-GB': Promise.resolve(
      ESMxCJSRequire('../../../docs/en-GB/vs_code_extension.md') as string
    ),
    it: Promise.resolve(
      ESMxCJSRequire('../../../docs/it/vs_code_extension.md') as string
    ),
    hi: Promise.resolve(
      ESMxCJSRequire('../../../docs/hi/vs_code_extension.md') as string
    ),
  } as Record<LocalesValues, Promise<string>>,
} as const;
