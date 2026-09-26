import { internationalization } from '@intlayer/config/built';
import type { ConfigureOptions, Formats } from './types';

/** svelte-i18n's built-in named formats (intl-messageformat defaults). */
export const defaultFormats: Formats = {
  number: {
    scientific: { notation: 'scientific' },
    engineering: { notation: 'engineering' },
    compactLong: { notation: 'compact', compactDisplay: 'long' },
    compactShort: { notation: 'compact', compactDisplay: 'short' },
  },
  date: {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  },
  time: {
    short: { hour: 'numeric', minute: 'numeric' },
    medium: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
    long: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    },
    full: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    },
  },
};

/** Locale used when nothing else is set: intlayer's configured default. */
export const configDefaultLocale = (internationalization?.defaultLocale ??
  'en') as string;

/** Locales declared in the intlayer configuration. */
export const configLocales = (internationalization?.locales ?? [
  configDefaultLocale,
]) as string[];

/** Options set through `init()`, read by every store. */
export const runtimeOptions: Omit<ConfigureOptions, 'formats'> & {
  formats: Formats;
} = {
  fallbackLocale: configDefaultLocale,
  formats: defaultFormats,
};

/**
 * Applies `init()` options, merging custom formats over the defaults.
 */
export const setRuntimeOptions = (options: Partial<ConfigureOptions>): void => {
  const { formats, ...rest } = options;

  Object.assign(runtimeOptions, rest);

  if (formats) {
    runtimeOptions.formats = {
      number: { ...defaultFormats.number, ...formats.number },
      date: { ...defaultFormats.date, ...formats.date },
      time: { ...defaultFormats.time, ...formats.time },
    };
  }
};
