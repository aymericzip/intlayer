import {
  type CustomIntlayerConfig,
  type Locale,
  Locales,
} from '@intlayer/types';

export const locales: Locale[] = [
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
  Locales.TURKISH,
];
export const defaultLocale = Locales.ENGLISH;

const config: CustomIntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
    requiredLocales: [Locales.ENGLISH],
    strictMode: 'strict',
  },
  content: {
    contentDir: ['./src', '../../packages/@intlayer/design-system/src'],
  },
  editor: {
    enabled: true,
    liveSync: false,
    dictionaryPriorityStrategy: 'distant_first',
    applicationURL: process.env.NEXT_PUBLIC_URL,
    editorURL: process.env.NEXT_PUBLIC_EDITOR_URL,
    cmsURL: process.env.NEXT_PUBLIC_CMS_URL,
    backendURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    // clientId: process.env.INTLAYER_CLIENT_ID,
    // clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    formatCommand: 'bun x biome format {{file}} --write',
  },
  build: {
    importMode: 'dynamic',
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  log: {
    mode: 'verbose',
  },
};

export default config;
