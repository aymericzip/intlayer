import { Locales } from '@intlayer/config';

export const localesList = [
  Locales.ENGLISH,
  Locales.FRENCH,
  Locales.SPANISH,
  Locales.ENGLISH_UNITED_KINGDOM,
  Locales.GERMAN,
  Locales.JAPANESE,
  Locales.KOREAN,
  Locales.CHINESE,
  Locales.ITALIAN,
  Locales.PORTUGUESE,
  Locales.HINDI,
  Locales.ARABIC,
  Locales.RUSSIAN,
];

export type LocalesListType = (typeof localesList)[number];
