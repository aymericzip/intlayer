import type { Locale } from '@intlayer/types/allLocales';
import type { CustomIntlayerConfig } from '@intlayer/types/config';
import * as Locales from '@intlayer/types/locales';

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
    codeDir: ['./src', '../../packages/@intlayer/design-system/dist'],
    formatCommand: 'bun x biome format "{{file}}" --write --log-level none',
  },
  editor: {
    enabled: true,
    liveSync: false,
    dictionaryPriorityStrategy: 'local_first',
    backendURL: process.env.VITE_BACKEND_URL,
  },
  dictionary: {
    importMode: 'dynamic',
  },
  compiler: {
    enabled: false,
    saveComponents: true,
    output: ({ fileName }) => `./${fileName}.content.ts`,
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
