import type { Locales } from '@intlayer/config';

export const intlayerConfiguration = {
  locales: JSON.parse(
    process.env.INTLAYER_LOCALES ?? '[]'
  ) as unknown as Locales[],
  defaultLocale: process.env.INTLAYER_DEFAULT_LOCALE as Locales,
};
