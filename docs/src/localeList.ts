import { Locales } from '@intlayer/config';

export type LocaleMap = {
  [key in Locales]: string;
};

export const localeObject = {
  [Locales.ENGLISH]: '',
  [Locales.FRENCH]: '',
  [Locales.SPANISH]: '',
  [Locales.ENGLISH_UNITED_KINGDOM]: '',
  [Locales.GERMAN]: '',
  [Locales.JAPANESE]: '',
  [Locales.KOREAN]: '',
  [Locales.CHINESE]: '',
  [Locales.ITALIAN]: '',
  [Locales.PORTUGUESE]: '',
  [Locales.HINDI]: '',
  [Locales.ARABIC]: '',
  [Locales.RUSSIAN]: '',
} satisfies Partial<LocaleMap>;

export type LocalesListType = typeof localeObject;
export type LocalesListTypeKeys = keyof LocalesListType;
