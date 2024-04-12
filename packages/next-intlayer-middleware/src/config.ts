import type { Locales } from 'intlayer';

export const intlayerConfiguration = {
  locales: JSON.parse(
    process.env.INTLAYER_LOCALES ?? '[]'
  ) as unknown as Locales[],
  defaultLocale: process.env.INTLAYER_DEFAULT_LOCALE as Locales,
  headerName: 'x-intlayer-locale',
  cookieName: 'NEXT_LOCALE',
  prefixDefault: false,
  basePath: '',
  serverSetCookie: 'always' as 'always' | 'never',
  noPrefix: false,
};
