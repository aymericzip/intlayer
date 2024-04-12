import { match } from '@formatjs/intl-localematcher';
import type { Locales } from '@intlayer/config';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server.js';
import { intlayerConfiguration } from './config';

const { locales, defaultLocale } = intlayerConfiguration;

export const localeDetector = (request: NextRequest): Locales => {
  const negotiatorHeaders: Record<string, string> = {};

  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // match can only use specifically formatted locales
  // https://stackoverflow.com/questions/76447732/nextjs-13-i18n-incorrect-locale-information-provided
  try {
    return match(languages, locales, defaultLocale) as Locales;
  } catch (e) {
    console.warn(
      `No valid locales in accept-language header: ${languages.join(', ')}`
    );
    console.warn(`Reverting to using defaultLocale: ${defaultLocale}`);

    return defaultLocale;
  }
};
