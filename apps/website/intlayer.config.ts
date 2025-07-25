import { Locales, type IntlayerConfig } from 'intlayer';

export const locales = [
  Locales.ENGLISH,
  Locales.RUSSIAN,
  Locales.JAPANESE,
  Locales.FRENCH,
  Locales.KOREAN,
  Locales.CHINESE,
  Locales.SPANISH,
  Locales.GERMAN,
  Locales.ARABIC,
  Locales.ITALIAN,
  Locales.ENGLISH_UNITED_KINGDOM,
  Locales.PORTUGUESE,
  Locales.HINDI,
  Locales.YORUBA,
];
export const defaultLocale = Locales.ENGLISH;

/** @type {import('intlayer').IntlayerConfig} */
const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
    strictMode: 'strict',
  },
  content: {
    dictionaryOutput: ['intlayer'],
  },
  editor: {
    enabled: true,
    hotReload: false,
    dictionaryPriorityStrategy: 'local_first',
    applicationURL: process.env.NEXT_PUBLIC_URL,
    editorURL: process.env.NEXT_PUBLIC_EDITOR_URL,
    cmsURL: process.env.NEXT_PUBLIC_CMS_URL,
    backendURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  build: {
    activateDynamicImport: true,
  },
};

export default config;
