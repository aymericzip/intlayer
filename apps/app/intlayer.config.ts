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
  Locales.POLISH,
  Locales.INDONESIAN,
  Locales.VIETNAMESE,
  Locales.UKRAINIAN,
];
export const defaultLocale = Locales.ENGLISH;

const config: CustomIntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
    requiredLocales: [Locales.ENGLISH],
    strictMode: 'strict',
  },

  routing: {
    mode: 'prefix-no-default',
  },
  content: {
    contentDir: ['./src', '@intlayer/design-system'],
    formatCommand: 'bun x biome format "{{file}}" --write --log-level none',
  },
  editor: {
    enabled: true,
    liveSync: false,
    dictionaryPriorityStrategy: 'local_first',
    // applicationURL: process.env.NEXT_PUBLIC_URL,
    // editorURL: process.env.NEXT_PUBLIC_EDITOR_URL,
    // cmsURL: process.env.NEXT_PUBLIC_CMS_URL,
    backendURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    // clientId: process.env.INTLAYER_CLIENT_ID,
    // clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  build: {
    importMode: 'dynamic',
  },
  ai: {
    provider: 'openai',
    model: 'gpt-5-mini',
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: [
      'Intlayer is a developer-friendly internationalization (i18n) solution combined with a multilingual CMS.',
      'This application contains a landing page, documentation, and the CMS within the dashboard.',
      'It is intended for developers, so do not hesitate to use technical terms, and keep anglicisms in English. Example: "codebase" instead of "base de code" or "package" instead of "paquets".',
    ].join('\n'),
  },
  log: {
    mode: 'verbose',
  },
};

export default config;
