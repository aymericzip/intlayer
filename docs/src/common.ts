import { Locales } from '@intlayer/config';
import { localeRecord as localeRecordCore } from '@intlayer/core';

export const LOCALE_LIST: Locales[] = [
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

export const BASE_LOCALE = Locales.ENGLISH;

export const localeRecord: typeof localeRecordCore = (mapper) =>
  localeRecordCore(mapper, LOCALE_LIST);
