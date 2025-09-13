import { Locales, type IntlayerConfig } from 'intlayer';

export const locales = [
  Locales.ENGLISH,
  Locales.FRENCH,
  Locales.RUSSIAN,
  Locales.JAPANESE,
  Locales.KOREAN,
  Locales.CHINESE,
  Locales.SPANISH,
  Locales.GERMAN,
  Locales.ARABIC,
  Locales.PORTUGUESE,
  Locales.ENGLISH_UNITED_KINGDOM,
  Locales.ITALIAN,
  Locales.HINDI,
  Locales.TURKISH,
];
export const defaultLocale = Locales.ENGLISH;

/** @type {import('intlayer').IntlayerConfig} */
const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
    strictMode: 'strict',
  },

  ai: {
    provider: 'openai',
    model: 'gpt-4.1-mini',
    temperature: 0.2,
    apiKey: process.env.OPEN_AI_API_KEY,
  },

  editor: {
    backendURL: process.env.BACKEND_URL,
    // clientId: process.env.INTLAYER_CLIENT_ID,
    // clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
