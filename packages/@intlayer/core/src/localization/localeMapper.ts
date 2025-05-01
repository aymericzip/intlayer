import configuration from '@intlayer/config/built';
import { LocalesValues } from '@intlayer/config/client';

const { internationalization, middleware } = configuration;
const { prefixDefault } = middleware;
const { locales, defaultLocale } = internationalization;

export type LocaleData = {
  locale: LocalesValues;
  defaultLocale: LocalesValues;
  isDefault: boolean;
  locales: LocalesValues[];
  urlPrefix: string;
};

const baseLocaleData = {
  defaultLocale: defaultLocale,
  locales,
} satisfies Partial<LocaleData>;

export const localeMapper = <T extends object>(
  mapper: (locale: LocaleData) => T
): T[] =>
  locales.map((locale) =>
    mapper({
      ...baseLocaleData,
      locale,
      isDefault: locale === defaultLocale,
      urlPrefix: locale === defaultLocale && !prefixDefault ? '' : `/${locale}`,
    })
  );
