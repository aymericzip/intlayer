import { type CustomIntlayerConfig, Locales } from '@intlayer/types';

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
  Locales.TURKISH,
  Locales.POLISH,
  Locales.INDONESIAN,
  Locales.VIETNAMESE,
  Locales.UKRAINIAN,
];
export const defaultLocale = Locales.ENGLISH;

const config: Partial<CustomIntlayerConfig> = {
  internationalization: {
    locales,
    defaultLocale,
    strictMode: 'strict',
  },

  ai: {
    provider: 'googlegenerativeai',
    model: 'gemini-3-flash-preview',
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    dataSerialization: 'toon',
  },

  editor: {
    backendURL: process.env.BACKEND_URL,
    // clientId: process.env.INTLAYER_CLIENT_ID,
    // clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
